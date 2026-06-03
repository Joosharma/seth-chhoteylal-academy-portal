import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { GraduationCap, Mail, Lock, User as UserIcon, Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({ meta: [{ title: "Sign In — Seth Chhoteylal Academy" }] }),
});

const signInSchema = z.object({
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(6, "Min 6 characters").max(72),
});
const signUpSchema = signInSchema.extend({
  fullName: z.string().trim().min(2, "Enter your name").max(100),
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/tc-download", replace: true });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const parsed = signUpSchema.safeParse({ email, password, fullName });
        if (!parsed.success) {
          toast.error(parsed.error.issues[0].message);
          return;
        }
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { full_name: parsed.data.fullName },
          },
        });
        if (error) throw error;
        toast.success("Account created. Check your email to confirm, then sign in.");
        setMode("signin");
      } else {
        const parsed = signInSchema.safeParse({ email, password });
        if (!parsed.success) {
          toast.error(parsed.error.issues[0].message);
          return;
        }
        const { error } = await supabase.auth.signInWithPassword(parsed.data);
        if (error) throw error;
        toast.success("Signed in.");
        navigate({ to: "/tc-download", replace: true });
      }
    } catch (e: any) {
      toast.error(e?.message ?? "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="h-10 w-10 rounded-xl bg-navy text-white grid place-items-center">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="font-display font-bold text-navy text-lg">Seth Chhoteylal Academy</span>
        </Link>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
          <h1 className="font-display text-2xl font-bold text-navy text-center">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-center text-sm text-slate-600 mt-1">
            {mode === "signin" ? "Sign in to access TC and school services" : "Sign up to download your Transfer Certificate"}
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "signup" && (
              <Field icon={<UserIcon className="h-4 w-4" />} label="Full Name">
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} required maxLength={100}
                  className="auth-input" placeholder="John Doe" />
              </Field>
            )}
            <Field icon={<Mail className="h-4 w-4" />} label="Email">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255}
                className="auth-input" placeholder="you@example.com" />
            </Field>
            <Field icon={<Lock className="h-4 w-4" />} label="Password">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} maxLength={72}
                className="auth-input" placeholder="••••••••" />
            </Field>

            <button type="submit" disabled={busy}
              className="w-full inline-flex items-center justify-center gap-2 bg-teal text-white font-semibold rounded-xl px-6 py-3 hover:bg-teal-dark transition shadow-md shadow-teal/25 disabled:opacity-60">
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-6">
            {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
            <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-teal font-semibold hover:underline">
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          Admin access is granted manually after signup. Contact the school office.
        </p>
      </div>
      <style>{`.auth-input{width:100%;border:1px solid #e2e8f0;background:#fff;border-radius:.75rem;padding:.7rem 1rem;font-size:.875rem;outline:none;transition:all .15s}.auth-input:focus{border-color:#0F766E;box-shadow:0 0 0 3px rgba(15,118,110,.15)}`}</style>
    </div>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">{icon} {label}</span>
      {children}
    </label>
  );
}
