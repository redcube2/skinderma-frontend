const items = [
  {
    label: "GMP Certified",
    title: "GMP certifikácia",
    desc: "Všetky produkty spĺňajú prísne GMP normy farmaceutickej výroby.",
  },
  {
    label: "Clinically Tested",
    title: "Klinicky testované",
    desc: "Každá formula je overená dermatológmi a klinickými štúdiami.",
  },
  {
    label: "50+ Countries",
    title: "Globálna sieť",
    desc: "Medzinárodná sieť distribútorov vo viac ako 50 krajinách sveta.",
  },
];

export default function USPSection() {
  return (
    <section className="bg-black py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-12">
          {items.map((item) => (
            <div key={item.label} className="border-t border-[#222] pt-10">
              <p className="mb-6 text-[10px] uppercase tracking-[0.4em] text-[#646467]">
                {item.label}
              </p>
              <h3 className="mb-6 text-2xl font-light text-white md:text-3xl">
                {item.title}
              </h3>
              <p className="text-sm leading-[1.8] text-[#b0b0b0]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
