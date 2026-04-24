/** @type {import('next').NextConfig} */
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
        // WP assets pre Woo stránky
        { source: "/wp-content/:path*", destination: "https://skinderma.sk/wp-content/:path*" },
        { source: "/wp-includes/:path*", destination: "https://skinderma.sk/wp-includes/:path*" },
        { source: "/wp-admin/admin-ajax.php", destination: "https://skinderma.sk/wp-admin/admin-ajax.php" },
      ],
    };
  },
};

export default nextConfig;
