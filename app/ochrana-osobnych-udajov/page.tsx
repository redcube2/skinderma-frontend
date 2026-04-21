import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ochrana osobných údajov | Skinderma",
  alternates: { canonical: "https://www.skinderma.sk/ochrana-osobnych-udajov" },
};

export default function OchranaOsobnychUdajov() {
  return (
    <div className="container-page py-16 max-w-3xl">
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 32 }}>Ochrana osobných údajov</h1>
      <p style={{ color: "#646467" }}>Obsah bude doplnený.</p>
    </div>
  );
}
