import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BLOG_REVALIDATE_SECONDS,
  getBlogCategory,
  getPostsPage,
} from "@/lib/wordpress";
import { stripHtml } from "@/lib/woocommerce";
import { localizedUrl } from "@/lib/i18n/config";
import { BlogPostCard } from "@/components/blog/BlogPostCard";

export const revalidate = BLOG_REVALIDATE_SECONDS;

type Params = { slug: string };
type SearchParams = { page?: string };

const PER_PAGE = 12;

function parsePage(searchParams?: SearchParams): number {
  const n = Number(searchParams?.page);
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : 1;
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Params;
  searchParams?: SearchParams;
}): Promise<Metadata> {
  const category = await getBlogCategory(params.slug).catch(() => null);
  if (!category) {
    return { title: "Kategória nenájdená", robots: { index: false, follow: false } };
  }

  const page = parsePage(searchParams);
  const canonicalBase = localizedUrl("sk", `/blog/kategoria/${category.slug}`);
  const canonical = page > 1 ? `${canonicalBase}?page=${page}` : canonicalBase;
  const description = category.description
    ? stripHtml(category.description)
    : `Články z kategórie ${category.name} na blogu Skinderma.`;
  // An empty category has nothing worth ranking for and must never be
  // indexed — it also never enters the sitemap (see lib/seo/blogSitemap.ts).
  const isEmpty = category.count === 0;

  return {
    title: `${category.name} | Blog`,
    description,
    alternates: { canonical },
    ...(isEmpty ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: category.name,
      description,
      url: canonical,
      type: "website",
      siteName: "Skinderma",
    },
  };
}

export default async function BlogCategoryPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams?: SearchParams;
}) {
  const category = await getBlogCategory(params.slug).catch(() => null);
  if (!category) notFound();

  const page = parsePage(searchParams);
  const { posts, totalPages } = await getPostsPage({
    category: category.id,
    page,
    per_page: PER_PAGE,
  }).catch(() => ({ posts: [], totalPages: 0, page }));

  // An out-of-range page (page > totalPages) is a broken link, not an empty
  // category — 404 it rather than rendering a misleading "no posts" state.
  if (page > 1 && totalPages > 0 && page > totalPages) notFound();

  const isEmpty = category.count === 0 || (totalPages === 0 && posts.length === 0);

  return (
    <section className="container-page py-12 md:py-16">
      <nav className="mb-6 text-sm text-brand-gray">
        <Link href="/" className="hover:text-gold">
          Domov
        </Link>{" "}
        /{" "}
        <Link href="/blog" className="hover:text-gold">
          Blog
        </Link>
      </nav>

      <div className="mb-10">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Kategória
        </span>
        <h1 className="mt-2 text-4xl font-bold text-navy md:text-5xl">
          {category.name}
        </h1>
        {category.description && (
          <p className="mt-3 max-w-2xl text-brand-gray">
            {stripHtml(category.description)}
          </p>
        )}
      </div>

      {isEmpty ? (
        <div className="rounded-xl border border-cream-dark bg-cream p-10 text-center text-brand-gray">
          V tejto kategórii zatiaľ nie sú publikované žiadne články.
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <BlogPostCard key={p.id} post={p} minReadLabel="min čítania" />
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="mt-10 flex items-center justify-center gap-4 text-sm">
              {page > 1 && (
                <Link
                  href={`/blog/kategoria/${category.slug}?page=${page - 1}`}
                  className="hover:text-gold"
                >
                  ← Predchádzajúca
                </Link>
              )}
              <span className="text-brand-gray">
                Strana {page} z {totalPages}
              </span>
              {page < totalPages && (
                <Link
                  href={`/blog/kategoria/${category.slug}?page=${page + 1}`}
                  className="hover:text-gold"
                >
                  Ďalšia →
                </Link>
              )}
            </nav>
          )}
        </>
      )}
    </section>
  );
}
