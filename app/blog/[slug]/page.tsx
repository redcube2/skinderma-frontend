import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BLOG_REVALIDATE_SECONDS,
  formatPostDate,
  getPost,
  getPostCategories,
} from "@/lib/wordpress";
import { PostViewTracker } from "@/components/blog/PostViewTracker";
import { getReadingTime } from "@/lib/readingTime";
import { stripHtml } from "@/lib/woocommerce";
import {
  buildBlogPostCanonical,
  buildBlogPostDescription,
  buildBlogPostMetadata,
} from "@/lib/seo/blogMetadata";
import { buildBlogPostingJsonLd } from "@/lib/seo/blogPosting";
import { serializeJsonLd } from "@/lib/seo/jsonLd";

export const revalidate = BLOG_REVALIDATE_SECONDS;

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const post = await getPost(params.slug).catch(() => null);
  if (!post) return { title: "Článok nenájdený" };
  return buildBlogPostMetadata(post);
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const post = await getPost(params.slug).catch(() => null);
  if (!post) notFound();

  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const author = post._embedded?.author?.[0];
  const readingTime = getReadingTime(post.content.rendered);
  const categories = getPostCategories(post);

  const canonical = buildBlogPostCanonical(post.slug);
  const jsonLd = buildBlogPostingJsonLd(post, {
    canonicalUrl: canonical,
    description: buildBlogPostDescription(post),
  });

  return (
    <article className="container-page py-10 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <nav className="mb-6 text-sm text-brand-gray">
        <Link href="/" className="hover:text-gold">
          Domov
        </Link>{" "}
        /{" "}
        <Link href="/blog" className="hover:text-gold">
          Blog
        </Link>
      </nav>

      <header className="mb-8 max-w-3xl">
        <div className="mb-3 flex items-center gap-3 text-sm text-brand-gray">
          <span className="font-semibold text-gold">
            {formatPostDate(post.date)}
          </span>
          {author && <span>· {author.name}</span>}
        </div>
        <h1
          className="text-3xl font-bold text-navy md:text-5xl"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            alignItems: "center",
            color: "#646467",
            fontSize: 13,
            marginTop: 16,
          }}
        >
          <span>{formatPostDate(post.date)}</span>
          <span style={{ color: "#e2e2cf" }}>·</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            {readingTime} min čítania
          </span>
          <span style={{ color: "#e2e2cf" }}>·</span>
          <PostViewTracker postId={post.id} />
        </div>
        {categories.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/blog/kategoria/${c.slug}`}
                className="rounded-full border border-cream-dark px-3 py-1 text-xs font-medium text-brand-gray transition-colors hover:border-gold hover:text-gold"
              >
                {c.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      {media?.source_url && (
        <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl bg-cream">
          <Image
            src={media.source_url}
            alt={media.alt_text || stripHtml(post.title.rendered)}
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      <div
        className="prose prose-lg max-w-3xl prose-headings:text-black prose-headings:font-normal prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-[#e8e4dc] prose-h3:text-xl prose-h3:mt-8 prose-p:text-[#646467] prose-p:leading-relaxed prose-li:text-[#646467] prose-strong:text-black prose-a:text-black prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-[#646467] prose-ul:my-4 prose-ol:my-4"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  );
}
