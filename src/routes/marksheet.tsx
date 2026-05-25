import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { useState } from "react";
import { Download, FileText, Search } from "lucide-react";

export const Route = createFileRoute("/marksheet")({
  component: Marksheet,
  head: () => ({
    meta: [
      { title: "Marksheet Download — Seth Chhoteylal Academy" },
      { name: "description", content: "Download your marksheet or result by Roll Number, Class and Exam type." },
    ],
    links: [{ rel: "canonical", href: "/marksheet" }],
  }),
});

const inputCls = "w-full rounded-md border border-input bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/60";

const classes = ["Nursery", "LKG", "UKG", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
const exams = ["Half Yearly", "Annual", "Unit Test"];

type Result = {
  name: string; roll: string; cls: string; exam: string;
  subjects: { subject: string; marks: number; grade: string }[];
};

function Marksheet() {
  const [result, setResult] = useState<Result | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    const cls = String(data.get("cls") || "");
    const exam = String(data.get("exam") || "");
    const roll = String(data.get("roll") || "").trim();
    if (!cls) next.cls = "Select class";
    if (!exam) next.exam = "Select exam";
    if (!roll) next.roll = "Required";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setResult({
      name: "Student Name",
      roll,
      cls,
      exam,
      subjects: [
        { subject: "English", marks: 88, grade: "A" },
        { subject: "Hindi", marks: 82, grade: "A" },
        { subject: "Mathematics", marks: 91, grade: "A+" },
        { subject: "Science", marks: 85, grade: "A" },
        { subject: "Social Science", marks: 79, grade: "B+" },
        { subject: "Computer", marks: 94, grade: "A+" },
      ],
    });
  };

  return (
    <Layout>
      <PageHeader title="Download Marksheet / Result" subtitle="Search by Roll Number and Class to view and download your result." />

      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 grid gap-6 lg:grid-cols-[1fr_1fr] items-start">
          <div className="bg-soft rounded-2xl border border-border p-6">
            <h2 className="font-display text-lg font-bold text-navy flex items-center gap-2">
              <FileText className="h-5 w-5 text-teal" /> Instructions
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground list-disc pl-5">
              <li>Enter your Roll Number.</li>
              <li>Select your Class.</li>
              <li>Choose Exam Type (Half Yearly, Annual, etc.).</li>
              <li>Click "Check Result" to view your marksheet.</li>
            </ul>
          </div>

          <form onSubmit={onSubmit} noValidate className="bg-white rounded-2xl border border-border p-6">
            <h2 className="font-display text-lg font-bold text-navy">Result Search</h2>
            <div className="mt-5 space-y-4">
              <div>
                <label className="text-sm font-medium text-navy">Class</label>
                <select name="cls" className={`mt-1.5 ${inputCls}`} defaultValue="">
                  <option value="" disabled>Select class…</option>
                  {classes.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.cls && <p className="text-xs text-destructive mt-1">{errors.cls}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-navy">Exam</label>
                <select name="exam" className={`mt-1.5 ${inputCls}`} defaultValue="">
                  <option value="" disabled>Select exam…</option>
                  {exams.map((e) => <option key={e} value={e}>{e}</option>)}
                </select>
                {errors.exam && <p className="text-xs text-destructive mt-1">{errors.exam}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-navy">Roll Number</label>
                <input name="roll" className={`mt-1.5 ${inputCls}`} maxLength={20} />
                {errors.roll && <p className="text-xs text-destructive mt-1">{errors.roll}</p>}
              </div>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-navy text-white font-semibold rounded-md px-5 py-3 hover:bg-teal hover:text-navy transition">
                <Search className="h-4 w-4" /> Check Result / Download Marksheet
              </button>
            </div>
          </form>
        </div>

        {result && (
          <div className="mx-auto max-w-4xl px-4 mt-10">
            <div className="bg-white rounded-2xl border-2 border-teal/50 p-6 md:p-8 shadow-lg">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b pb-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-teal font-semibold">Marksheet</p>
                  <h2 className="font-display text-2xl font-bold text-navy mt-1">{result.name}</h2>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Roll No: <span className="text-navy font-medium">{result.roll}</span> · Class: <span className="text-navy font-medium">{result.cls}</span> · Exam: <span className="text-navy font-medium">{result.exam}</span>
                  </div>
                </div>
                <a href="#" download className="inline-flex items-center gap-2 bg-navy text-white rounded-md px-4 py-2.5 text-sm font-semibold hover:bg-teal hover:text-navy transition">
                  <Download className="h-4 w-4" /> Download PDF
                </a>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-soft text-navy">
                      <th className="text-left px-4 py-2.5 font-semibold">Subject</th>
                      <th className="text-right px-4 py-2.5 font-semibold">Marks</th>
                      <th className="text-right px-4 py-2.5 font-semibold">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.subjects.map((s) => (
                      <tr key={s.subject} className="border-b last:border-0">
                        <td className="px-4 py-2.5">{s.subject}</td>
                        <td className="px-4 py-2.5 text-right font-medium">{s.marks}</td>
                        <td className="px-4 py-2.5 text-right font-semibold text-teal">{s.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">You can download the official PDF marksheet from the link above.</p>
            </div>
          </div>
        )}

        <div className="mx-auto max-w-4xl px-4 mt-10">
          <div className="rounded-xl bg-soft border border-border p-5 text-xs text-muted-foreground">
            <strong className="text-navy">Disclaimer:</strong> Result information shown here is for reference only.
            Please contact the school office for any correction or clarification.
          </div>
        </div>
      </section>
    </Layout>
  );
}
