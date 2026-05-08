interface Props {
  productId: number;
  inStock: boolean;
  label?: string;
}

export function AddToCartBtn({ productId, inStock, label = "Do košíka" }: Props) {
  if (!inStock) {
    return (
      <span style={{ background:"#e2e2cf",color:"#646467",border:"none",padding:"14px 32px",fontSize:11,letterSpacing:"0.25em",textTransform:"uppercase",fontWeight:600,fontFamily:"inherit",cursor:"not-allowed",display:"inline-block" }}>
        Vypredané
      </span>
    );
  }

  return (
    <a
      href={`https://skinderma.sk/?add-to-cart=${productId}`}
      style={{ background:"#000",color:"#fff",border:"none",padding:"14px 32px",fontSize:11,letterSpacing:"0.25em",textTransform:"uppercase",fontWeight:600,fontFamily:"inherit",cursor:"pointer",transition:"background 0.2s",display:"inline-block",textDecoration:"none" }}
    >
      {label}
    </a>
  );
}
