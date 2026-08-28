import type { Dictionary } from "./types";

/**
 * Czech (cs) — served under /cs. Translation of the Slovak source copy; no new
 * product claims were introduced. Commerce/legal links stay pointed at the
 * Slovak WooCommerce apex.
 */
const cs: Dictionary = {
  meta: {
    siteName: "Skinderma",
    homeTitle: "Skinderma – Lékařská kosmetika | GMP certifikované produkty",
    titleTemplate: "%s | Skinderma",
    description:
      "SKINDERMA Medical Cosmetics – profesionální lékařská kosmetika pro salony i domácí použití. GMP certifikované produkty distribuované do více než 50 zemí.",
    ogTitle: "Skinderma – Lékařská kosmetika | GMP certifikované produkty",
    ogDescription:
      "GMP certifikovaná lékařská kosmetika. Peelingy, séra a profesionální produkty pro zdravou pokožku.",
  },

  nav: {
    home: "Domů",
    shop: "Obchod",
    skincare: "Péče o pleť",
    forPros: "Pro profesionály",
    about: "O nás",
    contact: "Kontakt",
    news: "Novinky",
    cartAria: "Košík",
    openMenu: "Otevřít menu",
    closeMenu: "Zavřít menu",
    homeAria: "Skinderma – domů",
    skincareChildren: [
      {
        href: "/product-category/pletove-kremy-a-pletove-emulzie",
        label: "Pleťové krémy a emulze",
      },
      { href: "/product-category/pletove-sera", label: "Pleťová séra" },
      {
        href: "/product-category/opalovacia-a-fotoprotektivna-linia",
        label: "Opalovací řada",
      },
      {
        href: "/product-category/starostlivost-o-telo",
        label: "Péče o tělo",
      },
      { href: "/product-category/nutrikozmetika", label: "Nutrikosmetika" },
      { href: "/product-category/masky", label: "Masky" },
    ],
    forProsChildren: [
      {
        href: "/product-category/profesionalne-ampulky",
        label: "Profesionální ampule",
      },
      {
        href: "/product-category/profesionalne-roztoky-vialky",
        label: "Profesionální roztoky/lahvičky",
      },
      {
        href: "/product-category/profesionalne-kombinacie",
        label: "Profesionální kombinace",
      },
      {
        href: "/product-category/chemicke-peelingy",
        label: "Chemické peelingy",
      },
      { href: "/product-category/kozmeticke-sety", label: "Kosmetické sety" },
      { href: "/product-category/pletove-masky", label: "Pleťové masky" },
      { href: "/product-category/exozomy", label: "Exozomy" },
    ],
  },

  langSwitcher: {
    label: "Jazyk",
  },

  banner: {
    contactLabel: "Kontakt:",
  },

  footer: {
    aboutLink: "O Skindermě",
    delivery: "Doručení a platba",
    withdrawal: "Odstoupení od smlouvy",
    terms: "Obchodní podmínky",
    complaints: "Reklamační řád",
    partnership: "Partnerství",
    privacy: "Ochrana osobních údajů",
    company:
      "Red cube s.r.o. | IČO: 44137265 | DIČ: 2022614341 | IČ DPH: SK2022614341",
    rights: "Skinderma",
    poweredBy: "Powered by Red cube s.r.o.",
  },

  home: {
    hero: {
      eyebrow: "Lékařská kosmetika",
      titleLines: ["Budoucnost", "lékařské", "kosmetiky"],
      lead: "GMP certifikované produkty pro profesionály i domácí použití. Distribuované do více než 50 zemí světa.",
      ctaExplore: "Prozkoumat",
      ctaAbout: "O nás",
      imageAlt: "Skinderma sérum",
    },
    sady: {
      eyebrow: "Domácí péče",
      title: "Najděte svou ideální domácí rutinu",
      subtitle:
        "Profesionální kosmetika přizpůsobená vaší pleti — vybraná kosmetičkami a dermatology",
      cta: "Zobrazit sadu",
      savingsLabel: "Úspora:",
      items: [
        {
          title: "Suchá pleť",
          description:
            "Hydratační rutina pro pleť, která vyžaduje více vláhy.",
        },
        {
          title: "Mastná pleť",
          description:
            "Vyrovná produkci kožního mazu, stahuje póry, redukuje lesk.",
        },
        {
          title: "Aknózní pleť",
          description: "Cílená péče pro pleť se sklonem k akné.",
        },
        {
          title: "Citlivá pleť",
          description: "Zklidňuje zarudnutí, posiluje ochrannou bariéru.",
        },
        {
          title: "Anti-aging",
          description:
            "Komplexní péče proti známkám stárnutí, pro pleť 40+.",
        },
      ],
    },
    marquee: [
      "GMP Certified",
      "50+ zemí",
      "Farmaceutická kvalita",
      "Klinicky testováno",
      "Profesionální formulace",
      "Medicínská kosmetika",
    ],
    stats: [
      { label: "Zemí světa" },
      { label: "Produktů" },
      { label: "Let vývoje" },
      { label: "GMP Certified" },
    ],
    featured: {
      eyebrow: "Kolekce",
      title: "Vybrané produkty",
      viewAll: "Všechny produkty",
      goToShop: "Přejít do obchodu",
      withVat: "s DPH",
      saleBadge: "Akce",
    },
    parallax: {
      eyebrow: "Klinická formulace",
      titleLines: ["Věda se setkává", "s pokožkou"],
      cta: "Prozkoumat kolekci",
      imageAlt: "Clinical formula",
    },
    categories: {
      eyebrow: "Kategorie",
      title: "Prozkoumejte sortiment",
      productOne: "produkt",
      productFew: "produkty",
      productMany: "produktů",
      view: "Zobrazit",
    },
    skinia: {
      eyebrow: "Exkluzivní nabídka",
      titleLines: ["Profesionální nástroje", "pro váš salon"],
      bodyHtml:
        "Při nákupu produktů Skinderma nad <strong>200€</strong> získáte <strong>dopravu zdarma</strong> a <strong>1 měsíc softwaru Skinia zdarma</strong> — kompletní systém pro správu klientů, AI protokoly a online rezervace.",
      bullets: [
        "Doprava zdarma při objednávce nad 200€",
        "1 měsíc softwaru Skinia zdarma",
        "Správa klientů, AI protokoly, online booking",
        "Bez závazků — zrušení kdykoli",
      ],
      platformLabel: "Skinia Platform",
      platformTitle: "AI-powered software pro salon",
      features: [
        {
          title: "Správa klientů",
          desc: "Karty klientů, historie, souhlasy",
        },
        {
          title: "AI protokoly",
          desc: "Personalizovaná ošetření na základě analýzy pleti",
        },
        {
          title: "Online booking",
          desc: "Rezervace 24/7, automatické notifikace",
        },
        {
          title: "Homecare plány",
          desc: "Produktová doporučení pro domácí péči",
        },
      ],
      offerLabel: "Při nákupu nad 200€",
      offerValue: "1 měsíc ZDARMA",
      ctaSkinia: "Prohlédnout Skinia.eu",
      ctaProducts: "Objednat produkty",
    },
    b2b: {
      eyebrow: "Pro profesionály",
      titleLines: ["Jste kosmetička", "nebo provozovatel salonu?"],
      body: "Skinderma nabízí speciální podmínky pro registrované profesionální partnery — včetně exkluzivních cen, přednostního zásobování a odborné podpory.",
      ctaRegister: "Zaregistrovat se jako partner",
      ctaContact: "Kontaktovat nás",
      note: "Registrace je bezplatná a nezávazná.",
      items: [
        {
          title: "Exkluzivní ceny",
          desc: "Jako registrovaný partner získáte přístup ke speciálním velkoobchodním cenám pro profesionální nákupy.",
        },
        {
          title: "Přednostní zásobování",
          desc: "Prioritní zpracování objednávek, rezervace produktů před vyprodáním a rychlejší doručení.",
        },
        {
          title: "Odborná podpora",
          desc: "Vzdělávání o produktech, protokolech a aplikačních technikách. Marketingové materiály pro váš salon.",
        },
      ],
    },
    usp: [
      {
        label: "GMP Certified",
        title: "GMP certifikace",
        desc: "Všechny produkty splňují přísné GMP normy farmaceutické výroby.",
      },
      {
        label: "Clinically Tested",
        title: "Klinicky testováno",
        desc: "Každá formule je ověřena dermatology a klinickými studiemi.",
      },
      {
        label: "50+ Countries",
        title: "Globální síť",
        desc: "Mezinárodní síť distributorů ve více než 50 zemích světa.",
      },
    ],
    gallery: {
      eyebrow: "Galerie",
      title: "Produkty v detailu",
    },
    faq: {
      eyebrow: "Časté dotazy",
      title: "Odpovědi, které hledáte",
      items: [
        {
          q: "Jaký je rozdíl mezi lékařskou kosmetikou a běžnou kosmetikou?",
          a: "Lékařská kosmetika (dermokosmetika) se vyznačuje vyšší koncentrací aktivních látek, vědecky podloženými formulacemi a klinickými studiemi prokazujícími její účinnost. Je vyvíjena ve spolupráci s dermatology a je určena k řešení specifických kožních problémů, zatímco běžná kosmetika se zaměřuje spíše na povrchovou péči a hydrataci.",
        },
        {
          q: "Jak si mohu vybrat správné produkty pro svůj typ pleti?",
          a: "Pro optimální výběr produktů doporučujeme využít naši osobní konzultaci, kde vám naši odborníci pomohou s diagnostikou pleti a doporučí ideální řešení na míru. V popisu každého produktu najdete také informace o tom, pro jaký typ pleti a problémy je určen.",
        },
        {
          q: "Mohu si produkty vyzvednout osobně?",
          a: "Ano, vybrané produkty si můžete osobně vyzvednout v našem kosmetickém salonu SKIN Beauty House na adrese ul. Mieru 4235, Komárno nebo na adrese Nám. M. R. Štefánika 16, 945 01 Komárno, po předchozí dohodě nebo potvrzení, že je vaše objednávka připravena k vyzvednutí.",
        },
        {
          q: "Co je GMP certifikace?",
          a: "GMP (Good Manufacturing Practice) jsou přísné farmaceutické výrobní normy, které zaručují maximální čistotu, bezpečnost a konzistenci každého produktu Skinderma. Tato certifikace je stejná jako při výrobě léků – zárukou nejvyšší kvality.",
        },
        {
          q: "Kde se produkty Skinderma vyrábějí?",
          a: "Skinderma Medical Cosmetics je španělská značka. Všechny produkty se vyrábějí v certifikovaných GMP laboratořích ve Španělsku podle přísných farmaceutických standardů. Španělská kosmetika se dlouhodobě řadí mezi evropskou špičku v oblasti medicínské estetiky.",
        },
        {
          q: "Jaká je dodací lhůta?",
          a: "Produkty skladem doručujeme do 2–5 pracovních dnů. Produkty, které nejsou momentálně skladem a vyrábějí se na objednávku, mají dodací lhůtu přibližně 1 měsíc. Informaci o dostupnosti najdete v detailu produktu, nebo nás kontaktujte.",
        },
        {
          q: "Mohu produkt vrátit?",
          a: "Ano – máte právo odstoupit od smlouvy do 14 dnů bez udání důvodu. Výjimkou jsou otevřené hygienické produkty, u kterých byl porušen ochranný obal.",
        },
        {
          q: "Získám přístup k softwaru Skinia.eu?",
          a: "Ano – při nákupu nad 200 € získáte 1 měsíc prémiového přístupu k platformě Skinia.eu zdarma. Skinia je kompletní software pro správu salonu: klientské karty, AI protokoly, online rezervace a homecare plány.",
        },
      ],
    },
    diagnostika: {
      eyebrow: "Salon SKIN Beauty House, Komárno",
      title: "Diagnostika pleti zdarma při nákupu domácí rutiny",
      body: "Nejste si jistá, která rutina je pro vás vhodná? Přijďte do salonu SKIN Beauty House v Komárně — naše kosmetička provede profesionální analýzu pleti pomocí AI analyzátoru Maicet Pro a doporučí vám správnou péči.",
      benefits: [
        "Profesionální AI analýza pleti (Maicet Pro)",
        "Personalizované doporučení produktů podle typu pleti",
        "Zdarma při nákupu domácí rutiny nebo produktů Skinderma",
      ],
      cta: "Rezervovat diagnostiku",
      address:
        "SKIN Beauty House • Ul. Mieru 4235, Komárno • Tel: 0905 108 641",
    },
  },

  about: {
    metaTitle: "O nás | Skinderma Medical Cosmetics",
    metaDescription:
      "Skinderma Medical Cosmetics – španělská lékařská kosmetika distribuovaná na Slovensku společností Red Cube s.r.o.",
    heroEyebrow: "O nás",
    heroTitleLines: ["Budoucnost", "lékařské kosmetiky"],
    quote:
      "„Ve Skinderma věříme, že krása je výsledkem vědy a individuální péče. Nabízíme převratná řešení pro zdravou a zářivou pleť.“",
    quoteAuthor: "SKINDERMA MEDICAL COSMETICS",
    brandHeading: "O značce Skinderma",
    brandParagraphs: [
      "Skinderma Medical Cosmetics je španělská značka lékařské kosmetiky vyvíjená ve spolupráci s dermatology a estetickými lékaři. Všechny produkty jsou vyráběny v certifikovaných GMP laboratořích podle přísných farmaceutických standardů.",
      "Naše produkty kombinují nejmodernější biotechnologické ingredience — od peptidů a exozomů až po kyseliny a antioxidanty — s cílem přinášet viditelné výsledky pro každý typ pleti.",
      "Značka je distribuována do více než 50 zemí světa. Na Slovensku je výhradním distributorem společnost Red Cube s.r.o.",
    ],
    founderLabel: "Od zakladatele",
    founderQuote:
      "„S Red Cube s.r.o. jsme vždy chtěli přinášet nejen produkty, ale i komplexní know-how a podporu pro kosmetické profesionály. Spojením se Skindermou naplňujeme tuto vizi – zpřístupňujeme špičkovou lékařskou kosmetiku a technologie, které skutečně mění životy k lepšímu. Vaše spokojenost a důvěra jsou pro nás největší odměnou.“",
    founderName: "Ing. Ramón Novosád",
    founderRole: "Zakladatel · Red Cube s.r.o.",
    pillars: [
      {
        num: "01",
        title: "GMP certifikace",
        text: "Všechny produkty vyráběné podle farmaceutických norem GMP – stejný standard jako při výrobě léků.",
      },
      {
        num: "02",
        title: "50+ zemí",
        text: "Skinderma je distribuována do více než 50 zemí světa. Důvěra profesionálů na každém kontinentu.",
      },
      {
        num: "03",
        title: "Klinicky testováno",
        text: "Každá formulace ověřena dermatology a klinickými studiemi. Věda v každé kapce.",
      },
    ],
    ctaText: "Máte dotazy nebo zájem o spolupráci?",
    ctaButton: "Kontaktujte nás",
  },

  contact: {
    metaTitle: "Kontakt | Skinderma",
    metaDescription:
      "Kontaktní údaje Skinderma – Red Cube s.r.o., Komárno. Formulář pro reklamace, odstoupení a dotazy.",
    eyebrow: "Kontakt",
    title: "Napište nám",
    sellerHeading: "Prodávající",
    sellerLines: [
      "Red Cube s.r.o.",
      "Nám. M.R. Štefánika 16",
      "945 01 Komárno",
      "Slovenská republika",
    ],
    idHeading: "Identifikace",
    idLabels: { ico: "IČO:", dic: "DIČ:", icDph: "IČ DPH:" },
    contactHeading: "Kontakt",
    emailLabel: "E-mail:",
    phoneLabel: "Telefon:",
    hours:
      "Na běžné dotazy odpovídáme do 24 hodin (pracovní dny 9:00 – 17:00).",
    adrHeading: "Alternativní řešení sporů",
    adrText:
      "Spotřebitel má právo obrátit se na platformu ODR Evropské komise:",
    adrLinkLabel: "https://ec.europa.eu/consumers/odr",
    formHeading: "Stížnost / zpětná vazba",
    formIntro:
      "Napište nám reklamaci, žádost o odstoupení od smlouvy nebo běžný dotaz. Odpovíme do 48 hodin.",
    form: {
      subjects: [
        "Reklamace",
        "Odstoupení od smlouvy",
        "Stížnost",
        "Dotaz k objednávce",
        "Jiné",
      ],
      name: "Jméno",
      email: "E-mail",
      subject: "Předmět",
      message: "Zpráva",
      submit: "Odeslat zprávu",
      sending: "Odesílám…",
      successTitle: "Zpráva odeslána. Odpovíme do 48 hodin.",
      errorText:
        "Zprávu se nepodařilo odeslat. Zkuste to prosím znovu nebo nám napište přímo na info@skinderma.sk.",
    },
  },

  oSkinderme: {
    metaTitle: "O Skinderma Medical Cosmetics | Fakta a informace",
    metaDescription:
      "Fakta o Skinderma Medical Cosmetics – španělská lékařská kosmetika, GMP certifikace, distribuce na Slovensku přes Red Cube s.r.o.",
    title: "Skinderma Medical Cosmetics",
    subtitle:
      "Španělská značka lékařské kosmetiky distribuovaná na Slovensku",
    keyFactsHeading: "Klíčová fakta",
    facts: [
      ["Plný název", "Skinderma Medical Cosmetics"],
      ["Země původu", "Španělsko"],
      [
        "Typ certifikace",
        "GMP (Good Manufacturing Practice) – farmaceutický standard",
      ],
      ["Distribuce", "50+ zemí světa"],
      ["Slovenský distributor", "Red Cube s.r.o., Komárno"],
      ["IČO distributora", "44137265"],
      ["IČ DPH", "SK2022614341"],
      ["Adresa", "Nám. M.R. Štefánika 16, 945 01 Komárno, Slovensko"],
      ["Kontakt", "+421 905 108 641 | info@skinderma.sk"],
      ["Web", "www.skinderma.sk"],
      [
        "Počet produktů",
        "80+ produktů v kategoriích: krémy, séra, masky, peelingy, exozomy, ampule",
      ],
    ],
    whatHeading: "Co je Skinderma?",
    whatParagraphs: [
      "Skinderma Medical Cosmetics je španělská značka profesionální lékařské kosmetiky, která vyvíjí a vyrábí produkty pro estetickou dermatologii a kosmetické salony. Všechny produkty jsou vyráběny v certifikovaných GMP laboratořích ve Španělsku, což je stejný standard kvality jako při výrobě léků.",
      "Na Slovensku je výhradním distributorem společnost Red Cube s.r.o. se sídlem v Komárně. Produkty Skinderma jsou dostupné pro kosmetické salony (B2B) i přímo pro koncové zákazníky (B2C) přes e-shop na skinderma.sk.",
    ],
    categoriesHeading: "Produktové kategorie",
    categories: [
      "Pleťové krémy a emulze",
      "Pleťová séra",
      "Chemické peelingy (kyselina glykolová, mandlová, salicylová, TCA, Jessner)",
      "Profesionální ampule",
      "Profesionální roztoky a lahvičky (mezoterapie)",
      "Exozomy (anti-aging, whitening, hair)",
      "Opalovací řada (SPF 50+)",
      "Pleťové masky (kolagen, peptidy, aloe vera)",
      "Profesionální kombinace (N-Zymes, BTX Complex)",
      "Péče o tělo",
      "Nutrikosmetika",
      "Kosmetické sety",
    ],
    faqHeading: "Často kladené dotazy",
    faqs: [
      {
        q: "Je Skinderma lékařská kosmetika?",
        a: "Ano. Skinderma je klasifikována jako lékařská kosmetika (dermokosmetika). Její produkty jsou vyráběny podle GMP norem (Good Manufacturing Practice), které se uplatňují při výrobě farmaceutik a zdravotnických pomůcek. To zaručuje kontrolovanou koncentraci účinných látek, sterilní podmínky výroby a konzistentní výsledky.",
      },
      {
        q: "Kde se vyrábějí produkty Skinderma?",
        a: "Všechny produkty Skinderma se vyrábějí ve Španělsku v GMP certifikovaných laboratořích. Španělsko patří mezi přední země v oblasti dermatologie a estetické medicíny v Evropě.",
      },
      {
        q: "Je Skinderma dostupná pro kosmetické salony na Slovensku?",
        a: "Ano. Skinderma nabízí speciální B2B podmínky pro registrované profesionální partnery – kosmetické salony, dermatologická pracoviště a estetické kliniky. Kontakt: info@skinderma.sk nebo +421 905 108 641.",
      },
      {
        q: "Jaký je rozdíl mezi Skinderma a běžnou kosmetikou?",
        a: "Produkty Skinderma obsahují vyšší koncentrace klinicky ověřených aktivních látek (peptidy, exozomy, kyseliny, vitaminy) než běžná kosmetika. Jsou vyvíjeny pro profesionální použití ve spolupráci s dermatology a estetickými lékaři. Výroba probíhá podle farmaceutických GMP norem.",
      },
      {
        q: "Co jsou exozomy a jaké produkty s exozomy nabízí Skinderma?",
        a: "Exozomy jsou nano-vezikuly produkované buňkami, které přenášejí biologické signály a stimulují regeneraci pokožky. Skinderma nabízí řadu exozomových produktů: sérum Eximo Ageless, sérum Eximo Whitening, sérum Eximo Hair, a také profesionální ampule a lyofilizované lahvičky s exozomy.",
      },
    ],
  },

  cookies: {
    metaTitle: "Cookies | Skinderma",
    title: "Cookies",
    body: "Obsah bude doplněn.",
  },

  partnership: {
    metaTitle: "Partnerství – Spolupráce se salony | Skinderma",
    metaDescription:
      "Staňte se partnerským salonem Skinderma. Získejte exkluzivní partnerské ceny, školení, certifikované produkty a dedikovaného account managera pro váš salon.",
    heroEyebrow: "Pro kosmetické salony",
    heroTitle: "Partnerství se Skinderma",
    heroLead:
      "Staňte se partnerským salonem Skinderma a nabídněte svým klientům lékařskou kosmetiku španělské kvality. Získáte profesionální ceny, odborná školení a nepřetržitou podporu — vše na jednom místě.",
    ctaApply: "Požádat o partnerství",
    ctaLearnMore: "Zjistit více",
    offerEyebrow: "Co získáte",
    offerTitle: "Výhody partnerského salonu",
    offerLead:
      "Partnerství se Skinderma je víc než jen nákup produktů — je to dlouhodobá spolupráce navržená pro růst vašeho salonu.",
    benefits: [
      {
        num: "01",
        title: "Profesionální ceny",
        text: "Exkluzivní B2B ceník s výraznými slevami oproti maloobchodním cenám. Objem objednávky přímo ovlivňuje výši slevy.",
      },
      {
        num: "02",
        title: "Školení a podpora",
        text: "Odborná produktová školení, protokoly ošetření a marketingové materiály. Zůstanete vždy o krok napřed.",
      },
      {
        num: "03",
        title: "Dedikovaný account manager",
        text: "Osobní kontakt, který zná váš salon. Rychlé řešení dotazů, objednávek i reklamací.",
      },
      {
        num: "04",
        title: "Certifikované produkty",
        text: "Všechny produkty Skinderma jsou vyrobeny v GMP certifikovaných laboratořích a klinicky testovány dermatology.",
      },
    ],
    stepsEyebrow: "Postup schválení",
    stepsTitle: "Jak to funguje",
    steps: [
      {
        step: "1",
        title: "Odešlete žádost",
        text: "Vyplňte formulář níže. Stačí základní údaje o salonu — celý proces trvá méně než 3 minuty.",
      },
      {
        step: "2",
        title: "Prověříme žádost",
        text: "Do 2 pracovních dnů váš salon prověříme a připravíme individuální nabídku. Ozveme se přímo na váš e-mail.",
      },
      {
        step: "3",
        title: "Uvítací balíček",
        text: "Po schválení získáte přístup do B2B portálu, vzorky produktů a kompletní materiály pro váš tým.",
      },
    ],
    formEyebrow: "Partnerská žádost",
    formTitle: "Kontaktujte nás",
    formIntro:
      "Vyplňte formulář a my se vám ozveme do 2 pracovních dnů. Všechna pole označená hvězdičkou (*) jsou povinná.",
    contactHelpBefore: "Máte dotazy? Napište nám přímo na ",
    contactHelpMid: " nebo zavolejte na ",
    contactHelpAfter: ".",
    form: {
      required: "Povinné pole",
      icoLength: "IČO musí mít přesně 8 číslic",
      invalidEmail: "Neplatná e-mailová adresa",
      consentRequired: "Souhlas je povinný",
      salonName: "Název salonu *",
      salonNamePlaceholder: "Např. Beauty Studio Praha",
      ico: "IČO *",
      icoPlaceholder: "12345678",
      address: "Adresa provozovny *",
      addressPlaceholder: "Např. Obchodní 12, 110 00 Praha",
      contactPerson: "Kontaktní osoba *",
      contactPersonPlaceholder: "Jméno a příjmení",
      position: "Pozice / funkce",
      positionPlaceholder: "Např. Majitel, Manažer",
      emailLabel: "Email *",
      emailPlaceholder: "email@salon.cz",
      phone: "Telefon *",
      phonePlaceholder: "+420 XXX XXX XXX",
      web: "Web nebo Instagram/Facebook *",
      webPlaceholder: "např. www.vassalon.cz nebo @vassalon",
      shortMessage: "Krátká zpráva",
      shortMessagePlaceholder:
        "Co vás zajímá? Jaké produkty používáte? Krátce se představte.",
      consentBefore: "Souhlasím se zpracováním osobních údajů podle ",
      consentLink: "Zásad ochrany osobních údajů",
      consentAfter: "*",
      submit: "Odeslat žádost",
      sending: "Odesílám…",
      successTitle: "Žádost byla odeslána",
      successText:
        "Děkujeme za váš zájem o partnerství se Skinderma. Vaši žádost jsme přijali a odpovíme do 2 pracovních dnů.",
      errorBefore:
        "Žádost se nepodařilo odeslat. Zkuste to prosím znovu nebo nás kontaktujte přímo na ",
      errorAfter: ".",
    },
  },

  blog: {
    metaTitle: "Blog",
    metaDescription:
      "Články o péči o pleť, ošetřeních a novinkách ze světa lékařské kosmetiky Skinderma.",
    eyebrow: "Blog",
    title: "Novinky a rady",
    subtitle:
      "Odborné články o péči o pleť a produktech Skinderma.",
    empty: "Zatím nejsou publikovány žádné články.",
    minRead: "min čtení",
    breadcrumbHome: "Domů",
    breadcrumbBlog: "Blog",
    slovakContentNote:
      "Články blogu jsou zatím k dispozici pouze ve slovenštině.",
    readArticle: "Číst článek",
  },

  notFound: {
    title: "Stránka nenalezena",
    body: "Omlouváme se, požadovaná stránka neexistuje nebo byla přesunuta.",
    cta: "Zpět na domovskou stránku",
  },
};

export default cs;

