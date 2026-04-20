const WC_STORE = "https://skinderma.sk/wp-json/wc/store/v1";

export async function getCartSession(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("wc_session") || null;
}

export async function saveCartSession(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("wc_session", token);
  }
}

function buildHeaders(session?: string | null): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (session) headers["Cart-Token"] = session;
  return headers;
}

async function captureSession(res: Response) {
  const newToken = res.headers.get("Cart-Token");
  if (newToken) await saveCartSession(newToken);
}

export async function fetchCart(session?: string | null) {
  const res = await fetch(`${WC_STORE}/cart`, {
    headers: buildHeaders(session),
    credentials: "include",
  });
  await captureSession(res);
  return res.json();
}

export async function addToCart(
  productId: number,
  quantity = 1,
  session?: string | null
) {
  const res = await fetch(`${WC_STORE}/cart/add-item`, {
    method: "POST",
    headers: buildHeaders(session),
    credentials: "include",
    body: JSON.stringify({ id: productId, quantity }),
  });
  await captureSession(res);
  return res.json();
}

export async function removeFromCart(key: string, session?: string | null) {
  const res = await fetch(`${WC_STORE}/cart/remove-item`, {
    method: "POST",
    headers: buildHeaders(session),
    credentials: "include",
    body: JSON.stringify({ key }),
  });
  await captureSession(res);
  return res.json();
}

export async function updateCartItem(
  key: string,
  quantity: number,
  session?: string | null
) {
  const res = await fetch(`${WC_STORE}/cart/update-item`, {
    method: "POST",
    headers: buildHeaders(session),
    credentials: "include",
    body: JSON.stringify({ key, quantity }),
  });
  await captureSession(res);
  return res.json();
}

export function formatCartPrice(price: string): string {
  const amount = parseFloat(price) / 100;
  if (!isFinite(amount)) return "0,00 €";
  return `${amount.toFixed(2).replace(".", ",")} €`;
}
