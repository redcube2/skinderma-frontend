import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/woocommerce";

export default async function CategoryGrid() {
  const categories = (await getCategories().catch(() => []))
    .filter((c) => c.slug !== "uncategorized")
    .slice(0, 6);

  if (categories.length === 0) return null;

  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container-page">
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Kategórie
          </span>
          <h2 className="mt-2 text-3xl font-bold text-navy md:text-4xl">
            Preskúmajte sortiment
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/kategoria/${c.slug}`}
              className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl bg-navy text-white shadow-sm transition-shadow hover:shadow-xl"
            >
              {c.image?.src ? (
                <Image
                  src={c.image.src}
                  alt={c.image.alt || c.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-navy to-navy-light" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
              <div className="relative z-10 p-5">
                <h3 className="text-xl font-semibold text-white">{c.name}</h3>
                <p className="mt-1 text-sm text-cream/80">
                  {c.count} {c.count === 1 ? "produkt" : "produktov"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
