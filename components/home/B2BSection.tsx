export function B2BSection() {
  const items = [
    {
      number: "01",
      title: "Exkluzívne ceny",
      desc: "Ako registrovaný partner získate prístup k špeciálnym velkoobchodným cenám pre profesionálne nákupy.",
    },
    {
      number: "02",
      title: "Prednostné zásobovanie",
      desc: "Prioritné spracovanie objednávok, rezervácia produktov pred vypredaním a rýchlejšie dodanie.",
    },
    {
      number: "03",
      title: "Odborná podpora",
      desc: "Vzdelávanie o produktoch, protokoloch a aplikačných technikách. Marketingové materiály pre váš salón.",
    },
  ];

  return (
    <section
      style={{
        background: "#fafafa",
        padding: "100px 40px",
        borderTop: "1px solid #e2e2cf",
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
            Pre profesionálov
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
            Ste kozmetičkou
            <br />
            alebo prevádzkovateľom salóna?
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
            Skinderma ponúka špeciálne podmienky pre registrovaných profesionálnych partnerov — vrátane exkluzívnych cien, prednostného zásobovania a odbornej podpory.
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
              href="/kontakt"
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
              Zaregistrovať sa ako partner
            </a>
            <a
              href="/kontakt"
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
              Kontaktovať nás
            </a>
          </div>
          <p style={{ color: "#b0b0b0", fontSize: 12 }}>
            Registrácia je bezplatná a nezáväzná.
          </p>
        </div>

        <div
          className="b2b-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 1,
            background: "#e2e2cf",
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{ background: "#fafafa", padding: "48px 40px" }}
            >
              <div
                style={{
                  color: "#e2e2cf",
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
