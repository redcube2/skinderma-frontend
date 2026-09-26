import Image from "next/image";
import Link from "next/link";
import { formatPostDate, getPostCategories } from "@/lib/wordpress";
import { getReadingTime } from "@/lib/readingTime";
import { stripHtml } from "@/lib/woocommerce";
import type { WPPost } from "@/types/woocommerce";

/**
 * Shared post card used by the Slovak blog listing, the /cs and /hu blog
 * listings, and the category archive. The whole card is a "stretched link"
 * to the post (an absolutely-positioned overlay `<Link>`, not a wrapping
 * `<Link>`) so the per-category chips below can be their own, independently
 * clickable links without nesting an `<a>` inside another `<a>`.
 */
export function BlogPostCard({
  post,
  minReadLabel,
}: {
  post: WPPost;
  minReadLabel: string;
}) {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const categories = getPostCategories(post);
  const title = stripHtml(post.title.rendered);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-cream-dark/60 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <Link
        href={`/blog/${post.slug}`}
        className="absolute inset-0 z-0"
        aria-label={title}
      >
        <span className="sr-only">{title}</span>
      </Link>
      <div className="relative aspect-[16/10] bg-cream">
        {media?.source_url ? (
          <Image
            src={media.source_url}
            alt={media.alt_text || post.title.rendered}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-gold">
            {formatPostDate(post.date)}
          </span>
          <span className="text-xs text-[#646467]">·</span>
          <span className="text-xs text-[#646467]">
            {getReadingTime(post.content?.rendered || post.excerpt.rendered)}{" "}
            {minReadLabel}
          </span>
        </div>
        <h2
          className="line-clamp-2 text-lg font-semibold text-navy transition-colors group-hover:text-gold"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <div
          className="line-clamp-3 text-sm text-brand-gray"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
        {categories.length > 0 && (
          <div className="relative z-10 mt-auto flex flex-wrap gap-2 pt-2">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/blog/kategoria/${c.slug}`}
                className="rounded-full border border-cream-dark px-2.5 py-1 text-[11px] font-medium text-brand-gray transition-colors hover:border-gold hover:text-gold"
              >
                {c.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
