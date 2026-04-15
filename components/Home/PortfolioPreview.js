'use client';
import { motion } from 'framer-motion';
import BorderGlow from '@/components/BorderGlow';
import { useTheme } from '@/components/ThemeProvider';
import GlowButton from '@/components/RainbowButton';

const WHATSAPP = 'https://wa.me/917829475479';

const projects = [
    {
        title: 'SRK Holidays',
        tag: 'Travel & Tourism',
        desc: 'Full business website for a travel agency. Enquiry form, tour packages.',
        href: '#',
        img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop',
    },
    {
        title: 'KA17 Fitness Studio',
        tag: 'Gym & Fitness',
        desc: 'Landing page with class schedule, trainer bios, and WhatsApp booking.',
        href: '#',
        img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
    },
    {
        title: 'Fitness World Gym',
        tag: 'Gym Landing Page',
        desc: 'High-converting landing page built for Google and Instagram ads.',
        href: '#',
        img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop',
    },
    {
        title: 'Salon Project',
        tag: 'Beauty & Wellness',
        desc: 'Premium salon website with services menu, gallery, and booking CTA.',
        href: '#',
        img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop',
    },
    {
        title: 'MATRI DIVYA',
        tag: 'NGO / Non-profit',
        desc: 'Clean, trustworthy website for a charitable foundation.',
        href: '#',
        img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop',
    },
    {
        title: 'D2C Brand Clothing',
        tag: 'E-commerce',
        desc: 'Modern online store with seamless checkout and inventory syncing.',
        href: '#',
        img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop',
    },
];

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
                                            src={p.img}
                                            alt={`${p.title} preview`}
                                            className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/10 dark:bg-black/40 transition-colors duration-500 hover:bg-black/0 dark:hover:bg-black/20" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#FF9500] mb-2">{p.tag}</span>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{p.title}</h3>
                                        <p className="text-sm text-gray-600 dark:text-[#888888] leading-relaxed">{p.desc}</p>
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
