export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-teal-slate text-white">
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-aqua/30 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-teal/40 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        <h1 className="font-display text-3xl md:text-5xl font-bold animate-fade-up">{title}</h1>
        {subtitle && <p className="mt-3 text-white/85 max-w-2xl animate-fade-up-delay-1">{subtitle}</p>}
      </div>
    </section>
  );
}
