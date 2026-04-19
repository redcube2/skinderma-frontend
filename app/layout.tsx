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
    name: "Skinderma",
    legalName: "Red Cube s.r.o.",
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    sameAs: [] as string[],
  };

  return (
    <html lang="sk" className={quicksand.variable}>
      <body className="flex min-h-screen flex-col bg-white text-navy antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
