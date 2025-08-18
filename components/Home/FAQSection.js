// components/faq/FAQSection.js
// Redesigned: clean accordion with categories, searchable filter, and deep-linkable items
// - 16px base, dark theme, accessible keyboard + ARIA
// - Uses native <details>/<summary> for simplicity, with custom styles
// - Optional: pass faqs via props; falls back to defaults

'use client';
import { useMemo, useState } from 'react';

const DEFAULT_FAQS = [
    { q: 'How fast can you deliver?', a: 'One‑page sites in 3 days, dynamic in 7–10 days, and e‑commerce in 10–15 days depending on content readiness.', cat: 'Timeline' },
    { q: 'What is included in the packages?', a: 'Domain & hosting (1 year), SSL, responsive build, basic on‑page SEO, performance pass, and revisions as listed in each plan.', cat: 'Pricing & Inclusions' },
    { q: 'Can you do custom builds?', a: 'Yes. We build custom MERN/Next.js apps including auth, dashboards, APIs, payments, and headless CMS. Pricing depends on scope.', cat: 'Custom' },
    { q: 'Do you provide maintenance?', a: 'Yes, optional care plans cover updates, backups, security hardening, uptime monitoring, and minor fixes.', cat: 'Support' },
    { q: 'What do you need to start?', a: 'Brand assets (logo/colors), sitemap, reference sites, copy or outlines, and any product/media files. We can help refine content.', cat: 'Getting Started' },
    { q: 'How are payments structured?', a: 'Typically 50% to book, 50% on delivery. For larger custom projects, we split by milestones.', cat: 'Pricing & Inclusions' },
    { q: 'Will the site be SEO‑ready?', a: 'We implement semantic HTML, metadata, sitemap, robots, basic schema, image alt, and performance best practices. Advanced SEO available as an add‑on.', cat: 'SEO & Performance' },
    { q: 'Can I edit content myself?', a: 'Yes. WordPress/Shopify include easy editors; custom builds can use a headless CMS like Sanity or Contentful.', cat: 'CMS' },
];

export default function FAQSection({ faqs = DEFAULT_FAQS }) {
    const [query, setQuery] = useState('');
    const [activeCat, setActiveCat] = useState('All');

    const categories = useMemo(() => {
        const set = new Set(['All', ...faqs.map(f => f.cat).filter(Boolean)]);
        return Array.from(set);
    }, [faqs]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return faqs.filter(f => {
            const matchCat = activeCat === 'All' || f.cat === activeCat;
            const matchText = !q || (f.q + ' ' + f.a).toLowerCase().includes(q);
            return matchCat && matchText;
        });
    }, [faqs, query, activeCat]);

    return (
        <section id="faqs" className="py-16">
            <div className="mx-auto max-w-7xl px-4">
                {/* Header */}
                <div className="mx-auto max-w-2xl text-center">
                    <span className="inline-flex items-center rounded-[5px] border border-white/10 bg-white/5 px-3 py-1 text-base text-gray-300">
                        FAQs
                    </span>
                    <h2 className="mt-4 text-3xl font-semibold text-white">Everything you need to know</h2>
                    <p className="mt-3 text-base text-gray-400">Can’t find what’s needed? Send a quick message and we’ll help right away.</p>
                </div>

                {/* Controls */}
                <div className="mx-auto mt-6 flex max-w-3xl flex-col gap-3 sm:flex-row">
                    <div className="flex-1">
                        <label className="sr-only" htmlFor="faq-search">Search FAQs</label>
                        <input
                            id="faq-search"
                            placeholder="Search questions (e.g., SEO, timeline, maintenance)"
                            className="w-full rounded-[5px] border border-white/10 bg-[#0B0B0F] px-3 py-2 text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF7302]/40"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <div className="sm:w-60">
                        <label className="sr-only" htmlFor="faq-category">Category</label>
                        <select
                            id="faq-category"
                            className="w-full rounded-[5px] border border-white/10 bg-[#0B0B0F] px-3 py-2 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#FF7302]/40"
                            value={activeCat}
                            onChange={(e) => setActiveCat(e.target.value)}
                        >
                            {categories.map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                </div>

                {/* List */}
                <div className="mx-auto mt-8 grid gap-4 md:max-w-3xl">
                    {filtered.length === 0 && (
                        <div className="rounded-lg border border-white/5 bg-[#111116] p-5 text-base text-gray-400">
                            No results. Try a different keyword or category.
                        </div>
                    )}

                    {filtered.map((f, idx) => (
                        <details
                            key={`${f.q}-${idx}`}
                            className="group rounded-lg border border-white/5 bg-[#111116] p-5 open:border-[#FF7302]/40"
                            id={slugify(f.q)}
                        >
                            <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-base font-semibold text-white">{f.q}</h3>
                                    {f.cat && (
                                        <span className="mt-1 inline-flex rounded-[5px] border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-gray-300">
                                            {f.cat}
                                        </span>
                                    )}
                                </div>
                                <span
                                    className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-[5px] border border-white/10 text-gray-300 transition-colors group-open:bg-[#FF7302] group-open:text-black"
                                    aria-hidden="true"
                                >
                                    +
                                </span>
                            </summary>
                            <div className="mt-3 text-base text-gray-300">
                                {f.a}
                            </div>
                            <div className="mt-3">
                                <a
                                    href={`#${slugify(f.q)}`}
                                    className="text-sm text-gray-500 hover:text-gray-300"
                                    aria-label="Copy link to this FAQ"
                                >
                                    Copy link
                                </a>
                            </div>
                        </details>
                    ))}
                </div>

                {/* Help CTA */}
                <div className="mx-auto mt-10 flex max-w-3xl items-center justify-between rounded-lg border border-white/5 bg-[#111116] p-5">
                    <div>
                        <h3 className="text-base font-semibold text-white">Still need help?</h3>
                        <p className="mt-1 text-base text-gray-400">Share project details and get a quick, tailored answer.</p>
                    </div>
                    <a
                        href="#contact"
                        className="inline-flex items-center justify-center rounded-[5px] bg-[#FF7302] px-4 py-2 text-base font-semibold text-black hover:opacity-90"
                    >
                        Ask a question
                    </a>
                </div>
            </div>
        </section>
    );
}

/* Helpers */
function slugify(s) {
    return s
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}
