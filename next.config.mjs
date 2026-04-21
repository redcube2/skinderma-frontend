/** @type {import('next').NextConfig} */
const nextConfig = {
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
        {
          source: "/kosik/:path*",
          destination: "https://skinderma.sk/kosik/:path*",
        },
        {
          source: "/checkout/:path*",
          destination: "https://skinderma.sk/checkout/:path*",
        },
        {
          source: "/pokladna/:path*",
          destination: "https://skinderma.sk/pokladna/:path*",
        },
        {
          source: "/moj-ucet/:path*",
          destination: "https://skinderma.sk/moj-ucet/:path*",
        },
        {
          source: "/dakujeme/:path*",
          destination: "https://skinderma.sk/order-received/:path*",
        },
        {
          source: "/wp-admin/:path*",
          destination: "https://skinderma.sk/wp-admin/:path*",
        },
        {
          source: "/wp-login.php",
          destination: "https://skinderma.sk/wp-login.php",
        },
        {
          source: "/wp-content/:path*",
          destination: "https://skinderma.sk/wp-content/:path*",
        },
        {
          source: "/wp-includes/:path*",
          destination: "https://skinderma.sk/wp-includes/:path*",
        },
        {
          source: "/wp-json/wc/:path*",
          destination: "https://skinderma.sk/wp-json/wc/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
