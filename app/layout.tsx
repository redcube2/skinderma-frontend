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
    default: "Skinderma – Lekárska kozmetika budúcnosti",
    template: "%s | Skinderma",
  },
  description:
    "GMP certifikované produkty lekárskej kozmetiky pre profesionálov aj domáce použitie. Klinicky testované, distribuované do 50+ krajín sveta.",
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: siteUrl,
    siteName: "Skinderma",
    title: "Skinderma – Lekárska kozmetika budúcnosti",
    description:
      "GMP certifikovaná lekárska kozmetika. Peelingy, séra a profesionálne produkty pre zdravú pokožku.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk" className={quicksand.variable}>
      <body className="flex min-h-screen flex-col bg-white text-navy antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
