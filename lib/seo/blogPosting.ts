import type { WPPost } from "../../types/woocommerce";
import { stripHtml } from "../woocommerce";

export interface BlogPostingOptions {
  /** The single canonical www URL for this post — never the apex Yoast one. */
  canonicalUrl: string;
  /**
   * The exact description already computed for page metadata (Yoast
   * description or the stripped excerpt). Reused verbatim here so the
   * structured data never introduces content — medical or otherwise — beyond
   * what WordPress already published.
   */
  description: string;
}

/**
 * Builds a schema.org BlogPosting object for a blog detail page. Pass the
 * result through `serializeJsonLd` before embedding it in a `<script>` tag.
 */
export function buildBlogPostingJsonLd(
  post: WPPost,
  options: BlogPostingOptions
): Record<string, unknown> {
  const { canonicalUrl, description } = options;
  const headline = stripHtml(post.title.rendered);
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const author = post._embedded?.author?.[0];

  const json: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": canonicalUrl,
    url: canonicalUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    headline,
    description,
    datePublished: post.date,
    dateModified: post.modified || post.date,
  };

  if (media?.source_url) json.image = [media.source_url];
  if (author?.name) json.author = { "@type": "Person", name: author.name };

  return json;
}
