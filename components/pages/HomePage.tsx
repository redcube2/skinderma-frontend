import Link from "next/link";
import MarqueeBanner from "@/components/home/MarqueeBanner";
import { DiagnostikaPromoBanner } from "@/components/home/DiagnostikaPromoBanner";
import StatsCounter from "@/components/home/StatsCounter";
import ParallaxSection from "@/components/home/ParallaxSection";
import SkiniaPromo from "@/components/home/SkiniaPromo";
import { B2BSection } from "@/components/home/B2BSection";
import USPSection from "@/components/home/USPSection";
import GallerySection from "@/components/home/GallerySection";
import FAQSection from "@/components/home/FAQSection";
import Hero from "@/components/home/Hero";
import { FadeInSection } from "@/components/ui/FadeInSection";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

/**
 * Localised home page for the /cs and /hu routes.
 *
 * Section copy comes from the dictionary. Commerce-coupled sections
 * (product bundles, featured products, WooCommerce category grid) are
 * intentionally omitted here — the shop, its Slovak catalogue slugs and its
 * prices are owned by the WooCommerce apex and stay Slovak-only. A localised
 * "browse the shop" call-to-action links visitors there instead.
 *
 * The Slovak home page (app/page.tsx) keeps the full commerce experience.
 */
export default function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const home = dict.home;

  return (
    <>
      <Hero dict={home.hero} locale={locale} />
      <MarqueeBanner items={home.marquee} />
      <FadeInSection>
        <StatsCounter labels={home.stats.map((s) => s.label)} />
      </FadeInSection>
      <ShopCta
        eyebrow={home.featured.eyebrow}
        title={home.featured.title}
        cta={home.featured.goToShop}
      />
      <ParallaxSection dict={home.parallax} />
      <FadeInSection>
        <SkiniaPromo dict={home.skinia} />
      </FadeInSection>
      <FadeInSection>
        <B2BSection dict={home.b2b} locale={locale} />
      </FadeInSection>
      <FadeInSection delay={100}>
        <USPSection items={home.usp} />
      </FadeInSection>
      <FadeInSection>
        <GallerySection dict={home.gallery} />
      </FadeInSection>
      <FadeInSection delay={100}>
        <FAQSection dict={home.faq} />
      </FadeInSection>
      <DiagnostikaPromoBanner dict={home.diagnostika} />
    </>
  );
}

function ShopCta({
  eyebrow,
  title,
  cta,
}: {
  eyebrow: string;
  title: string;
  cta: string;
}) {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1200px] px-6 text-center md:px-10">
        <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-[#646467]">
          {eyebrow}
        </p>
        <h2 className="mb-10 text-[clamp(32px,4vw,56px)] font-light leading-tight text-black">
          {title}
        </h2>
        <Link
          href="https://skinderma.sk/obchod"
          className="inline-block bg-black px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:bg-[#333]"
        >
          {cta}
        </Link>
      </div>
    </section>
  );
}

