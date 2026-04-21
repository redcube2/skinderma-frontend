"use client";
import { useState, useEffect } from "react";

interface ToastState {
  visible: boolean;
  productName: string;
  cartCount: number;
}

const listeners: ((state: ToastState) => void)[] = [];

export function showCartToast(productName: string, cartCount: number) {
  listeners.forEach((fn) => fn({ visible: true, productName, cartCount }));
}

export function CartToast() {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    productName: "",
    cartCount: 0,
  });

  useEffect(() => {
    const handler = (state: ToastState) => {
      setToast(state);
      setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 5000);
    };
    listeners.push(handler);
    return () => {
      const i = listeners.indexOf(handler);
      if (i > -1) listeners.splice(i, 1);
    };
  }, []);

  if (!toast.visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        background: "#000",
        color: "#fff",
        borderRadius: 2,
        padding: "16px 24px",
        zIndex: 99999,
        minWidth: 320,
        maxWidth: 480,
        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
        fontFamily: "inherit",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontSize: 13, fontWeight: 600 }}>Pridané do košíka</span>
        <button
          onClick={() => setToast((prev) => ({ ...prev, visible: false }))}
          style={{
            marginLeft: "auto",
            background: "none",
            border: "none",
            color: "#999",
            cursor: "pointer",
            fontSize: 18,
            lineHeight: 1,
          }}
          aria-label="Zatvoriť"
        >
          ×
        </button>
      </div>
      <p style={{ fontSize: 12, color: "#ccc", margin: "0 0 14px", lineHeight: 1.4 }}>
        {toast.productName}
      </p>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => setToast((prev) => ({ ...prev, visible: false }))}
          style={{
            flex: 1,
            background: "none",
            border: "1px solid #444",
            color: "#fff",
            padding: "10px 12px",
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Pokračovať
        </button>
        <a
          href="/kosik"
          style={{
            flex: 1,
            background: "#fff",
            border: "1px solid #fff",
            color: "#000",
            padding: "10px 12px",
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textDecoration: "none",
            textAlign: "center",
            fontFamily: "inherit",
            fontWeight: 600,
          }}
        >
          Zobraziť košík
        </a>
      </div>
    </div>
  );
}
