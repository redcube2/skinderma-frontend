import Hero from "@/components/home/Hero";
import MarqueeBanner from "@/components/home/MarqueeBanner";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ParallaxSection from "@/components/home/ParallaxSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import USPSection from "@/components/home/USPSection";
import GallerySection from "@/components/home/GallerySection";
import {
  getCategories,
  getFeaturedProducts,
  getProducts,
} from "@/lib/woocommerce";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featuredRaw, categories] = await Promise.all([
    getFeaturedProducts(8).catch(() => []),
    getCategories().catch(() => []),
  ]);

  const products =
    featuredRaw.length > 0
      ? featuredRaw
      : await getProducts({ per_page: 8, orderby: "popularity" }).catch(
          () => []
        );

  return (
    <>
      <Hero />
      <MarqueeBanner />
      <FeaturedProducts products={products} />
      <ParallaxSection />
      <CategoryGrid categories={categories} />
      <USPSection />
      <GallerySection />
    </>
  );
}
