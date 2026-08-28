type SkiniaDict = {
  eyebrow: string;
  titleLines: string[];
  bodyHtml: string;
  bullets: string[];
  platformLabel: string;
  platformTitle: string;
  features: { title: string; desc: string }[];
  offerLabel: string;
  offerValue: string;
  ctaSkinia: string;
  ctaProducts: string;
};

const DEFAULT_DICT: SkiniaDict = {
  eyebrow: "Exkluzívna ponuka",
  titleLines: ["Profesionálne nástroje", "pre váš salón"],
  bodyHtml:
    "Pri nákupe Skinderma produktov nad <strong>200€</strong> získate <strong>dopravu zdarma</strong> a <strong>1 mesiac softvéru Skinia zdarma</strong> — kompletný systém pre správu klientov, AI protokoly a online rezervácie.",
  bullets: [
    "Doprava zdarma pri objednávke nad 200€",
    "1 mesiac Skinia softvéru zdarma",
    "Správa klientov, AI protokoly, online booking",
    "Bez záväzkov — zrušenie kedykoľvek",
  ],
  platformLabel: "Skinia Platform",
  platformTitle: "AI-powered salón softvér",
  features: [
    { title: "Klientsky manažment", desc: "Karty klientov, história, súhlasy" },
    {
      title: "AI Protokoly",
      desc: "Personalizované ošetrenia na základe analýzy pleti",
    },
    { title: "Online booking", desc: "Rezervácie 24/7, automatické notifikácie" },
    {
      title: "Homecare plány",
      desc: "Produktové odporúčania pre domácu starostlivosť",
    },
  ],
  offerLabel: "Pri nákupe nad 200€",
  offerValue: "1 mesiac ZDARMA",
  ctaSkinia: "Pozrieť Skinia.eu",
  ctaProducts: "Objednať produkty",
};

export default function SkiniaPromo({ dict }: { dict?: SkiniaDict }) {
  const d = dict ?? DEFAULT_DICT;
  const bullets = d.bullets;
  const features = d.features.map((f) => ({ ...f, icon: "◆" }));

  return (
    <section
      style={{
        background: "#000",
        padding: "80px 24px",
        borderTop: "1px solid #1a1a1a",
      }}
    >
      <div
        className="skinia-grid"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gap: 64,
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ width: 48, height: 1, background: "#e2e2cf", marginBottom: 32 }} />
          <p
            style={{
              color: "#646467",
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            {d.eyebrow}
          </p>
          <h2
            style={{
              color: "#fff",
              fontSize: "clamp(28px, 3vw, 48px)",
              fontWeight: 300,
              lineHeight: 1.2,
              marginBottom: 24,
            }}
          >
            {d.titleLines.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
          <p
            className="skinia-body"
            style={{
              color: "#646467",
              lineHeight: 1.8,
              marginBottom: 40,
              maxWidth: 480,
            }}
            dangerouslySetInnerHTML={{ __html: d.bodyHtml }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginBottom: 40,
            }}
          >
            {bullets.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 4,
                    height: 4,
                    background: "#e2e2cf",
                    borderRadius: "50%",
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: "#b0b0b0", fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a
              href="https://www.skinia.eu"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#fff",
                color: "#000",
                padding: "14px 32px",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              {d.ctaSkinia}
            </a>
            <a
              href="/produkty"
              style={{
                border: "1px solid #646467",
                color: "#fff",
                padding: "14px 32px",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              {d.ctaProducts}
            </a>
          </div>
        </div>

        <div
          style={{
            background: "#0d0d0d",
            border: "1px solid #1a1a1a",
            padding: 40,
            borderRadius: 2,
          }}
        >
          <div style={{ marginBottom: 32 }}>
            <div
              style={{
                fontSize: 11,
                color: "#646467",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              {d.platformLabel}
            </div>
            <div style={{ fontSize: 24, color: "#fff", fontWeight: 300 }}>
              {d.platformTitle}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {features.map((feature, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 16,
                  paddingBottom: 16,
                  borderBottom: i < features.length - 1 ? "1px solid #1a1a1a" : "none",
                }}
              >
                <span style={{ color: "#e2e2cf", fontSize: 8, marginTop: 6 }}>
                  {feature.icon}
                </span>
                <div>
                  <div style={{ color: "#fff", fontSize: 14, marginBottom: 4 }}>
                    {feature.title}
                  </div>
                  <div style={{ color: "#646467", fontSize: 12 }}>{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 32,
              padding: "16px 24px",
              background: "#000",
              border: "1px solid #e2e2cf",
            }}
          >
            <div
              style={{
                color: "#e2e2cf",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              {d.offerLabel}
            </div>
            <div style={{ color: "#fff", fontSize: 20, fontWeight: 300, marginTop: 4 }}>
              {d.offerValue}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .skinia-body strong { color: #fff; font-weight: 700; }
        @media (min-width: 900px) {
          .skinia-grid {
            grid-template-columns: 1fr 1fr;
            gap: 80px !important;
          }
        }
      `}</style>
    </section>
  );
}
