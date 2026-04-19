import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dodanie a platba",
  description:
    "Spôsoby doručenia a platby v Skinderma: Slovenská pošta, Packeta, osobný odber, kartou online, prevodom, dobierkou.",
};

type Row = { label: string; value: string; note?: string };

const shipping: Row[] = [
  {
    label: "Slovenská pošta",
    value: "3,90 €",
    note: "2 – 4 pracovné dni",
  },
  { label: "Packeta", value: "3,50 €", note: "2 – 3 pracovné dni" },
  {
    label: "Osobný odber – Komárno",
    value: "Zdarma",
    note: "Po dohode",
  },
  { label: "Doprava zdarma", value: "od 80 €", note: "Pri objednávke nad 80 €" },
];

const payment: Row[] = [
  { label: "Kartou online", value: "Zdarma", note: "Visa, Mastercard" },
  { label: "Bankový prevod", value: "Zdarma" },
  { label: "Dobierka", value: "+1,50 €" },
];

export default function DeliveryPage() {
  return (
    <section className="container-page py-12 md:py-16">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Informácie
      </span>
      <h1 className="mt-2 text-4xl font-bold text-navy md:text-5xl">
        Dodanie a platba
      </h1>
      <p className="mt-4 max-w-2xl text-brand-gray">
        Objednávky spracúvame v pracovných dňoch. Priemerná doba dodania je
        2 – 5 pracovných dní od prijatia platby.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-cream-dark/60 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-navy">Dodanie</h2>
          <ul className="mt-4 divide-y divide-cream-dark/60">
            {shipping.map((r) => (
              <li
                key={r.label}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3"
              >
                <div>
                  <div className="font-medium text-navy">{r.label}</div>
                  {r.note && (
                    <div className="text-xs text-brand-gray">{r.note}</div>
                  )}
                </div>
                <div className="font-semibold text-gold">{r.value}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-cream-dark/60 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-navy">Platba</h2>
          <ul className="mt-4 divide-y divide-cream-dark/60">
            {payment.map((r) => (
              <li
                key={r.label}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3"
              >
                <div>
                  <div className="font-medium text-navy">{r.label}</div>
                  {r.note && (
                    <div className="text-xs text-brand-gray">{r.note}</div>
                  )}
                </div>
                <div className="font-semibold text-gold">{r.value}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 rounded-2xl bg-cream p-6 text-sm text-brand-gray">
        <div className="font-semibold text-navy">Doba dodania</div>
        <p className="mt-1">
          Štandardná doba dodania je 2 – 5 pracovných dní. V prípade
          predobjednávky vás budeme informovať e-mailom.
        </p>
      </div>
    </section>
  );
}
