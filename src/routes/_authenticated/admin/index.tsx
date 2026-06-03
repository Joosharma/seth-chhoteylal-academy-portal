import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Users, FileText, Download, Clock, Loader2, ArrowRight } from "lucide-react";
import { getAdminStats } from "@/lib/tc.functions";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const fn = useServerFn(getAdminStats);
  const { data, isLoading } = useQuery({ queryKey: ["admin-stats"], queryFn: () => fn() });

  const stats = [
    { label: "Total Students", value: data?.totalStudents ?? 0, icon: Users, color: "bg-blue-500" },
    { label: "Uploaded TCs", value: data?.totalTCs ?? 0, icon: FileText, color: "bg-teal" },
    { label: "TC Downloads", value: data?.totalDownloads ?? 0, icon: Download, color: "bg-emerald-500" },
    { label: "Recent Uploads", value: data?.recent?.length ?? 0, icon: Clock, color: "bg-amber-500" },
  ];

  if (isLoading) return <div className="grid place-items-center py-20"><Loader2 className="h-6 w-6 animate-spin text-teal" /></div>;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className={`h-10 w-10 rounded-xl ${s.color} text-white grid place-items-center mb-3`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div className="text-2xl font-display font-bold text-navy">{s.value}</div>
            <div className="text-xs text-slate-600 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-display font-semibold text-navy">Recent Uploads</h2>
          <Link to="/admin/tc" className="text-sm text-teal font-semibold inline-flex items-center gap-1 hover:underline">View all <ArrowRight className="h-3 w-3" /></Link>
        </div>
        <div className="divide-y divide-slate-100">
          {(data?.recent ?? []).map((r) => (
            <div key={r.id} className="px-5 py-3 flex items-center justify-between hover:bg-slate-50">
              <div>
                <div className="font-semibold text-navy text-sm">{r.student_name}</div>
                <div className="text-xs text-slate-500">Adm #{r.admission_number}</div>
              </div>
              <div className="text-xs text-slate-500">{new Date(r.created_at).toLocaleDateString()}</div>
            </div>
          ))}
          {(!data?.recent || data.recent.length === 0) && (
            <div className="px-5 py-12 text-center text-sm text-slate-500">No uploads yet. <Link to="/admin/upload" className="text-teal font-semibold">Upload your first TC</Link></div>
          )}
        </div>
      </div>
    </div>
  );
}
