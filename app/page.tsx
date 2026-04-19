import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoryGrid from "@/components/home/CategoryGrid";
import USPSection from "@/components/home/USPSection";

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Hero />
      <USPSection />
      <FeaturedProducts />
      <CategoryGrid />
    </>
  );
}
