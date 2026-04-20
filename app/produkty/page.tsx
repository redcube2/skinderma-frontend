import type { Metadata } from "next";
import { getCategories, getProducts } from "@/lib/woocommerce";
import { ProductFilters } from "@/components/product/ProductFilters";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Produkty",
  description:
    "Kompletná ponuka lekárskej kozmetiky Skinderma – peelingy, séra a profesionálne produkty.",
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts({ per_page: 100 }).catch(() => []),
    getCategories().catch(() => []),
  ]);

  const relevantCats = categories.filter(
    (c) => c.count > 0 && c.slug !== "uncategorized"
  );

  return (
    <section className="container-page py-12 md:py-16">
      <div className="mb-10">
        <p
          style={{
            color: "#646467",
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Sortiment
        </p>
        <h1
          style={{
            fontSize: "clamp(32px, 4vw, 56px)",
            fontWeight: 300,
            color: "#000",
            marginBottom: 12,
          }}
        >
          Produkty
        </h1>
        <p style={{ color: "#646467", maxWidth: 560, lineHeight: 1.7 }}>
          Lekárska kozmetika Skinderma – GMP certifikované produkty s klinicky
          overenou účinnosťou.
        </p>
      </div>
      <ProductFilters products={products} categories={relevantCats} />
    </section>
  );
}
