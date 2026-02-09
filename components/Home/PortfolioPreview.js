// components/portfolio/PortfolioPreview.js
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const staticProjects = [
  { title: '35 Frames Photography', tag: 'Photography Studio', href: 'https://www.35framesphotography.in', img: '/portfolio/35frames.png' },
  { title: 'HV Fashion', tag: 'Fashion', href: 'https://hvfashion.vercel.app', img: '/portfolio/hv.png' },
  { title: 'Arjun Hospital', tag: 'Hospital', href: 'https://www.arjunhospital.in', img: '/portfolio/Arjun.png' },
  { title: 'Identity Dental', tag: 'Dental Clinic', href: 'https://www.identitydental.in', img: '/portfolio/identity.png' },
  { title: 'K Manjunath Associates', tag: 'Legal Firm', href: 'https://kmanjunathassociates.in', img: '/portfolio/kmanjunath.png' },
  { title: 'Sarala Foundation', tag: 'Travel Agency', href: 'https://saralafoundation-india.org', img: '/portfolio/sarala.png' },
  { title: 'Insightoria Testing', tag: 'Enterprise', href: 'https://insightoriatesting.com', img: '/portfolio/insightoriatesting.png' },
];

export default function PortfolioPreview() {
  const PAGE = 6;
  const [visible, setVisible] = useState(PAGE);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from Supabase
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (data.ok && data.items && data.items.length > 0) {
          // Use DB items
          setAllProjects(data.items.map(item => ({
            id: item.id,
            title: item.title,
            tag: item.tag,
            href: item.href,
            img: item.image_url
          })));
        } else {
          // Fallback to static if DB is empty
          setAllProjects(staticProjects);
        }
      })
      .catch(() => {
        // On error, use static
        setAllProjects(staticProjects);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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

        {loading ? (
          <div className="mt-10 text-center text-gray-400">Loading portfolio...</div>
        ) : allProjects.length === 0 ? (
          <div className="mt-10 text-center text-gray-400">No projects to display</div>
        ) : (
          <>
            <div className="mt-12 grid items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((p) => (
                <a
                  key={p.title}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0B0B0F] transition-colors duration-300 hover:border-[#FF7302]/30"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-white/5">
                    {p.img ? (
                      <Image
                        src={p.img}
                        alt={`${p.title} thumbnail`}
                        fill
                        className="object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-mono text-sm text-gray-500">
                        {domainFromUrl(p.href)}
                      </div>
                    )}

                    {/* Floating Tag - Moved to bottom */}
                    <div className="absolute left-4 bottom-4">
                      <span className="inline-flex items-center rounded-full border border-white/20 bg-black/60 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white">
                        {p.tag}
                      </span>
                    </div>
                  </div>

                  {/* Content Panel */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-[#FF7302]">
                      {p.title}
                    </h3>

                    {/* Footer Link */}
                    <div className="mt-auto pt-5 flex items-center justify-between">
                      <span className="text-xs font-semibold tracking-widest text-[#FF7302] uppercase flex items-center">
                        View website
                        <svg className="ml-1 h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M12.293 3.293a1 1 0 1 1 1.414 1.414L8.414 10l5.293 5.293a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6Z" transform="scale(-1, 1) translate(-20, 0)" />
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
          </>
        )}
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
