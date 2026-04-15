'use client';
import { motion } from 'framer-motion';
import GlowButton from '@/components/RainbowButton';

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
        desc: 'Responsive, SEO-ready implementation with clean code, analytics, and performance passes.',
        deliverable: 'Staging site + QA',
    },
    {
        n: 4,
        title: 'Launch',
        desc: 'Go live with DNS/hosting, final checks, and a walkthrough so you can self-manage.',
        deliverable: 'Live site + handover',
    },
];

export default function ProcessSection() {
    return (
        <section id="process" className="py-20">
            <div className="mx-auto max-w-7xl px-4">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5 }}
                        className="inline-block text-xs font-medium uppercase tracking-widest text-[#FF9500] mb-3"
                    >
                        Our Process
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
                    >
                        Simple, fast, and transparent
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="mt-3 text-base text-gray-600 dark:text-[#888888]"
                    >
                        Four focused stages — from idea to launch.
                    </motion.p>
                </div>

                {/* Desktop timeline */}
                <div className="mt-12 hidden md:block">
                    <div className="relative grid grid-cols-4 gap-6">
                        {/* Connector line */}
                        <motion.div
                            className="pointer-events-none absolute left-0 right-0 top-6 h-0.5 bg-gray-300 dark:bg-[#1f1f1f]"
                            initial={{ scaleX: 0, originX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                        />
                        <motion.div
                            className="pointer-events-none absolute left-0 right-0 top-6 h-0.5 bg-[#FF9500]/50"
                            initial={{ scaleX: 0, originX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                        />

                        {steps.map((s) => (
                            <motion.div
                                key={s.n}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.5, delay: (s.n - 1) * 0.15, ease: 'easeOut' }}
                                className="relative flex flex-col"
                            >
                                <div className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF9500] text-sm font-bold text-black shadow-lg shadow-orange-500/20">
                                    {s.n}
                                </div>
                                <div className="mt-4 flex-1 rounded-xl border border-gray-200 dark:border-[#1f1f1f] bg-white dark:bg-[#111111] shadow-sm dark:shadow-none p-5">
                                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">{s.title}</h3>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-[#888888] leading-relaxed">{s.desc}</p>
                                    <div className="mt-4">
                                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs text-[#FF9500]"
                                            style={{ background: 'rgba(255,149,0,0.1)', border: '1px solid rgba(255,149,0,0.2)' }}>
                                            {s.deliverable}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mobile cards */}
                <div className="mt-8 grid gap-4 md:hidden">
                    {steps.map((s) => (
                        <motion.div
                            key={s.n}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.5, delay: (s.n - 1) * 0.1 }}
                            className="rounded-xl border border-gray-200 dark:border-[#1f1f1f] bg-white dark:bg-[#111111] shadow-sm dark:shadow-none p-5"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF9500] text-sm font-bold text-black">
                                    {s.n}
                                </div>
                                <h3 className="text-base font-semibold text-gray-900 dark:text-white">{s.title}</h3>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-[#888888] leading-relaxed">{s.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-10 flex justify-center"
                >
                    <GlowButton
                        asLink
                        variant="primary"
                        size="lg"
                        href="https://wa.me/917829475479"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Start your project
                    </GlowButton>
                </motion.div>
            </div>
        </section>
    );
}
