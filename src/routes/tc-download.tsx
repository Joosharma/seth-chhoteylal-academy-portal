import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Layout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { useEffect, useState } from "react";
import { FileText, Download, Search, AlertCircle, CheckCircle2, Loader2, LogIn } from "lucide-react";
import { SCHOOL } from "@/lib/school";
import { useAuth } from "@/hooks/use-auth";
import { findMyTC, downloadMyTC } from "@/lib/tc.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/tc-download")({
  component: TCDownload,
  head: () => ({
    meta: [
      { title: "Transfer Certificate Download — Seth Chhoteylal Academy" },
      { name: "description", content: "Sign in and download your Transfer Certificate (TC) by entering your admission or roll number." },
    ],
    links: [{ rel: "canonical", href: "/tc-download" }],
  }),
});

function TCDownload() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [admission, setAdmission] = useState("");
  const [busy, setBusy] = useState(false);
  const [found, setFound] = useState<any | null>(null);
  const [error, setError] = useState("");

  const find = useServerFn(findMyTC);
  const dl = useServerFn(downloadMyTC);

  useEffect(() => {
    if (!loading && !user) {
      // require login
      navigate({ to: "/auth", replace: true });
    }
  }, [user, loading, navigate]);

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setFound(null);
    const v = admission.trim();
    if (!/^[A-Za-z0-9-]{1,50}$/.test(v)) {
      setError("Please enter a valid admission or roll number.");
      return;
    }
    setBusy(true);
    try {
      const res = await find({ data: { query: v } });
      if (!res.tc) {
        setError("No transfer certificate found for this admission/roll number. Please contact school administration.");
      } else {
        setFound(res.tc);
      }
    } catch (e: any) {
      setError(e?.message ?? "Search failed");
    } finally {
      setBusy(false);
    }
  };

  const onDownload = async () => {
    if (!found) return;
    try {
      const { url } = await dl({ data: { id: found.id } });
      window.open(url, "_blank");
      toast.success("Download started");
    } catch (e: any) {
      toast.error(e?.message ?? "Download failed");
    }
  };

  if (loading || !user) {
    return (
      <Layout>
        <div className="grid place-items-center py-32">
          <Loader2 className="h-6 w-6 animate-spin text-teal" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader title="Transfer Certificate" subtitle="Enter your admission or roll number to download your TC." />

      <section className="py-16 md:py-20 bg-soft">
        <div className="mx-auto max-w-3xl px-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 md:p-10">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal bg-aqua-soft px-3 py-1.5 rounded-full">
                <FileText className="h-3.5 w-3.5" /> Official TC Portal
              </div>
              <div className="text-xs text-slate-500 inline-flex items-center gap-1.5">
                <LogIn className="h-3.5 w-3.5" /> Signed in as <span className="font-semibold text-navy">{user.email}</span>
              </div>
            </div>
            <h2 className="mt-4 font-display text-2xl md:text-3xl font-bold text-navy">Search Your Certificate</h2>
            <p className="mt-2 text-sm text-slate-600">
              Enter the admission number or roll number from your school ID card.
            </p>

            <form onSubmit={onSearch} className="mt-6 grid sm:grid-cols-[1fr_auto] gap-3">
              <input
                value={admission}
                onChange={(e) => setAdmission(e.target.value)}
                required maxLength={50}
                placeholder="e.g. SCA-2024-0123 or 21"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal"
              />
              <button type="submit" disabled={busy} className="inline-flex items-center justify-center gap-2 bg-teal text-white font-semibold rounded-xl px-6 py-3 hover:bg-teal-dark transition shadow-md shadow-teal/25 disabled:opacity-60">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />} Find TC
              </button>
            </form>

            {error && (
              <div className="mt-5 flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" /> {error}
              </div>
            )}

            {found && (
              <div className="mt-8 rounded-2xl border border-teal/30 bg-aqua-soft/40 p-6 animate-fade-up">
                <div className="flex items-center gap-2 text-teal font-semibold">
                  <CheckCircle2 className="h-5 w-5" /> Certificate Found
                </div>
                <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <Cell k="Student Name" v={found.student_name} />
                  <Cell k="Admission #" v={found.admission_number} />
                  <Cell k="Class" v={found.class ?? "—"} />
                  <Cell k="Session" v={found.session ?? "—"} />
                </div>
                <div className="mt-5">
                  <button onClick={onDownload}
                    className="inline-flex items-center gap-2 bg-teal text-white font-semibold rounded-full px-6 py-3 hover:bg-teal-dark transition shadow-md shadow-teal/25">
                    <Download className="h-4 w-4" /> Download TC (PDF)
                  </button>
                </div>
              </div>
            )}

            <div className="mt-8 text-xs text-slate-500 leading-relaxed">
              Note: For lost admission numbers or any discrepancy, please contact the school office at{" "}
              <a className="text-teal font-semibold" href={`tel:${SCHOOL.phoneTel}`}>{SCHOOL.phone}</a>.
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Cell({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="text-slate-500 text-xs uppercase tracking-wider">{k}</div>
      <div className="mt-1 font-semibold text-navy">{v}</div>
    </div>
  );
}
