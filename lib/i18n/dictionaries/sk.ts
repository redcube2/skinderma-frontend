import type { Dictionary } from "./types";

/**
 * Slovak — the default locale. Strings here mirror the copy that previously
 * lived inline in the page/section components verbatim.
 */
const sk: Dictionary = {
  meta: {
    siteName: "Skinderma",
    homeTitle: "Skinderma – Lekárska kozmetika | GMP certifikované produkty",
    titleTemplate: "%s | Skinderma",
    description:
      "SKINDERMA Medical Cosmetics – profesionálna lekárska kozmetika pre salóny aj domáce použitie. GMP certifikované produkty distribuované do 50+ krajín.",
    ogTitle: "Skinderma – Lekárska kozmetika | GMP certifikované produkty",
    ogDescription:
      "GMP certifikovaná lekárska kozmetika. Peelingy, séra a profesionálne produkty pre zdravú pokožku.",
  },

  nav: {
    home: "Domov",
    shop: "Obchod",
    skincare: "Starostlivosť o pleť",
    forPros: "Pre profesionálov",
    about: "O Nás",
    contact: "Kontakt",
    news: "Novinky",
    cartAria: "Košík",
    openMenu: "Otvoriť menu",
    closeMenu: "Zavrieť menu",
    homeAria: "Skinderma – domov",
    skincareChildren: [
      {
        href: "/product-category/pletove-kremy-a-pletove-emulzie",
        label: "Pleťové krémy a emulzie",
      },
      { href: "/product-category/pletove-sera", label: "Pleťové séra" },
      {
        href: "/product-category/opalovacia-a-fotoprotektivna-linia",
        label: "Opaľovacia línia",
      },
      {
        href: "/product-category/starostlivost-o-telo",
        label: "Starostlivosť o telo",
      },
      { href: "/product-category/nutrikozmetika", label: "Nutrikozmetika" },
      { href: "/product-category/masky", label: "Masky" },
    ],
    forProsChildren: [
      {
        href: "/product-category/profesionalne-ampulky",
        label: "Profesionálne ampulky",
      },
      {
        href: "/product-category/profesionalne-roztoky-vialky",
        label: "Profesionálne roztoky/vialky",
      },
      {
        href: "/product-category/profesionalne-kombinacie",
        label: "Profesionálne kombinácie",
      },
      {
        href: "/product-category/chemicke-peelingy",
        label: "Chemické peelingy",
      },
      { href: "/product-category/kozmeticke-sety", label: "Kozmetické sety" },
      { href: "/product-category/pletove-masky", label: "Pleťové masky" },
      { href: "/product-category/exozomy", label: "Exozómy" },
    ],
  },

  langSwitcher: {
    label: "Jazyk",
  },

  banner: {
    contactLabel: "Kontakt:",
  },

  footer: {
    aboutLink: "O Skinderme",
    delivery: "Dodanie a platba",
    withdrawal: "Odstúpenie od zmluvy",
    terms: "Obchodné podmienky",
    complaints: "Reklamačný poriadok",
    partnership: "Partnerstvo",
    privacy: "Ochrana osobných údajov",
    company:
      "Red cube s.r.o. | IČO: 44137265 | DIČ: 2022614341 | IČ DPH: SK2022614341",
    rights: "Skinderma",
    poweredBy: "Powered by Red cube s.r.o.",
  },

  home: {
    hero: {
      eyebrow: "Lekárska kozmetika",
      titleLines: ["Budúcnosť", "lekárskej", "kozmetiky"],
      lead: "GMP certifikované produkty pre profesionálov aj domáce použitie. Distribuované do viac ako 50 krajín sveta.",
      ctaExplore: "Preskúmať",
      ctaAbout: "O nás",
      imageAlt: "Skinderma sérum",
    },
    sady: {
      eyebrow: "Domáca starostlivosť",
      title: "Nájdite svoju ideálnu domácu rutinu",
      subtitle:
        "Profesionálna kozmetika prispôsobená vašej pleti — vybraná kozmetičkami a dermatológmi",
      cta: "Zobraziť sadu",
      savingsLabel: "Úspora:",
      items: [
        {
          title: "Suchá pleť",
          description:
            "Hydratačná rutina pre pleť, ktorá vyžaduje viac vlhkosti.",
        },
        {
          title: "Mastná pleť",
          description:
            "Vyrovná produkciu kožného mazu, sťahuje póry, redukuje lesk.",
        },
        {
          title: "Aknózna pleť",
          description: "Cielená starostlivosť pre pleť so sklonom k akné.",
        },
        {
          title: "Citlivá pleť",
          description: "Upokojuje začervenanie, posilňuje ochrannú bariéru.",
        },
        {
          title: "Anti-aging",
          description:
            "Komplexná starostlivosť proti známkam starnutia, pre pleť 40+.",
        },
      ],
    },
    marquee: [
      "GMP Certified",
      "50+ Krajín",
      "Farmaceutická kvalita",
      "Klinicky testované",
      "Profesionálna formulácia",
      "Medicínska kozmetika",
    ],
    stats: [
      { label: "Krajín sveta" },
      { label: "Produktov" },
      { label: "Rokov vývoja" },
      { label: "GMP Certified" },
    ],
    featured: {
      eyebrow: "Kolekcia",
      title: "Vybrané produkty",
      viewAll: "Všetky produkty",
      goToShop: "Prejsť do obchodu",
      withVat: "s DPH",
      saleBadge: "Akcia",
    },
    parallax: {
      eyebrow: "Klinická formulácia",
      titleLines: ["Veda sa stretáva", "s pokožkou"],
      cta: "Preskúmať kolekciu",
      imageAlt: "Clinical formula",
    },
    categories: {
      eyebrow: "Kategórie",
      title: "Preskúmajte sortiment",
      productOne: "produkt",
      productFew: "produkty",
      productMany: "produktov",
      view: "Zobraziť",
    },
    skinia: {
      eyebrow: "Exkluzívna ponuka",
      titleLines: ["Profesionálne nástroje", "pre váš salón"],
      bodyHtml:
        "Pri nákupe Skinderma produktov nad <strong>200€</strong> získate <strong>dopravu zdarma</strong> a <strong>1 mesiac softvéru Skinia zdarma</strong> — kompletný systém pre správu klientov, AI protokoly a online rezervácie.",
      bullets: [
        "Doprava zdarma pri objednávke nad 200€",
        "1 mesiac Skinia softvéru zdarma",
        "Správa klientov, AI protokoly, online booking",
        "Bez záväzkov — zrušenie kedykoľvek",
      ],
      platformLabel: "Skinia Platform",
      platformTitle: "AI-powered salón softvér",
      features: [
        {
          title: "Klientsky manažment",
          desc: "Karty klientov, história, súhlasy",
        },
        {
          title: "AI Protokoly",
          desc: "Personalizované ošetrenia na základe analýzy pleti",
        },
        {
          title: "Online booking",
          desc: "Rezervácie 24/7, automatické notifikácie",
        },
        {
          title: "Homecare plány",
          desc: "Produktové odporúčania pre domácu starostlivosť",
        },
      ],
      offerLabel: "Pri nákupe nad 200€",
      offerValue: "1 mesiac ZDARMA",
      ctaSkinia: "Pozrieť Skinia.eu",
      ctaProducts: "Objednať produkty",
    },
    b2b: {
      eyebrow: "Pre profesionálov",
      titleLines: ["Ste kozmetičkou", "alebo prevádzkovateľom salóna?"],
      body: "Skinderma ponúka špeciálne podmienky pre registrovaných profesionálnych partnerov — vrátane exkluzívnych cien, prednostného zásobovania a odbornej podpory.",
      ctaRegister: "Zaregistrovať sa ako partner",
      ctaContact: "Kontaktovať nás",
      note: "Registrácia je bezplatná a nezáväzná.",
      items: [
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
      ],
    },
    usp: [
      {
        label: "GMP Certified",
        title: "GMP certifikácia",
        desc: "Všetky produkty spĺňajú prísne GMP normy farmaceutickej výroby.",
      },
      {
        label: "Clinically Tested",
        title: "Klinicky testované",
        desc: "Každá formula je overená dermatológmi a klinickými štúdiami.",
      },
      {
        label: "50+ Countries",
        title: "Globálna sieť",
        desc: "Medzinárodná sieť distribútorov vo viac ako 50 krajinách sveta.",
      },
    ],
    gallery: {
      eyebrow: "Galéria",
      title: "Produkty v detaile",
    },
    faq: {
      eyebrow: "Časté otázky",
      title: "Odpovede, ktoré hľadáte",
      items: [
        {
          q: "Aký je rozdiel medzi lekárskou kozmetikou a bežnou kozmetikou?",
          a: "Lekárska kozmetika (dermokozmetika) sa vyznačuje vyššou koncentráciou aktívnych látok, vedecky podloženými formuláciami a klinickými štúdiami preukazujúcimi jej účinnosť. Je vyvíjaná v spolupráci s dermatológmi a je určená na riešenie špecifických kožných problémov, zatiaľ čo bežná kozmetika sa zameriava skôr na povrchovú starostlivosť a hydratáciu.",
        },
        {
          q: "Ako si môžem vybrať správne produkty pre môj typ pleti?",
          a: "Pre optimálny výber produktov odporúčame využiť našu osobnú konzultáciu, kde vám naši odborníci pomôžu s diagnostikou pleti a odporučia ideálne riešenia na mieru. V popise každého produktu nájdete aj informácie o tom, pre aký typ pleti a problémy je určený.",
        },
        {
          q: "Môžem si produkty vyzdvihnúť osobne?",
          a: "Áno, vybrané produkty si môžete osobne vyzdvihnúť v našom kozmetickom salóne SKIN Beauty House na adrese ul. Mieru 4235, Komárno alebo na adrese Nám. M. R. Štefánika 16, 945 01 Komárno, po predchádzajúcej dohode alebo potvrdení, že je vaša objednávka pripravená na vyzdvihnutie.",
        },
        {
          q: "Čo je GMP certifikácia?",
          a: "GMP (Good Manufacturing Practice) sú prísne farmaceutické výrobné normy, ktoré zaručujú maximálnu čistotu, bezpečnosť a konzistenciu každého produktu Skinderma. Táto certifikácia je rovnaká ako pri výrobe liekov – garanciou najvyššej kvality.",
        },
        {
          q: "Kde sa produkty Skinderma vyrábajú?",
          a: "Skinderma Medical Cosmetics je španielska značka. Všetky produkty sa vyrábajú v certifikovaných GMP laboratóriách v Španielsku podľa prísnych farmaceutických štandardov. Španielska kozmetika sa dlhodobo radí medzi európsku špičku v oblasti medicínskej estetiky.",
        },
        {
          q: "Aká je dodacia lehota?",
          a: "Produkty skladom doručujeme do 2–5 pracovných dní. Produkty, ktoré nie sú momentálne skladom a vyrábajú sa na objednávku, majú dodaciu lehotu približne 1 mesiac. Informáciu o dostupnosti nájdete v detaile produktu, alebo nás kontaktujte.",
        },
        {
          q: "Môžem vrátiť produkt?",
          a: "Áno – máte právo odstúpiť od zmluvy do 14 dní bez udania dôvodu. Výnimkou sú otvorené hygienické produkty, pri ktorých bol porušený ochranný obal.",
        },
        {
          q: "Získam prístup k softvéru Skinia.eu?",
          a: "Áno – pri nákupe nad 200 € získate 1 mesiac prémiového prístupu k platforme Skinia.eu zdarma. Skinia je kompletný softvér pre správu salóna: klientske karty, AI protokoly, online rezervácie a homecare plány.",
        },
      ],
    },
    diagnostika: {
      eyebrow: "Salón SKIN Beauty House, Komárno",
      title: "Diagnostika pleti zdarma pri nákupe domácej rutiny",
      body: "Nie ste si istá, ktorá rutina je pre vás vhodná? Príďte do salónu SKIN Beauty House v Komárne — naša kozmetička urobí profesionálnu analýzu pleti pomocou AI analyzátora Maicet Pro a odporučí vám správnu starostlivosť.",
      benefits: [
        "Profesionálna AI analýza pleti (Maicet Pro)",
        "Personalizované odporúčanie produktov podľa typu pleti",
        "Zdarma pri nákupe domácej rutiny alebo produktov Skinderma",
      ],
      cta: "Rezervovať diagnostiku",
      address:
        "SKIN Beauty House • Ul. Mieru 4235, Komárno • Tel: 0905 108 641",
    },
  },

  about: {
    metaTitle: "O nás | Skinderma Medical Cosmetics",
    metaDescription:
      "Skinderma Medical Cosmetics – španielska lekárska kozmetika distribuovaná na Slovensku spoločnosťou Red Cube s.r.o.",
    heroEyebrow: "O nás",
    heroTitleLines: ["Budúcnosť", "lekárskej kozmetiky"],
    quote:
      "„V Skinderma veríme, že krása je výsledkom vedy a individuálnej starostlivosti. Ponúkame prelomové riešenia pre zdravú a žiarivú pleť.“",
    quoteAuthor: "SKINDERMA MEDICAL COSMETICS",
    brandHeading: "O značke Skinderma",
    brandParagraphs: [
      "Skinderma Medical Cosmetics je španielska značka lekárskej kozmetiky vyvíjaná v spolupráci s dermatológmi a estetickými lekármi. Všetky produkty sú vyrábané v certifikovaných GMP laboratóriách podľa prísnych farmaceutických štandardov.",
      "Naše produkty kombinujú najmodernejšie biotechnologické ingrediencie — od peptidov a exozómov až po kyseliny a antioxidanty — s cieľom prinášať viditeľné výsledky pre každý typ pleti.",
      "Značka je distribuovaná do viac ako 50 krajín sveta. Na Slovensku je výhradným distribútorom spoločnosť Red Cube s.r.o.",
    ],
    founderLabel: "Od zakladateľa",
    founderQuote:
      "„S Red Cube s.r.o. sme vždy chceli prinášať nielen produkty, ale aj komplexné know-how a podporu pre kozmetických profesionálov. Spojením s Skindermou plníme túto víziu – sprístupňujeme špičkovú lekársku kozmetiku a technológie, ktoré naozaj menia životy k lepšiemu. Vaša spokojnosť a dôvera sú pre nás najväčšou odmenou.“",
    founderName: "Ing. Ramón Novosád",
    founderRole: "Zakladateľ · Red Cube s.r.o.",
    pillars: [
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
    ],
    ctaText: "Máte otázky alebo záujem o spoluprácu?",
    ctaButton: "Kontaktujte nás",
  },

  contact: {
    metaTitle: "Kontakt | Skinderma",
    metaDescription:
      "Kontaktné údaje Skinderma – Red Cube s.r.o., Komárno. Formulár pre reklamácie, odstúpenie a otázky.",
    eyebrow: "Kontakt",
    title: "Napíšte nám",
    sellerHeading: "Predávajúci",
    sellerLines: [
      "Red Cube s.r.o.",
      "Nám. M.R. Štefánika 16",
      "945 01 Komárno",
      "Slovenská republika",
    ],
    idHeading: "Identifikácia",
    idLabels: { ico: "IČO:", dic: "DIČ:", icDph: "IČ DPH:" },
    contactHeading: "Kontakt",
    emailLabel: "E-mail:",
    phoneLabel: "Telefón:",
    hours:
      "Na bežné otázky odpovedáme do 24 hodín (pracovné dni 9:00 – 17:00).",
    adrHeading: "Alternatívne riešenie sporov",
    adrText:
      "Spotrebiteľ má právo obrátiť sa na platformu ARS Európskej komisie:",
    adrLinkLabel: "https://ec.europa.eu/consumers/odr",
    formHeading: "Sťažnosť / spätná väzba",
    formIntro:
      "Napíšte nám reklamáciu, žiadosť o odstúpenie od zmluvy alebo bežnú otázku. Odpovieme do 48 hodín.",
    form: {
      subjects: [
        "Reklamácia",
        "Odstúpenie od zmluvy",
        "Sťažnosť",
        "Otázka k objednávke",
        "Iné",
      ],
      name: "Meno",
      email: "E-mail",
      subject: "Predmet",
      message: "Správa",
      submit: "Odoslať správu",
      sending: "Odosielam…",
      successTitle: "Správa odoslaná. Odpovieme do 48 hodín.",
      errorText:
        "Správu sa nepodarilo odoslať. Skúste to prosím znova alebo nám napíšte priamo na info@skinderma.sk.",
    },
  },

  oSkinderme: {
    metaTitle: "O Skinderma Medical Cosmetics | Fakty a informácie",
    metaDescription:
      "Fakty o Skinderma Medical Cosmetics – španielska lekárska kozmetika, GMP certifikácia, distribúcia na Slovensku cez Red Cube s.r.o.",
    title: "Skinderma Medical Cosmetics",
    subtitle:
      "Španielska značka lekárskej kozmetiky distribuovaná na Slovensku",
    keyFactsHeading: "Kľúčové fakty",
    facts: [
      ["Plný názov", "Skinderma Medical Cosmetics"],
      ["Krajina pôvodu", "Španielsko"],
      [
        "Typ certifikácie",
        "GMP (Good Manufacturing Practice) – farmaceutický štandard",
      ],
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
    ],
    whatHeading: "Čo je Skinderma?",
    whatParagraphs: [
      "Skinderma Medical Cosmetics je španielska značka profesionálnej lekárskej kozmetiky, ktorá vyvíja a vyrába produkty pre estetickú dermatológiu a kozmetické salóny. Všetky produkty sú vyrábané v certifikovaných GMP laboratóriách v Španielsku, čo je rovnaký štandard kvality ako pri výrobe liekov.",
      "Na Slovensku je výhradným distribútorom spoločnosť Red Cube s.r.o. so sídlom v Komárne. Produkty Skinderma sú dostupné pre kozmetické salóny (B2B) aj priamo pre koncových zákazníkov (B2C) cez e-shop na skinderma.sk.",
    ],
    categoriesHeading: "Produktové kategórie",
    categories: [
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
    ],
    faqHeading: "Často kladené otázky",
    faqs: [
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
    ],
  },

  cookies: {
    metaTitle: "Cookies | Skinderma",
    title: "Cookies",
    body: "Obsah bude doplnený.",
  },

  partnership: {
    metaTitle: "Partnerstvo – Spolupráca so salónmi | Skinderma",
    metaDescription:
      "Staňte sa partnerským salónom Skinderma. Získajte exkluzívne partnerské ceny, školenia, certifikované produkty a dedikovaný account manager pre váš salón.",
    heroEyebrow: "Pre kozmetické salóny",
    heroTitle: "Partnerstvo so Skinderma",
    heroLead:
      "Staňte sa partnerským salónom Skinderma a ponúknite svojim klientom lekársku kozmetiku španielskej kvality. Získate profesionálne ceny, odborné školenia a nepretržitú podporu — všetko na jednom mieste.",
    ctaApply: "Požiadať o partnerstvo",
    ctaLearnMore: "Zistiť viac",
    offerEyebrow: "Čo získate",
    offerTitle: "Výhody partnerského salónu",
    offerLead:
      "Partnerstvo so Skinderma je viac ako len nákup produktov — je to dlhodobá spolupráca navrhnutá pre rast vášho salónu.",
    benefits: [
      {
        num: "01",
        title: "Profesionálne ceny",
        text: "Exkluzívny B2B cenník s výraznými zľavami oproti maloobchodným cenám. Objem objednávky priamo ovplyvňuje výšku zľavy.",
      },
      {
        num: "02",
        title: "Školenia a podpora",
        text: "Odborné produktové školenia, protokoly ošetrení a marketingové materiály. Zostanete vždy o krok napred.",
      },
      {
        num: "03",
        title: "Dedikovaný account manager",
        text: "Osobný kontakt, ktorý pozná váš salón. Rýchle riešenie otázok, objednávok aj reklamácií.",
      },
      {
        num: "04",
        title: "Certifikované produkty",
        text: "Všetky produkty Skinderma sú vyrobené v GMP certifikovaných laboratóriách a klinicky testované dermatológmi.",
      },
    ],
    stepsEyebrow: "Postup schválenia",
    stepsTitle: "Ako to funguje",
    steps: [
      {
        step: "1",
        title: "Odošlite žiadosť",
        text: "Vyplňte formulár nižšie. Stačí základné údaje o salóne — celý proces trvá menej ako 3 minúty.",
      },
      {
        step: "2",
        title: "Preveríme žiadosť",
        text: "Do 2 pracovných dní váš salón preveríme a pripravíme individuálnu ponuku. Ozveme sa priamo na váš e-mail.",
      },
      {
        step: "3",
        title: "Privítací balíček",
        text: "Po schválení získate prístup do B2B portálu, vzorky produktov a kompletné materiály pre váš tím.",
      },
    ],
    formEyebrow: "Partnerská žiadosť",
    formTitle: "Kontaktujte nás",
    formIntro:
      "Vyplňte formulár a my sa vám ozveme do 2 pracovných dní. Všetky polia označené hviezdičkou (*) sú povinné.",
    contactHelpBefore: "Máte otázky? Napíšte nám priamo na ",
    contactHelpMid: " alebo zavolajte na ",
    contactHelpAfter: ".",
    form: {
      required: "Povinné pole",
      icoLength: "IČO musí mať presne 8 číslic",
      invalidEmail: "Neplatná e-mailová adresa",
      consentRequired: "Súhlas je povinný",
      salonName: "Názov salónu *",
      salonNamePlaceholder: "Napr. Beauty Studio Bratislava",
      ico: "IČO *",
      icoPlaceholder: "12345678",
      address: "Adresa prevádzky *",
      addressPlaceholder: "Napr. Obchodná 12, 811 06 Bratislava",
      contactPerson: "Kontaktná osoba *",
      contactPersonPlaceholder: "Meno a priezvisko",
      position: "Pozícia / funkcia",
      positionPlaceholder: "Napr. Majiteľ, Manažér",
      emailLabel: "Email *",
      emailPlaceholder: "email@salon.sk",
      phone: "Telefón *",
      phonePlaceholder: "+421 9XX XXX XXX",
      web: "Web alebo Instagram/Facebook *",
      webPlaceholder: "napr. www.vasalon.sk alebo @vasalon",
      shortMessage: "Krátka správa",
      shortMessagePlaceholder:
        "Čo vás zaujíma? Aké produkty používate? Krátko sa predstavte.",
      consentBefore: "Súhlasím so spracovaním osobných údajov podľa ",
      consentLink: "Zásad ochrany osobných údajov",
      consentAfter: "*",
      submit: "Odoslať žiadosť",
      sending: "Odosielam…",
      successTitle: "Žiadosť bola odoslaná",
      successText:
        "Ďakujeme za váš záujem o partnerstvo so Skinderma. Vašu žiadosť sme prijali a odpovieme do 2 pracovných dní.",
      errorBefore:
        "Žiadosť sa nepodarilo odoslať. Skúste to prosím znova alebo nás kontaktujte priamo na ",
      errorAfter: ".",
    },
  },

  blog: {
    metaTitle: "Blog",
    metaDescription:
      "Články o starostlivosti o pleť, ošetreniach a novinkách zo sveta lekárskej kozmetiky Skinderma.",
    eyebrow: "Blog",
    title: "Novinky a rady",
    subtitle:
      "Odborné články o starostlivosti o pleť a produktoch Skinderma.",
    empty: "Zatiaľ nie sú publikované žiadne články.",
    minRead: "min čítania",
    breadcrumbHome: "Domov",
    breadcrumbBlog: "Blog",
    slovakContentNote: "",
    readArticle: "Čítať článok",
  },

  notFound: {
    title: "Stránka sa nenašla",
    body: "Ľutujeme, požadovaná stránka neexistuje alebo bola presunutá.",
    cta: "Späť na domovskú stránku",
  },
};

export default sk;

