import { createFileRoute } from "@tanstack/react-router";
import { useAuth, useUserRoles } from "@/hooks/use-auth";
import { Shield } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  component: Settings,
});

function Settings() {
  const { user } = useAuth();
  const { roles } = useUserRoles();
  return (
    <div className="max-w-2xl space-y-5">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="font-display font-semibold text-navy mb-4">Account</h2>
        <dl className="text-sm space-y-2">
          <Row k="Email" v={user?.email ?? "—"} />
          <Row k="User ID" v={user?.id ?? "—"} />
          <Row k="Roles" v={roles.join(", ") || "user"} />
        </dl>
      </div>
      <div className="bg-aqua-soft border border-teal/30 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-teal font-semibold mb-2"><Shield className="h-4 w-4" /> Promoting admins</div>
        <p className="text-sm text-slate-700">
          New admins must sign up first, then a super admin assigns their role in the database. Insert a row in <code className="bg-white px-1 rounded">user_roles</code> with the user's id and role <code className="bg-white px-1 rounded">super_admin</code> or <code className="bg-white px-1 rounded">school_admin</code>.
        </p>
      </div>
    </div>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return <div className="grid grid-cols-[120px_1fr] gap-3"><dt className="text-slate-500">{k}</dt><dd className="text-navy font-mono break-all">{v}</dd></div>;
}
