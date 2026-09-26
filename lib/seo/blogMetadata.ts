import type { Metadata } from "next";
import type { WPPost } from "../../types/woocommerce";
import { stripHtml } from "../woocommerce";
import { localizedUrl } from "../i18n/config";

/**
 * The single canonical URL for a blog detail page: always
 * https://www.skinderma.sk/blog/{slug}. Must never be replaced by the apex
 * WordPress/Yoast canonical (which points at the WP permalink, not the
 * headless frontend) — that is the exact regression this helper guards
 * against by construction: it never reads `yoast_head_json` at all.
 */
export function buildBlogPostCanonical(slug: string): string {
  return localizedUrl("sk", `/blog/${slug}`);
}

/** Description used for both page metadata and the BlogPosting JSON-LD. */
export function buildBlogPostDescription(post: WPPost): string {
  return (
    post.yoast_head_json?.description ||
    stripHtml(post.excerpt.rendered).slice(0, 160)
  );
}

/**
 * Next.js metadata for a blog detail page. Content (title/description/image)
 * may still be sourced from Yoast when available, but every URL field
 * (canonical, Open Graph url) is always our own www canonical — never
 * `yoast_head_json.canonical` / `og_url`, which point at the WordPress apex.
 */
export function buildBlogPostMetadata(post: WPPost): Metadata {
  const yoast = post.yoast_head_json;
  const title = stripHtml(post.title.rendered);
  const description = buildBlogPostDescription(post);
  const canonical = buildBlogPostCanonical(post.slug);
  const image =
    yoast?.og_image?.[0]?.url ||
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return {
    title: yoast?.title || title,
    description,
    alternates: { canonical },
    openGraph: {
      title: yoast?.og_title || title,
      description: yoast?.og_description || description,
      url: canonical,
      type: "article",
      siteName: "Skinderma",
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: yoast?.twitter_title || yoast?.og_title || title,
      description:
        yoast?.twitter_description || yoast?.og_description || description,
      images: yoast?.twitter_image
        ? [yoast.twitter_image]
        : image
        ? [image]
        : undefined,
    },
  };
}
