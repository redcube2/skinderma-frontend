import type { WCProduct } from "@/types/woocommerce";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  emptyMessage = "Momentálne nie sú k dispozícii žiadne produkty.",
}: {
  products: WCProduct[];
  emptyMessage?: string;
}) {
  if (!products || products.length === 0) {
    return (
      <div className="rounded-xl border border-cream-dark bg-cream p-10 text-center text-brand-gray">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
