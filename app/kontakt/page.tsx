import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktné údaje Skinderma – kozmetika pre profesionálov.",
};

export default function ContactPage() {
  return (
    <section className="container-page py-12 md:py-16">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Kontakt
      </span>
      <h1 className="mt-2 text-4xl font-bold text-navy md:text-5xl">
        Napíšte nám
      </h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="space-y-4 text-brand-gray">
          <p>
            Máte otázku k produktom, objednávke alebo spolupráci? Ozvite sa nám
            a radi vám pomôžeme.
          </p>
          <div>
            <div className="font-semibold text-navy">E-mail</div>
            <a
              href="mailto:info@skinderma.sk"
              className="text-gold hover:text-gold-dark"
            >
              info@skinderma.sk
            </a>
          </div>
          <div>
            <div className="font-semibold text-navy">Web</div>
            <a
              href="https://skinderma.sk"
              className="text-gold hover:text-gold-dark"
            >
              skinderma.sk
            </a>
          </div>
        </div>
        <div className="rounded-2xl border border-cream-dark/60 bg-cream p-8">
          <h2 className="text-lg font-semibold text-navy">Zákaznícky servis</h2>
          <p className="mt-2 text-sm text-brand-gray">
            Pracovné dni 9:00 – 17:00. Na bežné otázky odpovedáme do 24 hodín.
          </p>
          <a
            href="mailto:info@skinderma.sk"
            className="btn-gold mt-6"
          >
            Napísať e-mail
          </a>
        </div>
      </div>
    </section>
  );
}
