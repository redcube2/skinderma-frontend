import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dodanie a platba",
  description:
    "Doručenie a platba v Skinderma: SPS Balíkovo a osobný odber v Komárne na Slovensku, SPS/DPD do Česka a Maďarska, platba bankovým prevodom alebo kartou online cez ComGate. Ceny v EUR.",
};

type Row = { label: string; value: string; note?: string };

const shippingSk: Row[] = [
  { label: "SPS Balíkovo – výdajné miesto", value: "3,00 €" },
  {
    label: "Osobný odber – Nám. M. R. Štefánika 16, Komárno",
    value: "Zdarma",
  },
];

const shippingCzHu: Row[] = [
  {
    label: "SPS / DPD – doručenie na adresu",
    value: "6,00 €",
    note: "Cena za objednávku.",
  },
];

const payment: Row[] = [
  { label: "Bankový prevod", value: "Zdarma" },
  {
    label: "Kartou online – ComGate",
    value: "Zdarma",
    note: "Visa, Mastercard",
  },
];

function DeliveryRow({ row }: { row: Row }) {
  return (
    <li className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-x-4 sm:gap-y-1">
      <div className="min-w-0">
        <div className="break-words font-medium text-navy">{row.label}</div>
        {row.note && (
          <div className="break-words text-xs text-brand-gray">
            {row.note}
          </div>
        )}
      </div>
      <div className="font-semibold text-gold sm:text-right">
        {row.value}
      </div>
    </li>
  );
}

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
        Objednávky spracúvame v pracovných dňoch. Všetky ceny sú uvedené v EUR
        pre každý trh.
      </p>

      <div className="mt-10 rounded-2xl border border-cream-dark/60 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-navy">Dodanie</h2>

        <div className="mt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-gray">
            Slovensko
          </h3>
          <ul className="mt-3 divide-y divide-cream-dark/60">
            {shippingSk.map((r) => (
              <DeliveryRow key={r.label} row={r} />
            ))}
          </ul>
          <p className="mt-2 text-xs text-brand-gray">
            Doprava zdarma sa na Slovensku neuplatňuje.
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-gray">
            Česko a Maďarsko
          </h3>
          <ul className="mt-3 divide-y divide-cream-dark/60">
            {shippingCzHu.map((r) => (
              <DeliveryRow key={r.label} row={r} />
            ))}
          </ul>
          <p className="mt-2 text-xs text-brand-gray">
            Doprava zdarma platí len pre objednávky nad 200 € s DPH. Platba na
            dobierku nie je dostupná.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-cream-dark/60 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-navy">Platba</h2>
        <ul className="mt-4 divide-y divide-cream-dark/60">
          {payment.map((r) => (
            <DeliveryRow key={r.label} row={r} />
          ))}
        </ul>
        <p className="mt-2 text-xs text-brand-gray">
          Platba na dobierku nie je dostupná v žiadnej krajine.
        </p>
      </div>

      <div className="mt-10 rounded-2xl bg-cream p-6 text-sm text-brand-gray">
        <div className="font-semibold text-navy">Doba dodania</div>
        <p className="mt-1">
          Tovar skladom doručujeme do 2 – 5 pracovných dní. Tovar objednaný na
          požiadanie dodávame približne do jedného mesiaca.
        </p>
      </div>
    </section>
  );
}
