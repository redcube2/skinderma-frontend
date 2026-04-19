export interface YoastOgImage {
  url: string;
  width?: number;
  height?: number;
  type?: string;
}

export interface YoastMeta {
  title?: string;
  description?: string;
  og_title?: string;
  og_description?: string;
  og_image?: YoastOgImage[];
  og_url?: string;
  og_site_name?: string;
  og_type?: string;
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  canonical?: string;
  robots?: Record<string, string>;
  schema?: {
    "@context": string;
    "@graph": unknown[];
  };
}

export interface WCImage {
  id: number;
  src: string;
  name?: string;
  alt?: string;
}

export interface WCTermRef {
  id: number;
  name: string;
  slug: string;
}

export interface WCProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  type: string;
  status: string;
  featured: boolean;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: "instock" | "outofstock" | "onbackorder";
  images: WCImage[];
  categories: WCTermRef[];
  tags: WCTermRef[];
  average_rating?: string;
  rating_count?: number;
  date_modified?: string;
  yoast_head?: string;
  yoast_head_json?: YoastMeta;
}

export interface WCCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: WCImage | null;
  menu_order: number;
  count: number;
  yoast_head?: string;
  yoast_head_json?: YoastMeta;
}

export interface WPPost {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  modified?: string;
  yoast_head?: string;
  yoast_head_json?: YoastMeta;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      id: number;
      source_url: string;
      alt_text?: string;
    }>;
    author?: Array<{ id: number; name: string }>;
  };
}
