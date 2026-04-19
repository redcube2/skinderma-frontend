import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://skinderma.sk/wp-content/uploads/2025/09/serum-solution-scaled-1.jpg"
          alt="Skinderma"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-navy/60" />
      </div>

      <div className="container-page relative z-10 py-24">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-gold">
            Lekárska kozmetika
          </p>
          <h1 className="mb-6 text-5xl font-light leading-tight text-white md:text-7xl">
            Budúcnosť
            <br />
            <span className="text-gold">lekárskej kozmetiky</span>
          </h1>
          <p className="mb-8 max-w-xl text-lg text-white/80">
            GMP certifikované produkty pre profesionálov aj domáce použitie.
            Viac ako 50 krajín po celom svete.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/produkty"
              className="bg-gold px-8 py-3 font-medium text-white transition-colors hover:bg-gold-dark"
            >
              Preskúmať produkty
            </Link>
            <Link
              href="/o-nas"
              className="border border-white px-8 py-3 text-white transition-colors hover:bg-white/10"
            >
              O nás
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
