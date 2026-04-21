import { redirect } from "next/navigation";

export default function KategoriaPage({ params }: { params: { slug: string } }) {
  redirect(`https://skinderma.sk/product-category/${params.slug}`);
}
