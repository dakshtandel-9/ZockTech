// components/about/AboutPreview.js
// Redesigned: premium dark, 16px base, clear value props, stats, and CTAs.
// Drop-in replacement for the previous AboutPreview.

export default function AboutPreview() {
    return (
        <section id="about" className="py-16">
            <div className="mx-auto max-w-7xl px-4 grid gap-10 lg:grid-cols-12">
                {/* Left: Narrative + CTAs */}
                <div className="lg:col-span-6">
                    <span className="inline-flex items-center rounded-[5px] border border-white/10 bg-white/5 px-3 py-1 text-base text-gray-300">
                        About Zocktech
                    </span>

                    <h2 className="mt-4 text-3xl font-semibold">
                        Premium websites that turn visitors into customers.
                    </h2>

                    <p className="mt-4 text-base text-gray-300">
                        We build high‑converting, modern websites and digital strategies that help small businesses
                        grow their brand and get more customers—without breaking the budget.
                    </p>

                    <p className="mt-3 text-base text-gray-400">
                        WordPress, Shopify, and custom MERN/Next.js builds delivered fast with clean UX, strong CTAs,
                        and SEO‑ready foundations.
                    </p>

                    {/* Stats */}
                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        <Stat number="50+" label="Projects delivered" />
                        <Stat number="7–15d" label="Typical launch" />
                        <Stat number="90+" label="Perf score target" />
                    </div>

                    {/* CTAs */}
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center rounded-[5px] bg-[#FF7302] px-5 py-3 text-base font-semibold text-black hover:opacity-90"
                        >
                            Get a Free Quote
                        </a>
                        <a
                            href="#portfolio"
                            className="inline-flex items-center justify-center rounded-[5px] border border-white/15 px-5 py-3 text-base font-semibold text-white hover:bg-white/5"
                        >
                            See Our Work
                        </a>
                    </div>
                </div>

                {/* Right: Value bullets + mini process */}
                <div className="lg:col-span-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <ValueItem
                            title="Conversion‑first UX"
                            desc="Clear hierarchy, persuasive copy, and CTAs that drive action."
                        />
                        <ValueItem
                            title="Fast & SEO‑ready"
                            desc="Core Web Vitals, semantic HTML, schema, and on‑page basics."
                        />
                        <ValueItem
                            title="Transparent pricing"
                            desc="Packages that fit small‑business budgets—no surprises."
                        />
                        <ValueItem
                            title="Ongoing support"
                            desc="Updates, security, and performance monitoring with care plans."
                        />
                    </div>

                    <div className="mt-6 rounded-lg border border-white/5 bg-[#111116] p-5">
                        <h3 className="text-base font-semibold">How we work</h3>
                        <ol className="mt-3 grid gap-3 sm:grid-cols-4">
                            <Step n="1" title="Discover" />
                            <Step n="2" title="Design" />
                            <Step n="3" title="Build" />
                            <Step n="4" title="Launch" />
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Stat({ number, label }) {
    return (
        <div className="rounded-lg border border-white/5 bg-[#111116] p-4">
            <div className="text-2xl font-bold">{number}</div>
            <div className="mt-1 text-base text-gray-400">{label}</div>
        </div>
    );
}

function ValueItem({ title, desc }) {
    return (
        <div className="rounded-lg border border-white/5 bg-[#111116] p-5">
            <h4 className="text-base font-semibold">{title}</h4>
            <p className="mt-2 text-base text-gray-400">{desc}</p>
        </div>
    );
}

function Step({ n, title }) {
    return (
        <li className="flex items-center gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-[5px] bg-[#FF7302] text-sm font-bold text-black">
                {n}
            </span>
            <span className="text-base text-gray-200">{title}</span>
        </li>
    );
}
