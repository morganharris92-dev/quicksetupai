export default function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-midnight">{title}</h2>
          {subtitle && <p className="mt-3 text-slate-600 max-w-2xl">{subtitle}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
