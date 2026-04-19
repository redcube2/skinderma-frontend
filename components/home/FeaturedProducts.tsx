import Link from "next/link";
import { getFeaturedProducts, getProducts } from "@/lib/woocommerce";
import ProductGrid from "@/components/product/ProductGrid";

export default async function FeaturedProducts() {
  let products = await getFeaturedProducts(8).catch(() => []);
  if (!products || products.length === 0) {
    products = await getProducts({ per_page: 8, orderby: "popularity" }).catch(
      () => []
    );
  }

  return (
    <section className="container-page py-16 md:py-24">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Výber Skinderma
          </span>
          <h2 className="mt-2 text-3xl font-bold text-navy md:text-4xl">
            Najpopulárnejšie produkty
          </h2>
        </div>
        <Link
          href="/produkty"
          className="text-sm font-semibold text-gold hover:text-gold-dark"
        >
          Všetky produkty →
        </Link>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
