import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { SCHOOL } from "@/lib/school";
import hero from "@/assets/hero-campus.jpg";
import aboutImg from "@/assets/about-students.jpg";
import principalImg from "@/assets/principal.jpg";
import { useEffect, useRef, useState } from "react";
import {
  GraduationCap, BookOpen, Trophy, Users, Beaker, Monitor, Library, Bus,
  Calendar, ArrowRight, Bell, Award, ShieldCheck, Sparkles, MessageSquare,
  ChevronDown, Quote, FileCheck2, ClipboardList, UserCheck, BadgeCheck, Building2,
  ChevronUp, Megaphone,
} from "lucide-react";

type NewsItem = { id: number; title: string; date: string; category: string };

const newsItems: NewsItem[] = [
  { id: 1, title: "Admissions Open for Session 2026–27", date: "May 20", category: "Admission" },
  { id: 2, title: "Khelo MP Youth Games 2026 — Registrations", date: "Feb 06", category: "Sports" },
  { id: 3, title: "Annual Result Declaration for Classes I–VIII", date: "May 10", category: "Result" },
  { id: 4, title: "Summer Vacation: May 25 – June 25", date: "Apr 28", category: "Notice" },
  { id: 5, title: "Science Fair & Robotics Expo 2026", date: "Mar 18", category: "Event" },
  { id: 6, title: "Parent–Teacher Meet Scheduled", date: "Mar 02", category: "Meeting" },
  { id: 7, title: "CBSE Board Toppers Felicitated", date: "Feb 22", category: "Achievement" },
];

function HeroNewsWidget() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const visible = 4;
  const total = newsItems.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 3500);
    return () => clearInterval(id);
  }, [paused, total]);

  const items = Array.from({ length: visible }, (_, k) => newsItems[(index + k) % total]);

  return (
    <div
      className="glass rounded-3xl p-5 shadow-2xl w-full max-w-sm animate-fade-up-delay-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-label="Latest news and notifications"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-teal text-white">
            <Megaphone className="h-4 w-4" />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-aqua animate-pulse" />
          </span>
          <h3 className="font-display font-bold text-navy text-sm">Latest News</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIndex((i) => (i - 1 + total) % total)}
            aria-label="Previous news"
            className="h-7 w-7 inline-flex items-center justify-center rounded-full bg-white/70 hover:bg-white text-navy transition"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIndex((i) => (i + 1) % total)}
            aria-label="Next news"
            className="h-7 w-7 inline-flex items-center justify-center rounded-full bg-white/70 hover:bg-white text-navy transition"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      <ul
        aria-live="polite"
        className="mt-4 space-y-2.5 overflow-hidden"
      >
        {items.map((n, i) => (
          <li
            key={`${n.id}-${index}-${i}`}
            className="flex items-start gap-3 rounded-xl bg-white/70 hover:bg-white p-2.5 transition animate-fade-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="shrink-0 rounded-lg bg-teal text-white text-[10px] font-semibold leading-tight px-2 py-1.5 text-center min-w-[44px]">
              {n.date}
            </div>
            <div className="min-w-0">
              <span className="inline-block text-[10px] uppercase tracking-wider font-semibold text-teal mb-0.5">
                {n.category}
              </span>
              <p className="text-[13px] text-navy font-medium leading-snug line-clamp-2">
                {n.title}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <Link
        to="/mpd"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy text-white text-xs font-semibold px-4 py-2.5 hover:bg-navy-dark transition"
      >
        View All News <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Seth Chhoteylal Academy — Senior Secondary CBSE School in Rath, Hamirpur" },
      { name: "description", content: "Official website of Seth Chhoteylal Academy, Rath — a CBSE-affiliated senior secondary school committed to excellence, discipline and holistic growth." },
      { property: "og:title", content: "Seth Chhoteylal Academy — Senior Secondary CBSE School" },
      { property: "og:description", content: "Excellence in Education. Empowering future leaders through knowledge, discipline and success." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const whyChoose = [
  { icon: Monitor, title: "Smart Classes", desc: "Interactive digital classrooms across every grade." },
  { icon: ShieldCheck, title: "Discipline", desc: "A safe campus rooted in respect and values." },
  { icon: Trophy, title: "Sports & Arts", desc: "Cricket, athletics, music, dance and creative clubs." },
  { icon: Sparkles, title: "Digital Learning", desc: "Modern labs and tech-enabled curriculum." },
];

const notices = [
  { date: "May 20, 2026", title: "Admissions Open for Session 2026–27", excerpt: "Limited seats for Nursery to Class XI. Apply early to secure your child's place." },
  { date: "May 10, 2026", title: "Annual Result Declaration", excerpt: "Results for classes I–VIII are now available. Visit the marksheet section." },
  { date: "Apr 28, 2026", title: "Summer Vacation Notice", excerpt: "School will remain closed from May 25 to June 25. Reopens June 26." },
];

const stats = [
  { value: 1200, suffix: "+", label: "Students" },
  { value: 60, suffix: "+", label: "Faculty Members" },
  { value: 150, suffix: "+", label: "Achievements" },
  { value: 5, suffix: " Acres", label: "Campus Size" },
];

const facilities = [
  { icon: Trophy, title: "Sports Facilities", desc: "Cricket, football, athletics and indoor games on a spacious campus." },
  { icon: Library, title: "Library", desc: "Thousands of books, periodicals and quiet reading zones." },
  { icon: Sparkles, title: "Robotics Lab", desc: "Hands-on STEM kits, robotics and coding for young innovators." },
  { icon: Beaker, title: "Science Lab", desc: "Modern Physics, Chemistry & Biology labs for experiment-led learning." },
  { icon: Monitor, title: "Computer Lab", desc: "High-speed internet, modern PCs and ICT curriculum across grades." },
  { icon: Bus, title: "Transport", desc: "Safe, GPS-tracked school buses covering nearby villages and towns." },
  { icon: ShieldCheck, title: "Safety & Surveillance", desc: "CCTV-monitored campus, trained staff and secure entry points." },
  { icon: Monitor, title: "Smart Classes", desc: "Interactive digital classrooms with audio-visual learning aids." },
  { icon: Building2, title: "Modern Infrastructure", desc: "Airy classrooms, clean washrooms and a green, child-friendly campus." },
];

const gallery = [
  { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&q=80", h: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80", h: "" },
  { src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=900&q=80", h: "" },
  { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=80", h: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=900&q=80", h: "" },
  { src: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=900&q=80", h: "" },
];

const steps = [
  { icon: ClipboardList, title: "Enquiry", desc: "Submit an enquiry form online or visit our office." },
  { icon: FileCheck2, title: "Apply", desc: "Fill the application with required documents." },
  { icon: UserCheck, title: "Verification", desc: "Interaction and document verification for parents & student." },
  { icon: BadgeCheck, title: "Admission", desc: "Fee submission and welcome to the SCA family." },
];

const testimonials = [
  { name: "Mrs. Anjali Sharma", role: "Parent — Class VII", quote: "The teachers genuinely care. My daughter has grown more confident and curious within a single year." },
  { name: "Rahul Yadav", role: "Alumnus, 2024 Batch", quote: "SCA gave me a strong academic base and the discipline I needed for competitive exams." },
  { name: "Mr. Ramesh Gupta", role: "Parent — Class X", quote: "Smart classes, well-equipped labs and regular updates from school — exactly what parents look for." },
];

const faqs = [
  { q: "What is the age criteria for admission to Nursery?", a: "A child must be 3 years old by 31st March of the academic session for Nursery admission." },
  { q: "Which board is the school affiliated to?", a: "Seth Chhoteylal Academy is affiliated to the Central Board of Secondary Education (CBSE), Delhi." },
  { q: "Do you offer transport facility?", a: "Yes, we operate a safe school bus service covering nearby villages and towns. Routes are available at the school office." },
  { q: "What documents are required for admission?", a: "Birth certificate, previous year mark sheet, transfer certificate (if applicable), Aadhaar card and recent photographs." },
  { q: "Are there scholarships for meritorious students?", a: "Yes, we honour merit through scholar badges and fee concessions for outstanding performers in academics and sports." },
];

function useCountUp(target: number, durationMs = 1400) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min(1, (now - start) / durationMs);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.4 });
    io.observe(node);
    return () => io.disconnect();
  }, [target, durationMs]);
  return { ref, value };
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: v } = useCountUp(value);
  return (
    <div className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold text-white">
        <span ref={ref}>{v.toLocaleString()}</span>
        <span className="text-aqua">{suffix}</span>
      </div>
      <div className="mt-2 text-sm text-white/80 uppercase tracking-wider">{label}</div>
    </div>
  );
}

function HeroEnquiryCard() {
  return (
    <div className="glass rounded-2xl p-6 shadow-2xl w-full max-w-sm animate-fade-up-delay-2">
      <p className="text-xs uppercase tracking-wider text-teal font-semibold">Quick Enquiry</p>
      <h3 className="mt-1 font-display text-xl font-bold text-navy">Admission 2026–27</h3>
      <form
        onSubmit={(e) => { e.preventDefault(); window.location.assign("/enquiry"); }}
        className="mt-4 space-y-3"
      >
        <input required maxLength={80} placeholder="Parent / Student name" className="w-full rounded-lg border border-slate-200 bg-white/80 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50" />
        <input required maxLength={10} inputMode="numeric" placeholder="Mobile number" className="w-full rounded-lg border border-slate-200 bg-white/80 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50" />
        <select required defaultValue="" className="w-full rounded-lg border border-slate-200 bg-white/80 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50">
          <option value="" disabled>Class interested in…</option>
          {["Nursery","LKG","UKG","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"].map(c => <option key={c}>{c}</option>)}
        </select>
        <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-teal text-white font-semibold rounded-lg px-4 py-2.5 hover:bg-teal-dark transition shadow-md shadow-teal/30">
          Request Callback <ArrowRight className="h-4 w-4" />
        </button>
      </form>
      <p className="mt-3 text-[11px] text-slate-500 text-center">We respond within 24 hours · No spam, ever.</p>
    </div>
  );
}

function FAQItem({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between text-left px-5 py-4 hover:bg-aqua-soft transition">
        <span className="font-semibold text-navy text-sm md:text-base pr-4">{q}</span>
        <ChevronDown className={`h-5 w-5 text-teal shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [tIdx, setTIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTIdx(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img src={hero} alt="Students of Seth Chhoteylal Academy on campus" width={1600} height={900} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/90 via-[#0F766E]/75 to-[#0F172A]/60" />
        {/* floating shapes */}
        <div className="absolute top-20 right-10 h-32 w-32 rounded-full bg-aqua/20 blur-2xl animate-float" />
        <div className="absolute bottom-16 left-10 h-44 w-44 rounded-full bg-teal/30 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28 lg:py-32 grid gap-10 lg:grid-cols-[1.4fr_1fr] items-center">
          <div className="text-white">
            <p className="inline-flex items-center gap-2 glass-dark text-white font-semibold text-xs uppercase tracking-wider px-3 py-1.5 rounded-full animate-fade-up">
              <Sparkles className="h-3.5 w-3.5 text-aqua" /> CBSE • Senior Secondary
            </p>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] animate-fade-up-delay-1">
              Where every child <span className="text-aqua">discovers</span> their potential.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/90 max-w-xl animate-fade-up-delay-2 leading-relaxed">
              {SCHOOL.name} — a CBSE-affiliated senior secondary school in Rath, Hamirpur. Knowledge, discipline and holistic growth, in one trusted institution.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 animate-fade-up-delay-3">
              <Link to="/enquiry" className="group inline-flex items-center gap-2 bg-teal text-white font-semibold rounded-full px-6 py-3 hover:bg-teal-dark transition shadow-lg shadow-teal/30">
                Admission Enquiry <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 glass-dark text-white border border-white/30 rounded-full px-6 py-3 hover:bg-white/15 transition font-medium">
                Discover the School
              </Link>
            </div>
          </div>
          <div className="justify-self-center lg:justify-self-end w-full max-w-sm space-y-5">
            <HeroEnquiryCard />
            <HeroNewsWidget />
          </div>
        </div>
      </section>

      {/* ABOUT SNAPSHOT */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <p className="text-teal font-semibold uppercase text-xs tracking-[0.18em]">About Our School</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-navy leading-tight">A school built on values, designed for the future.</h2>
            <p className="mt-5 text-slate-600 leading-relaxed">
              Seth Chhoteylal Academy is a CBSE-affiliated senior secondary school in Rath, Hamirpur,
              dedicated to nurturing curious minds from Nursery through Class XII. We blend rigorous
              academics with sports, arts and life-skills — so every student grows into a confident,
              kind and capable young adult.
            </p>
            <div className="mt-7 grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border-t-4 border-teal shadow-md p-5 hover-lift">
                <Award className="h-7 w-7 text-teal" />
                <div className="mt-2 font-display font-semibold text-navy">Academic Excellence</div>
                <p className="mt-1 text-xs text-slate-500">Consistent CBSE results and merit honours.</p>
              </div>
              <div className="bg-white rounded-2xl border-t-4 border-teal shadow-md p-5 hover-lift">
                <Users className="h-7 w-7 text-teal" />
                <div className="mt-2 font-display font-semibold text-navy">Caring Faculty</div>
                <p className="mt-1 text-xs text-slate-500">Qualified teachers who know every student.</p>
              </div>
            </div>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-teal font-semibold hover:gap-3 transition-all">
              Learn more about us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-teal opacity-15 blur-2xl rounded-3xl" />
            <img src={aboutImg} alt="Teacher engaging with students in a classroom" loading="lazy" className="relative rounded-3xl shadow-2xl object-cover w-full" />
            <div className="absolute -bottom-6 -left-6 hidden sm:block bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="font-display font-bold text-2xl text-teal">25+</div>
              <div className="text-xs text-slate-500">Years of Trust</div>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPAL MESSAGE */}
      <section className="bg-aqua-soft py-16 md:py-24 relative overflow-hidden">
        <Quote className="absolute -top-6 -left-6 h-48 w-48 text-teal/10" />
        <div className="mx-auto max-w-7xl px-4 grid gap-12 lg:grid-cols-[360px_1fr] items-center">
          <div className="relative justify-self-center lg:justify-self-start">
            <div className="absolute -inset-3 bg-gradient-teal-slate rounded-3xl rotate-3" />
            <img src={principalImg} alt="Mrs. Asiya Bushra, Principal" loading="lazy" className="relative rounded-3xl shadow-2xl object-cover w-full max-w-xs" />
          </div>
          <div>
            <p className="text-teal font-semibold uppercase text-xs tracking-[0.18em]">From the Principal's Desk</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-navy">Mrs. Asiya Bushra</h2>
            <p className="text-slate-500 text-sm mt-1">Principal, Seth Chhoteylal Academy</p>
            <blockquote className="mt-6 text-slate-700 leading-relaxed text-lg italic border-l-4 border-teal pl-5">
              "Education is not the filling of a pail, but the lighting of a fire. We strive to ignite curiosity
              in every child — building confident learners who will lead with compassion and integrity."
            </blockquote>
            <Link to="/mpd" className="mt-7 inline-flex items-center gap-2 bg-teal text-white rounded-full px-6 py-3 hover:bg-teal-dark transition font-semibold shadow-md shadow-teal/25">
              Read Full Message <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-teal font-semibold uppercase text-xs tracking-[0.18em]">Why Choose Us</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-navy">A learning experience that stands apart.</h2>
            <p className="mt-4 text-slate-600">Four pillars that shape every Seth Chhoteylal Academy student.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group relative bg-aqua-soft rounded-2xl p-7 border border-aqua/40 hover-lift overflow-hidden">
                <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-teal/10 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative inline-flex items-center justify-center h-14 w-14 rounded-xl bg-white shadow-md text-teal group-hover:bg-teal group-hover:text-white transition-colors">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="relative mt-5 font-display font-bold text-navy text-lg">{title}</h3>
                <p className="relative mt-2 text-sm text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="relative bg-gradient-teal-slate py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative mx-auto max-w-7xl px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(s => <Stat key={s.label} {...s} />)}
        </div>
      </section>

      {/* NOTICES */}
      <section className="bg-soft py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-teal font-semibold uppercase text-xs tracking-[0.18em]">Latest Updates</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-navy">News & Announcements</h2>
            </div>
            <Link to="/" className="text-sm font-semibold text-teal hover:underline inline-flex items-center gap-1">
              <Bell className="h-4 w-4" /> View all notices
            </Link>
          </div>
          <div className="mt-10 relative pl-6 md:pl-0">
            <div className="absolute left-2 md:hidden top-0 bottom-0 w-px bg-aqua" />
            <div className="grid gap-6 md:grid-cols-3">
              {notices.map((n) => (
                <article key={n.title} className="relative bg-white rounded-2xl border border-slate-200 p-6 hover:border-teal hover:shadow-xl hover-lift transition">
                  <span className="md:hidden absolute -left-[26px] top-7 h-3 w-3 rounded-full bg-teal ring-4 ring-aqua/40" />
                  <div className="inline-flex items-center gap-2 text-[11px] font-bold text-white bg-teal rounded-full px-3 py-1">
                    <Calendar className="h-3 w-3" /> {n.date}
                  </div>
                  <h3 className="mt-4 font-display font-semibold text-navy text-lg leading-snug">{n.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{n.excerpt}</p>
                  <a href="#" className="mt-4 inline-flex text-sm font-semibold text-teal hover:gap-2 gap-1 items-center transition-all">Read more <ArrowRight className="h-3.5 w-3.5" /></a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-teal font-semibold uppercase text-xs tracking-[0.18em]">Campus & Facilities</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-navy">A learning environment built for curiosity.</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-teal hover-lift overflow-hidden">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-aqua-soft text-teal group-hover:bg-teal group-hover:text-white transition">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display font-semibold text-navy text-lg">{title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY (Masonry) */}
      <section className="bg-aqua-soft py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-teal font-semibold uppercase text-xs tracking-[0.18em]">Media & Gallery</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-navy">Glimpses of school life.</h2>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] gap-4">
            {gallery.map((g, i) => (
              <div key={i} className={`relative overflow-hidden rounded-2xl group ${g.h}`}>
                <img src={g.src} loading="lazy" alt={`School moment ${i + 1}`} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADMISSION PROCESS */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-teal font-semibold uppercase text-xs tracking-[0.18em]">Admission Process</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-navy">Four simple steps to join us.</h2>
          </div>
          <div className="mt-14 relative">
            <div className="hidden md:block absolute top-7 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-teal via-aqua to-teal" />
            <div className="grid gap-10 md:grid-cols-4">
              {steps.map(({ icon: Icon, title, desc }, i) => (
                <div key={title} className="relative text-center">
                  <div className="relative mx-auto h-14 w-14 rounded-full bg-teal text-white flex items-center justify-center shadow-lg shadow-teal/30 z-10">
                    <Icon className="h-6 w-6" />
                    <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white text-teal text-xs font-bold flex items-center justify-center border-2 border-teal">{i + 1}</span>
                  </div>
                  <h3 className="mt-5 font-display font-bold text-navy">{title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-xs mx-auto">{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link to="/enquiry" className="inline-flex items-center gap-2 bg-teal text-white font-semibold rounded-full px-7 py-3 hover:bg-teal-dark transition shadow-lg shadow-teal/25">
              Start Your Enquiry <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative bg-gradient-teal-slate py-16 md:py-24 overflow-hidden">
        <Building2 className="absolute top-10 right-10 h-40 w-40 text-white/5" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <p className="text-aqua font-semibold uppercase text-xs tracking-[0.18em]">Testimonials</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-white">What parents & students say.</h2>

          <div className="mt-12 relative h-56">
            {testimonials.map((t, i) => (
              <div key={t.name} className={`absolute inset-0 transition-all duration-700 ${i === tIdx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
                <div className="glass-dark rounded-2xl p-8 max-w-2xl mx-auto">
                  <Quote className="h-8 w-8 text-aqua mx-auto" />
                  <p className="mt-4 text-white/95 text-lg leading-relaxed italic">"{t.quote}"</p>
                  <div className="mt-5 font-display font-bold text-white">{t.name}</div>
                  <div className="text-aqua text-sm">{t.role}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button key={i} aria-label={`Show testimonial ${i + 1}`} onClick={() => setTIdx(i)} className={`h-2 rounded-full transition-all ${i === tIdx ? "w-8 bg-aqua" : "w-2 bg-white/40 hover:bg-white/70"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center">
            <p className="text-teal font-semibold uppercase text-xs tracking-[0.18em]">Have Questions?</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-navy">Frequently Asked Questions</h2>
          </div>
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => <FAQItem key={f.q} {...f} defaultOpen={i === 0} />)}
          </div>
          <div className="mt-10 text-center text-sm text-slate-600">
            Still have questions? <Link to="/contact" className="text-teal font-semibold hover:underline">Get in touch with us</Link>.
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-aqua-soft py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 rounded-3xl bg-gradient-teal-slate p-8 md:p-12 grid md:grid-cols-[1fr_auto] items-center gap-6 shadow-2xl shadow-teal/20">
          <div className="text-white">
            <h3 className="font-display text-2xl md:text-3xl font-bold">Ready to give your child the best?</h3>
            <p className="mt-2 text-white/85">Admissions for Session 2026–27 are now open. Limited seats — apply today.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/enquiry" className="inline-flex items-center gap-2 bg-white text-teal font-bold rounded-full px-6 py-3 hover:bg-aqua transition">
              <GraduationCap className="h-4 w-4" /> Apply Now
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 rounded-full px-6 py-3 hover:bg-white/20 transition font-semibold">
              <MessageSquare className="h-4 w-4" /> Contact
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
