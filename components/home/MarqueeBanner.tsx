const ITEMS = [
  "GMP Certified",
  "50+ Krajín",
  "Farmaceutická kvalita",
  "Klinicky testované",
  "Profesionálna formulácia",
  "Medicínska kozmetika",
];

export default function MarqueeBanner() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-y border-[#222] bg-black py-4">
      <div className="flex whitespace-nowrap will-change-transform [animation:marquee_30s_linear_infinite]">
        {loop.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-12 px-12 text-[11px] uppercase tracking-[0.3em] text-[#646467]"
          >
            {t}
            <span className="text-[#333]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
