// components/TrustBar.js
import Image from 'next/image';

export default function TrustBar() {
  const logos = [
    { alt: 'Indya', src: 'https://assets.faballey.com/images/indya/logo.png?v=17.3', width: 120, height: 32, dark: true },
    { alt: 'Ganga Fashions', src: 'https://gangafashions.com/cdn/shop/files/NEW-Ganga_Logo_26.9.2019_Ragi-01_140x@2x.png?v=1648374773', width: 140, height: 32, dark: false },
    { alt: 'Damart', src: 'https://www.damart.co.uk/media/logo/default/Damart_LOGO.png', width: 140, height: 32, dark: true },
    { alt: 'Shoppers Stop', src: 'https://cmsimages.shoppersstop.com/shoppersstopthree_1eb72c5b77/shoppersstopthree_1eb72c5b77.png', width: 160, height: 32, dark: true },
  ];

  return (
    <section className="border-y border-white/5 bg-[#111116]">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          <span className="text-base text-gray-400">Trusted by small businesses</span>

          {logos.map((logo) => (
            <span key={logo.alt} className="opacity-90 transition-opacity hover:opacity-100">
              <span className="inline-flex items-center justify-center rounded-md bg-white/10 px-3 py-2">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  loading="lazy"
                  className={`h-6 w-auto object-contain ${logo.dark ? 'invert brightness-200 contrast-100' : ''}`}
                />
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
