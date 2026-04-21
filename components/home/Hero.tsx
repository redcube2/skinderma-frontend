import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100vh] items-center bg-[#111111]">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-20 md:px-10 md:py-0">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
          {/* Obrázok – hore na mobile, vpravo na desktope */}
          <div className="relative order-1 aspect-square w-full max-h-[80vh] overflow-hidden bg-[#0a0a0a] md:order-2">
            <Image
              src="https://skinderma.sk/wp-content/uploads/2025/09/serum-solution-scaled-1.jpg"
              alt="Skinderma sérum"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-center"
              priority
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, transparent 50%, rgba(0,0,0,0.6) 100%)",
                animation: "shimmer 8s ease-in-out infinite",
              }}
            />
          </div>

          {/* Text */}
          <div className="order-2 md:order-1">
            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[#646467]">
              Lekárska kozmetika
            </p>
            <h1 className="mb-8 text-[clamp(44px,6vw,88px)] font-light leading-[1.05] text-white">
              Budúcnosť
              <br />
              lekárskej
              <br />
              kozmetiky
            </h1>
            <p className="mb-12 max-w-md text-base leading-[1.8] text-[#999999]">
              GMP certifikované produkty pre profesionálov aj domáce použitie.
              Distribuované do viac ako 50 krajín sveta.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="https://skinderma.sk/obchod"
                className="bg-white px-10 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#e2e2cf]"
              >
                Preskúmať
              </Link>
              <Link
                href="/o-nas"
                className="border border-[#646467] px-10 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:border-white hover:bg-white/5"
              >
                O nás
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
