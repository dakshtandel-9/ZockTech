// components/portfolio/PortfolioPreview.js
'use client';

import { useState } from 'react';
import Image from 'next/image';

const allProjects = [
  { title: 'House of Indya', tag: 'Fashion • Ethnicwear', href: 'https://www.houseofindya.com', img: '/portfolio/01.png' },
  { title: 'boohoo', tag: 'Fashion • Marketplace', href: 'https://www.boohoo.com', img: '/portfolio/02.png' },
  { title: 'Damart UK', tag: 'Fashion • Retail', href: 'https://www.damart.co.uk', img: '/portfolio/03.png' },
  { title: 'Ganga Fashions', tag: 'Fashion • Ethnicwear', href: 'https://www.gangafashions.com', img: '/portfolio/04.png' },
  { title: 'Shoppers Stop (Past)', tag: 'Department Store', href: 'https://www.shoppersstop.com', img: '/portfolio/05.png' },
  { title: 'Nebesa Organics', tag: 'Beauty • D2C', href: 'https://nebesaorganics.com', img: '/portfolio/06.png' },
  { title: 'Ozomax', tag: 'Appliances • D2C', href: 'https://ozomax.in/', img: '/portfolio/07.png' },
  { title: 'Dinakar Watch Works', tag: 'Watches • Local', href: 'https://dinakarwatchworks.com', img: '/portfolio/08.png' },
  { title: 'Comhard', tag: 'Industrial • B2B', href: 'https://www.comhard.co.in', img: '/portfolio/09.png' },
  { title: 'Into The Wild Adventures', tag: 'Travel • Experiences', href: 'https://intothewildadventures.in', img: '/portfolio/10.png' },
];

export default function PortfolioPreview() {
  const PAGE = 6;
  const [visible, setVisible] = useState(PAGE);

  const shown = allProjects.slice(0, visible);
  const hasMore = visible < allProjects.length;

  const onToggle = () => {
    if (hasMore) {
      setVisible((v) => Math.min(v + PAGE, allProjects.length));
    } else {
      setVisible(PAGE);
    }
  };

  return (
    <section id="portfolio" className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold text-white">Portfolio</h2>
            <p className="mt-2 text-base text-gray-400">Selected work across fashion, retail, and D2C.</p>
          </div>
        </div>

        <div className="mt-10 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group text-white relative flex h-full flex-col overflow-hidden rounded-lg border border-white/5 bg-[#111116]"
            >
              {/* Media/logo area */}
              <div className="flex h-40 items-center justify-center bg-white/5">
                {p.img ? (
                  <Image
                    src={p.img}
                    alt={`${p.title} logo`}
                    width={200}             // intrinsic size to prevent layout shift
                    height={60}
                    className="w-100 object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-10 items-center rounded-md border border-white/10 bg-white/5 px-3 text-base text-gray-300">
                    {domainFromUrl(p.href)}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <span className="inline-flex w-fit items-center rounded-[5px] border border-white/10 bg-white/5 px-2 py-1 text-xs font-medium text-gray-300">
                  {p.tag}
                </span>
                <h3 className="mt-2 text-xl font-semibold group-hover:underline">{p.title}</h3>

                {/* Footer CTA aligned */}
                <div className="mt-auto pt-5">
                  <span className="inline-flex items-center text-base font-semibold text-[#FF7302]">
                    Visit site
                    <svg className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M12.293 3.293a1 1 0 1 1 1.414 1.414L8.414 10l5.293 5.293a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6Z" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* See more / See less */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onToggle}
            className="inline-flex items-center justify-center rounded-[5px] border border-white/15 px-5 py-2 text-base font-semibold text-white hover:bg-white/5"
          >
            {hasMore ? 'See more' : 'See less'}
          </button>
        </div>
      </div>
    </section>
  );
}

/* Helper */
function domainFromUrl(url) {
  try {
    const u = new URL(url);
    return u.hostname.replace('www.', '');
  } catch {
    return url.replace(/^https?:\/\//, '');
  }
}
