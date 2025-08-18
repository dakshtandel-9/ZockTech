// components/testimonials/TestimonialsSection.js
// Redesigned: infinite auto-scrolling marquee of testimonial cards
// - 16px base, dark theme, accessible pause on hover/focus
// - Duplicates the list to create a seamless loop
// - Works without extra libs (pure CSS keyframes)

'use client';

const testimonials = [
  { name: 'Ananya S.', role: 'Founder, Nebesa Organics', quote: 'They delivered a fast, modern site and our conversions improved within weeks.' },
  { name: 'Rahul K.', role: 'Owner, Dinakar Watch Works', quote: 'Super responsive, clear pricing, and launch on time. Highly recommended.' },
  { name: 'Meera P.', role: 'E‑commerce Lead, Fashion Brand', quote: 'Clean UX and faster load times helped reduce drop‑offs on PDPs.' },
  { name: 'Thomas L.', role: 'Director, B2B Industrial', quote: 'Great with integrations and dashboards—exactly what our team needed.' },
  { name: 'Isha G.', role: 'Founder, D2C Accessories', quote: 'Smooth Shopify setup and support post‑launch made a big difference.' },
  { name: 'Arjun V.', role: 'Marketing Head, Retail', quote: 'Strong focus on SEO basics and performance right from day one.' },
  // Add/replace with real quotes as available
];

// Duplicate array for seamless loop
const loopTestimonials = [...testimonials, ...testimonials];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center rounded-[5px] border border-white/10 bg-white/5 px-3 py-1 text-base text-gray-300">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl text-white font-semibold">What clients say</h2>
          <p className="mt-3 text-base text-gray-400">Real feedback from brands and small businesses we’ve helped grow.</p>
        </div>

        {/* Marquee container */}
        <div className="mt-10 relative overflow-hidden">
          {/* gradient edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0B0B0F] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0B0B0F] to-transparent" />

          {/* Track */}
          <div
            className="group flex gap-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
            aria-label="Client testimonials carousel"
          >
            <ul className="animate-marquee flex shrink-0 gap-4 py-2 group-hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
              {loopTestimonials.map((t, i) => (
                <TestimonialCard key={`${t.name}-${i}`} {...t} />
              ))}
            </ul>
          </div>
        </div>

        {/* Small helper note for accessibility */}
        <p className="sr-only">Carousel pauses on hover or focus.</p>
      </div>

      {/* Styles scoped to this file via Tailwind arbitrary variants */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

function TestimonialCard({ quote, name, role }) {
  return (
    <li className="w-[320px] snap-start">
      <figure className="h-full rounded-lg border border-white/5 bg-[#111116] p-5">
        <blockquote className="text-base text-gray-200">“{quote}”</blockquote>
        <figcaption className="mt-4 text-base text-gray-400">— {name}, {role}</figcaption>
      </figure>
    </li>
  );
}
