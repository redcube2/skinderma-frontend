import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPostDate, getPost } from "@/lib/wordpress";
import { stripHtml } from "@/lib/woocommerce";

export const revalidate = 3600;

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const post = await getPost(params.slug).catch(() => null);
  if (!post) return { title: "Článok nenájdený" };
  const desc = stripHtml(post.excerpt.rendered).slice(0, 160);
  return {
    title: stripHtml(post.title.rendered),
    description: desc,
    openGraph: {
      title: stripHtml(post.title.rendered),
      description: desc,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const post = await getPost(params.slug).catch(() => null);
  if (!post) notFound();

  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const author = post._embedded?.author?.[0];

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
        className="prose prose-lg max-w-3xl text-brand-gray"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  );
}
