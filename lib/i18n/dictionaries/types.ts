/**
 * Shape of a per-locale content dictionary.
 *
 * Only user-facing copy lives here. Structural values that must not change per
 * language (prices, phone numbers, e-mails, product slugs, stat counters,
 * image URLs) stay in the components.
 */

export interface Dictionary {
  meta: {
    siteName: string;
    homeTitle: string;
    titleTemplate: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };

  nav: {
    home: string;
    shop: string;
    skincare: string;
    forPros: string;
    about: string;
    contact: string;
    news: string;
    cartAria: string;
    openMenu: string;
    closeMenu: string;
    homeAria: string;
    skincareChildren: { href: string; label: string }[];
    forProsChildren: { href: string; label: string }[];
  };

  langSwitcher: {
    label: string;
  };

  banner: {
    contactLabel: string;
  };

  footer: {
    aboutLink: string;
    delivery: string;
    withdrawal: string;
    terms: string;
    complaints: string;
    partnership: string;
    privacy: string;
    company: string;
    rights: string;
    poweredBy: string;
  };

  home: {
    hero: {
      eyebrow: string;
      titleLines: string[];
      lead: string;
      ctaExplore: string;
      ctaAbout: string;
      imageAlt: string;
    };
    sady: {
      eyebrow: string;
      title: string;
      subtitle: string;
      cta: string;
      savingsLabel: string;
      items: { title: string; description: string }[];
    };
    marquee: string[];
    stats: { label: string }[];
    featured: {
      eyebrow: string;
      title: string;
      viewAll: string;
      goToShop: string;
      withVat: string;
      saleBadge: string;
    };
    parallax: {
      eyebrow: string;
      titleLines: string[];
      cta: string;
      imageAlt: string;
    };
    categories: {
      eyebrow: string;
      title: string;
      productOne: string;
      productFew: string;
      productMany: string;
      view: string;
    };
    skinia: {
      eyebrow: string;
      titleLines: string[];
      bodyHtml: string;
      bullets: string[];
      platformLabel: string;
      platformTitle: string;
      features: { title: string; desc: string }[];
      offerLabel: string;
      offerValue: string;
      ctaSkinia: string;
      ctaProducts: string;
    };
    b2b: {
      eyebrow: string;
      titleLines: string[];
      body: string;
      ctaRegister: string;
      ctaContact: string;
      note: string;
      items: { title: string; desc: string }[];
    };
    usp: { label: string; title: string; desc: string }[];
    gallery: {
      eyebrow: string;
      title: string;
    };
    faq: {
      eyebrow: string;
      title: string;
      items: { q: string; a: string }[];
    };
    diagnostika: {
      eyebrow: string;
      title: string;
      body: string;
      benefits: string[];
      cta: string;
      address: string;
    };
  };

  about: {
    metaTitle: string;
    metaDescription: string;
    heroEyebrow: string;
    heroTitleLines: string[];
    quote: string;
    quoteAuthor: string;
    brandHeading: string;
    brandParagraphs: string[];
    founderLabel: string;
    founderQuote: string;
    founderName: string;
    founderRole: string;
    pillars: { num: string; title: string; text: string }[];
    ctaText: string;
    ctaButton: string;
  };

  contact: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    sellerHeading: string;
    sellerLines: string[];
    idHeading: string;
    idLabels: { ico: string; dic: string; icDph: string };
    contactHeading: string;
    emailLabel: string;
    phoneLabel: string;
    hours: string;
    adrHeading: string;
    adrText: string;
    adrLinkLabel: string;
    formHeading: string;
    formIntro: string;
    form: ContactFormDict;
  };

  oSkinderme: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    subtitle: string;
    keyFactsHeading: string;
    facts: [string, string][];
    whatHeading: string;
    whatParagraphs: string[];
    categoriesHeading: string;
    categories: string[];
    faqHeading: string;
    faqs: { q: string; a: string }[];
  };

  cookies: {
    metaTitle: string;
    title: string;
    body: string;
  };

  partnership: {
    metaTitle: string;
    metaDescription: string;
    heroEyebrow: string;
    heroTitle: string;
    heroLead: string;
    ctaApply: string;
    ctaLearnMore: string;
    offerEyebrow: string;
    offerTitle: string;
    offerLead: string;
    benefits: { num: string; title: string; text: string }[];
    stepsEyebrow: string;
    stepsTitle: string;
    steps: { step: string; title: string; text: string }[];
    formEyebrow: string;
    formTitle: string;
    formIntro: string;
    contactHelpBefore: string;
    contactHelpMid: string;
    contactHelpAfter: string;
    form: PartnerFormDict;
  };

  blog: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    empty: string;
    minRead: string;
    breadcrumbHome: string;
    breadcrumbBlog: string;
    slovakContentNote: string;
    readArticle: string;
  };

  notFound: {
    title: string;
    body: string;
    cta: string;
  };
}

export interface ContactFormDict {
  subjects: string[];
  name: string;
  email: string;
  subject: string;
  message: string;
  submit: string;
  sending: string;
  successTitle: string;
  errorText: string;
}

export interface PartnerFormDict {
  required: string;
  icoLength: string;
  invalidEmail: string;
  consentRequired: string;
  salonName: string;
  salonNamePlaceholder: string;
  ico: string;
  icoPlaceholder: string;
  address: string;
  addressPlaceholder: string;
  contactPerson: string;
  contactPersonPlaceholder: string;
  position: string;
  positionPlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  web: string;
  webPlaceholder: string;
  shortMessage: string;
  shortMessagePlaceholder: string;
  consentBefore: string;
  consentLink: string;
  consentAfter: string;
  submit: string;
  sending: string;
  successTitle: string;
  successText: string;
  errorBefore: string;
  errorAfter: string;
}

