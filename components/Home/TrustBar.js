// components/Home/TrustBar.js
'use client';
import Image from 'next/image';

export default function TrustBar() {
  const logos = [
    { alt: '1', src: '/trustB/1.webp', width: 160, height: 40, dark: true },
    { alt: '2', src: '/trustB/2.webp', width: 160, height: 40, dark: false },
    { alt: '3', src: '/trustB/3.svg', width: 160, height: 40, dark: true },
    { alt: '4', src: '/trustB/4.png', width: 180, height: 40, dark: true },
    { alt: '5', src: '/trustB/5.avif', width: 180, height: 40, dark: true },
    { alt: '6', src: '/trustB/6.png', width: 180, height: 40, dark: true },
    { alt: '7', src: '/trustB/7.png', width: 180, height: 40, dark: true },
    { alt: '8', src: '/trustB/8.svg', width: 180, height: 40, dark: true },
    { alt: '9', src: '/trustB/9.avif', width: 180, height: 40, dark: true },
    { alt: '10', src: '/trustB/10.png', width: 180, height: 40, dark: true },
  ];

  const loopLogos = [...logos, ...logos];

  return (
    <section className="border-y border-white/5 bg-[#111116]">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="text-center">
          <span className="inline-flex items-center rounded-[5px] border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-300">
            Trusted by small businesses
          </span>
        </div>

        {/* Logo strip */}
        <div className="mt-6 relative overflow-hidden">
          {/* gradient edges for a premium feel */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#111116] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#111116] to-transparent" />

          {/* Track */}
          <div className="group flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" aria-label="Trusted brands carousel">
            <ul className="animate-trustbar flex shrink-0 items-center gap-10 py-3 group-hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
              {loopLogos.map((logo, i) => (
                <li key={`${logo.alt}-${i}`} className="h-8">
                  <span className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 shadow-sm">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.height}
                      loading="lazy"
                      className={`h-8 w-auto object-contain transition-opacity opacity-90 hover:opacity-100`}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="sr-only">Carousel pauses on hover or focus.</p>
      </div>

      {/* Styles scoped to TrustBar */}
      <style jsx global>{`
        @keyframes trustbarMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-trustbar {
          width: max-content;
          animation: trustbarMarquee 40s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-trustbar { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
