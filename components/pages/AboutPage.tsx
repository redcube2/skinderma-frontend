import Image from "next/image";
import { Fragment } from "react";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

/** Locale-parametrised "O nás" / About page (used by /cs and /hu). */
export default function AboutPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).about;

  return (
    <div style={{ fontFamily: "inherit" }}>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          height: "50vh",
          minHeight: 360,
          overflow: "hidden",
        }}
      >
        <Image
          src="https://skinderma.sk/wp-content/uploads/2025/09/serum-solution-scaled-1.jpg"
          alt="Skinderma"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
        <div
          style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 24px",
          }}
        >
          <div>
            <p
              style={{
                color: "#e2e2cf",
                fontSize: 11,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              {t.heroEyebrow}
            </p>
            <h1
              style={{
                color: "#fff",
                fontSize: "clamp(32px,5vw,64px)",
                fontWeight: 300,
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              {t.heroTitleLines.map((line, i) => (
                <Fragment key={i}>
                  {i > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </h1>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <div
            style={{ width: 40, height: 1, background: "#000", margin: "0 auto 32px" }}
          />
          <blockquote
            style={{
              fontSize: "clamp(18px,2.5vw,28px)",
              fontWeight: 300,
              color: "#000",
              lineHeight: 1.5,
              maxWidth: 760,
              margin: "0 auto 24px",
              fontStyle: "italic",
            }}
          >
            {t.quote}
          </blockquote>
          <p style={{ color: "#646467", fontSize: 13, letterSpacing: "0.15em" }}>
            {t.quoteAuthor}
          </p>
        </div>

        <div
          className="o-nas-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            marginBottom: 80,
            alignItems: "start",
          }}
        >
          <div>
            <div
              style={{ width: 32, height: 1, background: "#000", marginBottom: 24 }}
            />
            <h2
              style={{
                fontSize: 20,
                fontWeight: 400,
                color: "#000",
                marginBottom: 20,
                letterSpacing: "0.05em",
              }}
            >
              {t.brandHeading}
            </h2>
            {t.brandParagraphs.map((p, i) => (
              <p
                key={i}
                style={{
                  color: "#646467",
                  lineHeight: 1.8,
                  marginBottom:
                    i === t.brandParagraphs.length - 1 ? 0 : 16,
                }}
              >
                {p}
              </p>
            ))}
          </div>

          <div style={{ background: "#f5f4f0", padding: 40 }}>
            <p
              style={{
                fontSize: 11,
                color: "#646467",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              {t.founderLabel}
            </p>
            <blockquote
              style={{
                fontSize: 15,
                fontWeight: 400,
                color: "#000",
                lineHeight: 1.8,
                fontStyle: "italic",
                margin: "0 0 24px",
              }}
            >
              {t.founderQuote}
            </blockquote>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "#e2e2cf",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#000",
                  flexShrink: 0,
                }}
              >
                {t.founderName.slice(0, 1)}
              </div>
              <div>
                <p
                  style={{
                    fontWeight: 600,
                    color: "#000",
                    margin: 0,
                    fontSize: 14,
                  }}
                >
                  {t.founderName}
                </p>
                <p style={{ color: "#646467", margin: 0, fontSize: 12 }}>
                  {t.founderRole}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{ borderTop: "1px solid #e8e4dc", paddingTop: 64, marginBottom: 64 }}
        >
          <div
            className="o-nas-pillars"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 1,
              background: "#e8e4dc",
            }}
          >
            {t.pillars.map((item, i) => (
              <div key={i} style={{ background: "#fff", padding: "40px 32px" }}>
                <div
                  style={{
                    fontSize: 40,
                    fontWeight: 300,
                    color: "#e2e2cf",
                    lineHeight: 1,
                    marginBottom: 16,
                  }}
                >
                  {item.num}
                </div>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: "#000",
                    marginBottom: 12,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: "#646467",
                    fontSize: 13,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#646467", marginBottom: 24 }}>{t.ctaText}</p>
          <a
            href={localizedPath(locale, "/kontakt")}
            style={{
              display: "inline-block",
              background: "#000",
              color: "#fff",
              padding: "14px 40px",
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            {t.ctaButton}
          </a>
        </div>
      </section>
    </div>
  );
}
