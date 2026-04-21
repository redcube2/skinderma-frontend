"use client";

import { useRef, useState } from "react";

const faqs = [
  {
    q: "Aký je rozdiel medzi lekárskou kozmetikou a bežnou kozmetikou?",
    a: "Lekárska kozmetika (dermokozmetika) sa vyznačuje vyššou koncentráciou aktívnych látok, vedecky podloženými formuláciami a klinickými štúdiami preukazujúcimi jej účinnosť. Je vyvíjaná v spolupráci s dermatológmi a je určená na riešenie špecifických kožných problémov, zatiaľ čo bežná kozmetika sa zameriava skôr na povrchovú starostlivosť a hydratáciu."
  },
  {
    q: "Ako si môžem vybrať správne produkty pre môj typ pleti?",
    a: "Pre optimálny výber produktov odporúčame využiť našu osobnú konzultáciu, kde vám naši odborníci pomôžu s diagnostikou pleti a odporučia ideálne riešenia na mieru. V popise každého produktu nájdete aj informácie o tom, pre aký typ pleti a problémy je určený."
  },
  {
    q: "Môžem si produkty vyzdvihnúť osobne?",
    a: "Áno, vybrané produkty si môžete osobne vyzdvihnúť v našom kozmetickom salóne SKIN Beauty House na adrese ul. Mieru 4235, Komárno alebo na adrese Nám. M. R. Štefánika 16, 945 01 Komárno, po predchádzajúcej dohode alebo potvrdení, že je vaša objednávka pripravená na vyzdvihnutie."
  },
  {
    q: "Čo je GMP certifikácia?",
    a: "GMP (Good Manufacturing Practice) sú prísne farmaceutické výrobné normy, ktoré zaručujú maximálnu čistotu, bezpečnosť a konzistenciu každého produktu Skinderma. Táto certifikácia je rovnaká ako pri výrobe liekov – garanciou najvyššej kvality."
  },
  {
    q: "Kde sa produkty Skinderma vyrábajú?",
    a: "Skinderma Medical Cosmetics je španielska značka. Všetky produkty sa vyrábajú v certifikovaných GMP laboratóriách v Španielsku podľa prísnych farmaceutických štandardov. Španielska kozmetika sa dlhodobo radí medzi európsku špičku v oblasti medicínskej estetiky."
  },
  {
    q: "Aká je dodacia lehota?",
    a: "Produkty skladom doručujeme do 2–5 pracovných dní. Produkty, ktoré nie sú momentálne skladom a vyrábajú sa na objednávku, majú dodaciu lehotu približne 1 mesiac. Informáciu o dostupnosti nájdete v detaile produktu, alebo nás kontaktujte."
  },
  {
    q: "Môžem vrátiť produkt?",
    a: "Áno – máte právo odstúpiť od zmluvy do 14 dní bez udania dôvodu. Výnimkou sú otvorené hygienické produkty, pri ktorých bol porušený ochranný obal."
  },
  {
    q: "Získam prístup k softvéru Skinia.eu?",
    a: "Áno – pri nákupe nad 200 € získate 1 mesiac prémiového prístupu k platforme Skinia.eu zdarma. Skinia je kompletný softvér pre správu salóna: klientske karty, AI protokoly, online rezervácie a homecare plány."
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ borderBottom: "1px solid #000" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 0",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          color: "#000",
          fontSize: "clamp(16px, 1.4vw, 18px)",
          fontWeight: 400,
          fontFamily: "inherit",
        }}
      >
        <span>{q}</span>
        <span
          style={{
            fontSize: 24,
            fontWeight: 300,
            marginLeft: 16,
            transition: "transform 0.3s ease",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            display: "inline-block",
            lineHeight: 1,
          }}
          aria-hidden
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? (contentRef.current?.scrollHeight ?? 400) : 0,
          overflow: "hidden",
          transition: "max-height 0.4s ease",
        }}
      >
        <div
          ref={contentRef}
          style={{
            padding: "0 0 24px 0",
            color: "#646467",
            fontSize: 15,
            lineHeight: 1.7,
            maxWidth: 760,
          }}
        >
          {a}
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section
      style={{
        background: "#fff",
        padding: "96px 24px",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <p
          style={{
            color: "#646467",
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Časté otázky
        </p>
        <h2
          style={{
            color: "#000",
            fontSize: "clamp(28px, 3vw, 48px)",
            fontWeight: 300,
            lineHeight: 1.2,
            marginBottom: 56,
          }}
        >
          Odpovede, ktoré hľadáte
        </h2>
        <div>
          {faqs.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
