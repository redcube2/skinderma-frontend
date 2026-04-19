import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O nás",
  description:
    "Skinderma – značka lekárskej kozmetiky s GMP certifikáciou, klinickými testami a distribúciou do 50+ krajín.",
};

export default function AboutPage() {
  return (
    <section className="container-page py-12 md:py-16">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        O nás
      </span>
      <h1 className="mt-2 text-4xl font-bold text-navy md:text-5xl">
        Budúcnosť lekárskej kozmetiky
      </h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="space-y-5 text-brand-gray">
          <p>
            Skinderma je značka lekárskej kozmetiky, ktorá spája najnovšie
            poznatky z dermatológie s profesionálnou výrobou v režime GMP. Naše
            produkty používajú dermatológovia, estetické kliniky a domáci
            používatelia v desiatkach krajín.
          </p>
          <p>
            Každá formulácia prechádza klinickým testovaním. Staviame na
            overených aktívnych zložkách a riešeniach, ktoré fungujú aj v
            reálnej praxi – nie iba v marketingu.
          </p>
          <p>
            Našou misiou je priniesť profesionálnu kvalitu dostupnú každému, kto
            berie starostlivosť o pokožku vážne.
          </p>
        </div>
        <div className="grid gap-4">
          <div className="rounded-2xl bg-cream p-6">
            <div className="text-4xl font-bold text-gold">50+</div>
            <div className="mt-1 font-semibold text-navy">krajín</div>
            <p className="mt-2 text-sm text-brand-gray">
              Distribúcia na všetkých kontinentoch.
            </p>
          </div>
          <div className="rounded-2xl bg-cream p-6">
            <div className="text-4xl font-bold text-gold">GMP</div>
            <div className="mt-1 font-semibold text-navy">certifikácia</div>
            <p className="mt-2 text-sm text-brand-gray">
              Výroba v súlade s farmaceutickými štandardmi.
            </p>
          </div>
          <div className="rounded-2xl bg-cream p-6">
            <div className="text-4xl font-bold text-gold">100%</div>
            <div className="mt-1 font-semibold text-navy">klinicky testované</div>
            <p className="mt-2 text-sm text-brand-gray">
              Každá receptúra prechádza klinickým overovaním.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
