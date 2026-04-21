"use client";

interface Props {
  productId: number;
  inStock: boolean;
  label?: string;
}

// Simple WooCommerce add-to-cart URL handoff
// WooCommerce vlastní celý nákupný flow
export function AddToCartBtn({ productId, inStock, label = "Do košíka" }: Props) {
  const handleClick = () => {
    if (!inStock) return;
    window.location.href = `https://skinderma.sk/kosik?add-to-cart=${productId}`;
  };

  if (!inStock) {
    return (
      <button disabled style={{ background:"#e2e2cf",color:"#646467",border:"none",padding:"14px 32px",fontSize:11,letterSpacing:"0.25em",textTransform:"uppercase",fontWeight:600,fontFamily:"inherit",cursor:"not-allowed" }}>
        Vypredané
      </button>
    );
  }

  return (
    <button onClick={handleClick} style={{ background:"#000",color:"#fff",border:"none",padding:"14px 32px",fontSize:11,letterSpacing:"0.25em",textTransform:"uppercase",fontWeight:600,fontFamily:"inherit",cursor:"pointer",transition:"background 0.2s" }}
      onMouseEnter={e => (e.currentTarget.style.background = "#333")}
      onMouseLeave={e => (e.currentTarget.style.background = "#000")}
    >
      {label}
    </button>
  );
}
