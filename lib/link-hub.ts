export type HubLink = Readonly<{
  label: string;
  description: string;
  href: string;
  external?: boolean;
  emphasized?: boolean;
}>;

export type CarouselProduct = Readonly<{
  id: string;
  name: string;
  description: string;
  image: string;
  width: number;
  height: number;
  href: string;
  alt: string;
}>;

export const primaryLinks: readonly HubLink[] = [
  { label: "Objavte produkty SKINDERMA", description: "Vyberte si starostlivosť podľa potrieb svojej pleti.", href: "/obchod" },
  { label: "Pre kozmetičky a salóny — školenia a partnerstvo", description: "Profesionálna podpora pre váš salón.", href: "/partnerstvo" },
  { label: "Rezervujte si termín v Skin Beauty House", description: "Individuálna starostlivosť v Komárne.", href: "https://beautyhouse.sk/rezervuj-si-termin/", external: true, emphasized: true },
];

export const carouselProducts: readonly CarouselProduct[] = [
  { id: "pdrn-serum", name: "PDRN Sérum", description: "Sérum pre vašu každodennú starostlivosť o pleť.", image: "https://skinderma.sk/wp-content/uploads/2025/09/Skinderma-PDRN-SERUM-VP.webp", width: 1080, height: 1080, href: "https://www.skinderma.sk/produkty/pdrn-serum-pdrn-serum-30-ml", alt: "SKINDERMA PDRN Sérum" },
  { id: "peptide-booster", name: "Peptide Booster", description: "Peptidová starostlivosť pre hladší vzhľad pleti.", image: "https://skinderma.sk/wp-content/uploads/2025/09/PEPTIDE-BOOSTER-copiar-scaled-1.jpg", width: 2560, height: 2560, href: "https://www.skinderma.sk/produkty/peptide-booster-peptide-booster-30-ml", alt: "SKINDERMA Peptide Booster" },
  { id: "exo-ageless-10ml", name: "EXO-Ageless 10 ml", description: "Profesionálna exozómová starostlivosť.", image: "https://skindermacosmetics.com/wp-content/uploads/2024/03/ageless__-1024x1024.jpg", width: 1024, height: 1024, href: "/obchod", alt: "SKINDERMA EXO-Ageless 10 ml" },
];
