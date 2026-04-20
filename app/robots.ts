import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://skinderma.sk";
const IS_PRODUCTION = BASE === "https://skinderma.sk";

export default function robots(): MetadataRoute.Robots {
  // Ak doména nie je skinderma.sk (napr. vercel.app preview) → noindex
  if (!IS_PRODUCTION) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
