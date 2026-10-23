import { redirect } from "next/navigation";

export default async function KategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`https://skinderma.sk/product-category/${slug}`);
}
