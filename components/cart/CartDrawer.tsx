"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart, type CartItem } from "./CartProvider";

const CHECKOUT_URL = "https://skinderma.sk/pokladna";

function formatPrice(
  amountMinor: string | number,
  minorUnit: number,
  symbol: string
): string {
  const raw = typeof amountMinor === "string" ? parseFloat(amountMinor) : amountMinor;
  if (!isFinite(raw)) return `0,00 ${symbol}`;
  const value = raw / Math.pow(10, minorUnit);
  return `${value.toFixed(minorUnit).replace(".", ",")} ${symbol}`;
}

function pluralizePolozky(count: number): string {
  if (count === 1) return "položka";
  if (count >= 2 && count <= 4) return "položky";
  return "položiek";
}

export default function CartDrawer() {
  const {
    items,
    itemCount,
    total,
    currencyMinorUnit,
    currencySymbol,
    isOpen,
    isLoading,
    closeCart,
    removeItem,
    updateItem,
  } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  return (
    <>
      <div
        onClick={closeCart}
        aria-hidden={!isOpen}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.25s ease",
          zIndex: 200,
        }}
      />
      <aside
        role="dialog"
        aria-label="Košík"
        aria-hidden={!isOpen}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          maxWidth: 460,
          background: "#fff",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
          zIndex: 210,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-10px 0 30px rgba(0,0,0,0.08)",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "22px 24px",
            borderBottom: "1px solid #e2e2cf",
          }}
        >
          <h2
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#000",
              margin: 0,
            }}
          >
            Košík {itemCount > 0 ? `(${itemCount} ${pluralizePolozky(itemCount)})` : ""}
          </h2>
          <button
            onClick={closeCart}
            aria-label="Zatvoriť košík"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              color: "#000",
              display: "flex",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {items.length === 0 ? (
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                gap: 18,
                padding: "40px 10px",
              }}
            >
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: "50%",
                  background: "#e2e2cf",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#000",
                }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.5l1.5 12.75a1.5 1.5 0 001.5 1.35h9.75a1.5 1.5 0 001.48-1.23L19.5 6h-14"
                  />
                  <circle cx="9" cy="20" r="1.25" />
                  <circle cx="17" cy="20" r="1.25" />
                </svg>
              </div>
              <p style={{ color: "#646467", fontSize: 14, margin: 0 }}>Váš košík je prázdny.</p>
              <Link
                href="/produkty"
                onClick={closeCart}
                style={{
                  color: "#000",
                  fontSize: 11,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  borderBottom: "1px solid #000",
                  paddingBottom: 2,
                  textDecoration: "none",
                }}
              >
                Prejsť na produkty
              </Link>
            </div>
          ) : (
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 18 }}>
              {items.map((item: CartItem) => {
                const img = item.images?.[0]?.src;
                return (
                  <li
                    key={item.key}
                    style={{
                      display: "flex",
                      gap: 14,
                      paddingBottom: 18,
                      borderBottom: "1px solid #f0f0e6",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: 78,
                        height: 78,
                        flexShrink: 0,
                        borderRadius: 8,
                        overflow: "hidden",
                        background: "#e2e2cf",
                      }}
                    >
                      {img && (
                        <Image
                          src={img}
                          alt={item.name}
                          fill
                          sizes="78px"
                          style={{ objectFit: "cover" }}
                          unoptimized
                        />
                      )}
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#000",
                          margin: 0,
                          lineHeight: 1.35,
                        }}
                      >
                        {item.name}
                      </p>
                      <p style={{ fontSize: 13, color: "#646467", margin: 0 }}>
                        {formatPrice(item.prices.price, currencyMinorUnit, currencySymbol)}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            border: "1px solid #e2e2cf",
                            borderRadius: 6,
                            overflow: "hidden",
                          }}
                        >
                          <button
                            onClick={() => updateItem(item.key, Math.max(1, item.quantity - 1))}
                            disabled={isLoading || item.quantity <= 1}
                            aria-label="Znížiť množstvo"
                            style={{
                              width: 28,
                              height: 28,
                              background: "none",
                              border: "none",
                              cursor: isLoading || item.quantity <= 1 ? "not-allowed" : "pointer",
                              color: "#000",
                              fontSize: 14,
                            }}
                          >
                            −
                          </button>
                          <span
                            style={{
                              minWidth: 28,
                              textAlign: "center",
                              fontSize: 13,
                              fontWeight: 600,
                              color: "#000",
                            }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateItem(item.key, item.quantity + 1)}
                            disabled={isLoading}
                            aria-label="Zvýšiť množstvo"
                            style={{
                              width: 28,
                              height: 28,
                              background: "none",
                              border: "none",
                              cursor: isLoading ? "not-allowed" : "pointer",
                              color: "#000",
                              fontSize: 14,
                            }}
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.key)}
                          disabled={isLoading}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: isLoading ? "not-allowed" : "pointer",
                            color: "#646467",
                            fontSize: 11,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            padding: 0,
                          }}
                        >
                          Odstrániť
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer style={{ padding: "20px 24px", borderTop: "1px solid #e2e2cf", background: "#fafaf5" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <span
                style={{
                  fontSize: 12,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#646467",
                  fontWeight: 600,
                }}
              >
                Celkom
              </span>
              <span style={{ fontSize: 18, fontWeight: 700, color: "#000" }}>
                {formatPrice(total, currencyMinorUnit, currencySymbol)}
              </span>
            </div>
            <a
              href={CHECKOUT_URL}
              style={{
                display: "block",
                background: "#000",
                color: "#fff",
                textAlign: "center",
                padding: "16px 20px",
                fontSize: 11,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Dokončiť objednávku
            </a>
            <button
              onClick={closeCart}
              style={{
                display: "block",
                width: "100%",
                marginTop: 10,
                background: "none",
                border: "none",
                color: "#646467",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 500,
                cursor: "pointer",
                padding: "6px",
              }}
            >
              Pokračovať v nákupe
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}
