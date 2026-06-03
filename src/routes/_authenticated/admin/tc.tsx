import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Search, Loader2, Download, Trash2, Edit3, Plus, X } from "lucide-react";
import { listTCs, deleteTC, getAdminDownloadUrl, updateTC } from "@/lib/tc.functions";

export const Route = createFileRoute("/_authenticated/admin/tc")({
  component: TCList,
});

function TCList() {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sessionFilter, setSessionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<"active" | "inactive" | "all">("all");
  const [confirm, setConfirm] = useState<{ id: string; name: string } | null>(null);
  const [editing, setEditing] = useState<any | null>(null);

  const list = useServerFn(listTCs);
  const del = useServerFn(deleteTC);
  const dl = useServerFn(getAdminDownloadUrl);
  const up = useServerFn(updateTC);
  const qc = useQueryClient();

  const args = { search: search || undefined, classFilter: classFilter || undefined, sessionFilter: sessionFilter || undefined, statusFilter };
  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["tcs", args],
    queryFn: () => list({ data: args }),
  });

  const handleDelete = async () => {
    if (!confirm) return;
    try {
      await del({ data: { id: confirm.id } });
      toast.success("TC deleted");
      setConfirm(null);
      qc.invalidateQueries({ queryKey: ["tcs"] });
      qc.invalidateQueries({ queryKey: ["admin-stats"] });
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to delete");
    }
  };

  const handleDownload = async (id: string) => {
    try {
      const { url } = await dl({ data: { id } });
      window.open(url, "_blank");
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to download");
    }
  };

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
        <div className="grid md:grid-cols-[1fr_auto_auto_auto_auto] gap-3">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, admission, or roll number"
              className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30" />
          </div>
          <input value={classFilter} onChange={(e) => setClassFilter(e.target.value)} placeholder="Class"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm w-full md:w-28" />
          <input value={sessionFilter} onChange={(e) => setSessionFilter(e.target.value)} placeholder="Session"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm w-full md:w-32" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm w-full md:w-32">
            <option value="all">All status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <Link to="/admin/upload"
            className="inline-flex items-center justify-center gap-1.5 bg-teal text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-teal-dark">
            <Plus className="h-4 w-4" /> Upload
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-600">
              <tr>
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Adm #</th>
                <th className="px-4 py-3">Roll</th>
                <th className="px-4 py-3">Class</th>
                <th className="px-4 py-3">Session</th>
                <th className="px-4 py-3">Issue Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading && (
                <tr><td colSpan={8} className="px-4 py-12 text-center"><Loader2 className="h-5 w-5 animate-spin text-teal mx-auto" /></td></tr>
              )}
              {!isLoading && rows.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-slate-500">No transfer certificates found.</td></tr>
              )}
              {rows.map((r: any) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-semibold text-navy">{r.student_name}</td>
                  <td className="px-4 py-3">{r.admission_number}</td>
                  <td className="px-4 py-3">{r.roll_number ?? "—"}</td>
                  <td className="px-4 py-3">{r.class ?? "—"}</td>
                  <td className="px-4 py-3">{r.session ?? "—"}</td>
                  <td className="px-4 py-3">{r.issue_date ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${r.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"}`}>{r.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleDownload(r.id)} title="Download" className="p-1.5 rounded hover:bg-slate-100 text-teal"><Download className="h-4 w-4" /></button>
                      <button onClick={() => setEditing(r)} title="Edit" className="p-1.5 rounded hover:bg-slate-100 text-slate-700"><Edit3 className="h-4 w-4" /></button>
                      <button onClick={() => setConfirm({ id: r.id, name: r.student_name })} title="Delete" className="p-1.5 rounded hover:bg-slate-100 text-red-600"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {confirm && (
        <Modal onClose={() => setConfirm(null)} title="Delete Transfer Certificate">
          <p className="text-sm text-slate-600">Are you sure you want to delete the TC for <strong>{confirm.name}</strong>? This action cannot be undone.</p>
          <div className="mt-5 flex justify-end gap-2">
            <button onClick={() => setConfirm(null)} className="px-4 py-2 text-sm rounded-lg border border-slate-200 hover:bg-slate-50">Cancel</button>
            <button onClick={handleDelete} className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700">Delete</button>
          </div>
        </Modal>
      )}

      {editing && (
        <Modal onClose={() => setEditing(null)} title={`Edit: ${editing.student_name}`}>
          <EditForm tc={editing} onCancel={() => setEditing(null)} onSave={async (patch) => {
            try {
              await up({ data: { id: editing.id, patch } });
              toast.success("Updated");
              setEditing(null);
              qc.invalidateQueries({ queryKey: ["tcs"] });
            } catch (e: any) { toast.error(e?.message ?? "Failed"); }
          }} />
        </Modal>
      )}
    </div>
  );
}

function Modal({ onClose, title, children }: { onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-semibold text-navy">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded"><X className="h-4 w-4" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function EditForm({ tc, onCancel, onSave }: { tc: any; onCancel: () => void; onSave: (patch: any) => void }) {
  const [f, setF] = useState({
    student_name: tc.student_name ?? "",
    class: tc.class ?? "",
    session: tc.session ?? "",
    issue_date: tc.issue_date ?? "",
    status: tc.status ?? "active",
  });
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(f); }} className="space-y-3">
      <Row label="Student Name"><input value={f.student_name} onChange={(e) => setF({ ...f, student_name: e.target.value })} className="edit-i" /></Row>
      <Row label="Class"><input value={f.class} onChange={(e) => setF({ ...f, class: e.target.value })} className="edit-i" /></Row>
      <Row label="Session"><input value={f.session} onChange={(e) => setF({ ...f, session: e.target.value })} className="edit-i" /></Row>
      <Row label="Issue Date"><input type="date" value={f.issue_date} onChange={(e) => setF({ ...f, issue_date: e.target.value })} className="edit-i" /></Row>
      <Row label="Status">
        <select value={f.status} onChange={(e) => setF({ ...f, status: e.target.value as any })} className="edit-i">
          <option value="active">Active</option><option value="inactive">Inactive</option>
        </select>
      </Row>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm rounded-lg border border-slate-200">Cancel</button>
        <button type="submit" className="px-4 py-2 text-sm rounded-lg bg-teal text-white">Save</button>
      </div>
      <style>{`.edit-i{width:100%;border:1px solid #e2e8f0;border-radius:.5rem;padding:.4rem .6rem;font-size:.875rem}`}</style>
    </form>
  );
}
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="text-xs font-semibold text-slate-700 block mb-1">{label}</span>{children}</label>;
}
