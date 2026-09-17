import type { Metadata } from "next";
import ProductCarousel from "@/components/link/ProductCarousel";
import { primaryLinks } from "@/lib/link-hub";
import styles from "./link.module.css";

const pdrnImage = "https://skinderma.sk/wp-content/uploads/2025/09/Skinderma-PDRN-SERUM-VP.webp";

export const metadata: Metadata = {
  title: { absolute: "Skinderma | Produkty, Skin Beauty House a partnerstvo" },
  description: "Objavte produkty Skinderma, rezervujte si starostlivosť v Skin Beauty House alebo sa staňte partnerským salónom.",
  alternates: { canonical: "https://www.skinderma.sk/link" },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  openGraph: {
    title: "Skinderma | Produkty, Skin Beauty House a partnerstvo",
    description: "Objavte produkty Skinderma, rezervujte si starostlivosť v Skin Beauty House alebo sa staňte partnerským salónom.",
    url: "https://www.skinderma.sk/link", siteName: "Skinderma", type: "website", locale: "sk_SK",
    images: [{ url: pdrnImage, width: 1080, height: 1080, alt: "Skinderma PDRN Sérum" }],
  },
  twitter: { card: "summary_large_image", title: "Skinderma | Produkty, Skin Beauty House a partnerstvo", description: "Objavte produkty Skinderma, rezervujte si starostlivosť v Skin Beauty House alebo sa staňte partnerským salónom.", images: [pdrnImage] },
};

export default function LinkHubPage() {
  return <div className={styles.page}>
    <header className={styles.header}><a href="/" className={styles.wordmark} aria-label="Skinderma – domov"><span>SKINDERMA</span><small>MEDICAL COSMETICS</small></a></header>
    <div className={styles.content}>
      <section className={styles.intro} aria-labelledby="link-hub-title"><p className={styles.eyebrow}>Starostlivosť o pleť</p><h1 id="link-hub-title">Objavte Skinderma pre svoju pleť alebo salón</h1><p>Produkty pre domácu rutinu, odborná starostlivosť v Skin Beauty House a partnerstvo pre kozmetičky a salóny.</p></section>
      <nav className={styles.primaryLinks} aria-label="Hlavné odkazy">{primaryLinks.map((link) => <a key={link.href} href={link.href} className={`${styles.cta} ${link.emphasized ? styles.ctaEmphasized : ""}`}><span className={styles.ctaTitle}>{link.label}{link.external && <span className={styles.externalMark} aria-label=" externý odkaz"> ↗</span>}</span><span className={styles.ctaCopy}>{link.description}</span></a>)}</nav>
      <p className={styles.comingSoon}>Partnerské salóny Skinderma — pripravujeme</p><ProductCarousel />
    </div>
    <footer className={styles.footer}><span>© {new Date().getFullYear()} Skinderma</span><a href="mailto:info@skinderma.sk">info@skinderma.sk</a><a href="https://skinderma.sk/zasady-ochrany-osobnych-udajov/">Ochrana osobných údajov</a></footer>
  </div>;
}
