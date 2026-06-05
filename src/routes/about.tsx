import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import aboutImg from "@/assets/about-students.jpg";
import { Quote, GraduationCap, Building2, Users, BookOpen, FlaskConical, Monitor, Trophy, Bus, Library, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Seth Chhoteylal Academy" },
      { name: "description", content: "Principal's message, Manager's message, campus pictures, faculty and facilities at Seth Chhoteylal Academy, Rath, Hamirpur." },
      { property: "og:title", content: "About — Seth Chhoteylal Academy" },
      { property: "og:description", content: "Discover our leadership, vision, faculty and world-class facilities." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

const sections = [
  { id: "principal-message", label: "Principal Message" },
  { id: "manager-message", label: "Manager Message" },
  { id: "our-picture", label: "Our Picture" },
  { id: "facilities-faculty", label: "Facilities & Faculty" },
];

const gallery = [
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
  "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80",
  "https://images.unsplash.com/photo-1497486751825-1233686f5d54?w=800&q=80",
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80",
];

const facilities = [
  { icon: Library, title: "Library", desc: "Curated collection of academic books, periodicals & digital references." },
  { icon: FlaskConical, title: "Science Labs", desc: "Well-equipped Physics, Chemistry & Biology labs for hands-on learning." },
  { icon: Monitor, title: "Smart Classes", desc: "Interactive smart boards across grades to make every lesson engaging." },
  { icon: Trophy, title: "Sports", desc: "Playgrounds for cricket, football, kabaddi and structured indoor games." },
  { icon: Bus, title: "Transport", desc: "Safe school bus service covering nearby villages and towns." },
  { icon: BookOpen, title: "Computer Lab", desc: "Modern computers with internet access for digital literacy." },
];

const faculty = [
  { name: "Mrs. Asiya Bushra", role: "Principal" },
  { name: "Mr. R. K. Sharma", role: "Vice Principal" },
  { name: "Mrs. Neha Verma", role: "English Department" },
  { name: "Mr. Anil Kumar", role: "Mathematics Department" },
];

function SectionNav() {
  return (
    <div className="sticky top-16 z-30 bg-white/85 backdrop-blur-md border-b border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex gap-1 overflow-x-auto py-2 no-scrollbar">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 px-4 py-2 text-[13px] font-medium text-slate-600 hover:text-teal hover:bg-aqua-soft rounded-full transition whitespace-nowrap"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <Layout>
      <PageHeader title="About Our School" subtitle="A senior secondary CBSE school nurturing students from Nursery to Class XII." />
      <SectionNav />

      {/* PRINCIPAL MESSAGE */}
      <section id="principal-message" className="py-20 scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4 grid gap-12 lg:grid-cols-[400px_1fr] items-start">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-teal-slate rounded-3xl opacity-10 blur-2xl" />
            <div className="relative bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
              <div className="aspect-[4/5] bg-gradient-teal-slate flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="mx-auto h-32 w-32 rounded-full bg-white/15 backdrop-blur flex items-center justify-center font-display text-4xl font-bold">
                    AB
                  </div>
                  <div className="mt-5 font-display text-xl font-bold">Mrs. Asiya Bushra</div>
                  <div className="text-white/80 text-sm">Principal</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-teal text-xs font-semibold uppercase tracking-wider">
              <GraduationCap className="h-4 w-4" /> Principal's Desk
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-navy">A message from our Principal</h2>
            <Quote className="mt-6 h-10 w-10 text-teal/30" />
            <div className="space-y-4 text-slate-700 leading-relaxed mt-2">
              <p>
                Education at Seth Chhoteylal Academy is more than academic instruction — it is the
                careful shaping of character, curiosity, and confidence. We believe every child carries
                a unique spark; our role is to fan that spark into a steady flame.
              </p>
              <p>
                Our teachers bring warmth and discipline in equal measure. Our classrooms encourage
                questions over answers, and our campus celebrates effort as much as achievement.
              </p>
              <p>
                I invite parents to walk alongside us. Together we can raise students who are
                academically strong, socially responsible and morally grounded.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-200 font-display">
              <div className="text-navy font-bold">Mrs. Asiya Bushra</div>
              <div className="text-sm text-slate-500">Principal, Seth Chhoteylal Academy</div>
            </div>
          </div>
        </div>
      </section>

      {/* MANAGER MESSAGE */}
      <section id="manager-message" className="bg-soft py-20 scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4 grid gap-12 lg:grid-cols-[1fr_400px] items-start">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 text-teal text-xs font-semibold uppercase tracking-wider">
              <Building2 className="h-4 w-4" /> Manager's Desk
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-navy">A message from our Manager</h2>
            <Quote className="mt-6 h-10 w-10 text-teal/30" />
            <div className="space-y-4 text-slate-700 leading-relaxed mt-2">
              <p>
                Seth Chhoteylal Academy was founded with a vision to bring quality CBSE education to
                the heart of Rath, Hamirpur. From a modest beginning, we have grown into an institution
                that families across the region trust with their children's future.
              </p>
              <p>
                We continually invest in our infrastructure, faculty development and student welfare —
                because a great school is built one classroom, one teacher and one student at a time.
              </p>
              <p>
                Thank you for considering us as partners in your child's growth. We promise to honour
                that trust every single day.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-200 font-display">
              <div className="text-navy font-bold">Shri Ram Avtar</div>
              <div className="text-sm text-slate-500">Manager, Seth Chhoteylal Academy</div>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="absolute -inset-4 bg-gradient-teal rounded-3xl opacity-10 blur-2xl" />
            <div className="relative bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
              <div className="aspect-[4/5] bg-gradient-teal flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="mx-auto h-32 w-32 rounded-full bg-white/15 backdrop-blur flex items-center justify-center font-display text-4xl font-bold">
                    RA
                  </div>
                  <div className="mt-5 font-display text-xl font-bold">Shri Ram Avtar</div>
                  <div className="text-white/80 text-sm">Manager</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR PICTURE */}
      <section id="our-picture" className="py-20 scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-teal text-xs font-semibold uppercase tracking-wider">
              Campus Gallery
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-navy">Our Picture</h2>
            <p className="mt-4 text-slate-600">
              A glimpse into life at Seth Chhoteylal Academy — classrooms buzzing with curiosity,
              corridors filled with laughter, and a campus that feels like home.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="md:row-span-2 md:col-span-1">
              <img src={aboutImg} alt="School campus" className="w-full h-full object-cover rounded-2xl aspect-square md:aspect-auto" />
            </div>
            {gallery.map((src, i) => (
              <div key={i} className="overflow-hidden rounded-2xl group">
                <img
                  src={src}
                  alt={`Campus moment ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover aspect-square group-hover:scale-105 transition duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FACILITIES & FACULTY */}
      <section id="facilities-faculty" className="bg-soft py-20 scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-teal text-xs font-semibold uppercase tracking-wider">
              Our Strength
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-navy">Facilities & Faculty</h2>
            <p className="mt-4 text-slate-600">
              Modern infrastructure paired with dedicated educators — the foundation on which our
              students build their future.
            </p>
          </div>

          <h3 className="mt-14 font-display text-xl font-bold text-navy">Facilities</h3>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-teal hover:shadow-lg hover-lift transition">
                <div className="h-11 w-11 rounded-xl bg-aqua-soft text-teal flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="mt-4 font-display font-semibold text-navy">{title}</h4>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex items-center gap-3">
            <Users className="h-6 w-6 text-teal" />
            <h3 className="font-display text-xl font-bold text-navy">Faculty</h3>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {faculty.map((p) => (
              <div key={p.name} className="bg-white rounded-2xl border border-slate-200 p-6 text-center hover:shadow-lg hover-lift transition">
                <div className="mx-auto h-20 w-20 rounded-full bg-gradient-teal-slate flex items-center justify-center text-white font-display font-bold text-xl">
                  {p.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                </div>
                <div className="mt-4 font-display font-semibold text-navy">{p.name}</div>
                <div className="text-sm text-slate-500">{p.role}</div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/enquiry"
              className="inline-flex items-center gap-2 bg-teal text-white font-semibold rounded-full px-6 py-3 hover:bg-teal-dark transition shadow-md shadow-teal/20"
            >
              Visit our campus <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
