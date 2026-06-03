import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LayoutDashboard, FileText, Upload, Users, Settings, LogOut, Menu, X, GraduationCap, Loader2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useUserRoles } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

const items = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/tc", label: "TC Management", icon: FileText },
  { to: "/admin/upload", label: "Upload TC", icon: Upload },
  { to: "/admin/students", label: "Students", icon: Users },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

function AdminLayout() {
  const { isAdmin, loading } = useUserRoles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!loading && !isAdmin) {
      toast.error("Admin access required");
      navigate({ to: "/", replace: true });
    }
  }, [isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-soft">
        <Loader2 className="h-8 w-8 animate-spin text-teal" />
      </div>
    );
  }
  if (!isAdmin) return null;

  const logout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  const isActive = (to: string, exact?: boolean) => (exact ? path === to : path === to || path.startsWith(to + "/"));

  return (
    <div className="min-h-screen flex bg-soft">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-navy text-white transform transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center gap-2 px-5 py-5 border-b border-white/10">
          <div className="h-9 w-9 rounded-lg bg-teal grid place-items-center"><GraduationCap className="h-5 w-5" /></div>
          <div>
            <div className="font-display font-bold leading-tight">SCA Admin</div>
            <div className="text-xs text-white/60">TC Management</div>
          </div>
        </div>
        <nav className="p-3 space-y-1">
          {items.map((it) => {
            const active = isActive(it.to, it.exact);
            return (
              <Link key={it.to} to={it.to} onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${active ? "bg-teal text-white" : "text-white/80 hover:bg-white/10"}`}>
                <it.icon className="h-4 w-4" /> {it.label}
              </Link>
            );
          })}
          <button onClick={logout}
            className="w-full mt-4 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:bg-white/10">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="bg-white border-b border-slate-200 h-14 flex items-center px-4 lg:px-6 sticky top-0 z-30">
          <button className="lg:hidden p-2 -ml-2" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <h1 className="font-display font-semibold text-navy ml-2 lg:ml-0">TC Management Dashboard</h1>
          <div className="ml-auto">
            <Link to="/" className="text-sm text-slate-600 hover:text-teal">View Site →</Link>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>

      {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setOpen(false)} />}
    </div>
  );
}
