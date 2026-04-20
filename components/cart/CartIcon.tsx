"use client";

import { useCart } from "./CartProvider";

export function CartIcon() {
  const { itemCount, openCart } = useCart();
  return (
    <button
      onClick={openCart}
      aria-label={`Košík${itemCount > 0 ? ` (${itemCount})` : ""}`}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-black transition-colors hover:bg-[#f5f5f5]"
      style={{ background: "none", border: "none", cursor: "pointer" }}
    >
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.5l1.5 12.75a1.5 1.5 0 001.5 1.35h9.75a1.5 1.5 0 001.48-1.23L19.5 6h-14"
        />
        <circle cx="9" cy="20" r="1.25" />
        <circle cx="17" cy="20" r="1.25" />
      </svg>
      {itemCount > 0 && (
        <span
          style={{
            position: "absolute",
            top: 2,
            right: 2,
            background: "#000",
            color: "#fff",
            borderRadius: "50%",
            minWidth: 18,
            height: 18,
            padding: "0 4px",
            fontSize: 11,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
          }}
        >
          {itemCount}
        </span>
      )}
    </button>
  );
}
