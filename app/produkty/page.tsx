import type { Metadata } from "next";
import { getProducts } from "@/lib/woocommerce";
import ProductGrid from "@/components/product/ProductGrid";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Produkty",
  description:
    "Kompletná ponuka lekárskej kozmetiky Skinderma – peelingy, séra a profesionálne produkty.",
};

export default async function ProductsPage() {
  const products = await getProducts({ per_page: 48 }).catch(() => []);

  return (
    <section className="container-page py-12 md:py-16">
      <div className="mb-10">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Sortiment
        </span>
        <h1 className="mt-2 text-4xl font-bold text-navy md:text-5xl">Produkty</h1>
        <p className="mt-3 max-w-2xl text-brand-gray">
          Lekárska kozmetika Skinderma – GMP certifikované produkty s klinicky
          overenou účinnosťou.
        </p>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
