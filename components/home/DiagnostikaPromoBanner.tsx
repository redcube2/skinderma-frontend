"use client";
import { Check } from "lucide-react";

const BENEFITS = [
  "Profesionálna AI analýza pleti (Maicet Pro)",
  "Personalizované odporúčanie produktov podľa typu pleti",
  "Zdarma pri nákupe domácej rutiny alebo produktov Skinderma",
];

export function DiagnostikaPromoBanner() {
  return (
    <section
      style={{
        background: "#f5f4f0",
        padding: "80px 40px",
        borderTop: "1px solid #e8e4dc",
      }}
    >
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* Eyebrow */}
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
            marginBottom: 20,
          }}
        >
          Salón SKIN Beauty House, Komárno
        </p>

        {/* Heading */}
        <h2
          style={{
            fontSize: "clamp(22px, 3.5vw, 32px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "#000",
            marginBottom: 20,
            lineHeight: 1.25,
          }}
        >
          Diagnostika pleti zdarma pri nákupe domácej rutiny
        </h2>

        {/* Description */}
        <p
          style={{
            color: "#646467",
            fontSize: 15,
            lineHeight: 1.7,
            maxWidth: 600,
            margin: "0 auto 40px",
          }}
        >
          Nie ste si istá, ktorá rutina je pre vás vhodná? Príďte do salónu
          SKIN Beauty House v Komárne — naša kozmetička urobí profesionálnu
          analýzu pleti pomocou AI analyzátora Maicet Pro a odporučí vám
          správnu starostlivosť.
        </p>

        {/* Benefits */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            maxWidth: 480,
            margin: "0 auto 40px",
            textAlign: "left",
          }}
        >
          {BENEFITS.map((benefit) => (
            <div
              key={benefit}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  background: "#000",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                <Check size={11} color="#fff" strokeWidth={3} />
              </div>
              <span style={{ fontSize: 14, color: "#333", lineHeight: 1.5 }}>
                {benefit}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://beautyhouse.sk/rezervuj-si-termin/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#000",
            color: "#fff",
            padding: "16px 40px",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textDecoration: "none",
            borderRadius: 4,
            transition: "background 0.2s ease",
            marginBottom: 20,
          }}
          className="diagnostika-cta"
        >
          Rezervovať diagnostiku
        </a>

        {/* Address */}
        <p
          style={{
            fontSize: 12,
            color: "#9ca3af",
            letterSpacing: "0.05em",
          }}
        >
          SKIN Beauty House &bull; Ul. Mieru 4235, Komárno &bull; Tel: 0905 108
          641
        </p>
      </div>
    </section>
  );
}

