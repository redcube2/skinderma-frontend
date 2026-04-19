const items = [
  {
    title: "GMP certifikácia",
    desc: "Výroba podľa najprísnejších farmaceutických štandardov.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.6-1.4a9 9 0 11-17.2 0 9 9 0 0117.2 0z" />
      </svg>
    ),
  },
  {
    title: "Klinicky testované",
    desc: "Aktívne zložky s overenou účinnosťou a bezpečnosťou.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 3v5l-4 7a4 4 0 003.4 6h5.2A4 4 0 0018 15l-4-7V3m-4 0h4" />
      </svg>
    ),
  },
  {
    title: "50+ krajín",
    desc: "Distribúcia na všetkých kontinentoch – dôverujú nám profesionáli.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
      </svg>
    ),
  },
];

export default function USPSection() {
  return (
    <section className="container-page py-16 md:py-24">
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((i) => (
          <div
            key={i.title}
            className="flex items-start gap-4 rounded-2xl border border-cream-dark/60 bg-white p-6 shadow-sm"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-cream text-gold">
              {i.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-navy">{i.title}</h3>
              <p className="mt-1 text-sm text-brand-gray">{i.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
