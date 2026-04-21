import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reklamačný poriadok | Skinderma",
  alternates: { canonical: "https://www.skinderma.sk/reklamacny-poriadok" },
};

export default function ReklamacnyPoriadok() {
  return (
    <div className="container-page py-16 max-w-3xl">
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 32 }}>Reklamačný poriadok</h1>
      <p style={{ color: "#646467" }}>Obsah bude doplnený.</p>
    </div>
  );
}
