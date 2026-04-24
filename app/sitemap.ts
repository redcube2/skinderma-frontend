import type { MetadataRoute } from "next";
import { getAllProductSlugs, getCategories } from "@/lib/woocommerce";
import { getPosts } from "@/lib/wordpress";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.skinderma.sk";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, posts] = await Promise.all([
    getAllProductSlugs().catch(() => []),
    getCategories().catch(() => []),
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

  const postUrls: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.modified ? new Date(p.modified) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    {
      url: `${BASE}/produkty`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE}/o-nas`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE}/kontakt`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE}/dodanie`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE}/odstupenie`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...productUrls,
    ...categoryUrls,
    ...postUrls,
  ];
}
