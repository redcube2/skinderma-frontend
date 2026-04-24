import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.skinderma.sk";
const APEX = "https://skinderma.sk";

const PRODUCTION_HOSTS = ["https://www.skinderma.sk", "https://skinderma.sk"];
const IS_PRODUCTION = PRODUCTION_HOSTS.includes(BASE);

export default function robots(): MetadataRoute.Robots {
  // Ak doména nie je skinderma.sk (napr. vercel.app preview) → noindex
  if (!IS_PRODUCTION) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // AI crawlery – explicitne povolené
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "Amazonbot", allow: "/" },
      { userAgent: "YouBot", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
    // Content Signals – deklarácia preferencií pre AI použitie obsahu
    // ai-train=no: nepoužívaj obsah na tréning modelov
    // search=yes: indexuj pre AI vyhľadávanie
    // ai-input=yes: obsah môže byť vstupom pre AI dotazy
  };
}

// Note: Content-Signal header is injected via next.config.mjs headers()
