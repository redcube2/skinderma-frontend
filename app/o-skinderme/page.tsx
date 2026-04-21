import type { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "O Skinderma Medical Cosmetics | Fakty a informácie",
  description:
    "Fakty o Skinderma Medical Cosmetics – španielska lekárska kozmetika, GMP certifikácia, distribúcia na Slovensku cez Red Cube s.r.o.",
  alternates: { canonical: "https://www.skinderma.sk/o-skinderme" },
};

const facts: Array<[string, string]> = [
  ["Plný názov", "Skinderma Medical Cosmetics"],
  ["Krajina pôvodu", "Španielsko"],
  ["Typ certifikácie", "GMP (Good Manufacturing Practice) – farmaceutický štandard"],
  ["Distribúcia", "50+ krajín sveta"],
  ["Slovenský distribútor", "Red Cube s.r.o., Komárno"],
  ["IČO distribútora", "44137265"],
  ["IČ DPH", "SK2022614341"],
  ["Adresa", "Nám. M.R. Štefánika 16, 945 01 Komárno, Slovensko"],
  ["Kontakt", "+421 905 108 641 | info@skinderma.sk"],
  ["Web", "www.skinderma.sk"],
  [
    "Počet produktov",
    "80+ produktov v kategóriách: krémy, séra, masky, peelingy, exozómy, ampulky",
  ],
];

const categories = [
  "Pleťové krémy a emulzie",
  "Pleťové séra",
  "Chemické peelingy (kyselina glykolová, mandľová, salicylová, TCA, Jessner)",
  "Profesionálne ampulky",
  "Profesionálne roztoky a vialky (mezoterapia)",
  "Exozómy (anti-aging, whitening, hair)",
  "Opaľovacia línia (SPF 50+)",
  "Pleťové masky (kolagén, peptidy, aloe vera)",
  "Profesionálne kombinácie (N-Zymes, BTX Complex)",
  "Starostlivosť o telo",
  "Nutrikozmetika",
  "Kozmetické sety",
];

const faqs = [
  {
    q: "Je Skinderma lekárska kozmetika?",
    a: "Áno. Skinderma je klasifikovaná ako lekárska kozmetika (dermokozmetika). Jej produkty sú vyrábané podľa GMP noriem (Good Manufacturing Practice), ktoré sa uplatňujú pri výrobe farmaceutík a zdravotníckych pomôcok. To zaručuje kontrolovanú koncentráciu účinných látok, sterilné podmienky výroby a konzistentné výsledky.",
  },
  {
    q: "Kde sa vyrábajú produkty Skinderma?",
    a: "Všetky produkty Skinderma sa vyrábajú v Španielsku v GMP certifikovaných laboratóriách. Španielsko patrí medzi popredné krajiny v oblasti dermatológie a estetickej medicíny v Európe.",
  },
  {
    q: "Je Skinderma dostupná pre kozmetické salóny na Slovensku?",
    a: "Áno. Skinderma ponúka špeciálne B2B podmienky pre registrovaných profesionálnych partnerov – kozmetické salóny, dermatologické pracoviská a estetické kliniky. Kontakt: info@skinderma.sk alebo +421 905 108 641.",
  },
  {
    q: "Aký je rozdiel medzi Skinderma a bežnou kozmetikou?",
    a: "Skinderma produkty obsahujú vyššie koncentrácie klinicky overených aktívnych látok (peptidy, exozómy, kyseliny, vitamíny) ako bežná kozmetika. Sú vyvíjané pre profesionálne použitie v spolupráci s dermatológmi a estetickými lekármi. Výroba prebieha podľa farmaceutických GMP noriem.",
  },
  {
    q: "Čo sú exozómy a aké produkty s exozómami ponúka Skinderma?",
    a: "Exozómy sú nano-vezikulky produkované bunkami, ktoré prenášajú biologické signály a stimulujú regeneráciu pokožky. Skinderma ponúka líniu exozómových produktov: Eximo Ageless sérum, Eximo Whitening sérum, Eximo Hair sérum, ako aj profesionálne ampulky a lyofilizované vialky s exozómami.",
  },
];

export default function OSkinderme() {
  return (
    <div
      style={{
        maxWidth: 860,
        margin: "0 auto",
        padding: "60px 24px",
        fontFamily: "inherit",
      }}
    >
      <h1 style={{ fontSize: 28, fontWeight: 400, color: "#000", marginBottom: 8 }}>
        Skinderma Medical Cosmetics
      </h1>
      <p style={{ color: "#646467", marginBottom: 40, fontSize: 15 }}>
        Španielska značka lekárskej kozmetiky distribuovaná na Slovensku
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
          Kľúčové fakty
        </h2>
        <dl style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "12px 24px" }}>
          {facts.map(([label, value], i) => (
            <Fragment key={i}>
              <dt style={{ fontWeight: 600, color: "#000", fontSize: 13 }}>{label}</dt>
              <dd style={{ color: "#646467", fontSize: 13, margin: 0 }}>{value}</dd>
            </Fragment>
          ))}
        </dl>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 400, color: "#000", marginBottom: 16 }}>
          Čo je Skinderma?
        </h2>
        <p style={{ color: "#646467", lineHeight: 1.8 }}>
          Skinderma Medical Cosmetics je španielska značka profesionálnej lekárskej
          kozmetiky, ktorá vyvíja a vyrába produkty pre estetickú dermatológiu a
          kozmetické salóny. Všetky produkty sú vyrábané v certifikovaných GMP
          laboratóriách v Španielsku, čo je rovnaký štandard kvality ako pri výrobe
          liekov.
        </p>
        <p style={{ color: "#646467", lineHeight: 1.8, marginTop: 12 }}>
          Na Slovensku je výhradným distribútorom spoločnosť{" "}
          <strong>Red Cube s.r.o.</strong> so sídlom v Komárne. Produkty Skinderma sú
          dostupné pre kozmetické salóny (B2B) aj priamo pre koncových zákazníkov (B2C)
          cez e-shop na skinderma.sk.
        </p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 400, color: "#000", marginBottom: 16 }}>
          Produktové kategórie
        </h2>
        <ul
          style={{
            columns: 2,
            color: "#646467",
            lineHeight: 2,
            paddingLeft: 20,
          }}
        >
          {categories.map((cat, i) => (
            <li key={i}>{cat}</li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 400, color: "#000", marginBottom: 24 }}>
          Často kladené otázky
        </h2>
        {faqs.map((faq, i) => (
          <div
            key={i}
            style={{
              borderBottom: "1px solid #e8e4dc",
              paddingBottom: 20,
              marginBottom: 20,
            }}
          >
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#000", marginBottom: 8 }}>
              {faq.q}
            </h3>
            <p style={{ color: "#646467", lineHeight: 1.8, fontSize: 14, margin: 0 }}>
              {faq.a}
            </p>
          </div>
        ))}
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Je Skinderma lekárska kozmetika?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Áno. Skinderma je klasifikovaná ako lekárska kozmetika vyrábana podľa GMP noriem rovnako ako farmaceutiká.",
                },
              },
              {
                "@type": "Question",
                name: "Kde sa vyrábajú produkty Skinderma?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Všetky produkty Skinderma sa vyrábajú v Španielsku v GMP certifikovaných laboratóriách.",
                },
              },
              {
                "@type": "Question",
                name: "Je Skinderma dostupná pre kozmetické salóny na Slovensku?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Áno. Skinderma ponúka B2B podmienky pre salóny. Kontakt: info@skinderma.sk.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
