/** @type {import('next').NextConfig} */

// --- skinderma.cz / skinderma.hu -------------------------------------------
// Both ccTLDs are registered but hold no site of their own. They fold into the
// localized sub-paths on www.skinderma.sk with a single 301 hop, so all the SEO
// weight stays on one domain and /cs + /hu keep the canonical.
//
// These rules only fire once the domains are added to this Vercel project and
// their DNS points at Vercel. Add them WITHOUT Vercel's built-in
// "redirect to primary domain" option — that would send skinderma.cz/x to
// www.skinderma.sk/x (Slovak) and never reach the mapping below.
const CONTENT_SITE = "https://www.skinderma.sk";
const SHOP_SITE = "https://skinderma.sk";

// Commerce stays on the WooCommerce apex in Slovak, whichever domain it is
// reached from.
const CCTLD_COMMERCE_PREFIXES = [
  "/obchod",
  "/produkt",
  "/produkty",
  "/product-category",
  "/kategoria",
  "/kosik",
  "/pokladna",
  "/moj-ucet",
  "/objednavka-prijata",
  "/order-received",
];

// Old-domain path -> localized sub-path. Includes the vanity slugs from
// lib/i18n/routes.ts (SLUG_ALIASES) so a link in either language lands in one
// hop instead of two.
const CCTLD_CONTENT_MAP = {
  cs: {
    "/": "/cs",
    "/domu": "/cs",
    "/o-nas": "/cs/o-nas",
    "/kontakt": "/cs/kontakt",
    "/kontakty": "/cs/kontakt",
    "/o-skinderme": "/cs/o-skinderme",
    "/blog": "/cs/blog",
    "/novinky": "/cs/blog",
    "/partnerstvo": "/cs/partnerstvo",
    "/partnerstvi": "/cs/partnerstvo",
    "/spoluprace": "/cs/partnerstvo",
    "/cookies": "/cs/cookies",
    "/dodanie": "/cs/dodanie",
    "/doruceni": "/cs/dodanie",
    "/doruceni-a-platba": "/cs/dodanie",
  },
  hu: {
    "/": "/hu",
    "/fooldal": "/hu",
    "/o-nas": "/hu/o-nas",
    "/rolunk": "/hu/o-nas",
    "/kontakt": "/hu/kontakt",
    "/kapcsolat": "/hu/kontakt",
    "/o-skinderme": "/hu/o-skinderme",
    "/a-skindermarol": "/hu/o-skinderme",
    "/blog": "/hu/blog",
    "/hirek": "/hu/blog",
    "/partnerstvo": "/hu/partnerstvo",
    "/partnerseg": "/hu/partnerstvo",
    "/cookies": "/hu/cookies",
    "/sutik": "/hu/cookies",
    "/dodanie": "/hu/dodanie",
    "/szallitas": "/hu/dodanie",
    "/szallitas-es-fizetes": "/hu/dodanie",
  },
};

/** Every 301 for one ccTLD, most specific first, catch-all last. */
function ccTldRedirects(host, locale) {
  const has = [{ type: "host", value: `(www\\.)?${host}` }];
  const rules = [];

  for (const prefix of CCTLD_COMMERCE_PREFIXES) {
    rules.push({
      source: prefix,
      has,
      destination: `${SHOP_SITE}${prefix}`,
      // 301, not Next's default 308 — GSC change-of-address and every SEO
      // tool in the chain expects a plain permanent redirect.
      statusCode: 301,
    });
    rules.push({
      source: `${prefix}/:path*`,
      has,
      destination: `${SHOP_SITE}${prefix}/:path*`,
      // 301, not Next's default 308 — GSC change-of-address and every SEO
      // tool in the chain expects a plain permanent redirect.
      statusCode: 301,
    });
  }

  for (const [from, to] of Object.entries(CCTLD_CONTENT_MAP[locale])) {
    rules.push({
      source: from,
      has,
      destination: `${CONTENT_SITE}${to}`,
      // 301, not Next's default 308 — GSC change-of-address and every SEO
      // tool in the chain expects a plain permanent redirect.
      statusCode: 301,
    });
  }

  // Anything unmapped is a link to a page that never existed on these domains
  // -> soft landing on the localized home page rather than a 404.
  rules.push({
    source: "/:path*",
    has,
    destination: `${CONTENT_SITE}/${locale}`,
    // 301, not Next's default 308 — GSC change-of-address and every SEO
    // tool in the chain expects a plain permanent redirect.
    statusCode: 301,
  });

  return rules;
}

const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Link",
            value: [
              '<https://www.skinderma.sk/sitemap.xml>; rel="sitemap"; type="application/xml"',
              '<https://www.skinderma.sk/llms.txt>; rel="describedby"; type="text/plain"',
              '<https://skinderma.sk/llms.txt>; rel="describedby"; type="text/plain"',
              '<https://www.skinderma.sk/.well-known/api-catalog>; rel="https://www.iana.org/assignments/relation/api-catalog"',
            ].join(", "),
          },
          {
            key: "Content-Signal",
            value: "ai-train=no, search=yes, ai-input=yes",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "skinderma.sk" },
      { protocol: "https", hostname: "skindermacosmetics.com" },
      { protocol: "https", hostname: "secure.gravatar.com" },
    ],
  },
  async redirects() {
    return [
      ...ccTldRedirects("skinderma\\.cz", "cs"),
      ...ccTldRedirects("skinderma\\.hu", "hu"),
    ];
  },
  async rewrites() {
    return {
      afterFiles: [
        // Commerce → Woo apex (URL zostáva www.skinderma.sk)
        { source: "/obchod", destination: "https://skinderma.sk/obchod" },
        { source: "/obchod/:path*", destination: "https://skinderma.sk/obchod/:path*" },
        { source: "/produkt/:slug*", destination: "https://skinderma.sk/produkt/:slug*" },
        { source: "/product-category/:slug*", destination: "https://skinderma.sk/product-category/:slug*" },
        // Cart/Checkout/Account
        { source: "/kosik", destination: "https://skinderma.sk/kosik" },
        { source: "/kosik/:path*", destination: "https://skinderma.sk/kosik/:path*" },
        { source: "/pokladna", destination: "https://skinderma.sk/pokladna" },
        { source: "/pokladna/:path*", destination: "https://skinderma.sk/pokladna/:path*" },
        { source: "/moj-ucet", destination: "https://skinderma.sk/moj-ucet" },
        { source: "/moj-ucet/:path*", destination: "https://skinderma.sk/moj-ucet/:path*" },
        { source: "/objednavka-prijata/:path*", destination: "https://skinderma.sk/objednavka-prijata/:path*" },
        { source: "/order-received/:path*", destination: "https://skinderma.sk/order-received/:path*" },
        // Právne dokumenty → WP je jediný zdroj pravdy (URL zostáva www.skinderma.sk)
        { source: "/vseobecne-obchodne-podmienky", destination: "https://skinderma.sk/obchodne-podmienky/" },
        { source: "/reklamacny-poriadok", destination: "https://skinderma.sk/reklamacny-poriadok/" },
        // Online formuláre pluginu "Spotrebiteľské práva pre WooCommerce"
        { source: "/odstupenie", destination: "https://skinderma.sk/odstupenie-od-zmluvy/" },
        { source: "/reklamacia", destination: "https://skinderma.sk/reklamacia/" },
        { source: "/ochrana-osobnych-udajov", destination: "https://skinderma.sk/zasady-ochrany-osobnych-udajov/" },
        // WP assets pre Woo stránky
        { source: "/wp-content/:path*", destination: "https://skinderma.sk/wp-content/:path*" },
        { source: "/wp-includes/:path*", destination: "https://skinderma.sk/wp-includes/:path*" },
        { source: "/wp-admin/admin-ajax.php", destination: "https://skinderma.sk/wp-admin/admin-ajax.php" },
      ],
    };
  },
};

export { CCTLD_CONTENT_MAP };
export default nextConfig;
