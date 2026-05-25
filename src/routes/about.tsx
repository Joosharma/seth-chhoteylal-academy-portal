import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import aboutImg from "@/assets/about-students.jpg";
import { Eye, Target, Shield, Heart, Lightbulb, Award, Users, Clock } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Seth Chhoteylal Academy" },
      { name: "description", content: "Learn about Seth Chhoteylal Academy — our vision, mission, core values, facilities and faculty in Rath, Hamirpur." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

const values = [
  { icon: Shield, title: "Integrity" },
  { icon: Heart, title: "Respect" },
  { icon: Award, title: "Leadership" },
  { icon: Target, title: "Discipline" },
  { icon: Lightbulb, title: "Creativity" },
];

const facilities = [
  { title: "Library", desc: "A growing collection of academic and reference books, periodicals and digital resources." },
  { title: "Science Labs", desc: "Well-equipped Physics, Chemistry and Biology labs for hands-on learning." },
  { title: "Smart Classes", desc: "Interactive smart boards across grades to make every lesson engaging." },
  { title: "Sports Facilities", desc: "Playground for cricket, football, kabaddi and indoor games." },
  { title: "Transport", desc: "Safe school bus service covering nearby villages and towns." },
  { title: "Computer Lab", desc: "Modern computers with internet access for digital literacy." },
];

const faculty = [
  { name: "Mrs. Asiya Bushra", role: "Principal" },
  { name: "Mr. R. K. Sharma", role: "Vice Principal" },
  { name: "Mrs. Neha Verma", role: "English Department" },
  { name: "Mr. Anil Kumar", role: "Mathematics Department" },
];

function About() {
  return (
    <Layout>
      <PageHeader title="About Our School" subtitle="A senior secondary CBSE school nurturing students from Nursery to Class XII." />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 grid gap-10 md:grid-cols-2 items-center">
          <img src={aboutImg} alt="Students in classroom" loading="lazy" className="rounded-2xl shadow-lg object-cover" width={1200} height={900} />
          <div>
            <h2 className="font-display text-3xl font-bold text-navy">Our Story</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Seth Chhoteylal Academy was founded with a simple belief — that every child deserves the
              opportunity to discover their potential. Over the years, we have grown into a vibrant
              CBSE-affiliated senior secondary school in Rath, Hamirpur, serving students from Nursery
              all the way through Class XII.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our academic vision is grounded in the conviction that great schools build great citizens.
              We focus on strong fundamentals, character, creativity and a love of learning that lasts a
              lifetime.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-soft py-16">
        <div className="mx-auto max-w-7xl px-4 grid gap-10 md:grid-cols-2">
          <div className="bg-white rounded-2xl p-8 border border-border">
            <div className="flex items-center gap-3 text-teal"><Eye className="h-6 w-6" /><h2 className="font-display text-2xl font-bold text-navy">Our Vision</h2></div>
            <ul className="mt-4 space-y-2 text-muted-foreground list-disc pl-5">
              <li>Be a school known for academic excellence and strong character.</li>
              <li>Nurture confident, compassionate, lifelong learners.</li>
              <li>Stay rooted in our community while opening doors to the wider world.</li>
              <li>Lead with discipline, creativity and innovation.</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-border">
            <div className="flex items-center gap-3 text-teal"><Target className="h-6 w-6" /><h2 className="font-display text-2xl font-bold text-navy">Our Mission</h2></div>
            <ul className="mt-4 space-y-2 text-muted-foreground list-disc pl-5">
              <li>Cultivate discipline and strong values in every student.</li>
              <li>Deliver quality CBSE education with caring, qualified teachers.</li>
              <li>Build character through service, sport and the arts.</li>
              <li>Encourage innovation, curiosity and independent thinking.</li>
              <li>Contribute meaningfully to our community.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-display text-3xl font-bold text-navy text-center">Core Values</h2>
          <div className="mt-10 grid gap-5 grid-cols-2 md:grid-cols-5">
            {values.map(({ icon: Icon, title }) => (
              <div key={title} className="bg-white rounded-xl border border-border p-6 text-center hover:border-teal hover:shadow-md transition">
                <Icon className="h-8 w-8 mx-auto text-teal" />
                <div className="mt-3 font-display font-semibold text-navy">{title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-soft py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-display text-3xl font-bold text-navy">Our Facilities</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-border p-6">
                <h3 className="font-display font-semibold text-navy text-lg">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-3"><Users className="h-7 w-7 text-teal" /><h2 className="font-display text-3xl font-bold text-navy">Faculty & Staff</h2></div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {faculty.map((p) => (
              <div key={p.name} className="bg-white rounded-xl border border-border p-6 text-center hover:shadow-md transition">
                <div className="mx-auto h-24 w-24 rounded-full bg-teal/20 flex items-center justify-center text-navy font-display font-bold text-2xl">
                  {p.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                </div>
                <div className="mt-4 font-display font-semibold text-navy">{p.name}</div>
                <div className="text-sm text-muted-foreground">{p.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy text-white py-16">
        <div className="mx-auto max-w-7xl px-4 grid gap-8 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-3"><Clock className="h-6 w-6 text-teal" /><h2 className="font-display text-2xl font-bold">School Timings</h2></div>
            <p className="mt-3 text-white/85">8:00 AM – 2:00 PM (Monday to Saturday)</p>
            <p className="mt-1 text-white/70 text-sm">Office hours: 9:00 AM – 4:00 PM</p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold">Rules & Discipline</h2>
            <ul className="mt-3 space-y-1.5 text-white/85 list-disc pl-5 text-sm">
              <li>Students must wear the prescribed uniform with ID card.</li>
              <li>Punctuality, respect and good behaviour are expected at all times.</li>
              <li>Mobile phones are not permitted on campus.</li>
              <li>Parents are encouraged to maintain regular communication with class teachers.</li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
