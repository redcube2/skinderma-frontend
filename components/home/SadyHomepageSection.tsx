"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Sada = {
  id: string;
  title: string;
  description: string;
  accentColor: string;
  bundlePrice: string;
  originalPrice: string;
  savings: string;
  href: string;
};

const SADY: Sada[] = [
  {
    id: "sucha",
    title: "Suchá pleť",
    description: "Hydratačná rutina pre pleť, ktorá vyžaduje viac vlhkosti.",
    accentColor: "#5DADE2",
    bundlePrice: "139,25 €",
    originalPrice: "150,52 €",
    savings: "11,27 €",
    href: "/produkt/sada-sucha-plet",
  },
  {
    id: "mastna",
    title: "Mastná pleť",
    description:
      "Vyrovná produkciu kožného mazu, sťahuje póry, redukuje lesk.",
    accentColor: "#58D68D",
    bundlePrice: "155,33 €",
    originalPrice: "167,92 €",
    savings: "12,59 €",
    href: "/produkt/sada-mastna-plet",
  },
  {
    id: "aknozna",
    title: "Aknózna pleť",
    description: "Cielená starostlivosť pre pleť so sklonom k akné.",
    accentColor: "#F39C12",
    bundlePrice: "156,45 €",
    originalPrice: "169,14 €",
    savings: "12,69 €",
    href: "/produkt/sada-aknozna-plet",
  },
  {
    id: "citliva",
    title: "Citlivá pleť",
    description: "Upokojuje začervenanie, posilňuje ochrannú bariéru.",
    accentColor: "#EC7063",
    bundlePrice: "176,48 €",
    originalPrice: "190,79 €",
    savings: "14,31 €",
    href: "/produkt/sada-citliva-plet",
  },
  {
    id: "antiaging",
    title: "Anti-aging",
    description:
      "Komplexná starostlivosť proti známkam starnutia, pre pleť 40+.",
    accentColor: "#AF7AC5",
    bundlePrice: "142,80 €",
    originalPrice: "154,38 €",
    savings: "11,58 €",
    href: "/produkt/sada-anti-aging",
  },
];

export function SadyHomepageSection() {
  return (
    <section
      style={{
        background: "#fafaf8",
        padding: "80px 40px",
        borderTop: "1px solid #e8e4dc",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div
            style={{
              width: 40,
              height: 1,
              background: "#000",
              margin: "0 auto 28px",
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
            Domáca starostlivosť
          </p>
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#000",
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            Nájdite svoju ideálnu domácu rutinu
          </h2>
          <p
            style={{
              color: "#646467",
              fontSize: 15,
              maxWidth: 540,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Profesionálna kozmetika prispôsobená vašej pleti — vybraná
            kozmetičkami a dermatológmi
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 20,
          }}
          className="sady-grid"
        >
          {SADY.map((sada) => (
            <Link
              key={sada.id}
              href={sada.href}
              style={{
                display: "flex",
                flexDirection: "column",
                background: "#fff",
                border: "1px solid #e8e4dc",
                borderRadius: 8,
                overflow: "hidden",
                textDecoration: "none",
                color: "inherit",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              className="sada-tile"
            >
              {/* Accent bar */}
              <div
                style={{
                  height: 6,
                  background: sada.accentColor,
                  flexShrink: 0,
                }}
              />

              {/* Content */}
              <div
                style={{
                  padding: "24px 20px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  flex: 1,
                }}
              >
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#000",
                    margin: 0,
                  }}
                >
                  {sada.title}
                </h3>

                <p
                  style={{
                    fontSize: 13,
                    color: "#646467",
                    lineHeight: 1.5,
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {sada.description}
                </p>

                {/* Pricing */}
                <div style={{ marginTop: "auto" }}>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#000",
                      lineHeight: 1,
                    }}
                  >
                    {sada.bundlePrice}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#9ca3af",
                      textDecoration: "line-through",
                      marginTop: 4,
                    }}
                  >
                    {sada.originalPrice}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#16a34a",
                      marginTop: 4,
                      fontWeight: 500,
                    }}
                  >
                    Úspora: {sada.savings}
                  </div>
                </div>

                {/* CTA */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#000",
                    marginTop: 8,
                    paddingTop: 12,
                    borderTop: "1px solid #f0ece4",
                  }}
                >
                  Zobraziť sadu
                  <ChevronRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .sady-grid {
          grid-template-columns: repeat(5, 1fr);
        }
        .sada-tile:hover {
          transform: scale(1.03);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
        }
        @media (max-width: 1024px) {
          .sady-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .sady-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
