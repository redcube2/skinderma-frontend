import { localizedPath, type Locale } from "@/lib/i18n/config";

type B2BDict = {
  eyebrow: string;
  titleLines: string[];
  body: string;
  ctaRegister: string;
  ctaContact: string;
  note: string;
  items: { title: string; desc: string }[];
};

const DEFAULT_ITEMS = [
  {
    title: "Exkluzívne ceny",
    desc: "Ako registrovaný partner získate prístup k špeciálnym velkoobchodným cenám pre profesionálne nákupy.",
  },
  {
    title: "Prednostné zásobovanie",
    desc: "Prioritné spracovanie objednávok, rezervácia produktov pred vypredaním a rýchlejšie dodanie.",
  },
  {
    title: "Odborná podpora",
    desc: "Vzdelávanie o produktoch, protokoloch a aplikačných technikách. Marketingové materiály pre váš salón.",
  },
];

export function B2BSection({
  dict,
  locale = "sk",
}: {
  dict?: B2BDict;
  locale?: Locale;
}) {
  const eyebrow = dict?.eyebrow ?? "Pre profesionálov";
  const titleLines = dict?.titleLines ?? [
    "Ste kozmetičkou",
    "alebo prevádzkovateľom salóna?",
  ];
  const body =
    dict?.body ??
    "Skinderma ponúka špeciálne podmienky pre registrovaných profesionálnych partnerov — vrátane exkluzívnych cien, prednostného zásobovania a odbornej podpory.";
  const ctaRegister = dict?.ctaRegister ?? "Zaregistrovať sa ako partner";
  const ctaContact = dict?.ctaContact ?? "Kontaktovať nás";
  const note = dict?.note ?? "Registrácia je bezplatná a nezáväzná.";
  const items = (dict?.items ?? DEFAULT_ITEMS).map((it, i) => ({
    ...it,
    number: String(i + 1).padStart(2, "0"),
  }));

  return (
    <section
      style={{
        background: "#f5f4f0",
        padding: "100px 40px",
        borderTop: "1px solid #e8e4dc",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div
            style={{
              width: 40,
              height: 1,
              background: "#000",
              margin: "0 auto 32px",
            }}
          />
          <p
            style={{
              color: "#646467",
              fontSize: 11,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            {eyebrow}
          </p>
          <h2
            style={{
              color: "#000",
              fontSize: "clamp(32px, 4vw, 56px)",
              fontWeight: 300,
              lineHeight: 1.2,
              marginBottom: 24,
            }}
          >
            {titleLines.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
          <p
            style={{
              color: "#646467",
              fontSize: 16,
              lineHeight: 1.8,
              maxWidth: 560,
              margin: "0 auto 48px",
            }}
          >
            {body}
          </p>

          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 16,
            }}
          >
            <a
              href={localizedPath(locale, "/partnerstvo")}
              style={{
                background: "#000",
                color: "#fff",
                padding: "16px 40px",
                fontSize: 11,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              {ctaRegister}
            </a>
            <a
              href={localizedPath(locale, "/kontakt")}
              style={{
                border: "1px solid #000",
                color: "#000",
                padding: "16px 40px",
                fontSize: 11,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              {ctaContact}
            </a>
          </div>
          <p style={{ color: "#b0b0b0", fontSize: 12 }}>
            {note}
          </p>
        </div>

        <div
          className="b2b-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 1,
            background: "#e8e4dc",
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{ background: "#ffffff", padding: "48px 40px" }}
            >
              <div
                style={{
                  color: "#e8e4dc",
                  fontSize: 48,
                  fontWeight: 300,
                  lineHeight: 1,
                  marginBottom: 24,
                }}
              >
                {item.number}
              </div>
              <h3
                style={{
                  color: "#000",
                  fontSize: 18,
                  fontWeight: 400,
                  marginBottom: 16,
                }}
              >
                {item.title}
              </h3>
              <p style={{ color: "#646467", fontSize: 14, lineHeight: 1.8 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .b2b-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
