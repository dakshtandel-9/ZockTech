'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BorderGlow from '@/components/BorderGlow';
import { useTheme } from '@/components/ThemeProvider';
import GlowButton from '@/components/RainbowButton';

const faqs = [
    {
        q: 'How fast can you deliver?',
        a: 'Basic landing page in 3–5 days. Pro business website in 5–7 days. Timeline starts after advance payment and kickoff form.',
    },
    {
        q: 'What do you need from me to start?',
        a: 'Your business name, logo, colour preferences, and any content you have. We guide you through everything else.',
    },
    {
        q: 'How do I pay?',
        a: '50% advance to start. 50% on delivery and approval. UPI and bank transfer accepted.',
    },
    {
        q: 'Do you only work with React and Next.js?',
        a: "Primarily yes. We also do pure HTML/CSS/JS for simple landing pages. We don't offer WordPress or Shopify builds.",
    },
    {
        q: 'Do you offer revisions?',
        a: 'Basic includes 1 revision round. Pro includes 2 revision rounds. Additional revisions at ₹500 each.',
    },
    {
        q: 'Can you host the website?',
        a: 'Yes. Hostinger hosting is included in the Pro package. For Basic, we help you set up your own hosting.',
    },
    {
        q: 'Will the site work on mobile?',
        a: 'Every site we build is mobile-first. We test on multiple screen sizes before delivery.',
    },
    {
        q: 'Can I add more pages later?',
        a: 'Yes. Additional pages are ₹1,000 each, added at any time after launch.',
    },
];

const GLOW_COLORS = ['#FF9500', '#ff6b00', '#ffcc44'];

export default function FAQSection() {
    const [openIdx, setOpenIdx] = useState(null);
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const bgColor = isDark ? '#111111' : '#ffffff';

    return (
        <section id="faqs" className="py-20">
            <div className="mx-auto max-w-7xl px-4">
                {/* Header */}
                <div className="mx-auto max-w-2xl text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5 }}
                        className="inline-block text-xs font-medium uppercase tracking-widest text-[#FF9500] mb-3"
                    >
                        FAQs
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
                    >
                        Everything you need to know
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="mt-3 text-base text-gray-600 dark:text-[#888888]"
                    >
                        Can&apos;t find what you need? Chat with us on WhatsApp.
                    </motion.p>
                </div>

                {/* Accordion */}
                <div className="mx-auto mt-10 max-w-3xl grid gap-3">
                    {faqs.map((f, idx) => {
                        const isOpen = openIdx === idx;
                        return (
                            <motion.div
                                key={f.q}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                            >
                                <BorderGlow
                                    edgeSensitivity={20}
                                    glowColor="30 100 60"
                                    backgroundColor={bgColor}
                                    borderRadius={14}
                                    glowRadius={24}
                                    glowIntensity={isOpen ? 1.0 : 0.85}
                                    coneSpread={28}
                                    colors={GLOW_COLORS}
                                >
                                    <div className="overflow-hidden rounded-[13px]">
                                        <button
                                            type="button"
                                            onClick={() => setOpenIdx(isOpen ? null : idx)}
                                            className="flex w-full items-center justify-between p-5 text-left"
                                            aria-expanded={isOpen}
                                        >
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white pr-4">{f.q}</h3>
                                            <motion.span
                                                animate={{ rotate: isOpen ? 45 : 0 }}
                                                transition={{ duration: 0.2 }}
                                                className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-base font-medium transition-colors ${
                                                    isOpen
                                                        ? 'border-[#FF9500] bg-[#FF9500] text-black'
                                                        : 'border-gray-200 dark:border-[#1f1f1f] text-gray-500 dark:text-[#888888]'
                                                }`}
                                                aria-hidden="true"
                                            >
                                                +
                                            </motion.span>
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    key="answer"
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="px-5 pb-5 text-sm text-gray-600 dark:text-[#888888] leading-relaxed">
                                                        {f.a}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </BorderGlow>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Help CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mx-auto mt-10 max-w-3xl"
                >
                    <BorderGlow
                        edgeSensitivity={22}
                        glowColor="30 100 60"
                        backgroundColor={bgColor}
                        borderRadius={16}
                        glowRadius={28}
                        glowIntensity={0.9}
                        coneSpread={30}
                        colors={GLOW_COLORS}
                    >
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Still have questions?</h3>
                                <p className="mt-1 text-sm text-gray-600 dark:text-[#888888]">Chat with Daksh directly on WhatsApp.</p>
                            </div>
                            <GlowButton
                                asLink
                                variant="primary"
                                href="https://wa.me/917829475479"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Chat on WhatsApp
                            </GlowButton>
                        </div>
                    </BorderGlow>
                </motion.div>
            </div>
        </section>
    );
}
