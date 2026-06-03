import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { Upload as UploadIcon, Loader2, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { createTC } from "@/lib/tc.functions";

export const Route = createFileRoute("/_authenticated/admin/upload")({
  component: UploadPage,
});

const empty = {
  student_name: "", admission_number: "", roll_number: "", class: "", session: "",
  father_name: "", mother_name: "", date_of_birth: "", issue_date: "", status: "active" as "active" | "inactive",
};

function UploadPage() {
  const [form, setForm] = useState(empty);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const create = useServerFn(createTC);
  const navigate = useNavigate();

  const onChange = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.admission_number.trim()) return toast.error("Admission Number is required");
    if (!form.roll_number.trim()) return toast.error("Roll Number is required");
    if (!file) return toast.error("PDF file is required");
    if (file.type !== "application/pdf") return toast.error("Only PDF files are allowed");
    if (file.size > 10 * 1024 * 1024) return toast.error("Max file size is 10MB");

    setBusy(true);
    try {
      const path = `${form.admission_number.trim()}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
      const { error: upErr } = await supabase.storage.from("tc-files").upload(path, file, {
        contentType: "application/pdf", upsert: false,
      });
      if (upErr) throw upErr;

      await create({
        data: {
          ...form,
          roll_number: form.roll_number || null,
          class: form.class || null,
          session: form.session || null,
          father_name: form.father_name || null,
          mother_name: form.mother_name || null,
          date_of_birth: form.date_of_birth || null,
          issue_date: form.issue_date || null,
          pdf_path: path,
        },
      });

      toast.success("TC uploaded successfully.");
      navigate({ to: "/admin/tc" });
    } catch (e: any) {
      toast.error(e?.message ?? "Upload failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <h2 className="font-display text-xl font-bold text-navy">Upload New Transfer Certificate</h2>
          <p className="text-sm text-slate-600 mt-1">Fill student details and attach the signed PDF.</p>
        </div>
        <form onSubmit={submit} className="p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <F label="Student Name *"><I value={form.student_name} onChange={(v) => onChange("student_name", v)} required /></F>
            <F label="Admission Number *"><I value={form.admission_number} onChange={(v) => onChange("admission_number", v)} required /></F>
            <F label="Roll Number *"><I value={form.roll_number} onChange={(v) => onChange("roll_number", v)} required /></F>
            <F label="Class"><I value={form.class} onChange={(v) => onChange("class", v)} placeholder="e.g. X-A" /></F>
            <F label="Session"><I value={form.session} onChange={(v) => onChange("session", v)} placeholder="2024-25" /></F>
            <F label="Father Name"><I value={form.father_name} onChange={(v) => onChange("father_name", v)} /></F>
            <F label="Mother Name"><I value={form.mother_name} onChange={(v) => onChange("mother_name", v)} /></F>
            <F label="Date of Birth"><I type="date" value={form.date_of_birth} onChange={(v) => onChange("date_of_birth", v)} /></F>
            <F label="Issue Date"><I type="date" value={form.issue_date} onChange={(v) => onChange("issue_date", v)} /></F>
            <F label="Status">
              <select value={form.status} onChange={(e) => onChange("status", e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </F>
          </div>

          <F label="TC PDF (max 10MB) *">
            <label className="flex items-center gap-3 border-2 border-dashed border-slate-300 rounded-xl px-4 py-6 cursor-pointer hover:border-teal transition">
              <FileText className="h-6 w-6 text-teal" />
              <div className="flex-1 text-sm">
                {file ? <span className="font-semibold text-navy">{file.name}</span> : <span className="text-slate-500">Click to choose a PDF file</span>}
              </div>
              <input type="file" accept="application/pdf" className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            </label>
          </F>

          <div className="flex flex-wrap gap-3 pt-2">
            <button type="submit" disabled={busy}
              className="inline-flex items-center gap-2 bg-teal text-white font-semibold rounded-xl px-6 py-3 hover:bg-teal-dark transition shadow-md shadow-teal/25 disabled:opacity-60">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadIcon className="h-4 w-4" />}
              Upload TC
            </button>
            <button type="button" onClick={() => { setForm(empty); setFile(null); }}
              className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl px-6 py-3 hover:bg-slate-50">
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-700 block mb-1.5">{label}</span>
      {children}
    </label>
  );
}
function I(props: { value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <input
      type={props.type ?? "text"}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      required={props.required}
      placeholder={props.placeholder}
      maxLength={200}
      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
    />
  );
}
