import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import PartnerContactForm from "@/components/forms/PartnerContactForm";

/** Locale-parametrised partnership page (used by /cs and /hu). */
export default function PartnershipPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).partnership;

  return (
    <div>
      {/* HERO */}
      <section className="bg-[#f2f2f0]">
        <div className="container-page py-20 md:py-28">
          <p
            style={{ letterSpacing: "0.2em" }}
            className="text-xs font-semibold uppercase text-[#646467]"
          >
            {t.heroEyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold text-navy md:text-5xl lg:text-6xl max-w-3xl leading-tight">
            {t.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-base text-brand-gray leading-relaxed">
            {t.heroLead}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#ziadost" className="btn-gold">
              {t.ctaApply}
            </a>
            <a href="#vyhody" className="btn-outline">
              {t.ctaLearnMore}
            </a>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section id="vyhody" className="container-page py-16 md:py-24">
        <div className="mb-12 text-center">
          <p
            style={{ letterSpacing: "0.2em" }}
            className="text-xs font-semibold uppercase text-[#646467]"
          >
            {t.offerEyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-navy md:text-4xl">
            {t.offerTitle}
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-sm text-brand-gray leading-relaxed">
            {t.offerLead}
          </p>
        </div>

        <div className="grid gap-px bg-cream-dark sm:grid-cols-2 lg:grid-cols-4">
          {t.benefits.map((b) => (
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

      {/* HOW IT WORKS */}
      <section className="bg-[#f2f2f0]">
        <div className="container-page py-16 md:py-24">
          <div className="mb-12 text-center">
            <p
              style={{ letterSpacing: "0.2em" }}
              className="text-xs font-semibold uppercase text-[#646467]"
            >
              {t.stepsEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-navy md:text-4xl">
              {t.stepsTitle}
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {t.steps.map((s, i) => (
              <div key={s.step} className="relative">
                {i < t.steps.length - 1 && (
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

      {/* CONTACT FORM */}
      <section id="ziadost" className="container-page py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <p
            style={{ letterSpacing: "0.2em" }}
            className="text-xs font-semibold uppercase text-[#646467]"
          >
            {t.formEyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-navy md:text-4xl">
            {t.formTitle}
          </h2>
          <p className="mt-4 text-sm text-brand-gray leading-relaxed">
            {t.formIntro}
          </p>

          <div className="mt-8">
            <PartnerContactForm dict={t.form} />
          </div>

          <p className="mt-6 text-xs text-brand-gray">
            {t.contactHelpBefore}
            <a
              href="mailto:info@skinderma.sk"
              className="underline text-navy hover:text-brand-gray transition-colors"
            >
              info@skinderma.sk
            </a>
            {t.contactHelpMid}
            <a
              href="tel:+421905108641"
              className="underline text-navy hover:text-brand-gray transition-colors"
            >
              +421 905 108 641
            </a>
            {t.contactHelpAfter}
          </p>
        </div>
      </section>
    </div>
  );
}
