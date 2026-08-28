import Image from "next/image";
import Link from "next/link";
import { formatPostDate, getPosts } from "@/lib/wordpress";
import { getReadingTime } from "@/lib/readingTime";
import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

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
          {posts.map((p) => {
            const media = p._embedded?.["wp:featuredmedia"]?.[0];
            return (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-cream-dark/60 bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] bg-cream">
                  {media?.source_url ? (
                    <Image
                      src={media.source_url}
                      alt={media.alt_text || p.title.rendered}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gold">
                      {formatPostDate(p.date)}
                    </span>
                    <span className="text-xs text-[#646467]">·</span>
                    <span className="text-xs text-[#646467]">
                      {getReadingTime(
                        p.content?.rendered || p.excerpt.rendered
                      )}{" "}
                      {t.minRead}
                    </span>
                  </div>
                  <h2
                    className="line-clamp-2 text-lg font-semibold text-navy transition-colors group-hover:text-gold"
                    dangerouslySetInnerHTML={{ __html: p.title.rendered }}
                  />
                  <div
                    className="line-clamp-3 text-sm text-brand-gray"
                    dangerouslySetInnerHTML={{ __html: p.excerpt.rendered }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
