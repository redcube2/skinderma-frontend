import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "O nás | Skinderma Medical Cosmetics",
  description:
    "Skinderma Medical Cosmetics – španielska lekárska kozmetika distribuovaná na Slovensku spoločnosťou Red Cube s.r.o.",
  alternates: { canonical: "https://www.skinderma.sk/o-nas" },
};

export default function ONasPage() {
  return (
    <div style={{ fontFamily: "inherit" }}>
      {/* Hero */}
      <section style={{ position: "relative", height: "50vh", minHeight: 360, overflow: "hidden" }}>
        <Image
          src="https://skinderma.sk/wp-content/uploads/2025/09/serum-solution-scaled-1.jpg"
          alt="Skinderma produkty"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} />
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
              O nás
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
              Budúcnosť
              <br />
              lekárskej kozmetiky
            </h1>
          </div>
        </div>
      </section>

      {/* Hlavný obsah */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        {/* Citát */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <div style={{ width: 40, height: 1, background: "#000", margin: "0 auto 32px" }} />
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
            „V Skinderma veríme, že krása je výsledkom vedy a individuálnej starostlivosti. Ponúkame prelomové riešenia pre zdravú a žiarivú pleť.&ldquo;
          </blockquote>
          <p style={{ color: "#646467", fontSize: 13, letterSpacing: "0.15em" }}>
            SKINDERMA MEDICAL COSMETICS
          </p>
        </div>

        {/* Grid: O značke + Od zakladateľa */}
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
          {/* O značke */}
          <div>
            <div style={{ width: 32, height: 1, background: "#000", marginBottom: 24 }} />
            <h2
              style={{
                fontSize: 20,
                fontWeight: 400,
                color: "#000",
                marginBottom: 20,
                letterSpacing: "0.05em",
              }}
            >
              O značke Skinderma
            </h2>
            <p style={{ color: "#646467", lineHeight: 1.8, marginBottom: 16 }}>
              Skinderma Medical Cosmetics je španielska značka lekárskej kozmetiky vyvíjaná v spolupráci s dermatológmi a estetickými lekármi. Všetky produkty sú vyrábané v certifikovaných GMP laboratóriách podľa prísnych farmaceutických štandardov.
            </p>
            <p style={{ color: "#646467", lineHeight: 1.8, marginBottom: 16 }}>
              Naše produkty kombinujú najmodernejšie biotechnologické ingrediencie — od peptidov a exozómov až po kyseliny a antioxidanty — s cieľom prinášať viditeľné výsledky pre každý typ pleti.
            </p>
            <p style={{ color: "#646467", lineHeight: 1.8 }}>
              Značka je distribuovaná do viac ako 50 krajín sveta. Na Slovensku je výhradným distribútorom spoločnosť Red Cube s.r.o.
            </p>
          </div>

          {/* Od zakladateľa */}
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
              Od zakladateľa
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
              „S Red Cube s.r.o. sme vždy chceli prinášať nielen produkty, ale aj komplexné know-how a podporu pre kozmetických profesionálov. Spojením s Skindermou plníme túto víziu – sprístupňujeme špičkovú lekársku kozmetiku a technológie, ktoré naozaj menia životy k lepšiemu. Vaša spokojnosť a dôvera sú pre nás najväčšou odmenou.&ldquo;
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
                R
              </div>
              <div>
                <p style={{ fontWeight: 600, color: "#000", margin: 0, fontSize: 14 }}>
                  Ing. Ramón Novosád
                </p>
                <p style={{ color: "#646467", margin: 0, fontSize: 12 }}>
                  Zakladateľ · Red Cube s.r.o.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 piliere */}
        <div style={{ borderTop: "1px solid #e8e4dc", paddingTop: 64, marginBottom: 64 }}>
          <div
            className="o-nas-pillars"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 1,
              background: "#e8e4dc",
            }}
          >
            {[
              {
                num: "01",
                title: "GMP certifikácia",
                text: "Všetky produkty vyrábané podľa farmaceutických noriem GMP – rovnaký štandard ako pri výrobe liekov.",
              },
              {
                num: "02",
                title: "50+ krajín",
                text: "Skinderma je distribuovaná do viac ako 50 krajín sveta. Dôvera profesionálov na každom kontinente.",
              },
              {
                num: "03",
                title: "Klinicky testované",
                text: "Každá formulácia overená dermatológmi a klinickými štúdiami. Veda v každej kvapke.",
              },
            ].map((item, i) => (
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
                <h3 style={{ fontSize: 16, fontWeight: 500, color: "#000", marginBottom: 12 }}>
                  {item.title}
                </h3>
                <p style={{ color: "#646467", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Kontakt CTA */}
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#646467", marginBottom: 24 }}>
            Máte otázky alebo záujem o spoluprácu?
          </p>
          <a
            href="/kontakt"
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
            Kontaktujte nás
          </a>
        </div>
      </section>
    </div>
  );
}
