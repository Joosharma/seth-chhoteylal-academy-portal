
-- Enum for roles
CREATE TYPE public.app_role AS ENUM ('super_admin', 'school_admin', 'user');

-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users read own profile" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid());

-- User roles
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

-- has_role helper
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('super_admin','school_admin'))
$$;

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Transfer certificates
CREATE TABLE public.transfer_certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name TEXT NOT NULL,
  admission_number TEXT NOT NULL UNIQUE,
  roll_number TEXT,
  class TEXT,
  session TEXT,
  father_name TEXT,
  mother_name TEXT,
  date_of_birth DATE,
  issue_date DATE,
  pdf_path TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_tc_admission ON public.transfer_certificates(admission_number);
CREATE INDEX idx_tc_roll ON public.transfer_certificates(roll_number);
GRANT SELECT ON public.transfer_certificates TO authenticated;
GRANT ALL ON public.transfer_certificates TO service_role;
ALTER TABLE public.transfer_certificates ENABLE ROW LEVEL SECURITY;
-- Admins manage; any authenticated user can read active TC metadata (download enforces auth via server fn)
CREATE POLICY "authenticated can read active TC" ON public.transfer_certificates FOR SELECT TO authenticated USING (status = 'active' OR public.is_admin(auth.uid()));
CREATE POLICY "admins insert TC" ON public.transfer_certificates FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "admins update TC" ON public.transfer_certificates FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "admins delete TC" ON public.transfer_certificates FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- Download activity log
CREATE TABLE public.tc_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tc_id UUID NOT NULL REFERENCES public.transfer_certificates(id) ON DELETE CASCADE,
  downloaded_by UUID REFERENCES auth.users(id),
  downloaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.tc_downloads TO authenticated;
GRANT ALL ON public.tc_downloads TO service_role;
ALTER TABLE public.tc_downloads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins read downloads" ON public.tc_downloads FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "authenticated insert own download" ON public.tc_downloads FOR INSERT TO authenticated WITH CHECK (downloaded_by = auth.uid());

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER tc_touch BEFORE UPDATE ON public.transfer_certificates FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER profiles_touch BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
