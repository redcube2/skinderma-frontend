import type { Metadata } from "next";
import PartnerContactForm from "./PartnerContactForm";

export const metadata: Metadata = {
  title: "Pre profesionálov – Partnerstvo | Skinderma",
  description:
    "Staňte sa partnerským salónom Skinderma. Profesionálne ceny, školenia, certifikované produkty a dedikovaný account manager pre kozmetické salóny.",
  alternates: {
    canonical: "https://www.skinderma.sk/pre-profesionalov",
  },
  openGraph: {
    title: "Pre profesionálov – Partnerstvo | Skinderma",
    description:
      "Staňte sa partnerským salónom Skinderma. Profesionálne ceny, školenia, certifikované produkty a dedikovaný account manager pre kozmetické salóny.",
    url: "https://www.skinderma.sk/pre-profesionalov",
    siteName: "Skinderma",
    locale: "sk_SK",
    type: "website",
  },
};

const BENEFITS = [
  {
    num: "01",
    title: "Profesionálne ceny",
    text: "Exkluzívny B2B cenník s výraznými zľavami oproti maloobchodným cenám. Objem objednávky priamo ovplyvňuje výšku zľavy.",
  },
  {
    num: "02",
    title: "Školenia a podpora",
    text: "Odborné produktové školenia, protokoly ošetrení a marketingové materiály. Zostanete vždy o krok napred.",
  },
  {
    num: "03",
    title: "Dedikovaný account manager",
    text: "Osobný kontakt, ktorý pozná váš salón. Rýchle riešenie otázok, objednávok aj reklamácií.",
  },
  {
    num: "04",
    title: "Certifikované produkty",
    text: "Všetky produkty Skinderma sú vyrobené v GMP certifikovaných laboratóriách a klinicky testované dermatológmi.",
  },
] as const;

const STEPS = [
  {
    step: "1",
    title: "Odošlite žiadosť",
    text: "Vyplňte formulár nižšie. Stačí základné údaje o salóne — celý proces trvá menej ako 3 minúty.",
  },
  {
    step: "2",
    title: "Preveríme žiadosť",
    text: "Do 2 pracovných dní váš salón preveríme a pripravíme individuálnu ponuku. Ozveme sa priamo na váš e-mail.",
  },
  {
    step: "3",
    title: "Privítací balíček",
    text: "Po schválení získate prístup do B2B portálu, vzorky produktov a kompletné materiály pre váš tím.",
  },
] as const;

export default function PreProfesionalovPage() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="bg-[#f2f2f0]">
        <div className="container-page py-20 md:py-28">
          <p
            style={{ letterSpacing: "0.2em" }}
            className="text-xs font-semibold uppercase text-[#646467]"
          >
            Pre kozmetické salóny
          </p>
          <h1 className="mt-4 text-4xl font-bold text-navy md:text-5xl lg:text-6xl max-w-3xl leading-tight">
            Spolupráca s kozmetickými salónmi
          </h1>
          <p className="mt-6 max-w-2xl text-base text-brand-gray leading-relaxed">
            Staňte sa partnerským salónom Skinderma a ponúknite svojim klientom
            lekársku kozmetiku španielskej kvality. Získate profesionálne ceny,
            odborné školenia a nepretržitú podporu — všetko na jednom mieste.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#ziadost" className="btn-gold">
              Požiadať o partnerstvo
            </a>
            <a href="#vyhody" className="btn-outline">
              Zistiť viac
            </a>
          </div>
        </div>
      </section>

      {/* ── WHAT WE OFFER ── */}
      <section id="vyhody" className="container-page py-16 md:py-24">
        <div className="mb-12 text-center">
          <p
            style={{ letterSpacing: "0.2em" }}
            className="text-xs font-semibold uppercase text-[#646467]"
          >
            Čo získate
          </p>
          <h2 className="mt-3 text-3xl font-bold text-navy md:text-4xl">
            Výhody partnerského salónu
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-sm text-brand-gray leading-relaxed">
            Partnerstvo so Skinderma je viac ako len nákup produktov — je to
            dlhodobá spolupráca navrhnutá pre rast vášho salónu.
          </p>
        </div>

        <div className="grid gap-px bg-cream-dark sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <div key={b.num} className="bg-white p-8">
              <div className="text-4xl font-light text-cream leading-none mb-4">
                {b.num}
              </div>
              <h3 className="text-base font-semibold text-navy mb-3">
                {b.title}
              </h3>
              <p className="text-sm text-brand-gray leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-[#f2f2f0]">
        <div className="container-page py-16 md:py-24">
          <div className="mb-12 text-center">
            <p
              style={{ letterSpacing: "0.2em" }}
              className="text-xs font-semibold uppercase text-[#646467]"
            >
              Postup schválenia
            </p>
            <h2 className="mt-3 text-3xl font-bold text-navy md:text-4xl">
              Ako to funguje
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.step} className="relative">
                {/* Connector line for desktop */}
                {i < STEPS.length - 1 && (
                  <div
                    className="hidden md:block absolute top-6 left-[calc(50%+2rem)] w-full h-px bg-cream-dark"
                    aria-hidden="true"
                  />
                )}
                <div className="text-center">
                  <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white text-sm font-semibold">
                    {s.step}
                  </div>
                  <h3 className="text-base font-semibold text-navy mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-brand-gray leading-relaxed">
                    {s.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section id="ziadost" className="container-page py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <p
            style={{ letterSpacing: "0.2em" }}
            className="text-xs font-semibold uppercase text-[#646467]"
          >
            Partnerská žiadosť
          </p>
          <h2 className="mt-3 text-3xl font-bold text-navy md:text-4xl">
            Kontaktujte nás
          </h2>
          <p className="mt-4 text-sm text-brand-gray leading-relaxed">
            Vyplňte formulár a my sa vám ozveme do 2 pracovných dní.
            Všetky polia označené hviezdičkou (*) sú povinné.
          </p>

          <div className="mt-8">
            <PartnerContactForm />
          </div>

          <p className="mt-6 text-xs text-brand-gray">
            Máte otázky? Napíšte nám priamo na{" "}
            <a
              href="mailto:info@skinderma.sk"
              className="underline text-navy hover:text-brand-gray transition-colors"
            >
              info@skinderma.sk
            </a>{" "}
            alebo zavolajte na{" "}
            <a
              href="tel:+421905108641"
              className="underline text-navy hover:text-brand-gray transition-colors"
            >
              +421 905 108 641
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
