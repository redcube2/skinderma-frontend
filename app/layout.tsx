import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/footer/Footer";

const quicksand = Quicksand({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://skinderma.sk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Skinderma – Lekárska kozmetika | GMP certifikované produkty",
    template: "%s | Skinderma",
  },
  description:
    "SKINDERMA Medical Cosmetics – profesionálna lekárska kozmetika pre salóny aj domáce použitie. GMP certifikované produkty distribuované do 50+ krajín.",
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: siteUrl,
    siteName: "Skinderma",
    title: "Skinderma – Lekárska kozmetika | GMP certifikované produkty",
    description:
      "GMP certifikovaná lekárska kozmetika. Peelingy, séra a profesionálne produkty pre zdravú pokožku.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skinderma – Lekárska kozmetika",
    description:
      "GMP certifikovaná lekárska kozmetika. Peelingy, séra a profesionálne produkty pre zdravú pokožku.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Skinderma Medical Cosmetics",
    legalName: "Red Cube s.r.o.",
    url: "https://skinderma.sk",
    logo: "https://skinderma.sk/wp-content/uploads/2025/07/Logo-skinderma-cabecera-3.webp",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Nám. M.R. Štefánika 16",
      addressLocality: "Komárno",
      postalCode: "945 01",
      addressCountry: "SK",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+421905108641",
      contactType: "customer service",
      email: "info@skinderma.sk",
    },
    sameAs: [
      "https://www.instagram.com/skinderma_sk",
      "https://www.facebook.com/SkindermaSK",
    ],
  };

  return (
    <html lang="sk" className={quicksand.variable}>
      <body className="flex min-h-screen flex-col bg-white text-navy antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Development banner */}
        <div style={{
          background: "#000", color: "#e2e2cf", textAlign: "center",
          padding: "10px 20px", fontSize: 12, letterSpacing: "0.15em",
          textTransform: "uppercase"
        }}>
          Stránka je vo vývoji · Pre objednávky navštívte{" "}
          <a href="https://skinderma.sk" style={{ color: "#fff", textDecoration: "underline" }}>
            skinderma.sk
          </a>
        </div>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
