import Image from "next/image";
import Link from "next/link";
import type { WCCategory } from "@/types/woocommerce";

const FALLBACK_IMAGES = [
  "https://skinderma.sk/wp-content/uploads/2025/09/serum-solution-scaled-1.jpg",
  "https://skinderma.sk/wp-content/uploads/2025/09/ampolas.jpg",
  "https://skinderma.sk/wp-content/uploads/2025/09/Exosome-Ageless.png",
  "https://skinderma.sk/wp-content/uploads/2025/09/TESTE-scaled-1.jpg",
  "https://skinderma.sk/wp-content/uploads/2025/09/glutathione_khh-scaled-1.jpg",
  "https://skinderma.sk/wp-content/uploads/2025/09/serum-solution-scaled-1.jpg",
];

export default function CategoryGrid({
  categories,
}: {
  categories: WCCategory[];
}) {
  const items = (categories ?? [])
    .filter((c) => c.slug !== "uncategorized" && c.count > 0)
    .slice(0, 6);

  if (items.length === 0) return null;

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <div className="mb-16 text-center">
          <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-[#646467]">
            Kategórie
          </p>
          <h2 className="text-[clamp(32px,4vw,56px)] font-light leading-tight text-black">
            Preskúmajte sortiment
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c, i) => {
            const src = c.image?.src || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length];
            return (
              <Link
                key={c.id}
                href={`/kategoria/${c.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden bg-black"
              >
                <Image
                  src={src}
                  alt={c.image?.alt || c.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover opacity-75 transition-all duration-700 group-hover:scale-[1.05] group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[#b0b0b0]">
                    {c.count} {c.count === 1 ? "produkt" : "produktov"}
                  </p>
                  <h3 className="text-2xl font-light text-white md:text-3xl">
                    {c.name}
                  </h3>
                  <span className="mt-4 inline-block border-b border-white pb-1 text-[10px] uppercase tracking-[0.3em] text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    Zobraziť
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
