import type { MetadataRoute } from "next";
import { getAllProductSlugs, getCategories } from "@/lib/woocommerce";
import { BLOG_REVALIDATE_SECONDS, getBlogCategories, getPosts } from "@/lib/wordpress";
import { SITE_URL, localeHreflang, localizedUrl, locales } from "@/lib/i18n/config";
import { ROUTE_SEGMENTS } from "@/lib/i18n/routes";
import {
  buildBlogCategorySitemapUrls,
  buildBlogPostSitemapUrls,
} from "@/lib/seo/blogSitemap";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.skinderma.sk";

export const revalidate = BLOG_REVALIDATE_SECONDS;

/**
 * Localised content routes (sk default + /cs + /hu), each carrying the full
 * hreflang alternate cluster. Commerce and legal URLs stay out — the apex owns
 * their canonicals.
 */
const CONTENT_ROUTE_META: Partial<
  Record<keyof typeof ROUTE_SEGMENTS, { changeFrequency: "daily" | "weekly" | "monthly"; priority: number }>
> = {
  home: { changeFrequency: "daily", priority: 1.0 },
  blog: { changeFrequency: "weekly", priority: 0.6 },
  about: { changeFrequency: "monthly", priority: 0.5 },
  contact: { changeFrequency: "monthly", priority: 0.5 },
  oSkinderme: { changeFrequency: "monthly", priority: 0.4 },
  partnership: { changeFrequency: "monthly", priority: 0.4 },
  delivery: { changeFrequency: "monthly", priority: 0.3 },
  // `cookies` is deliberately absent: the page is still a placeholder in all
  // three locales and is noindex until it carries a real cookie notice.
};

function localizedContentEntries(now: Date): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const [key, meta] of Object.entries(CONTENT_ROUTE_META)) {
    const segment = ROUTE_SEGMENTS[key as keyof typeof ROUTE_SEGMENTS];
    const languages: Record<string, string> = {};
    for (const l of locales) {
      languages[localeHreflang[l]] = localizedUrl(l, segment);
    }
    languages["x-default"] = localizedUrl("sk", segment);
    for (const l of locales) {
      entries.push({
        url: localizedUrl(l, segment),
        lastModified: now,
        changeFrequency: meta.changeFrequency,
        priority: meta.priority,
        alternates: { languages },
      });
    }
  }
  return entries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, blogCategories, posts] = await Promise.all([
    getAllProductSlugs().catch(() => []),
    getCategories().catch(() => []),
    getBlogCategories().catch(() => []),
    getPosts({ per_page: 100, _fields: "slug,modified" }).catch(() => []),
  ]);

  const now = new Date();

  const productUrls: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE}/produkty/${p.slug}`,
    lastModified: p.date_modified ? new Date(p.date_modified) : now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryUrls: MetadataRoute.Sitemap = categories
    .filter((c) => c.count > 0)
    .map((c) => ({
      url: `${BASE}/kategoria/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  // Blog URLs always use the normalized www origin (SITE_URL), never the bare
  // `BASE` above — NEXT_PUBLIC_SITE_URL is often set to the apex, and the
  // headless blog's single canonical is www.skinderma.sk/blog/{slug}.
  const postUrls = buildBlogPostSitemapUrls(posts, SITE_URL, now);
  const blogCategoryUrls = buildBlogCategorySitemapUrls(blogCategories, SITE_URL, now);

  return [
    ...localizedContentEntries(now),
    {
      url: `${BASE}/produkty`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    // Právne stránky tu zámerne nie sú: /odstupenie, /reklamacia,
    // /vseobecne-obchodne-podmienky a /reklamacny-poriadok sú rewrite na WP
    // a kanonickú URL si nesie apex (skinderma.sk), ktorý ich má vo vlastnom
    // sitemape. Uvádzať ich aj tu = duplicitná URL s cudzím canonical.
    ...productUrls,
    ...categoryUrls,
    ...postUrls,
    ...blogCategoryUrls,
  ];
}
