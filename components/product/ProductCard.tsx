import Image from "next/image";
import Link from "next/link";
import type { WCProduct } from "@/types/woocommerce";
import { addToCartUrl, formatPriceWithVat } from "@/lib/woocommerce";

export default function ProductCard({ product }: { product: WCProduct }) {
  const image = product.images?.[0];
  const category = product.categories?.[0];

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-cream-dark/60 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <Link
        href={`/produkty/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-cream"
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt || product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cream to-cream-dark p-6 text-center">
            <span className="line-clamp-4 text-sm font-medium text-navy/70">
              {product.name}
            </span>
          </div>
        )}
        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy">
            {category.name}
          </span>
        )}
        {product.on_sale && (
          <span className="absolute right-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Akcia
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <Link href={`/produkty/${product.slug}`}>
          <h3 className="line-clamp-2 text-base font-semibold text-navy transition-colors group-hover:text-gold">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2">
          {product.on_sale && product.regular_price ? (
            <>
              <span className="text-lg font-bold text-gold">
                {formatPriceWithVat(product.price)}
              </span>
              <span className="text-sm text-brand-gray line-through">
                {formatPriceWithVat(product.regular_price)}
              </span>
              <span className="text-xs text-gray-400">s DPH</span>
            </>
          ) : (
            <>
              <span className="text-lg font-bold text-gold">
                {formatPriceWithVat(product.price)}
              </span>
              <span className="text-xs text-gray-400">s DPH</span>
            </>
          )}
        </div>

        <a
          href={addToCartUrl(product)}
          className="btn-gold mt-auto w-full text-sm"
        >
          Pridať do košíka
        </a>
      </div>
    </div>
  );
}
