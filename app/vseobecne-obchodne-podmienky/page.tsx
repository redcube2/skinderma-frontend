import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Všeobecné obchodné podmienky | Skinderma",
  alternates: { canonical: "https://www.skinderma.sk/vseobecne-obchodne-podmienky" },
};

export default function VOP() {
  return (
    <div className="container-page py-16 max-w-3xl">
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 32 }}>Všeobecné obchodné podmienky</h1>
      <p style={{ color: "#646467" }}>Obsah bude doplnený.</p>
    </div>
  );
}
