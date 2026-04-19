import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktné údaje Skinderma – Red Cube s.r.o., Komárno. Formulár pre reklamácie, odstúpenie a otázky.",
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

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6 text-brand-gray">
          <div>
            <h2 className="text-lg font-semibold text-navy">Predávajúci</h2>
            <div className="mt-2 space-y-0.5">
              <div className="font-semibold text-navy">Red Cube s.r.o.</div>
              <div>Nám. M.R. Štefánika 16</div>
              <div>945 01 Komárno</div>
              <div>Slovenská republika</div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy">Identifikácia</h2>
            <dl className="mt-2 grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-sm">
              <dt className="font-medium text-navy">IČO:</dt>
              <dd>44137265</dd>
              <dt className="font-medium text-navy">DIČ:</dt>
              <dd>2022614341</dd>
              <dt className="font-medium text-navy">IČ DPH:</dt>
              <dd>SK2022614341</dd>
            </dl>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy">Kontakt</h2>
            <div className="mt-2 space-y-1 text-sm">
              <div>
                <span className="font-medium text-navy">E-mail: </span>
                <a
                  href="mailto:info@skinderma.sk"
                  className="text-gold hover:text-gold-dark"
                >
                  info@skinderma.sk
                </a>
              </div>
              <div className="mt-1">
                <span className="font-medium text-navy">Telefón: </span>
                <a
                  href="tel:+421905108641"
                  className="text-gold hover:text-gold-dark"
                >
                  +421 905 108 641
                </a>
              </div>
              <div className="text-brand-gray mt-1">
                Na bežné otázky odpovedáme do 24 hodín (pracovné dni
                9:00 – 17:00).
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-cream-dark/60 bg-cream p-5 text-sm">
            <div className="font-semibold text-navy">
              Alternatívne riešenie sporov
            </div>
            <p className="mt-2">
              Spotrebiteľ má právo obrátiť sa na platformu ARS Európskej
              komisie:
            </p>
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block text-gold hover:text-gold-dark break-all"
            >
              https://ec.europa.eu/consumers/odr
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-navy">
            Sťažnosť / spätná väzba
          </h2>
          <p className="mt-2 text-sm text-brand-gray">
            Napíšte nám reklamáciu, žiadosť o odstúpenie od zmluvy alebo
            bežnú otázku. Odpovieme do 48 hodín.
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
