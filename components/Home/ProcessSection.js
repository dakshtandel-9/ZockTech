// components/process/ProcessSection.js
// Redesigned: timeline + cards layout, clear outcomes, 16px base, dark theme.
// - Desktop: horizontal timeline with numbered steps
// - Mobile: stacked cards
// - CTA to start project
// Drop-in replacement.

export default function ProcessSection() {
    const steps = [
        {
            n: 1,
            title: 'Discover',
            desc: 'A quick call to align goals, scope, pages, and success metrics. You get a clear proposal and timeline.',
            deliverable: 'Scope & proposal',
        },
        {
            n: 2,
            title: 'Design',
            desc: 'Wireframes and premium visuals that match the brand. Review, refine, and sign off fast.',
            deliverable: 'Wireframes + UI mockups',
        },
        {
            n: 3,
            title: 'Build',
            desc: 'Responsive, SEO‑ready implementation with clean code, analytics, and performance passes.',
            deliverable: 'Staging site + QA',
        },
        {
            n: 4,
            title: 'Launch',
            desc: 'Go live with DNS/hosting, final checks, and a walkthrough so teams can self‑manage.',
            deliverable: 'Live site + handover',
        },
    ];

    return (
        <section id="process" className="py-16">
            <div className="mx-auto max-w-7xl px-4">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto">
                    <span className="inline-flex items-center rounded-[5px] border border-white/10 bg-white/5 px-3 py-1 text-base text-gray-300">
                        Our Process
                    </span>
                    <h2 className="mt-4 text-3xl text-white font-semibold">Simple, fast, and transparent</h2>
                    <p className="mt-3 text-base text-gray-400">
                        Four focused stages to move from idea to launch—no bloated timelines or surprise costs.
                    </p>
                </div>

                {/* Timeline (desktop) */}
                <div className="mt-10 hidden md:block">
                    <ol className="relative grid grid-cols-4 gap-6">
                        {/* connector line */}
                        <div className="pointer-events-none absolute left-0 right-0 top-6 h-0.5 bg-white/10" />
                        {steps.map((s) => (
                            <li key={s.n} className="relative">
                                <div className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-[5px] bg-[#FF7302] text-sm font-bold text-black">
                                    {s.n}
                                </div>
                                <div className="mt-4 rounded-lg border border-white/5 bg-[#111116] p-5">
                                    <h3 className="text-base font-semibold">{s.title}</h3>
                                    <p className="mt-2 text-base text-gray-300">{s.desc}</p>
                                    <div className="mt-3 inline-flex items-center rounded-[5px] border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-300">
                                        Deliverable: {s.deliverable}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Stacked cards (mobile) */}
                <div className="mt-8 grid gap-4 md:hidden">
                    {steps.map((s) => (
                        <div key={s.n} className="rounded-lg border border-white/5 bg-[#111116] p-5">
                            <div className="inline-flex h-8 w-8 items-center justify-center rounded-[5px] bg-[#FF7302] text-xs font-bold text-black">
                                {s.n}
                            </div>
                            <h3 className="mt-3 text-white font-semibold">{s.title}</h3>
                            <p className="mt-2 text-base text-gray-300">{s.desc}</p>
                            <div className="mt-3 inline-flex items-center rounded-[5px] border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-300">
                                Deliverable: {s.deliverable}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add-on strip */}
                <div className="mt-8 rounded-lg border border-white/5 bg-[#111116] p-5">
                    <h3 className="text-base font-semibold text-white">What’s included</h3>
                    <div className="mt-3 grid gap-3 text-base text-gray-300 md:grid-cols-3">
                        <Item>Conversion‑first UX & accessible components</Item>
                        <Item>On‑page SEO, analytics, and basic schema</Item>
                        <Item>Performance pass (Core Web Vitals)</Item>
                        <Item>Training call + handover checklist</Item>
                        <Item>30‑day post‑launch support</Item>
                        <Item>Optional: maintenance & care plans</Item>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-10 flex justify-center">
                    <a
                        href="#contact"
                        className="inline-flex items-center justify-center rounded-[5px] bg-[#FF7302] px-6 py-3 text-base font-semibold text-black hover:opacity-90"
                    >
                        Start your project
                    </a>
                </div>
            </div>
        </section>
    );
}

function Item({ children }) {
    return (
        <div className="flex items-start gap-2">
            <svg className="mt-1 h-4 w-4 flex-none text-[#FF7302]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                    fillRule="evenodd"
                    d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.2 7.29a1 1 0 0 1-1.44-.01L3.3 9.2a1 1 0 1 1 1.4-1.43l3.06 2.99 6.49-6.58a1 1 0 0 1 1.454.01Z"
                    clipRule="evenodd"
                />
            </svg>
            <span>{children}</span>
        </div>
    );
}
