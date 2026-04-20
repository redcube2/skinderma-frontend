"use client";

import { useCart } from "./CartProvider";

interface Props {
  productId: number;
  inStock: boolean;
  label?: string;
}

export function AddToCartButton({ productId, inStock, label = "Pridať do košíka" }: Props) {
  const { addItem, isLoading } = useCart();

  if (!inStock) {
    return (
      <button
        disabled
        style={{
          background: "#e2e2cf",
          color: "#646467",
          border: "none",
          padding: "16px 40px",
          fontSize: 11,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          fontWeight: 600,
          cursor: "not-allowed",
          fontFamily: "inherit",
          minWidth: 200,
        }}
      >
        Vypredané
      </button>
    );
  }

  return (
    <button
      onClick={() => addItem(productId)}
      disabled={isLoading}
      style={{
        background: isLoading ? "#646467" : "#000",
        color: "#fff",
        border: "none",
        padding: "16px 40px",
        fontSize: 11,
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        fontWeight: 600,
        cursor: isLoading ? "wait" : "pointer",
        fontFamily: "inherit",
        transition: "background 0.2s",
        minWidth: 200,
      }}
    >
      {isLoading ? "Pridávam…" : label}
    </button>
  );
}
