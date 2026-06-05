import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { Camera, Video, Building2, Play } from "lucide-react";
import aboutImg from "@/assets/about-students.jpg";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
  head: () => ({
    meta: [
      { title: "Gallery — Seth Chhoteylal Academy" },
      { name: "description", content: "Pictures, videos and campus moments from Seth Chhoteylal Academy." },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
});

const sections = [
  { id: "pictures", label: "Pictures", icon: Camera },
  { id: "videos", label: "Videos", icon: Video },
  { id: "campus", label: "Campus", icon: Building2 },
];

const pictures = [
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&q=80",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=80",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80",
  "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&q=80",
  "https://images.unsplash.com/photo-1497486751825-1233686f5d54?w=900&q=80",
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=900&q=80",
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=900&q=80",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=80",
];

const videos = [
  { title: "Annual Day Celebrations", thumb: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?w=900&q=80", duration: "3:24" },
  { title: "Science Exhibition", thumb: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=900&q=80", duration: "2:10" },
  { title: "Sports Day Highlights", thumb: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=900&q=80", duration: "4:05" },
  { title: "Republic Day Parade", thumb: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=900&q=80", duration: "5:30" },
  { title: "Cultural Program", thumb: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=900&q=80", duration: "6:18" },
  { title: "Graduation Ceremony", thumb: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=900&q=80", duration: "8:42" },
];

const campus = [
  { src: aboutImg, label: "Main Building" },
  { src: "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80", label: "Academic Block" },
  { src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80", label: "Library" },
  { src: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=1200&q=80", label: "Science Labs" },
  { src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80", label: "Playground" },
  { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200&q=80", label: "Smart Classroom" },
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
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-slate-600 hover:text-teal hover:bg-aqua-soft rounded-full transition"
            >
              <s.icon className="h-3.5 w-3.5" /> {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Gallery() {
  return (
    <Layout>
      <PageHeader title="Gallery" subtitle="A visual journey through life, learning and celebrations at our school." />
      <SectionNav />

      {/* PICTURES */}
      <section id="pictures" className="py-20 scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-teal text-xs font-semibold uppercase tracking-wider">
              <Camera className="h-4 w-4" /> Photo Album
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-navy">Pictures</h2>
            <p className="mt-3 text-slate-600">Moments captured from events, classrooms and everyday joy on campus.</p>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pictures.map((src, i) => (
              <div key={i} className="overflow-hidden rounded-2xl group bg-slate-100">
                <img
                  src={src}
                  alt={`Gallery picture ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover aspect-square group-hover:scale-105 transition duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEOS */}
      <section id="videos" className="bg-soft py-20 scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-teal text-xs font-semibold uppercase tracking-wider">
              <Video className="h-4 w-4" /> Watch
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-navy">Videos</h2>
            <p className="mt-3 text-slate-600">Relive highlights from celebrations, performances and special programs.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v, i) => (
              <button
                key={i}
                className="text-left bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-teal hover:shadow-xl hover-lift transition group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img src={v.thumb} alt={v.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-14 w-14 rounded-full bg-white/95 text-teal flex items-center justify-center shadow-xl group-hover:scale-110 transition">
                      <Play className="h-6 w-6 ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[11px] font-medium px-2 py-1 rounded-md">
                    {v.duration}
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-display font-semibold text-navy">{v.title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPUS */}
      <section id="campus" className="py-20 scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-teal text-xs font-semibold uppercase tracking-wider">
              <Building2 className="h-4 w-4" /> Our Campus
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-navy">Campus</h2>
            <p className="mt-3 text-slate-600">A safe, vibrant and well-equipped space designed to inspire learning.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {campus.map((c, i) => (
              <figure key={i} className="relative overflow-hidden rounded-2xl group">
                <img
                  src={c.src}
                  alt={c.label}
                  loading="lazy"
                  className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent text-white p-4 font-display font-semibold">
                  {c.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
