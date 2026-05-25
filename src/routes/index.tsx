import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { SCHOOL } from "@/lib/school";
import hero from "@/assets/hero-campus.jpg";
import aboutImg from "@/assets/about-students.jpg";
import principalImg from "@/assets/principal.jpg";
import {
  GraduationCap, BookOpen, Trophy, Users, Beaker, Monitor, Library, Bus, Sparkles,
  Calendar, ArrowRight, Bell, ImageIcon, Award,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Seth Chhoteylal Academy — Senior Secondary CBSE School in Rath, Hamirpur" },
      { name: "description", content: "Official website of Seth Chhoteylal Academy, Rath — a CBSE-affiliated senior secondary school committed to excellence in education, discipline and holistic growth." },
      { property: "og:title", content: "Seth Chhoteylal Academy — Senior Secondary CBSE School" },
      { property: "og:description", content: "Excellence in Education. Empowering future leaders through knowledge, discipline and success." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const highlights = [
  { icon: GraduationCap, title: "Academics", desc: "CBSE curriculum from Nursery to XII with strong fundamentals." },
  { icon: Sparkles, title: "Facilities", desc: "Smart classes, well-equipped labs and a rich library." },
  { icon: Trophy, title: "Sports & Arts", desc: "Annual sports day, music, dance and creative clubs." },
  { icon: Award, title: "Achievements", desc: "Consistent results, scholar badges and merit honours." },
  { icon: Users, title: "Discipline & Values", desc: "Character first — respect, integrity and responsibility." },
  { icon: BookOpen, title: "Holistic Growth", desc: "Mind, body and character developed in equal measure." },
];

const facilities = [
  { icon: Monitor, title: "Smart Classes", desc: "Interactive digital classrooms for every grade." },
  { icon: Monitor, title: "Computer Lab", desc: "Modern computer lab with high-speed internet." },
  { icon: Library, title: "Library", desc: "Thousands of books, periodicals and reference material." },
  { icon: Trophy, title: "Sports Ground", desc: "Spacious playground for cricket, football & athletics." },
  { icon: Beaker, title: "Science Labs", desc: "Physics, Chemistry and Biology with proper equipment." },
  { icon: Bus, title: "Transportation", desc: "Safe school bus service covering nearby routes." },
];

const notices = [
  { date: "May 20, 2026", title: "Admissions Open for Session 2026–27", excerpt: "Limited seats for Nursery to Class XI. Apply early to secure your child's place." },
  { date: "May 10, 2026", title: "Annual Result Declaration", excerpt: "Results for classes I–VIII are now available. Visit the marksheet section." },
  { date: "Apr 28, 2026", title: "Summer Vacation Notice", excerpt: "School will remain closed from May 25 to June 25. Reopens June 26." },
];

const quickLinks = [
  { to: "/enquiry", label: "Admissions", icon: GraduationCap },
  { to: "/mpd", label: "Principal's Desk", icon: BookOpen },
  { to: "/", label: "News & Events", icon: Bell },
  { to: "/marksheet", label: "Marksheet Download", icon: Award },
];

const gallery = [
  "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
  "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80",
];

function Home() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={hero}
          alt="Students of Seth Chhoteylal Academy on campus"
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1E4F]/95 via-[#0A1E4F]/80 to-[#0A1E4F]/40" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-36 text-white">
          <p className="inline-block bg-teal/90 text-navy font-semibold text-xs uppercase tracking-wider px-3 py-1 rounded-full animate-fade-up">
            CBSE • Senior Secondary
          </p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight max-w-3xl animate-fade-up-delay-1">
            {SCHOOL.name}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-white/85 max-w-2xl animate-fade-up-delay-2">
            Excellence in Education · Empowering Future Leaders · Knowledge, Discipline, Success.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 animate-fade-up-delay-3">
            <Link to="/enquiry" className="inline-flex items-center gap-2 bg-teal text-navy font-semibold rounded-md px-5 py-3 hover:bg-white transition">
              Admission Enquiry <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 rounded-md px-5 py-3 hover:bg-white/20 transition">
              Contact Us
            </Link>
            <Link to="/marksheet" className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 rounded-md px-5 py-3 hover:bg-white/20 transition">
              Download Marksheet
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT SNAPSHOT */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">A school built on values</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Seth Chhoteylal Academy is a CBSE-affiliated senior secondary school in Rath, Hamirpur,
              dedicated to nurturing curious minds from Nursery through Class XII. We blend a rigorous
              academic foundation with sports, arts and life-skills so every student grows into a confident,
              kind and capable young adult.
            </p>
            <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-teal font-semibold hover:gap-3 transition-all">
              Learn more about us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <img src={aboutImg} alt="Teacher engaging with students in a classroom" width={1200} height={900} loading="lazy" className="rounded-2xl shadow-lg object-cover" />
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="bg-soft py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">Key Highlights</h2>
            <p className="mt-3 text-muted-foreground">What makes a Seth Chhoteylal Academy education distinct.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-teal/15 text-teal group-hover:bg-teal group-hover:text-navy transition">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display font-semibold text-navy text-lg">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickLinks.map(({ to, label, icon: Icon }) => (
              <Link key={label} to={to} className="flex flex-col items-center justify-center text-center gap-2 bg-navy text-white rounded-xl py-6 px-4 hover:bg-teal hover:text-navy transition">
                <Icon className="h-7 w-7" />
                <span className="font-semibold text-sm">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPAL PREVIEW */}
      <section className="bg-soft py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 grid gap-10 md:grid-cols-[300px_1fr] items-center">
          <img src={principalImg} alt="Mrs. Asiya Bushra, Principal" width={800} height={1000} loading="lazy" className="rounded-2xl shadow-lg object-cover w-full max-w-xs justify-self-center" />
          <div>
            <p className="text-teal font-semibold uppercase text-xs tracking-wider">From the Principal's Desk</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-navy">Mrs. Asiya Bushra</h2>
            <p className="text-muted-foreground text-sm mt-1">Principal, Seth Chhoteylal Academy</p>
            <p className="mt-5 text-foreground/80 leading-relaxed">
              "Education is not the filling of a pail, but the lighting of a fire. At our academy, we strive
              to ignite curiosity in every child, building confident learners who will lead with compassion
              and integrity in the years to come."
            </p>
            <Link to="/mpd" className="mt-6 inline-flex items-center gap-2 bg-navy text-white rounded-md px-5 py-2.5 hover:bg-teal hover:text-navy transition font-medium">
              Read Full Message <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">News & Announcements</h2>
              <p className="mt-2 text-muted-foreground">Stay updated with notices, events and admissions.</p>
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {notices.map((n) => (
              <article key={n.title} className="rounded-xl border border-border p-6 hover:border-teal hover:shadow-md transition">
                <div className="flex items-center gap-2 text-xs text-teal font-semibold">
                  <Calendar className="h-3.5 w-3.5" /> {n.date}
                </div>
                <h3 className="mt-3 font-display font-semibold text-navy text-lg">{n.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
                <a href="#" className="mt-4 inline-flex text-sm font-semibold text-teal hover:underline">Read more →</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-soft py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">Glimpses of School Life</h2>
            <p className="mt-3 text-muted-foreground">From annual functions to sports day — moments that define us.</p>
          </div>
          <div className="mt-10 grid gap-3 grid-cols-2 md:grid-cols-3">
            {gallery.map((src, i) => (
              <div key={i} className="overflow-hidden rounded-xl aspect-[4/3] bg-navy/10">
                <img src={src} loading="lazy" alt={`School event photo ${i + 1}`} className="h-full w-full object-cover hover:scale-105 transition duration-500" />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="#" className="inline-flex items-center gap-2 text-teal font-semibold hover:gap-3 transition-all">
              <ImageIcon className="h-4 w-4" /> View more photos
            </a>
          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">Facilities</h2>
            <p className="mt-3 text-muted-foreground">A learning environment built for curiosity.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-soft rounded-xl p-6 border border-border hover:border-teal transition">
                <Icon className="h-7 w-7 text-teal" />
                <h3 className="mt-3 font-display font-semibold text-navy">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
