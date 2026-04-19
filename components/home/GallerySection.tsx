import Image from "next/image";

const IMAGES = [
  {
    src: "https://skinderma.sk/wp-content/uploads/2025/09/serum-solution-scaled-1.jpg",
    alt: "Sérum a solution",
  },
  {
    src: "https://skinderma.sk/wp-content/uploads/2025/09/ampolas.jpg",
    alt: "Ampule",
  },
  {
    src: "https://skinderma.sk/wp-content/uploads/2025/09/Exosome-Ageless.png",
    alt: "Exozóm Ageless",
  },
  {
    src: "https://skinderma.sk/wp-content/uploads/2025/09/TESTE-scaled-1.jpg",
    alt: "Test",
  },
  {
    src: "https://skinderma.sk/wp-content/uploads/2025/09/glutathione_khh-scaled-1.jpg",
    alt: "Glutathione",
  },
];

export default function GallerySection() {
  return (
    <section className="bg-[#fefefe] py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <div className="mb-16 text-center">
          <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-[#646467]">
            Galéria
          </p>
          <h2 className="text-[clamp(32px,4vw,56px)] font-light leading-tight text-black">
            Produkty v detaile
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2 md:gap-6">
          {/* Veľká fotka vľavo */}
          <div className="relative col-span-2 row-span-2 aspect-square overflow-hidden bg-[#f5f5f0] md:aspect-auto">
            <Image
              src={IMAGES[0].src}
              alt={IMAGES[0].alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>

          {/* 2 menšie vpravo hore */}
          <div className="relative aspect-square overflow-hidden bg-[#f5f5f0]">
            <Image
              src={IMAGES[1].src}
              alt={IMAGES[1].alt}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
          <div className="relative aspect-square overflow-hidden bg-[#f5f5f0]">
            <Image
              src={IMAGES[2].src}
              alt={IMAGES[2].alt}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>

          {/* 2 menšie vpravo dole */}
          <div className="relative aspect-square overflow-hidden bg-[#f5f5f0]">
            <Image
              src={IMAGES[3].src}
              alt={IMAGES[3].alt}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
          <div className="relative aspect-square overflow-hidden bg-[#f5f5f0]">
            <Image
              src={IMAGES[4].src}
              alt={IMAGES[4].alt}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
