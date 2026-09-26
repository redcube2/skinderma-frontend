import type { Metadata } from "next";
import { getPosts } from "@/lib/wordpress";
import { buildAlternates } from "@/lib/i18n/metadata";
import { BlogPostCard } from "@/components/blog/BlogPostCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Články o starostlivosti o pleť, ošetreniach a novinkách zo sveta lekárskej kozmetiky Skinderma.",
  alternates: buildAlternates("sk", "/blog"),
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
          {posts.map((p) => (
            <BlogPostCard key={p.id} post={p} minReadLabel="min čítania" />
          ))}
        </div>
      )}
    </section>
  );
}
