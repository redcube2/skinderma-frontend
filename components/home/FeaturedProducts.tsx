import Image from "next/image";
import Link from "next/link";
import type { WCProduct } from "@/types/woocommerce";
import {
  addToCartUrl,
  formatPriceWithVat,
  stripHtml,
} from "@/lib/woocommerce";

export default function FeaturedProducts({
  products,
}: {
  products: WCProduct[];
}) {
  if (!products || products.length === 0) return null;

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-[#646467]">
              Kolekcia
            </p>
            <h2 className="text-[clamp(32px,4vw,56px)] font-light leading-tight text-black">
              Vybrané produkty
            </h2>
          </div>
          <Link
            href="/produkty"
            className="border-b border-black pb-1 text-[11px] uppercase tracking-[0.3em] text-black transition-opacity hover:opacity-60"
          >
            Všetky produkty
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 8).map((product) => {
            const image = product.images?.[0];
            const category = product.categories?.[0];
            const short = product.short_description
              ? stripHtml(product.short_description)
              : "";

            return (
              <div
                key={product.id}
                className="group flex flex-col border border-[#e2e2cf] bg-white transition-shadow hover:shadow-xl"
              >
                <Link
                  href={`/produkty/${product.slug}`}
                  className="relative block aspect-square overflow-hidden bg-[#f5f5f0]"
                >
                  {image ? (
                    <Image
                      src={image.src}
                      alt={image.alt || product.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center p-6 text-center">
                      <span className="line-clamp-4 text-sm text-[#646467]">
                        {product.name}
                      </span>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="pointer-events-none absolute inset-0 flex translate-y-full flex-col justify-end bg-black/80 p-6 transition-transform duration-500 ease-out group-hover:translate-y-0">
                    {short && (
                      <p className="line-clamp-5 text-[13px] leading-[1.7] text-white/90">
                        {short}
                      </p>
                    )}
                  </div>
                </Link>

                <div className="flex flex-1 flex-col gap-4 p-6">
                  {category && (
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#646467]">
                      {category.name}
                    </p>
                  )}
                  <Link href={`/produkty/${product.slug}`}>
                    <h3 className="line-clamp-2 text-base font-normal text-black transition-colors hover:text-[#646467]">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mt-auto flex items-baseline gap-2 pt-2">
                    {product.on_sale && product.regular_price ? (
                      <>
                        <span className="text-lg font-semibold text-black">
                          {formatPriceWithVat(product.price)}
                        </span>
                        <span className="text-xs text-[#646467] line-through">
                          {formatPriceWithVat(product.regular_price)}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-semibold text-black">
                        {formatPriceWithVat(product.price)}
                      </span>
                    )}
                  </div>

                  <a
                    href={addToCartUrl(product)}
                    className="mt-2 inline-block border-b border-black pb-1 text-[11px] uppercase tracking-[0.3em] text-black self-start transition-opacity hover:opacity-60"
                  >
                    Do košíka
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
