import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const tcSchema = z.object({
  student_name: z.string().trim().min(1).max(200),
  admission_number: z.string().trim().min(1).max(50),
  roll_number: z.string().trim().max(50).optional().nullable(),
  class: z.string().trim().max(50).optional().nullable(),
  session: z.string().trim().max(50).optional().nullable(),
  father_name: z.string().trim().max(200).optional().nullable(),
  mother_name: z.string().trim().max(200).optional().nullable(),
  date_of_birth: z.string().optional().nullable(),
  issue_date: z.string().optional().nullable(),
  pdf_path: z.string().min(1).max(500),
  status: z.enum(["active", "inactive"]).default("active"),
});

async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId);
  if (error) throw new Error(error.message);
  const isAdmin = (data ?? []).some((r: any) => r.role === "super_admin" || r.role === "school_admin");
  if (!isAdmin) throw new Error("Forbidden: admin access required");
}

export const createTC = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => tcSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("transfer_certificates")
      .insert({ ...data, uploaded_by: context.userId })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const updateTC = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid(), patch: tcSchema.partial() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("transfer_certificates")
      .update(data.patch)
      .eq("id", data.id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deleteTC = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // get path to remove file
    const { data: tc } = await supabaseAdmin
      .from("transfer_certificates")
      .select("pdf_path")
      .eq("id", data.id)
      .single();
    const { error } = await supabaseAdmin.from("transfer_certificates").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    if (tc?.pdf_path) {
      await supabaseAdmin.storage.from("tc-files").remove([tc.pdf_path]);
    }
    return { ok: true };
  });

export const listTCs = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({
      search: z.string().trim().max(100).optional(),
      classFilter: z.string().trim().max(50).optional(),
      sessionFilter: z.string().trim().max(50).optional(),
      statusFilter: z.enum(["active", "inactive", "all"]).optional(),
    }).parse(input ?? {}),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let q = supabaseAdmin.from("transfer_certificates").select("*").order("created_at", { ascending: false });
    if (data.search) {
      const s = data.search;
      q = q.or(`student_name.ilike.%${s}%,admission_number.ilike.%${s}%,roll_number.ilike.%${s}%`);
    }
    if (data.classFilter) q = q.eq("class", data.classFilter);
    if (data.sessionFilter) q = q.eq("session", data.sessionFilter);
    if (data.statusFilter && data.statusFilter !== "all") q = q.eq("status", data.statusFilter);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const getAdminStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [{ count: tcCount }, { count: downloadCount }, { count: studentCount }, { data: recent }] = await Promise.all([
      supabaseAdmin.from("transfer_certificates").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("tc_downloads").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("profiles").select("*", { count: "exact", head: true }),
      supabaseAdmin
        .from("transfer_certificates")
        .select("id, student_name, admission_number, created_at")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);
    return {
      totalTCs: tcCount ?? 0,
      totalDownloads: downloadCount ?? 0,
      totalStudents: studentCount ?? 0,
      recent: recent ?? [],
    };
  });

// Admin: signed URL for any TC
export const getAdminDownloadUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: tc, error: tcErr } = await supabaseAdmin
      .from("transfer_certificates").select("pdf_path, student_name").eq("id", data.id).single();
    if (tcErr || !tc) throw new Error("Not found");
    const { data: signed, error } = await supabaseAdmin.storage.from("tc-files").createSignedUrl(tc.pdf_path, 60);
    if (error || !signed) throw new Error(error?.message || "Failed to create URL");
    return { url: signed.signedUrl, name: tc.student_name };
  });

// Public (authenticated) student search + download
export const findMyTC = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ query: z.string().trim().min(1).max(50) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const q = data.query;
    const { data: row, error } = await supabaseAdmin
      .from("transfer_certificates")
      .select("id, student_name, admission_number, roll_number, class, session, issue_date, status")
      .or(`admission_number.eq.${q},roll_number.eq.${q}`)
      .eq("status", "active")
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) return { tc: null as null };
    return { tc: row, userId: context.userId };
  });

export const downloadMyTC = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: tc, error: tcErr } = await supabaseAdmin
      .from("transfer_certificates")
      .select("pdf_path, status")
      .eq("id", data.id)
      .single();
    if (tcErr || !tc) throw new Error("Not found");
    if (tc.status !== "active") throw new Error("This certificate is not available");
    const { data: signed, error } = await supabaseAdmin.storage.from("tc-files").createSignedUrl(tc.pdf_path, 120);
    if (error || !signed) throw new Error(error?.message || "Failed to create URL");
    await supabaseAdmin.from("tc_downloads").insert({ tc_id: data.id, downloaded_by: context.userId });
    return { url: signed.signedUrl };
  });
