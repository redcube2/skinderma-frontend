import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPostDate, getPost } from "@/lib/wordpress";
import { stripHtml } from "@/lib/woocommerce";
import { PostViewTracker } from "@/components/blog/PostViewTracker";
import { getReadingTime } from "@/lib/readingTime";

export const revalidate = 3600;

type Params = { slug: string };

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://skinderma.sk";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const post = await getPost(params.slug).catch(() => null);
  if (!post) return { title: "Článok nenájdený" };
  const yoast = post.yoast_head_json;
  const title = stripHtml(post.title.rendered);
  const fallbackDesc = stripHtml(post.excerpt.rendered).slice(0, 160);
  const canonical = yoast?.canonical || `${SITE_URL}/blog/${post.slug}`;
  const image =
    yoast?.og_image?.[0]?.url ||
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  return {
    title: yoast?.title || title,
    description: yoast?.description || fallbackDesc,
    alternates: { canonical },
    openGraph: {
      title: yoast?.og_title || title,
      description: yoast?.og_description || fallbackDesc,
      url: canonical,
      type: "article",
      siteName: "Skinderma",
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: yoast?.twitter_title || yoast?.og_title || title,
      description:
        yoast?.twitter_description || yoast?.og_description || fallbackDesc,
      images: yoast?.twitter_image
        ? [yoast.twitter_image]
        : image
        ? [image]
        : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const post = await getPost(params.slug).catch(() => null);
  if (!post) notFound();

  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const author = post._embedded?.author?.[0];
  const readingTime = getReadingTime(post.content.rendered);

  return (
    <article className="container-page py-10 md:py-16">
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
