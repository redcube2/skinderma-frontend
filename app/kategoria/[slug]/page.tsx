import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCategory,
  getProductsByCategory,
  stripHtml,
} from "@/lib/woocommerce";
import ProductGrid from "@/components/product/ProductGrid";

export const revalidate = 3600;

type Params = { slug: string };

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://skinderma.sk";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const cat = await getCategory(params.slug).catch(() => null);
  if (!cat) return { title: "Kategória nenájdená" };
  const yoast = cat.yoast_head_json;
  const fallbackDesc =
    stripHtml(cat.description).slice(0, 160) ||
    `Produkty z kategórie ${cat.name} v e-shope Skinderma.`;
  const canonical =
    yoast?.canonical || `${SITE_URL}/kategoria/${cat.slug}`;
  const image = yoast?.og_image?.[0]?.url || cat.image?.src;
  return {
    title: yoast?.title || cat.name,
    description: yoast?.description || fallbackDesc,
    alternates: { canonical },
    openGraph: {
      title: yoast?.og_title || cat.name,
      description: yoast?.og_description || fallbackDesc,
      url: canonical,
      type: "website",
      siteName: "Skinderma",
      images: image ? [{ url: image }] : [],
    },
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const category = await getCategory(params.slug).catch(() => null);
  if (!category) notFound();

  const products = await getProductsByCategory(category.id, {
    per_page: 48,
  }).catch(() => []);

  return (
    <section className="container-page py-12 md:py-16">
      <div className="mb-10">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Kategória
        </span>
        <h1 className="mt-2 text-4xl font-bold text-navy md:text-5xl">
          {category.name}
        </h1>
        {category.description && (
          <div
            className="prose mt-3 max-w-2xl text-brand-gray"
            dangerouslySetInnerHTML={{ __html: category.description }}
          />
        )}
      </div>
      <ProductGrid
        products={products}
        emptyMessage={`V kategórii ${category.name} zatiaľ nie sú žiadne produkty.`}
      />
    </section>
  );
}
