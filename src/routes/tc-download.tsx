import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { useState } from "react";
import { FileText, Download, Search, AlertCircle, CheckCircle2 } from "lucide-react";
import { SCHOOL } from "@/lib/school";

export const Route = createFileRoute("/tc-download")({
  component: TCDownload,
  head: () => ({
    meta: [
      { title: "Transfer Certificate Download — Seth Chhoteylal Academy" },
      { name: "description", content: "View and download your Transfer Certificate (TC) by entering your admission number." },
    ],
    links: [{ rel: "canonical", href: "/tc-download" }],
  }),
});

function TCDownload() {
  const [admission, setAdmission] = useState("");
  const [found, setFound] = useState<null | { name: string; class: string; issued: string }>(null);
  const [error, setError] = useState("");

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFound(null);
    const v = admission.trim();
    if (!/^[A-Za-z0-9-]{4,20}$/.test(v)) {
      setError("Please enter a valid admission number (4–20 alphanumeric characters).");
      return;
    }
    // Demo lookup — in production this would query the school records.
    setFound({
      name: "Demo Student",
      class: "X-A",
      issued: new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }),
    });
  };

  return (
    <Layout>
      <PageHeader title="Transfer Certificate" subtitle="Enter your admission number to view and download your TC." />

      <section className="py-16 md:py-20 bg-soft">
        <div className="mx-auto max-w-3xl px-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 md:p-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal bg-aqua-soft px-3 py-1.5 rounded-full">
              <FileText className="h-3.5 w-3.5" /> Official TC Portal
            </div>
            <h2 className="mt-4 font-display text-2xl md:text-3xl font-bold text-navy">Search Your Certificate</h2>
            <p className="mt-2 text-sm text-slate-600">
              Enter the admission number printed on your school ID card or last fee receipt.
            </p>

            <form onSubmit={onSearch} className="mt-6 grid sm:grid-cols-[1fr_auto] gap-3">
              <input
                value={admission}
                onChange={(e) => setAdmission(e.target.value)}
                required
                maxLength={20}
                placeholder="e.g. SCA-2024-0123"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal"
              />
              <button type="submit" className="inline-flex items-center justify-center gap-2 bg-teal text-white font-semibold rounded-xl px-6 py-3 hover:bg-teal-dark transition shadow-md shadow-teal/25">
                <Search className="h-4 w-4" /> View TC
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
                <div className="mt-4 grid sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-slate-500 text-xs uppercase tracking-wider">Student Name</div>
                    <div className="mt-1 font-semibold text-navy">{found.name}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs uppercase tracking-wider">Class</div>
                    <div className="mt-1 font-semibold text-navy">{found.class}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs uppercase tracking-wider">Issued On</div>
                    <div className="mt-1 font-semibold text-navy">{found.issued}</div>
                  </div>
                </div>

                {/* PDF preview placeholder */}
                <div className="mt-6 rounded-xl bg-white border border-slate-200 p-6">
                  <div className="aspect-[1/1.3] sm:aspect-[1.4/1] w-full rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-6">
                    <FileText className="h-12 w-12 text-teal" />
                    <p className="mt-3 font-display font-semibold text-navy">Transfer_Certificate_{admission}.pdf</p>
                    <p className="mt-1 text-xs text-slate-500">PDF preview · 1 page · Official school letterhead</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); alert("Demo: PDF download will be enabled once the school records system is connected."); }}
                    className="inline-flex items-center gap-2 bg-teal text-white font-semibold rounded-full px-6 py-3 hover:bg-teal-dark transition shadow-md shadow-teal/25"
                  >
                    <Download className="h-4 w-4" /> Download PDF
                  </a>
                  <a
                    href={`mailto:${SCHOOL.emailAdmin}?subject=TC%20Request%20-%20${encodeURIComponent(admission)}`}
                    className="inline-flex items-center gap-2 bg-white text-teal border border-teal font-semibold rounded-full px-6 py-3 hover:bg-aqua-soft transition"
                  >
                    Request via Email
                  </a>
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
