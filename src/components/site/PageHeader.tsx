export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <h1 className="font-display text-3xl md:text-5xl font-bold animate-fade-up">{title}</h1>
        {subtitle && <p className="mt-3 text-white/80 max-w-2xl animate-fade-up-delay-1">{subtitle}</p>}
      </div>
    </section>
  );
}
