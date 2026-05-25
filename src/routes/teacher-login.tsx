import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { GraduationCap, Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/teacher-login")({
  component: TeacherLogin,
  head: () => ({
    meta: [
      { title: "Teacher Login — Seth Chhoteylal Academy" },
      { name: "description", content: "Teacher login portal for Seth Chhoteylal Academy faculty. Coming soon." },
    ],
    links: [{ rel: "canonical", href: "/teacher-login" }],
  }),
});

function TeacherLogin() {
  return (
    <Layout>
      <PageHeader title="Teacher Login" subtitle="Secure portal for our faculty members." />
      <section className="py-20">
        <div className="mx-auto max-w-xl px-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-10 text-center hover-lift">
            <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-aqua-soft text-teal">
              <GraduationCap className="h-8 w-8" />
            </div>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-aqua-soft px-3 py-1 text-xs font-semibold text-teal">
              <Clock className="h-3.5 w-3.5" /> Coming Soon
            </div>
            <h2 className="mt-4 font-display text-2xl font-bold text-navy">Teacher Portal Launching Soon</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              We're building a dedicated portal for our teachers — attendance, lesson plans, gradebooks and
              parent communication, all in one place. Stay tuned.
            </p>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 bg-teal text-white font-semibold rounded-full px-6 py-3 hover:bg-teal-dark transition shadow-md shadow-teal/25">
              Contact Administration <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
