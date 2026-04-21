const CART_TOKEN_KEY = "wc_cart_token";
const CART_COUNT_KEY = "wc_cart_count";

export function getCartToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CART_TOKEN_KEY);
}

export function setCartToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(CART_TOKEN_KEY, token);
  }
}

export function getCartCount(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(CART_COUNT_KEY) || "0", 10);
}

export function setCartCount(count: number) {
  if (typeof window !== "undefined") {
    localStorage.setItem(CART_COUNT_KEY, String(count));
    window.dispatchEvent(new CustomEvent("cart-updated", { detail: { count } }));
  }
}

export function clearCart() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CART_TOKEN_KEY);
    localStorage.removeItem(CART_COUNT_KEY);
  }
}
