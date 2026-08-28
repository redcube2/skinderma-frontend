import type { Metadata } from "next";
import { buildAlternates } from "@/lib/i18n/metadata";

export const metadata: Metadata = {
  title: "Cookies | Skinderma",
  alternates: buildAlternates("sk", "/cookies"),
};

export default function Cookies() {
  return (
    <div className="container-page py-16 max-w-3xl">
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 32 }}>Cookies</h1>
      <p style={{ color: "#646467" }}>Obsah bude doplnený.</p>
    </div>
  );
}
