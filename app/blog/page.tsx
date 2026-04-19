import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatPostDate, getPosts } from "@/lib/wordpress";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Články o starostlivosti o pleť, ošetreniach a novinkách zo sveta lekárskej kozmetiky Skinderma.",
};

export default async function BlogPage() {
  const posts = await getPosts({ per_page: 12 }).catch(() => []);

  return (
    <section className="container-page py-12 md:py-16">
      <div className="mb-10">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Blog
        </span>
        <h1 className="mt-2 text-4xl font-bold text-navy md:text-5xl">
          Novinky a rady
        </h1>
        <p className="mt-3 max-w-2xl text-brand-gray">
          Odborné články o starostlivosti o pleť a produktoch Skinderma.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-xl border border-cream-dark bg-cream p-10 text-center text-brand-gray">
          Zatiaľ nie sú publikované žiadne články.
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
                  <span className="text-xs font-semibold uppercase tracking-wide text-gold">
                    {formatPostDate(p.date)}
                  </span>
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
