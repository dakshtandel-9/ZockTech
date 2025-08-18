// components/pricing/PricingSection.js
// Redesigned for clarity and conversion:
// - 3 tiers with a highlighted "Most Popular" plan
// - Consistent features list with check icons
// - Buttons pinned to the bottom so they align in one straight line
// - 16px base text, dark theme, subtle borders/shadows
// - Includes optional "Custom Web App" tier (commented) — uncomment if needed

export default function PricingSection() {
  const tiers = [
    {
      name: 'One‑Page Website',
      price: '₹2,999',
      period: 'one-time',
      tagline: 'Launch fast with a focused landing page.',
      popular: false,
      cta: 'Get Started',
      features: [
        '.in domain + hosting (1 year)',
        '1 responsive page + contact form',
        'Basic SEO, SSL, speed‑lite',
        'Delivery: 3 days',
        '1 revision',
      ],
      note: 'Ideal for early-stage or single-offer sites.',
    },
    {
      name: 'Dynamic Website',
      price: '₹6,499',
      period: 'one-time',
      tagline: 'Multi-page site with blog and forms.',
      popular: true,
      cta: 'Choose Dynamic',
      features: [
        '.in domain + hosting (1 year)',
        'Up to 7 pages + blog + 2 forms',
        'SEO for 5 pages, performance & security',
        'Delivery: 7–10 days',
        '2 revisions',
      ],
      note: 'Great for growing service businesses.',
    },
    {
      name: 'E‑commerce Website',
      price: '₹9,999',
      period: 'one-time',
      tagline: 'Sell online with optimized product flows.',
      popular: false,
      cta: 'Start Selling',
      features: [
        '.in/.com domain + WP hosting or Shopify plan',
        'Up to 20 products, payments & shipping setup',
        'Optimized PDP/PLP, email notifications',
        'Delivery: 10–15 days',
        '2 revisions + training',
      ],
      note: 'Upgrade product limit and features anytime.',
    },

    // Uncomment to add a bespoke tier
    // {
    //   name: 'Custom Web App',
    //   price: 'From ₹25,000',
    //   period: 'project',
    //   tagline: 'Tailored MERN/Next.js applications.',
    //   popular: false,
    //   cta: 'Request Scope',
    //   features: [
    //     'Next.js (App Router), API routes',
    //     'Auth (JWT/NextAuth), RBAC',
    //     'Payments, webhooks, third‑party APIs',
    //     'Admin dashboard & analytics',
    //     'Headless CMS & media',
    //   ],
    //   note: 'Priced after a quick discovery call and scope document.',
    // },
  ];

  return (
    <section id="pricing" className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-[5px] border border-white/10 bg-white/5 px-3 py-1 text-base text-gray-300">
            Pricing
          </span>
          <h2 className="mt-4 text-3xl text-white font-semibold">Simple, transparent packages</h2>
          <p className="mt-3 text-base text-gray-400">
            Pick a plan that fits today—scale features as the business grows.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid items-stretch gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <article
              key={t.name}
              className={[
                'relative flex h-full flex-col rounded-lg border bg-[#111116] p-6 shadow-sm',
                t.popular ? 'border-[#FF7302]/60 shadow-[0_0_0_1px_rgba(255,115,2,0.15)]' : 'border-white/5',
              ].join(' ')}
            >
              {/* Popular badge */}
              {t.popular && (
                <div className="absolute -top-3 right-4">
                  <span className="inline-flex items-center rounded-[5px] bg-[#FF7302] px-2 py-1 text-xs font-semibold text-black">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Title + price */}
              <header>
                <h3 className="text-xl font-semibold text-white">{t.name}</h3>
                <p className="mt-1 text-base text-gray-400">{t.tagline}</p>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-3xl text-white font-bold">{t.price}</span>
                  <span className="text-base text-gray-400">/{t.period}</span>
                </div>
              </header>

              {/* Features */}
              <ul className="mt-6 space-y-2 text-base text-gray-300">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <CheckIcon />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Note */}
              <p className="mt-4 text-sm text-gray-500">{t.note}</p>

              {/* CTA pinned bottom and aligned across cards */}
              <div className="mt-auto pt-6">
                <a
                  href="#contact"
                  className={[
                    'inline-flex w-full items-center justify-center rounded-[5px] px-4 py-2 text-base font-semibold',
                    t.popular
                      ? 'bg-[#FF7302] text-black hover:opacity-90'
                      : 'border border-white/15 text-white hover:bg-white/5',
                  ].join(' ')}
                >
                  {t.cta}
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Footnotes */}
        <div className="mt-6 grid gap-3 text-sm text-gray-500 md:grid-cols-3">
          <div>Hosting includes SSL and basic security hardening.</div>
          <div>Copywriting, stock images, and advanced SEO available as add‑ons.</div>
          <div>Need custom features or integrations? Ask for a tailored quote.</div>
        </div>
      </div>
    </section>
  );
}

/* Small inline check icon (no extra deps) */
function CheckIcon() {
  return (
    <svg
      className="mt-1 h-4 w-4 flex-none text-[#FF7302]"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.2 7.29a1 1 0 0 1-1.44-.01L3.3 9.2a1 1 0 1 1 1.4-1.43l3.06 2.99 6.49-6.58a1 1 0 0 1 1.454.01Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
