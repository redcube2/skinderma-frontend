"use client";
import { useState, useEffect } from "react";

const STORAGE_KEY = "wc_cart_count";

export function CartCountBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Načítaj z localStorage pri mount
    const stored = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
    if (stored > 0) setCount(stored);

    const handler = (e: Event) => {
      const c = (e as CustomEvent).detail?.count;
      if (typeof c === "number") {
        setCount(c);
        localStorage.setItem(STORAGE_KEY, String(c));
      }
    };
    window.addEventListener("cart-updated", handler);
    return () => window.removeEventListener("cart-updated", handler);
  }, []);

  if (count === 0) return null;

  return (
    <span style={{
      position: "absolute", top: -6, right: -6,
      background: "#000", color: "#fff",
      borderRadius: "50%", width: 18, height: 18,
      fontSize: 10, fontWeight: 700,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "inherit",
    }}>
      {count > 9 ? "9+" : count}
    </span>
  );
}
