import type { Metadata } from "next";
import WithdrawalForm from "./WithdrawalForm";

export const metadata: Metadata = {
  title: "Odstúpenie od zmluvy",
  description:
    "Informácie o práve na odstúpenie od zmluvy v 14-dňovej lehote a formulár pre žiadosť.",
};

export default function WithdrawalPage() {
  return (
    <section className="container-page py-12 md:py-16">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Právne informácie
      </span>
      <h1 className="mt-2 text-4xl font-bold text-navy md:text-5xl">
        Odstúpenie od zmluvy
      </h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6 text-brand-gray">
          <div>
            <h2 className="text-lg font-semibold text-navy">
              Právo odstúpiť do 14 dní
            </h2>
            <p className="mt-2">
              Máte právo odstúpiť od kúpnej zmluvy bez udania dôvodu do
              14 dní odo dňa prevzatia tovaru.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy">Výnimka</h2>
            <p className="mt-2">
              Právo na odstúpenie sa nevzťahuje na tovar, ktorý bol
              otvorený alebo použitý, a vzhľadom na hygienickú povahu nie
              je možné jeho vrátenie – v súlade s § 7 ods. 6 zákona
              č. 102/2014 Z. z.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy">Postup</h2>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              <li>
                Zašlite e-mail na{" "}
                <a
                  href="mailto:info@skinderma.sk"
                  className="text-gold hover:text-gold-dark"
                >
                  info@skinderma.sk
                </a>{" "}
                alebo vyplňte formulár.
              </li>
              <li>
                Vráťte tovar neporušený a nepoužitý, ideálne v pôvodnom
                obale.
              </li>
              <li>
                Peniaze vám vrátime do 14 dní od doručenia tovaru na
                účet, z ktorého bola platba uhradená.
              </li>
            </ol>
          </div>

          <div className="rounded-2xl bg-cream p-5 text-sm">
            <div className="font-semibold text-navy">
              Adresa na vrátenie
            </div>
            <div className="mt-2">
              Red Cube s.r.o.
              <br />
              Nám. M.R. Štefánika 16
              <br />
              945 01 Komárno
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-navy">
            Formulár na odstúpenie
          </h2>
          <p className="mt-2 text-sm text-brand-gray">
            Vyplňte žiadosť a my vás budeme kontaktovať s ďalšími krokmi.
          </p>
          <WithdrawalForm />
        </div>
      </div>
    </section>
  );
}
