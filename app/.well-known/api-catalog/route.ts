import { NextResponse } from "next/server";

export const revalidate = 86400;

export async function GET() {
  // RFC 9264 linkset+json format (required by RFC 9727)
  const linkset = {
    linkset: [
      {
        anchor: "https://skinderma.sk/wp-json/wc/v3",
        "service-desc": [
          {
            href: "https://skinderma.sk/wp-json/wc/v3",
            type: "application/json",
            title: "WooCommerce REST API – Produkty, kategórie, objednávky",
          },
        ],
        "service-doc": [
          {
            href: "https://woocommerce.com/document/woocommerce-rest-api/",
            type: "text/html",
            title: "WooCommerce REST API dokumentácia",
          },
        ],
      },
      {
        anchor: "https://skinderma.sk/wp-json/wp/v2",
        "service-desc": [
          {
            href: "https://skinderma.sk/wp-json/wp/v2",
            type: "application/json",
            title: "WordPress REST API – Blogy, stránky, obsah",
          },
        ],
        "service-doc": [
          {
            href: "https://developer.wordpress.org/rest-api/",
            type: "text/html",
            title: "WordPress REST API dokumentácia",
          },
        ],
      },
    ],
  };

  return NextResponse.json(linkset, {
    headers: {
      "Content-Type": "application/linkset+json",
      "Cache-Control": "public, max-age=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
