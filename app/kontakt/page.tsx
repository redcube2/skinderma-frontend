import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
  title: "Kontakt | Skinderma",
  description:
    "Kontaktné údaje Skinderma – Red Cube s.r.o., Komárno. Formulár pre reklamácie, odstúpenie a otázky.",
  alternates: buildAlternates("sk", "/kontakt"),
};

export default function ContactPage() {
  // The ARS block is the one piece of legal-adjacent copy on this page that has
  // to stay in lockstep with the WP terms, so it reads from the dictionary
  // instead of being duplicated inline.
  const adr = getDictionary("sk").contact;

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
            <div className="font-semibold text-navy">{adr.adrHeading}</div>
            <p className="mt-2">{adr.adrText}</p>
            <a
              href={adr.adrLinkHref}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block text-gold hover:text-gold-dark break-all"
            >
              {adr.adrLinkLabel}
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
