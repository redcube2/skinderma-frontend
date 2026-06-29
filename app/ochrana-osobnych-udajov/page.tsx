import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ochrana osobných údajov | Skinderma",
  description:
    "Zásady spracúvania a ochrany osobných údajov (GDPR) na www.skinderma.sk – prevádzkovateľ, účely, právne základy, vaše práva a kontakt.",
  alternates: { canonical: "https://www.skinderma.sk/ochrana-osobnych-udajov" },
};

export default function OchranaOsobnychUdajov() {
  return (
    <section className="container-page py-12 md:py-16">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Právne informácie
      </span>
      <h1 className="mt-2 text-4xl font-bold text-navy md:text-5xl">
        Ochrana osobných údajov
      </h1>
      <p className="mt-3 text-sm text-brand-gray">
        Účinné od 1. mája 2026
      </p>

      <div className="mt-10 max-w-3xl space-y-10 text-brand-gray">
        <p>
          Tieto zásady opisujú, ako spoločnosť Red Cube s.r.o. ako
          prevádzkovateľ spracúva a chráni osobné údaje návštevníkov a
          zákazníkov internetovej stránky{" "}
          <span className="whitespace-nowrap">www.skinderma.sk</span>. Pri
          spracúvaní postupujeme v súlade s Nariadením Európskeho parlamentu a
          Rady (EÚ) 2016/679 (ďalej len „GDPR“) a zákonom č. 18/2018 Z. z. o
          ochrane osobných údajov.
        </p>

        {/* Prevádzkovateľ */}
        <div>
          <h2 className="text-lg font-semibold text-navy">
            1. Prevádzkovateľ
          </h2>
          <p className="mt-2">
            Prevádzkovateľom, ktorý určuje účely a prostriedky spracúvania
            osobných údajov, je:
          </p>
          <div className="mt-3 rounded-2xl bg-cream p-5 text-sm">
            <div className="font-semibold text-navy">Red Cube s.r.o.</div>
            <div className="mt-2">
              Nám. M.R. Štefánika 16
              <br />
              945 01 Komárno
              <br />
              IČO: 44137265
              <br />
              DIČ: 2022614341
              <br />
              IČ DPH: SK2022614341
            </div>
            <div className="mt-3">
              E-mail:{" "}
              <a
                href="mailto:info@skinderma.sk"
                className="text-gold hover:text-gold-dark"
              >
                info@skinderma.sk
              </a>
            </div>
          </div>
        </div>

        {/* Aké údaje spracúvame */}
        <div>
          <h2 className="text-lg font-semibold text-navy">
            2. Aké údaje spracúvame
          </h2>
          <p className="mt-2">
            V závislosti od toho, ako stránku používate, môžeme spracúvať
            najmä:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              identifikačné a kontaktné údaje – meno, priezvisko, e-mail,
              telefónne číslo, adresa;
            </li>
            <li>
              údaje o objednávke a platbe – obsah objednávky, fakturačné a
              dodacie údaje, história nákupov;
            </li>
            <li>
              údaje z formulárov – obsah správ zaslaných cez kontaktný a
              partnerský formulár;
            </li>
            <li>
              technické údaje – IP adresa, typ prehliadača, údaje o správaní
              na stránke a cookies.
            </li>
          </ul>
        </div>

        {/* Účely a právne základy */}
        <div>
          <h2 className="text-lg font-semibold text-navy">
            3. Účely a právne základy spracúvania
          </h2>
          <ul className="mt-2 space-y-3">
            <li>
              <span className="font-medium text-navy">
                Vybavenie objednávky a plnenie zmluvy
              </span>{" "}
              – právny základ: plnenie zmluvy podľa čl. 6 ods. 1 písm. b)
              GDPR.
            </li>
            <li>
              <span className="font-medium text-navy">
                Plnenie zákonných povinností
              </span>{" "}
              (účtovníctvo, daňové a reklamačné povinnosti) – právny základ:
              zákonná povinnosť podľa čl. 6 ods. 1 písm. c) GDPR.
            </li>
            <li>
              <span className="font-medium text-navy">
                Vybavenie dopytov z formulárov
              </span>{" "}
              – právny základ: oprávnený záujem podľa čl. 6 ods. 1 písm. f)
              GDPR (odpoveď na vašu žiadosť).
            </li>
            <li>
              <span className="font-medium text-navy">
                Analytika a zlepšovanie stránky
              </span>{" "}
              – právny základ: súhlas podľa čl. 6 ods. 1 písm. a) GDPR
              udelený cez nastavenia cookies.
            </li>
          </ul>
        </div>

        {/* Príjemcovia */}
        <div>
          <h2 className="text-lg font-semibold text-navy">
            4. Príjemcovia a sprostredkovatelia
          </h2>
          <p className="mt-2">
            Osobné údaje môžu byť sprístupnené dôveryhodným partnerom, ktorí
            ich spracúvajú v našom mene na základe zmluvy o spracúvaní:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>poskytovateľ webhostingu a serverovej infraštruktúry;</li>
            <li>doručovacie a kuriérske spoločnosti;</li>
            <li>poskytovatelia platobných služieb;</li>
            <li>
              poskytovatelia analytických a marketingových nástrojov –
              Hotjar (analýza správania), Google;
            </li>
            <li>účtovná a právna kancelária.</li>
          </ul>
          <p className="mt-2">
            Osobné údaje neprenášame do tretích krajín mimo EÚ/EHP s výnimkou
            prípadov, keď to umožňuje GDPR a sú zabezpečené primerané záruky.
          </p>
        </div>

        {/* Doba uchovávania */}
        <div>
          <h2 className="text-lg font-semibold text-navy">
            5. Doba uchovávania
          </h2>
          <p className="mt-2">
            Osobné údaje uchovávame len po dobu nevyhnutnú na dosiahnutie
            účelu, prípadne po dobu vyžadovanú právnymi predpismi – napríklad
            účtovné a daňové doklady uchovávame 10 rokov. Údaje spracúvané na
            základe súhlasu uchovávame do jeho odvolania.
          </p>
        </div>

        {/* Cookies */}
        <div>
          <h2 className="text-lg font-semibold text-navy">6. Cookies</h2>
          <p className="mt-2">
            Stránka používa súbory cookies na zabezpečenie základnej
            funkčnosti a – na základe vášho súhlasu – aj na analytické účely.
            Podrobnosti nájdete v{" "}
            <Link href="/cookies" className="text-gold hover:text-gold-dark">
              zásadách používania cookies
            </Link>
            .
          </p>
        </div>

        {/* Práva dotknutej osoby */}
        <div>
          <h2 className="text-lg font-semibold text-navy">
            7. Vaše práva
          </h2>
          <p className="mt-2">
            Ako dotknutá osoba máte podľa GDPR právo:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>na prístup k svojim osobným údajom;</li>
            <li>na opravu nesprávnych alebo neúplných údajov;</li>
            <li>na vymazanie údajov („právo na zabudnutie“);</li>
            <li>na obmedzenie spracúvania;</li>
            <li>na prenosnosť údajov;</li>
            <li>namietať proti spracúvaniu;</li>
            <li>
              kedykoľvek odvolať udelený súhlas bez vplyvu na zákonnosť
              spracúvania pred jeho odvolaním.
            </li>
          </ul>
          <p className="mt-2">
            Svoje práva si môžete uplatniť e-mailom na{" "}
            <a
              href="mailto:info@skinderma.sk"
              className="text-gold hover:text-gold-dark"
            >
              info@skinderma.sk
            </a>
            . Vašu žiadosť vybavíme bez zbytočného odkladu, najneskôr do 1
            mesiaca.
          </p>
        </div>

        {/* Dozorný orgán */}
        <div>
          <h2 className="text-lg font-semibold text-navy">
            8. Dozorný orgán
          </h2>
          <p className="mt-2">
            Ak sa domnievate, že spracúvaním vašich osobných údajov došlo k
            porušeniu predpisov, máte právo podať sťažnosť dozornému orgánu:
          </p>
          <div className="mt-3 rounded-2xl bg-cream p-5 text-sm">
            <div className="font-semibold text-navy">
              Úrad na ochranu osobných údajov Slovenskej republiky
            </div>
            <div className="mt-2">
              Hraničná 12
              <br />
              820 07 Bratislava 27
              <br />
              <a
                href="https://www.dataprotection.gov.sk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-dark"
              >
                www.dataprotection.gov.sk
              </a>
            </div>
          </div>
        </div>

        {/* Zmeny */}
        <div>
          <h2 className="text-lg font-semibold text-navy">
            9. Zmeny zásad
          </h2>
          <p className="mt-2">
            Tieto zásady môžeme priebežne aktualizovať. Aktuálne znenie je
            vždy zverejnené na tejto stránke s uvedením dátumu účinnosti.
          </p>
        </div>
      </div>
    </section>
  );
}
