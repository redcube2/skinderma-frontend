import { redirect } from "next/navigation";

export default function ProductPage({ params }: { params: { slug: string } }) {
  redirect(`https://skinderma.sk/produkt/${params.slug}`);
}
