import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#f2f2f0] text-black">
      {/* Main footer */}
      <div className="flex flex-col items-center py-16 px-6 text-center">
        {/* Logo */}
        <Image
          src="https://skinderma.sk/wp-content/uploads/2025/07/logotipo_skinderma2-1024x224.png"
          alt="Skinderma"
          width={280}
          height={61}
          className="h-16 w-auto mb-10"
        />

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
          <Link
            href="/o-skinderme"
            className="text-base text-black hover:text-[#646467] transition-colors"
          >
            O Skinderme
          </Link>
          <Link
            href="/dodanie"
            className="text-base text-black hover:text-[#646467] transition-colors"
          >
            Dodanie a platba
          </Link>
          <Link
            href="/odstupenie"
            className="text-base text-black hover:text-[#646467] transition-colors"
          >
            Odstúpenie od zmluvy
          </Link>
          <Link
            href="/vseobecne-obchodne-podmienky"
            className="text-base text-black hover:text-[#646467] transition-colors"
          >
            Obchodné podmienky
          </Link>
          <Link
            href="/reklamacny-poriadok"
            className="text-base text-black hover:text-[#646467] transition-colors"
          >
            Reklamačný poriadok
          </Link>
          <Link
            href="/pre-profesionalov"
            className="text-base text-black hover:text-[#646467] transition-colors"
          >
            Pre profesionálov
          </Link>
          <Link
            href="/ochrana-osobnych-udajov"
            className="text-base text-black hover:text-[#646467] transition-colors"
          >
            Ochrana osobných údajov
          </Link>
        </nav>

        {/* Social */}
        <div className="flex gap-5 mb-10">
          <a
            href="https://www.instagram.com/skinderma_sk"
            aria-label="Instagram"
            className="text-[#646467] hover:text-black transition-colors"
          >
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.9.3 2.3.4.6.2 1 .5 1.5 1 .5.5.8.9 1 1.5.2.4.3 1.1.4 2.3.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.9-.4 2.3-.2.6-.5 1-1 1.5-.5.5-.9.8-1.5 1-.4.2-1.1.3-2.3.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.9-.3-2.3-.4-.6-.2-1-.5-1.5-1-.5-.5-.8-.9-1-1.5-.2-.4-.3-1.1-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.3-1.9.4-2.3.2-.6.5-1 1-1.5.5-.5.9-.8 1.5-1 .4-.2 1.1-.3 2.3-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-1 .1-1.6.2-2 .4-.5.2-.8.4-1.2.8-.4.4-.6.7-.8 1.2-.2.3-.3.9-.4 2-.1 1.2-.1 1.5-.1 4.6s0 3.5.1 4.7c.1 1 .2 1.6.4 2 .2.5.4.8.8 1.2.4.4.7.6 1.2.8.4.2.9.3 2 .4 1.2.1 1.5.1 4.6.1s3.5 0 4.7-.1c1-.1 1.6-.2 2-.4.5-.2.8-.4 1.2-.8.4-.4.6-.7.8-1.2.2-.4.3-.9.4-2 .1-1.2.1-1.5.1-4.6s0-3.5-.1-4.7c-.1-1-.2-1.6-.4-2-.2-.5-.4-.8-.8-1.2-.4-.4-.7-.6-1.2-.8-.4-.2-.9-.3-2-.4-1.2-.1-1.5-.1-4.6-.1zm0 3.1a4.9 4.9 0 110 9.8 4.9 4.9 0 010-9.8zm0 1.8a3.1 3.1 0 100 6.2 3.1 3.1 0 000-6.2zm5.1-3.1a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/SkindermaSK"
            aria-label="Facebook"
            className="text-[#646467] hover:text-black transition-colors"
          >
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.2-1.5 1.5-1.5h1.6V4.4a21.6 21.6 0 00-2.4-.1c-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.3V21h3.2z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-300 bg-[#E8E8E6]">
        <div className="flex flex-col items-center gap-1 py-5 px-6 text-center text-xs text-gray-500">
          <span>Red cube s.r.o. | IČO: 44137265 | DIČ: 2022614341 | IČ DPH: SK2022614341</span>
          <span>© {new Date().getFullYear()} Skinderma. Powered by Red cube s.r.o.</span>
        </div>
      </div>
    </footer>
  );
}
