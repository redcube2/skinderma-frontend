import type { MetadataRoute } from "next";
import type { WPCategory, WPPost } from "../../types/woocommerce";

/**
 * Sitemap entries for blog category archives. Only categories with at least
 * one published post are included — an empty category is noindex on the page
 * itself and must not appear here either.
 */
export function buildBlogCategorySitemapUrls(
  categories: WPCategory[],
  base: string,
  now: Date
): MetadataRoute.Sitemap {
  return categories
    .filter((c) => c.count > 0)
    .map((c) => ({
      url: `${base}/blog/kategoria/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    }));
}

/** Sitemap entries for blog posts, always at {base}/blog/{slug}. */
export function buildBlogPostSitemapUrls(
  posts: WPPost[],
  base: string,
  now: Date
): MetadataRoute.Sitemap {
  return posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.modified ? new Date(p.modified) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));
}
