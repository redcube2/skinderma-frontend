"use client";
import { useState } from "react";
import { storeAddToCart } from "@/lib/woocommerce";
import { getCartToken, setCartToken, getCartCount, setCartCount } from "@/lib/cart-token";
import { showCartToast } from "./CartToast";

interface Props {
  productId: number;
  productName: string;
  inStock: boolean;
  label?: string;
  style?: React.CSSProperties;
}

export function AddToCartBtn({ productId, productName, inStock, label = "Do košíka", style }: Props) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || !inStock) return;
    setLoading(true);

    const btn = e.currentTarget;
    const btnRect = btn.getBoundingClientRect();
    const dot = document.createElement("div");
    dot.style.cssText = `position:fixed;left:${btnRect.left + btnRect.width / 2 - 6}px;top:${btnRect.top + btnRect.height / 2 - 6}px;width:12px;height:12px;background:#000;border-radius:50%;pointer-events:none;z-index:99999;transition:all 0.75s cubic-bezier(0.25,0.46,0.45,0.94);`;
    document.body.appendChild(dot);
    const cartEl = document.querySelector("[data-cart-icon]");
    const cartRect = cartEl?.getBoundingClientRect();
    const tx = cartRect ? cartRect.left + cartRect.width / 2 - 6 : window.innerWidth - 56;
    const ty = cartRect ? cartRect.top + cartRect.height / 2 - 6 : 20;
    requestAnimationFrame(() => {
      dot.style.left = `${tx}px`;
      dot.style.top = `${ty}px`;
      dot.style.transform = "scale(0)";
      dot.style.opacity = "0";
    });
    setTimeout(() => dot.remove(), 800);

    try {
      const token = getCartToken();
      const { cart, token: newToken } = await storeAddToCart(productId, 1, token);

      if (newToken) setCartToken(newToken);

      const count = cart.items_count || getCartCount() + 1;
      setCartCount(count);

      setAdded(true);
      showCartToast(productName, count);
      setTimeout(() => setAdded(false), 3000);
    } catch (err) {
      console.error("Add to cart error:", err);
      window.location.href = `/kosik/?add-to-cart=${productId}`;
    } finally {
      setLoading(false);
    }
  };

  if (!inStock) {
    return (
      <button disabled style={{
        background: "#e2e2cf", color: "#646467", border: "none",
        padding: "14px 32px", fontSize: 11, letterSpacing: "0.25em",
        textTransform: "uppercase", fontWeight: 600, fontFamily: "inherit",
        cursor: "not-allowed", display: "inline-block", ...style,
      }}>
        Vypredané
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      style={{
        background: added ? "#2d5a27" : loading ? "#646467" : "#000",
        color: "#fff", border: "none", padding: "14px 32px",
        fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase",
        fontWeight: 600, cursor: loading ? "wait" : "pointer",
        fontFamily: "inherit", transition: "background 0.2s",
        display: "inline-block", ...style,
      }}
    >
      {added ? "✓ Pridané" : loading ? "Pridávam..." : label}
    </button>
  );
}
