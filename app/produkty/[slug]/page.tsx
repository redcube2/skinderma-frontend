import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  addToCartUrl,
  formatPriceWithVat,
  getProduct,
  stripHtml,
} from "@/lib/woocommerce";

export const revalidate = 3600;

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const product = await getProduct(params.slug).catch(() => null);
  if (!product) return { title: "Produkt nenájdený" };
  const desc = stripHtml(product.short_description || product.description).slice(
    0,
    160
  );
  return {
    title: product.name,
    description: desc,
    openGraph: {
      title: product.name,
      description: desc,
      images: product.images?.[0]?.src ? [product.images[0].src] : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Params;
}) {
  const product = await getProduct(params.slug).catch(() => null);
  if (!product) notFound();

  const mainImage = product.images?.[0];
  const gallery = product.images?.slice(1, 5) ?? [];

  return (
    <article className="container-page py-10 md:py-16">
      <nav className="mb-6 text-sm text-brand-gray">
        <Link href="/" className="hover:text-gold">
          Domov
        </Link>{" "}
        /{" "}
        <Link href="/produkty" className="hover:text-gold">
          Produkty
        </Link>{" "}
        / <span className="text-navy">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-cream">
            {mainImage ? (
              <Image
                src={mainImage.src}
                alt={mainImage.alt || product.name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            ) : null}
          </div>
          {gallery.length > 0 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {gallery.map((img) => (
                <div
                  key={img.id}
                  className="relative aspect-square overflow-hidden rounded-xl bg-cream"
                >
                  <Image
                    src={img.src}
                    alt={img.alt || product.name}
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          {product.categories?.[0] && (
            <Link
              href={`/kategoria/${product.categories[0].slug}`}
              className="mb-3 inline-block self-start rounded-full bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy hover:bg-cream-dark"
            >
              {product.categories[0].name}
            </Link>
          )}
          <h1 className="text-3xl font-bold text-navy md:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-baseline gap-3">
            {product.on_sale && product.regular_price ? (
              <>
                <span className="text-3xl font-bold text-gold">
                  {formatPriceWithVat(product.price)}
                </span>
                <span className="text-lg text-brand-gray line-through">
                  {formatPriceWithVat(product.regular_price)}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-gold">
                {formatPriceWithVat(product.price)}
              </span>
            )}
            <span className="text-sm text-gray-400">s DPH</span>
          </div>

          {product.short_description && (
            <div
              className="prose mt-6 max-w-none text-brand-gray"
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            />
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <a href={addToCartUrl(product)} className="btn-gold">
              Pridať do košíka
            </a>
            <a
              href={product.permalink}
              className="btn-outline"
              target="_blank"
              rel="noreferrer"
            >
              Detaily na skinderma.sk
            </a>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm">
            <span
              className={`h-2 w-2 rounded-full ${
                product.stock_status === "instock"
                  ? "bg-emerald-500"
                  : "bg-red-500"
              }`}
            />
            <span className="text-brand-gray">
              {product.stock_status === "instock"
                ? "Skladom"
                : product.stock_status === "onbackorder"
                ? "Na objednávku"
                : "Nedostupné"}
            </span>
            {product.sku && (
              <span className="ml-3 text-brand-gray">SKU: {product.sku}</span>
            )}
          </div>
        </div>
      </div>

      {product.description && (
        <section className="mt-16">
          <h2 className="mb-4 text-2xl font-semibold text-navy">Popis produktu</h2>
          <div
            className="prose max-w-none text-brand-gray"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </section>
      )}
    </article>
  );
}
