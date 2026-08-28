import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import ContactForm from "@/components/forms/ContactForm";

/** Locale-parametrised contact page (used by /cs and /hu). */
export default function ContactPageView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).contact;

  return (
    <section className="container-page py-12 md:py-16">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        {t.eyebrow}
      </span>
      <h1 className="mt-2 text-4xl font-bold text-navy md:text-5xl">{t.title}</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6 text-brand-gray">
          <div>
            <h2 className="text-lg font-semibold text-navy">{t.sellerHeading}</h2>
            <div className="mt-2 space-y-0.5">
              {t.sellerLines.map((line, i) => (
                <div key={i} className={i === 0 ? "font-semibold text-navy" : ""}>
                  {line}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy">{t.idHeading}</h2>
            <dl className="mt-2 grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-sm">
              <dt className="font-medium text-navy">{t.idLabels.ico}</dt>
              <dd>44137265</dd>
              <dt className="font-medium text-navy">{t.idLabels.dic}</dt>
              <dd>2022614341</dd>
              <dt className="font-medium text-navy">{t.idLabels.icDph}</dt>
              <dd>SK2022614341</dd>
            </dl>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy">{t.contactHeading}</h2>
            <div className="mt-2 space-y-1 text-sm">
              <div>
                <span className="font-medium text-navy">{t.emailLabel} </span>
                <a
                  href="mailto:info@skinderma.sk"
                  className="text-gold hover:text-gold-dark"
                >
                  info@skinderma.sk
                </a>
              </div>
              <div className="mt-1">
                <span className="font-medium text-navy">{t.phoneLabel} </span>
                <a
                  href="tel:+421905108641"
                  className="text-gold hover:text-gold-dark"
                >
                  +421 905 108 641
                </a>
              </div>
              <div className="text-brand-gray mt-1">{t.hours}</div>
            </div>
          </div>

          <div className="rounded-2xl border border-cream-dark/60 bg-cream p-5 text-sm">
            <div className="font-semibold text-navy">{t.adrHeading}</div>
            <p className="mt-2">{t.adrText}</p>
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block text-gold hover:text-gold-dark break-all"
            >
              {t.adrLinkLabel}
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-navy">{t.formHeading}</h2>
          <p className="mt-2 text-sm text-brand-gray">{t.formIntro}</p>
          <ContactForm dict={t.form} />
        </div>
      </div>
    </section>
  );
}
