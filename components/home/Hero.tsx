import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #DCA54A 0, transparent 40%), radial-gradient(circle at 80% 60%, #DCA54A 0, transparent 35%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #DCA54A 0, #DCA54A 1px, transparent 1px, transparent 16px)",
        }}
      />
      <div className="container-page relative flex min-h-[82vh] flex-col items-start justify-center gap-6 py-24">
        <span className="animate-fade-in rounded-full border border-gold/50 bg-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          GMP certifikovaná kozmetika
        </span>
        <h1 className="max-w-3xl animate-fade-in text-4xl font-bold leading-tight text-balance text-white sm:text-5xl md:text-6xl">
          Budúcnosť lekárskej kozmetiky
        </h1>
        <p className="max-w-2xl animate-fade-in text-lg text-cream/80 sm:text-xl">
          GMP certifikované produkty pre profesionálov aj domáce použitie.
          Klinicky overené, distribuované do 50+ krajín sveta.
        </p>
        <div className="mt-4 flex animate-fade-in flex-wrap gap-3">
          <Link href="/produkty" className="btn-gold">
            Preskúmať produkty
          </Link>
          <Link
            href="/o-nas"
            className="inline-flex items-center justify-center rounded-full border border-cream/40 px-6 py-3 font-semibold text-cream transition-colors hover:border-gold hover:text-gold"
          >
            O značke
          </Link>
        </div>
      </div>
    </section>
  );
}
