import type { Dictionary } from "./types";

/**
 * Hungarian (hu) — served under /hu. Translation of the Slovak source copy; no
 * new product claims were introduced. Commerce/legal links stay pointed at the
 * Slovak WooCommerce apex.
 */
const hu: Dictionary = {
  meta: {
    siteName: "Skinderma",
    homeTitle: "Skinderma – Orvosi kozmetika | GMP-tanúsított termékek",
    titleTemplate: "%s | Skinderma",
    description:
      "SKINDERMA Medical Cosmetics – professzionális orvosi kozmetika szalonok és otthoni használat számára. GMP-tanúsított termékek, több mint 50 országba forgalmazva.",
    ogTitle: "Skinderma – Orvosi kozmetika | GMP-tanúsított termékek",
    ogDescription:
      "GMP-tanúsított orvosi kozmetika. Hámlasztók, szérumok és professzionális termékek az egészséges bőrért.",
  },

  nav: {
    home: "Főoldal",
    shop: "Bolt",
    skincare: "Bőrápolás",
    forPros: "Szakembereknek",
    about: "Rólunk",
    contact: "Kapcsolat",
    news: "Hírek",
    cartAria: "Kosár",
    openMenu: "Menü megnyitása",
    closeMenu: "Menü bezárása",
    homeAria: "Skinderma – főoldal",
    skincareChildren: [
      {
        href: "/product-category/pletove-kremy-a-pletove-emulzie",
        label: "Arckrémek és emulziók",
      },
      { href: "/product-category/pletove-sera", label: "Arcszérumok" },
      {
        href: "/product-category/opalovacia-a-fotoprotektivna-linia",
        label: "Fényvédő termékek",
      },
      {
        href: "/product-category/starostlivost-o-telo",
        label: "Testápolás",
      },
      { href: "/product-category/nutrikozmetika", label: "Nutrikozmetika" },
      { href: "/product-category/masky", label: "Maszkok" },
    ],
    forProsChildren: [
      {
        href: "/product-category/profesionalne-ampulky",
        label: "Professzionális ampullák",
      },
      {
        href: "/product-category/profesionalne-roztoky-vialky",
        label: "Professzionális oldatok/fiolák",
      },
      {
        href: "/product-category/profesionalne-kombinacie",
        label: "Professzionális kombinációk",
      },
      {
        href: "/product-category/chemicke-peelingy",
        label: "Kémiai hámlasztók",
      },
      { href: "/product-category/kozmeticke-sety", label: "Kozmetikai szettek" },
      { href: "/product-category/pletove-masky", label: "Arcmaszkok" },
      { href: "/product-category/exozomy", label: "Exoszómák" },
    ],
  },

  langSwitcher: {
    label: "Nyelv",
  },

  banner: {
    contactLabel: "Kapcsolat:",
  },

  footer: {
    aboutLink: "A Skindermáról",
    delivery: "Szállítás és fizetés",
    withdrawal: "Elállás a szerződéstől",
    terms: "Általános szerződési feltételek",
    complaints: "Reklamációs szabályzat",
    partnership: "Partnerség",
    privacy: "Adatvédelem",
    company:
      "Red cube s.r.o. | IČO: 44137265 | DIČ: 2022614341 | IČ DPH: SK2022614341",
    rights: "Skinderma",
    poweredBy: "Powered by Red cube s.r.o.",
  },

  home: {
    hero: {
      eyebrow: "Orvosi kozmetika",
      titleLines: ["Az orvosi", "kozmetika", "jövője"],
      lead: "GMP-tanúsított termékek szakemberek és otthoni használat számára. Több mint 50 országba forgalmazva.",
      ctaExplore: "Felfedezés",
      ctaAbout: "Rólunk",
      imageAlt: "Skinderma szérum",
    },
    sady: {
      eyebrow: "Otthoni ápolás",
      title: "Találja meg ideális otthoni rutinját",
      subtitle:
        "Az Ön bőréhez igazított professzionális kozmetikumok — kozmetikusok és bőrgyógyászok válogatásában",
      cta: "Szett megtekintése",
      savingsLabel: "Megtakarítás:",
      items: [
        {
          title: "Száraz bőr",
          description:
            "Hidratáló rutin a több nedvességet igénylő bőrre.",
        },
        {
          title: "Zsíros bőr",
          description:
            "Kiegyenlíti a faggyútermelést, összehúzza a pórusokat, csökkenti a fényességet.",
        },
        {
          title: "Aknés bőr",
          description: "Célzott ápolás az aknéra hajlamos bőrnek.",
        },
        {
          title: "Érzékeny bőr",
          description: "Nyugtatja a bőrpírt, erősíti a védőréteget.",
        },
        {
          title: "Anti-aging",
          description:
            "Komplex ápolás az öregedés jelei ellen, 40+ bőrre.",
        },
      ],
    },
    marquee: [
      "GMP Certified",
      "50+ ország",
      "Gyógyszerészeti minőség",
      "Klinikailag tesztelt",
      "Professzionális formula",
      "Orvosi kozmetika",
    ],
    stats: [
      { label: "Ország világszerte" },
      { label: "Termék" },
      { label: "Év fejlesztés" },
      { label: "GMP Certified" },
    ],
    featured: {
      eyebrow: "Kollekció",
      title: "Válogatott termékek",
      viewAll: "Összes termék",
      goToShop: "Tovább a boltba",
      withVat: "áfával",
      saleBadge: "Akció",
    },
    parallax: {
      eyebrow: "Klinikai formula",
      titleLines: ["A tudomány találkozik", "a bőrrel"],
      cta: "Kollekció felfedezése",
      imageAlt: "Clinical formula",
    },
    categories: {
      eyebrow: "Kategóriák",
      title: "Fedezze fel a kínálatot",
      productOne: "termék",
      productFew: "termék",
      productMany: "termék",
      view: "Megtekintés",
    },
    skinia: {
      eyebrow: "Exkluzív ajánlat",
      titleLines: ["Professzionális eszközök", "az Ön szalonjának"],
      bodyHtml:
        "A Skinderma termékek <strong>200€</strong> feletti vásárlása esetén <strong>ingyenes szállítást</strong> és <strong>1 hónap Skinia szoftvert ingyen</strong> kap — teljes rendszer az ügyfélkezeléshez, AI protokollokhoz és online foglaláshoz.",
      bullets: [
        "Ingyenes szállítás 200€ feletti rendelés esetén",
        "1 hónap Skinia szoftver ingyen",
        "Ügyfélkezelés, AI protokollok, online foglalás",
        "Kötelezettség nélkül — bármikor lemondható",
      ],
      platformLabel: "Skinia Platform",
      platformTitle: "AI-alapú szalonszoftver",
      features: [
        {
          title: "Ügyfélkezelés",
          desc: "Ügyfélkartonok, előzmények, hozzájárulások",
        },
        {
          title: "AI protokollok",
          desc: "Személyre szabott kezelések a bőranalízis alapján",
        },
        {
          title: "Online foglalás",
          desc: "Foglalások 0–24, automatikus értesítések",
        },
        {
          title: "Homecare tervek",
          desc: "Termékajánlások az otthoni ápoláshoz",
        },
      ],
      offerLabel: "200€ feletti vásárlás esetén",
      offerValue: "1 hónap INGYEN",
      ctaSkinia: "Skinia.eu megtekintése",
      ctaProducts: "Termékek rendelése",
    },
    b2b: {
      eyebrow: "Szakembereknek",
      titleLines: ["Ön kozmetikus", "vagy szalontulajdonos?"],
      body: "A Skinderma különleges feltételeket kínál a regisztrált professzionális partnerek számára — beleértve az exkluzív árakat, az elsőbbségi ellátást és a szakmai támogatást.",
      ctaRegister: "Regisztráció partnerként",
      ctaContact: "Kapcsolatfelvétel",
      note: "A regisztráció ingyenes és nem kötelező érvényű.",
      items: [
        {
          title: "Exkluzív árak",
          desc: "Regisztrált partnerként hozzáférést kap a professzionális beszerzésekhez tartozó speciális nagykereskedelmi árakhoz.",
        },
        {
          title: "Elsőbbségi ellátás",
          desc: "Rendelések prioritásos feldolgozása, termékek foglalása a kifogyás előtt és gyorsabb szállítás.",
        },
        {
          title: "Szakmai támogatás",
          desc: "Oktatás a termékekről, protokollokról és alkalmazási technikákról. Marketinganyagok az Ön szalonja számára.",
        },
      ],
    },
    usp: [
      {
        label: "GMP Certified",
        title: "GMP tanúsítás",
        desc: "Minden termék megfelel a gyógyszergyártás szigorú GMP előírásainak.",
      },
      {
        label: "Clinically Tested",
        title: "Klinikailag tesztelt",
        desc: "Minden formulát bőrgyógyászok és klinikai vizsgálatok igazolnak.",
      },
      {
        label: "50+ Countries",
        title: "Globális hálózat",
        desc: "Nemzetközi forgalmazói hálózat több mint 50 országban.",
      },
    ],
    gallery: {
      eyebrow: "Galéria",
      title: "Termékek közelről",
    },
    faq: {
      eyebrow: "Gyakori kérdések",
      title: "A válaszok, amelyeket keres",
      items: [
        {
          q: "Mi a különbség az orvosi kozmetika és a hagyományos kozmetika között?",
          a: "Az orvosi kozmetika (dermokozmetika) magasabb hatóanyag-koncentrációval, tudományosan megalapozott formulákkal és a hatékonyságot igazoló klinikai vizsgálatokkal jellemezhető. Bőrgyógyászokkal együttműködve fejlesztik, és specifikus bőrproblémák kezelésére szolgál, míg a hagyományos kozmetika inkább a felületi ápolásra és hidratálásra összpontosít.",
        },
        {
          q: "Hogyan választhatom ki a bőrtípusomnak megfelelő termékeket?",
          a: "A termékek optimális kiválasztásához javasoljuk személyes konzultációnkat, ahol szakértőink segítenek a bőrdiagnosztikában és személyre szabott megoldásokat ajánlanak. Minden termék leírásában megtalálja azt is, milyen bőrtípushoz és problémákhoz készült.",
        },
        {
          q: "Átvehetem a termékeket személyesen?",
          a: "Igen, a kiválasztott termékeket személyesen átveheti a SKIN Beauty House kozmetikai szalonunkban a Mieru 4235, Komárno címen, vagy a Nám. M. R. Štefánika 16, 945 01 Komárno címen, előzetes egyeztetést vagy annak visszaigazolását követően, hogy rendelése átvételre kész.",
        },
        {
          q: "Mi a GMP tanúsítás?",
          a: "A GMP (Good Manufacturing Practice) szigorú gyógyszergyártási előírások, amelyek minden Skinderma termék maximális tisztaságát, biztonságát és állandó minőségét garantálják. Ez a tanúsítás megegyezik a gyógyszergyártásnál alkalmazottal – a legmagasabb minőség garanciája.",
        },
        {
          q: "Hol gyártják a Skinderma termékeket?",
          a: "A Skinderma Medical Cosmetics spanyol márka. Minden terméket Spanyolországban, tanúsított GMP laboratóriumokban gyártanak, szigorú gyógyszerészeti szabványok szerint. A spanyol kozmetika régóta az európai élvonalba tartozik az orvosi esztétika területén.",
        },
        {
          q: "Mennyi a szállítási idő?",
          a: "A raktáron lévő termékeket 2–5 munkanapon belül szállítjuk. Azok a termékek, amelyek jelenleg nincsenek raktáron és rendelésre készülnek, körülbelül 1 hónapos szállítási idővel rendelkeznek. A rendelkezésre állásról a termék részleteinél tájékozódhat, vagy vegye fel velünk a kapcsolatot.",
        },
        {
          q: "Visszaküldhetem a terméket?",
          a: "Igen – joga van 14 napon belül indoklás nélkül elállni a szerződéstől. Kivételt képeznek a felbontott higiéniai termékek, amelyeknél a védőcsomagolás sérült.",
        },
        {
          q: "Hozzáférek a Skinia.eu szoftverhez?",
          a: "Igen – 200 € feletti vásárlás esetén 1 hónap prémium hozzáférést kap a Skinia.eu platformhoz ingyen. A Skinia teljes körű szalonkezelő szoftver: ügyfélkartonok, AI protokollok, online foglalás és homecare tervek.",
        },
      ],
    },
    diagnostika: {
      eyebrow: "SKIN Beauty House szalon, Komárno",
      title: "Ingyenes bőrdiagnosztika otthoni rutin vásárlása esetén",
      body: "Nem biztos benne, melyik rutin megfelelő Önnek? Látogasson el a SKIN Beauty House szalonba Komárnóban — kozmetikusunk professzionális bőranalízist végez a Maicet Pro AI analizátorral, és a megfelelő ápolást ajánlja.",
      benefits: [
        "Professzionális AI bőranalízis (Maicet Pro)",
        "Személyre szabott termékajánlás a bőrtípus alapján",
        "Ingyenes otthoni rutin vagy Skinderma termékek vásárlása esetén",
      ],
      cta: "Diagnosztika foglalása",
      address:
        "SKIN Beauty House • Ul. Mieru 4235, Komárno • Tel: 0905 108 641",
    },
  },

  about: {
    metaTitle: "Rólunk | Skinderma Medical Cosmetics",
    metaDescription:
      "Skinderma Medical Cosmetics – spanyol orvosi kozmetika, amelyet Szlovákiában a Red Cube s.r.o. forgalmaz.",
    heroEyebrow: "Rólunk",
    heroTitleLines: ["Az orvosi kozmetika", "jövője"],
    quote:
      "„A Skindermánál hisszük, hogy a szépség a tudomány és az egyéni gondoskodás eredménye. Áttörő megoldásokat kínálunk az egészséges és ragyogó bőrért.“",
    quoteAuthor: "SKINDERMA MEDICAL COSMETICS",
    brandHeading: "A Skinderma márkáról",
    brandParagraphs: [
      "A Skinderma Medical Cosmetics spanyol orvosi kozmetikai márka, amelyet bőrgyógyászokkal és esztétikai orvosokkal együttműködve fejlesztenek. Minden terméket tanúsított GMP laboratóriumokban gyártanak, szigorú gyógyszerészeti szabványok szerint.",
      "Termékeink a legmodernebb biotechnológiai összetevőket kombinálják — a peptidektől és exoszómáktól a savakig és antioxidánsokig — azzal a céllal, hogy látható eredményeket hozzanak minden bőrtípus számára.",
      "A márkát a világ több mint 50 országába forgalmazzák. Szlovákiában a kizárólagos forgalmazó a Red Cube s.r.o.",
    ],
    founderLabel: "Az alapítótól",
    founderQuote:
      "„A Red Cube s.r.o.-val mindig is nemcsak termékeket, hanem átfogó know-how-t és támogatást szerettünk volna nyújtani a kozmetikai szakembereknek. A Skindermával való együttműködéssel megvalósítjuk ezt a víziót – hozzáférhetővé tesszük a csúcsminőségű orvosi kozmetikát és a technológiákat, amelyek valóban jobbá teszik az életet. Az Ön elégedettsége és bizalma számunkra a legnagyobb jutalom.“",
    founderName: "Ing. Ramón Novosád",
    founderRole: "Alapító · Red Cube s.r.o.",
    pillars: [
      {
        num: "01",
        title: "GMP tanúsítás",
        text: "Minden termék a GMP gyógyszerészeti szabványok szerint készül – ugyanaz a szabvány, mint a gyógyszergyártásnál.",
      },
      {
        num: "02",
        title: "50+ ország",
        text: "A Skinderma a világ több mint 50 országába jut el. Szakemberek bizalma minden kontinensen.",
      },
      {
        num: "03",
        title: "Klinikailag tesztelt",
        text: "Minden formulát bőrgyógyászok és klinikai vizsgálatok igazolnak. Tudomány minden cseppben.",
      },
    ],
    ctaText: "Kérdése van, vagy érdekli az együttműködés?",
    ctaButton: "Lépjen kapcsolatba velünk",
  },

  contact: {
    metaTitle: "Kapcsolat | Skinderma",
    metaDescription:
      "Skinderma elérhetőségek – Red Cube s.r.o., Komárno. Űrlap reklamációhoz, elálláshoz és kérdésekhez.",
    eyebrow: "Kapcsolat",
    title: "Írjon nekünk",
    sellerHeading: "Eladó",
    sellerLines: [
      "Red Cube s.r.o.",
      "Nám. M.R. Štefánika 16",
      "945 01 Komárno",
      "Szlovákia",
    ],
    idHeading: "Azonosítás",
    idLabels: { ico: "IČO:", dic: "DIČ:", icDph: "IČ DPH:" },
    contactHeading: "Kapcsolat",
    emailLabel: "E-mail:",
    phoneLabel: "Telefon:",
    hours:
      "Az általános kérdésekre 24 órán belül válaszolunk (munkanapokon 9:00 – 17:00).",
    adrHeading: "Alternatív vitarendezés",
    adrText:
      "A fogyasztónak joga van az Európai Bizottság online vitarendezési (ODR) platformjához fordulni:",
    adrLinkLabel: "https://ec.europa.eu/consumers/odr",
    formHeading: "Panasz / visszajelzés",
    formIntro:
      "Írjon nekünk reklamációt, elállási kérelmet vagy általános kérdést. 48 órán belül válaszolunk.",
    form: {
      subjects: [
        "Reklamáció",
        "Elállás a szerződéstől",
        "Panasz",
        "Kérdés a rendeléshez",
        "Egyéb",
      ],
      name: "Név",
      email: "E-mail",
      subject: "Tárgy",
      message: "Üzenet",
      submit: "Üzenet küldése",
      sending: "Küldés…",
      successTitle: "Üzenet elküldve. 48 órán belül válaszolunk.",
      errorText:
        "Az üzenetet nem sikerült elküldeni. Kérjük, próbálja újra, vagy írjon közvetlenül az info@skinderma.sk címre.",
    },
  },

  oSkinderme: {
    metaTitle: "A Skinderma Medical Cosmeticsről | Tények és információk",
    metaDescription:
      "Tények a Skinderma Medical Cosmeticsről – spanyol orvosi kozmetika, GMP tanúsítás, szlovákiai forgalmazás a Red Cube s.r.o. révén.",
    title: "Skinderma Medical Cosmetics",
    subtitle:
      "Szlovákiában forgalmazott spanyol orvosi kozmetikai márka",
    keyFactsHeading: "Kulcsfontosságú tények",
    facts: [
      ["Teljes név", "Skinderma Medical Cosmetics"],
      ["Származási ország", "Spanyolország"],
      [
        "Tanúsítás típusa",
        "GMP (Good Manufacturing Practice) – gyógyszerészeti szabvány",
      ],
      ["Forgalmazás", "50+ ország világszerte"],
      ["Szlovák forgalmazó", "Red Cube s.r.o., Komárno"],
      ["Forgalmazó cégjegyzékszáma (IČO)", "44137265"],
      ["Adószám (IČ DPH)", "SK2022614341"],
      ["Cím", "Nám. M.R. Štefánika 16, 945 01 Komárno, Szlovákia"],
      ["Kapcsolat", "+421 905 108 641 | info@skinderma.sk"],
      ["Web", "www.skinderma.sk"],
      [
        "Termékek száma",
        "80+ termék kategóriákban: krémek, szérumok, maszkok, hámlasztók, exoszómák, ampullák",
      ],
    ],
    whatHeading: "Mi a Skinderma?",
    whatParagraphs: [
      "A Skinderma Medical Cosmetics professzionális orvosi kozmetikai spanyol márka, amely az esztétikai bőrgyógyászat és a kozmetikai szalonok számára fejleszt és gyárt termékeket. Minden terméket Spanyolországban, tanúsított GMP laboratóriumokban gyártanak, ami ugyanaz a minőségi szabvány, mint a gyógyszergyártásnál.",
      "Szlovákiában a kizárólagos forgalmazó a komárnói székhelyű Red Cube s.r.o. A Skinderma termékek elérhetők a kozmetikai szalonok (B2B) és közvetlenül a végfelhasználók (B2C) számára is a skinderma.sk webáruházon keresztül.",
    ],
    categoriesHeading: "Termékkategóriák",
    categories: [
      "Arckrémek és emulziók",
      "Arcszérumok",
      "Kémiai hámlasztók (glikolsav, mandulasav, szalicilsav, TCA, Jessner)",
      "Professzionális ampullák",
      "Professzionális oldatok és fiolák (mezoterápia)",
      "Exoszómák (anti-aging, whitening, hair)",
      "Fényvédő termékek (SPF 50+)",
      "Arcmaszkok (kollagén, peptidek, aloe vera)",
      "Professzionális kombinációk (N-Zymes, BTX Complex)",
      "Testápolás",
      "Nutrikozmetika",
      "Kozmetikai szettek",
    ],
    faqHeading: "Gyakran ismételt kérdések",
    faqs: [
      {
        q: "A Skinderma orvosi kozmetika?",
        a: "Igen. A Skinderma orvosi kozmetikának (dermokozmetikának) minősül. Termékeit a GMP előírások (Good Manufacturing Practice) szerint gyártják, amelyeket a gyógyszerek és orvostechnikai eszközök gyártásánál alkalmaznak. Ez garantálja a hatóanyagok ellenőrzött koncentrációját, a steril gyártási körülményeket és a következetes eredményeket.",
      },
      {
        q: "Hol gyártják a Skinderma termékeket?",
        a: "Minden Skinderma terméket Spanyolországban, GMP tanúsítvánnyal rendelkező laboratóriumokban gyártanak. Spanyolország Európában az élen jár a bőrgyógyászat és az esztétikai medicina területén.",
      },
      {
        q: "Elérhető a Skinderma a szlovákiai kozmetikai szalonok számára?",
        a: "Igen. A Skinderma speciális B2B feltételeket kínál a regisztrált professzionális partnereknek – kozmetikai szalonoknak, bőrgyógyászati rendelőknek és esztétikai klinikáknak. Kapcsolat: info@skinderma.sk vagy +421 905 108 641.",
      },
      {
        q: "Mi a különbség a Skinderma és a hagyományos kozmetika között?",
        a: "A Skinderma termékek magasabb koncentrációban tartalmaznak klinikailag igazolt hatóanyagokat (peptidek, exoszómák, savak, vitaminok), mint a hagyományos kozmetika. Professzionális használatra fejlesztik őket bőrgyógyászokkal és esztétikai orvosokkal együttműködve. A gyártás a gyógyszerészeti GMP előírások szerint történik.",
      },
      {
        q: "Mik azok az exoszómák, és milyen exoszómás termékeket kínál a Skinderma?",
        a: "Az exoszómák a sejtek által termelt nano-vezikulák, amelyek biológiai jeleket közvetítenek és serkentik a bőr regenerációját. A Skinderma exoszómás termékcsaládot kínál: Eximo Ageless szérum, Eximo Whitening szérum, Eximo Hair szérum, valamint professzionális ampullák és liofilizált fiolák exoszómákkal.",
      },
    ],
  },

  cookies: {
    metaTitle: "Cookie-k | Skinderma",
    title: "Cookie-k",
    body: "A tartalom hamarosan elérhető lesz.",
  },

  partnership: {
    metaTitle: "Partnerség – Együttműködés szalonokkal | Skinderma",
    metaDescription:
      "Legyen Skinderma partnerszalon. Szerezzen exkluzív partneri árakat, képzéseket, tanúsított termékeket és dedikált account managert a szalonja számára.",
    heroEyebrow: "Kozmetikai szalonoknak",
    heroTitle: "Partnerség a Skindermával",
    heroLead:
      "Legyen Skinderma partnerszalon, és kínáljon ügyfeleinek spanyol minőségű orvosi kozmetikát. Professzionális árakat, szakmai képzéseket és folyamatos támogatást kap — mindezt egy helyen.",
    ctaApply: "Partnerség igénylése",
    ctaLearnMore: "Tudjon meg többet",
    offerEyebrow: "Mit kap",
    offerTitle: "A partnerszalon előnyei",
    offerLead:
      "A Skindermával való partnerség több, mint termékvásárlás — hosszú távú együttműködés, amelyet a szalonja növekedésére terveztünk.",
    benefits: [
      {
        num: "01",
        title: "Professzionális árak",
        text: "Exkluzív B2B árlista jelentős kedvezményekkel a kiskereskedelmi árakhoz képest. A rendelés mennyisége közvetlenül befolyásolja a kedvezmény mértékét.",
      },
      {
        num: "02",
        title: "Képzések és támogatás",
        text: "Szakmai termékképzések, kezelési protokollok és marketinganyagok. Mindig egy lépéssel előrébb lesz.",
      },
      {
        num: "03",
        title: "Dedikált account manager",
        text: "Személyes kapcsolattartó, aki ismeri a szalonját. Kérdések, rendelések és reklamációk gyors megoldása.",
      },
      {
        num: "04",
        title: "Tanúsított termékek",
        text: "Minden Skinderma termék GMP tanúsítvánnyal rendelkező laboratóriumokban készül, és bőrgyógyászok által klinikailag tesztelt.",
      },
    ],
    stepsEyebrow: "Jóváhagyási folyamat",
    stepsTitle: "Hogyan működik",
    steps: [
      {
        step: "1",
        title: "Küldje el a kérelmet",
        text: "Töltse ki az alábbi űrlapot. Elegendők a szalon alapadatai — az egész folyamat kevesebb mint 3 percet vesz igénybe.",
      },
      {
        step: "2",
        title: "Ellenőrizzük a kérelmet",
        text: "2 munkanapon belül ellenőrizzük a szalonját és egyéni ajánlatot készítünk. Közvetlenül az Ön e-mail-címén jelentkezünk.",
      },
      {
        step: "3",
        title: "Üdvözlő csomag",
        text: "A jóváhagyás után hozzáférést kap a B2B portálhoz, termékmintákat és teljes anyagokat a csapata számára.",
      },
    ],
    formEyebrow: "Partneri kérelem",
    formTitle: "Lépjen kapcsolatba velünk",
    formIntro:
      "Töltse ki az űrlapot, és 2 munkanapon belül jelentkezünk. A csillaggal (*) jelölt mezők kitöltése kötelező.",
    contactHelpBefore: "Kérdése van? Írjon nekünk közvetlenül az ",
    contactHelpMid: " címre, vagy hívjon a ",
    contactHelpAfter: " számon.",
    form: {
      required: "Kötelező mező",
      icoLength: "Az IČO-nak pontosan 8 számjegyből kell állnia",
      invalidEmail: "Érvénytelen e-mail-cím",
      consentRequired: "A hozzájárulás kötelező",
      salonName: "Szalon neve *",
      salonNamePlaceholder: "Pl. Beauty Studio Budapest",
      ico: "IČO (cégazonosító) *",
      icoPlaceholder: "12345678",
      address: "Telephely címe *",
      addressPlaceholder: "Pl. Fő utca 12, 1011 Budapest",
      contactPerson: "Kapcsolattartó személy *",
      contactPersonPlaceholder: "Vezetéknév és keresztnév",
      position: "Pozíció / beosztás",
      positionPlaceholder: "Pl. Tulajdonos, Menedzser",
      emailLabel: "E-mail *",
      emailPlaceholder: "email@szalon.hu",
      phone: "Telefon *",
      phonePlaceholder: "+36 XX XXX XXXX",
      web: "Weboldal vagy Instagram/Facebook *",
      webPlaceholder: "pl. www.aszalonod.hu vagy @aszalonod",
      shortMessage: "Rövid üzenet",
      shortMessagePlaceholder:
        "Mi érdekli? Milyen termékeket használ? Mutatkozzon be röviden.",
      consentBefore: "Hozzájárulok személyes adataim kezeléséhez az ",
      consentLink: "Adatvédelmi szabályzat",
      consentAfter: " szerint *",
      submit: "Kérelem elküldése",
      sending: "Küldés…",
      successTitle: "A kérelem elküldve",
      successText:
        "Köszönjük érdeklődését a Skinderma partnerség iránt. Kérelmét megkaptuk, és 2 munkanapon belül válaszolunk.",
      errorBefore:
        "A kérelmet nem sikerült elküldeni. Kérjük, próbálja újra, vagy vegye fel velünk a kapcsolatot közvetlenül az ",
      errorAfter: " címen.",
    },
  },

  blog: {
    metaTitle: "Blog",
    metaDescription:
      "Cikkek a bőrápolásról, kezelésekről és a Skinderma orvosi kozmetika világának újdonságairól.",
    eyebrow: "Blog",
    title: "Hírek és tanácsok",
    subtitle: "Szakmai cikkek a bőrápolásról és a Skinderma termékekről.",
    empty: "Egyelőre nincsenek közzétett cikkek.",
    minRead: "perc olvasás",
    breadcrumbHome: "Főoldal",
    breadcrumbBlog: "Blog",
    slovakContentNote:
      "A blog cikkei egyelőre csak szlovák nyelven érhetők el.",
    readArticle: "Cikk elolvasása",
  },

  notFound: {
    title: "Az oldal nem található",
    body: "Sajnáljuk, a kért oldal nem létezik, vagy át lett helyezve.",
    cta: "Vissza a főoldalra",
  },
};

export default hu;

