import { Fragment } from "react";
import type { Locale } from "@/lib/i18n/config";
import { localeHreflang } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

/** Locale-parametrised "O Skinderme" brand-facts page (used by /cs and /hu). */
export default function OSkindermePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).oSkinderme;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: localeHreflang[locale],
    mainEntity: t.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div
      style={{
        maxWidth: 860,
        margin: "0 auto",
        padding: "60px 24px",
        fontFamily: "inherit",
      }}
    >
      <h1
        style={{ fontSize: 28, fontWeight: 400, color: "#000", marginBottom: 8 }}
      >
        {t.title}
      </h1>
      <p style={{ color: "#646467", marginBottom: 40, fontSize: 15 }}>
        {t.subtitle}
      </p>

      <section
        style={{
          background: "#f5f4f0",
          padding: 32,
          marginBottom: 40,
          borderLeft: "3px solid #000",
        }}
      >
        <h2
          style={{
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 20,
            color: "#000",
          }}
        >
          {t.keyFactsHeading}
        </h2>
        <dl
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "12px 24px",
          }}
        >
          {t.facts.map(([label, value], i) => (
            <Fragment key={i}>
              <dt style={{ fontWeight: 600, color: "#000", fontSize: 13 }}>
                {label}
              </dt>
              <dd style={{ color: "#646467", fontSize: 13, margin: 0 }}>
                {value}
              </dd>
            </Fragment>
          ))}
        </dl>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 400,
            color: "#000",
            marginBottom: 16,
          }}
        >
          {t.whatHeading}
        </h2>
        {t.whatParagraphs.map((p, i) => (
          <p
            key={i}
            style={{
              color: "#646467",
              lineHeight: 1.8,
              marginTop: i === 0 ? 0 : 12,
            }}
          >
            {p}
          </p>
        ))}
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 400,
            color: "#000",
            marginBottom: 16,
          }}
        >
          {t.categoriesHeading}
        </h2>
        <ul
          style={{ columns: 2, color: "#646467", lineHeight: 2, paddingLeft: 20 }}
        >
          {t.categories.map((cat, i) => (
            <li key={i}>{cat}</li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 400,
            color: "#000",
            marginBottom: 24,
          }}
        >
          {t.faqHeading}
        </h2>
        {t.faqs.map((faq, i) => (
          <div
            key={i}
            style={{
              borderBottom: "1px solid #e8e4dc",
              paddingBottom: 20,
              marginBottom: 20,
            }}
          >
            <h3
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#000",
                marginBottom: 8,
              }}
            >
              {faq.q}
            </h3>
            <p
              style={{
                color: "#646467",
                lineHeight: 1.8,
                fontSize: 14,
                margin: 0,
              }}
            >
              {faq.a}
            </p>
          </div>
        ))}
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </div>
  );
}
