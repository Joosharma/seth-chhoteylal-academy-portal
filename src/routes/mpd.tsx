import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import principalImg from "@/assets/principal.jpg";
import { Monitor, Shield, Sparkles, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/mpd")({
  component: MPD,
  head: () => ({
    meta: [
      { title: "Principal's Desk — Seth Chhoteylal Academy" },
      { name: "description", content: "A message from Mrs. Asiya Bushra, Principal of Seth Chhoteylal Academy, on our vision for students and parents." },
    ],
    links: [{ rel: "canonical", href: "/mpd" }],
  }),
});

const visionCards = [
  { icon: Monitor, title: "Digital Learning", desc: "Modern tools and smart classes for every student." },
  { icon: Shield, title: "Discipline", desc: "Strong values and respectful conduct at all times." },
  { icon: Sparkles, title: "Holistic Growth", desc: "Academics, sports, arts and life skills together." },
  { icon: GraduationCap, title: "Academic Excellence", desc: "A rigorous CBSE foundation for every learner." },
];

function MPD() {
  return (
    <Layout>
      <PageHeader title="Principal's Desk" subtitle="Welcome from Mrs. Asiya Bushra, Principal of Seth Chhoteylal Academy." />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 grid gap-10 md:grid-cols-[320px_1fr] items-start">
          <img src={principalImg} alt="Mrs. Asiya Bushra, Principal" loading="lazy" width={800} height={1000} className="rounded-2xl shadow-lg object-cover w-full max-w-sm justify-self-center" />
          <div>
            <h2 className="font-display text-3xl font-bold text-navy">Mrs. Asiya Bushra</h2>
            <p className="text-teal font-semibold mt-1">Principal, Seth Chhoteylal Academy</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              With over two decades in education, Mrs. Bushra has dedicated her career to building learning
              environments where every child feels seen, supported and challenged in equal measure.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-soft py-16">
        <div className="mx-auto max-w-3xl px-4 prose prose-slate">
          <h2 className="font-display text-3xl font-bold text-navy">A Message from the Principal</h2>
          <p className="mt-6 text-foreground/85 leading-relaxed">
            Dear parents, students and well-wishers — it is my privilege to welcome you to Seth Chhoteylal
            Academy. Our school has, since its founding, stood for one simple promise: every child who
            walks through our doors will be educated with care, taught with rigour, and guided toward their
            best possible self.
          </p>
          <h3 className="mt-8 font-display text-xl font-semibold text-navy">A Foundation for Life</h3>
          <p className="mt-3 text-foreground/85 leading-relaxed">
            We believe education is far more than examinations. Through a strong CBSE curriculum, smart
            classrooms, well-equipped laboratories, and a vibrant sports and arts programme, we equip our
            students with both the knowledge and the confidence to step into the world.
          </p>
          <h3 className="mt-8 font-display text-xl font-semibold text-navy">Discipline, Compassion and Curiosity</h3>
          <p className="mt-3 text-foreground/85 leading-relaxed">
            Our students grow up valuing discipline and kindness in equal measure. We celebrate curiosity,
            encourage questions, and treat every mistake as a step toward mastery. Character is not taught
            in a single class — it is built into everything we do.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-display text-3xl font-bold text-navy text-center">Vision for the School</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visionCards.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl border border-border p-6 hover:border-teal hover:shadow-md transition">
                <Icon className="h-8 w-8 text-teal" />
                <h3 className="mt-4 font-display font-semibold text-navy">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy text-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-display text-3xl font-bold">A Word to Parents</h2>
          <p className="mt-4 text-white/85 leading-relaxed">
            You are our most important partners. Your trust, your involvement and your gentle encouragement
            at home shape the child we see in school each morning. We invite you to walk this journey
            alongside us — meet your child's teachers, attend our events, and stay close to their learning.
            Together, there is little we cannot achieve for them.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-muted-foreground">Sincerely,</p>
          <p className="mt-2 font-display text-2xl text-navy italic">Mrs. Asiya Bushra</p>
          <p className="text-sm text-muted-foreground">Principal, Seth Chhoteylal Academy</p>
        </div>
      </section>
    </Layout>
  );
}
