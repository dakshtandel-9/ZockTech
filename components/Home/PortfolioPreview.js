'use client';
import { motion } from 'framer-motion';
import BorderGlow from '@/components/BorderGlow';
import { useTheme } from '@/components/ThemeProvider';
import GlowButton from '@/components/RainbowButton';

const WHATSAPP = 'https://wa.me/917829475479';

import portfolioItems from '@/data/portfolio.json';

const projects = portfolioItems;

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const GLOW_COLORS = ['#FF9500', '#ff6b00', '#ffcc44'];

export default function PortfolioPreview() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const bgColor = isDark ? '#0a0a0a' : '#ffffff';

    return (
        <section id="portfolio" className="py-20 relative bg-gray-50 dark:bg-[#050505]">
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
                        Our Work
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
                    >
                        Portfolio
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="mt-3 text-base text-gray-600 dark:text-[#888888]"
                    >
                        Real projects for real businesses across India.
                    </motion.p>
                </div>

                {/* Grid */}
                <motion.div
                    className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                >
                    {projects.map((p) => (
                        <motion.div key={p.title} variants={cardVariants}>
                            <BorderGlow
                                edgeSensitivity={22}
                                glowColor="30 100 60"
                                backgroundColor={bgColor}
                                borderRadius={16}
                                glowRadius={32}
                                glowIntensity={0.95}
                                coneSpread={28}
                                colors={GLOW_COLORS}
                            >
                                <div className="flex flex-col overflow-hidden rounded-[15px]">
                                    {/* Image */}
                                    <div className="relative aspect-video w-full overflow-hidden">
                                        <img
                                            src={p.image}
                                            alt={`${p.title} preview`}
                                            className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/10 dark:bg-black/40 transition-colors duration-500 hover:bg-black/0 dark:hover:bg-black/20" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#FF9500] mb-2">{p.tag}</span>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{p.title}</h3>
                                        <p className="text-sm text-gray-600 dark:text-[#888888] leading-relaxed">{p.description}</p>
                                    </div>

                                    {/* Buttons */}
                                    <div className="px-6 pb-6 flex flex-wrap gap-3">
                                        <GlowButton variant="primary" size="sm">
                                            Case study
                                        </GlowButton>
                                        <GlowButton variant="secondary" size="sm">
                                            Visit website
                                        </GlowButton>
                                    </div>
                                </div>
                            </BorderGlow>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
