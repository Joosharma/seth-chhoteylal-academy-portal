import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/student-login")({
  component: StudentLogin,
  head: () => ({
    meta: [
      { title: "Student Login — Seth Chhoteylal Academy" },
      { name: "description", content: "Student login portal for Seth Chhoteylal Academy. Coming soon." },
    ],
    links: [{ rel: "canonical", href: "/student-login" }],
  }),
});

function StudentLogin() {
  return (
    <Layout>
      <PageHeader title="Student Login" subtitle="Your personal learning dashboard, coming soon." />
      <section className="py-20">
        <div className="mx-auto max-w-xl px-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-10 text-center hover-lift">
            <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-aqua-soft text-teal">
              <BookOpen className="h-8 w-8" />
            </div>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-aqua-soft px-3 py-1 text-xs font-semibold text-teal">
              <Clock className="h-3.5 w-3.5" /> Coming Soon
            </div>
            <h2 className="mt-4 font-display text-2xl font-bold text-navy">Student Portal Launching Soon</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Check your timetable, assignments, results and school notices — anytime, from anywhere.
              Our student portal is on its way.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link to="/marksheet" className="inline-flex items-center gap-2 bg-teal text-white font-semibold rounded-full px-6 py-3 hover:bg-teal-dark transition shadow-md shadow-teal/25">
                View Marksheet <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-aqua-soft text-teal font-semibold rounded-full px-6 py-3 hover:bg-aqua transition">
                Need Help?
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
