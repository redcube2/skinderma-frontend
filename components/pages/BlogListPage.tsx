import { getPosts } from "@/lib/wordpress";
import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { BlogPostCard } from "@/components/blog/BlogPostCard";

/**
 * Locale-parametrised blog listing (used by /cs and /hu).
 *
 * The articles themselves are authored in Slovak on WordPress, so post links
 * point at the Slovak `/blog/<slug>` detail pages. A note tells cs/hu readers
 * the article text is Slovak-only.
 */
export default async function BlogListPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).blog;
  const posts = await getPosts({ per_page: 12 }).catch(() => []);

  return (
    <section className="container-page py-12 md:py-16">
      <div className="mb-10">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          {t.eyebrow}
        </span>
        <h1 className="mt-2 text-4xl font-bold text-navy md:text-5xl">
          {t.title}
        </h1>
        <p className="mt-3 max-w-2xl text-brand-gray">{t.subtitle}</p>
        {locale !== defaultLocale && t.slovakContentNote && (
          <p className="mt-4 rounded-lg border border-cream-dark bg-cream px-4 py-2 text-sm text-brand-gray">
            {t.slovakContentNote}
          </p>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="rounded-xl border border-cream-dark bg-cream p-10 text-center text-brand-gray">
          {t.empty}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogPostCard key={p.id} post={p} minReadLabel={t.minRead} />
          ))}
        </div>
      )}
    </section>
  );
}
