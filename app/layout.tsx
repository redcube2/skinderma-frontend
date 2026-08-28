import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/footer/Footer";
import {
  SITE_URL,
  defaultLocale,
  localeHreflang,
  localeHtmlLang,
  localeOgLocale,
  locales,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildAlternates } from "@/lib/i18n/metadata";
import { getRequestLocale, getRequestRoute } from "@/lib/i18n/request";

const quicksand = Quicksand({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://skinderma.sk";

export function generateMetadata(): Metadata {
  const { locale, segment } = getRequestRoute();
  const dict = getDictionary(locale);
  const isHome = segment === "/";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.meta.homeTitle,
      template: dict.meta.titleTemplate,
    },
    description: dict.meta.description,
    // Only the home route owns its alternates here; deeper pages set their own
    // via lib/i18n/metadata so Slovak-only routes stay untouched.
    ...(isHome ? { alternates: buildAlternates(locale, "/") } : {}),
    openGraph: {
      type: "website",
      locale: localeOgLocale[locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => localeOgLocale[l]),
      url: isHome ? `${SITE_URL}${locale === defaultLocale ? "" : "/" + locale}` : undefined,
      siteName: "Skinderma",
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
    },
    verification: {
      google: "74mDStrMQJwZ1mFr_DtTgMwuJL6re0jY7t7F1VzQUb8",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = getRequestLocale();
  const dict = getDictionary(locale);
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.skinderma.sk/#organization",
        name: "Skinderma Medical Cosmetics Slovakia",
        legalName: "Red Cube s.r.o.",
        alternateName: ["Skinderma", "Skinderma SK"],
        url: "https://www.skinderma.sk",
        logo: {
          "@type": "ImageObject",
          url: "https://skinderma.sk/wp-content/uploads/2025/07/Logo-skinderma-cabecera-3.webp",
          width: 402,
          height: 103,
        },
        description:
          "Exkluzívny distribútor španielskej lekárskej kozmetiky Skinderma Medical Cosmetics na Slovensku. GMP certifikované produkty pre kozmetické salóny aj domáce použitie. Distribúcia do 50+ krajín sveta.",
        foundingDate: "2008",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Nám. M.R. Štefánika 16",
          addressLocality: "Komárno",
          postalCode: "945 01",
          addressCountry: "SK",
          addressRegion: "Nitriansky kraj",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+421905108641",
            contactType: "customer service",
            email: "info@skinderma.sk",
            availableLanguage: ["Slovak", "Czech", "English"],
            areaServed: "SK",
          },
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: "info@skinderma.sk",
            description: "B2B objednávky pre kozmetické salóny",
          },
        ],
        sameAs: [
          "https://www.instagram.com/skinderma_sk",
          "https://www.facebook.com/SkindermaSK",
          "https://skinderma.sk",
        ],
        vatID: "SK2022614341",
        taxID: "2022614341",
        knowsAbout: [
          "Medical Cosmetics",
          "GMP Certified Skincare",
          "Professional Salon Products",
          "Exosomes Cosmetics",
          "Peptide Serums",
          "Chemical Peeling",
          "Lekárska kozmetika",
          "Profesionálna kozmetika pre salóny",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Skinderma produktový katalóg",
          url: "https://skinderma.sk/obchod",
        },
        areaServed: {
          "@type": "Country",
          name: "Slovakia",
        },
        numberOfEmployees: {
          "@type": "QuantitativeValue",
          value: "5-10",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.skinderma.sk/#website",
        url: "https://www.skinderma.sk",
        name: "Skinderma – Lekárska kozmetika Slovakia",
        description:
          "Officiálna stránka Skinderma Medical Cosmetics pre slovenský trh. GMP certifikované produkty pre profesionálov aj domáce použitie.",
        publisher: { "@id": "https://www.skinderma.sk/#organization" },
        inLanguage: localeHreflang[locale],
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://skinderma.sk/obchod?s={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang={localeHtmlLang[locale]} className={quicksand.variable}>
      <body className="flex min-h-screen flex-col bg-white text-navy antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
        {/* Development banner */}
        <div style={{
          background: "#000", color: "#e2e2cf", textAlign: "center",
          padding: "10px 20px", fontSize: 12, letterSpacing: "0.15em",
          textTransform: "uppercase"
        }}>
          {dict.banner.contactLabel}{" "}
          <a href="tel:+421905108641" style={{ color: "#fff", textDecoration: "underline" }}>
            +421 905 108 641
          </a>
          {" · "}
          <a href="mailto:info@skinderma.sk" style={{ color: "#fff", textDecoration: "underline" }}>
            info@skinderma.sk
          </a>
        </div>
        <Navbar locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
        {/* Hotjar Tracking */}
        <Script id="hotjar" strategy="afterInteractive">{`
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:6648776,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}</Script>
      </body>
    </html>
  );
}
