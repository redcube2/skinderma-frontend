import Hero from "@/components/home/Hero";
import MarqueeBanner from "@/components/home/MarqueeBanner";
import { SadyHomepageSection } from "@/components/home/SadyHomepageSection";
import { DiagnostikaPromoBanner } from "@/components/home/DiagnostikaPromoBanner";
import StatsCounter from "@/components/home/StatsCounter";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ParallaxSection from "@/components/home/ParallaxSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import SkiniaPromo from "@/components/home/SkiniaPromo";
import { B2BSection } from "@/components/home/B2BSection";
import USPSection from "@/components/home/USPSection";
import GallerySection from "@/components/home/GallerySection";
import FAQSection from "@/components/home/FAQSection";
import { FadeInSection } from "@/components/ui/FadeInSection";
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
      <SadyHomepageSection />
      <MarqueeBanner />
      <FadeInSection>
        <StatsCounter />
      </FadeInSection>
      <FadeInSection delay={100}>
        <FeaturedProducts products={products} />
      </FadeInSection>
      <ParallaxSection />
      <FadeInSection delay={100}>
        <CategoryGrid categories={categories} />
      </FadeInSection>
      <FadeInSection>
        <SkiniaPromo />
      </FadeInSection>
      <FadeInSection>
        <B2BSection />
      </FadeInSection>
      <FadeInSection delay={100}>
        <USPSection />
      </FadeInSection>
      <FadeInSection>
        <GallerySection />
      </FadeInSection>
      <FadeInSection delay={100}>
        <FAQSection />
      </FadeInSection>
      <DiagnostikaPromoBanner />
    </>
  );
}
