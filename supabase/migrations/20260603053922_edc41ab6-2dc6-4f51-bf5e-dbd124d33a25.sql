
-- Lock down SECURITY DEFINER helpers (only the database itself / service_role should call them; RLS policies still work because policies run as the table owner)
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_admin(UUID) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.touch_updated_at() FROM PUBLIC, anon, authenticated;

-- Storage policies for tc-files bucket
CREATE POLICY "admins manage tc-files" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'tc-files' AND public.is_admin(auth.uid()))
  WITH CHECK (bucket_id = 'tc-files' AND public.is_admin(auth.uid()));
