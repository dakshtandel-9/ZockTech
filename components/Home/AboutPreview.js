'use client';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import BorderGlow from '@/components/BorderGlow';
import { useTheme } from '@/components/ThemeProvider';
import GlowButton from '@/components/RainbowButton';

const WHATSAPP = 'https://wa.me/917829475479';

function useCounter(target, duration = 1500) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true);
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;
        let start = null;
        const step = (ts) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
        };
        requestAnimationFrame(step);
    }, [started, target, duration]);

    return [count, ref];
}

function AnimatedStat({ target, prefix = '', suffix = '', label, isDark }) {
    const [count, ref] = useCounter(target);
    return (
        <BorderGlow
            edgeSensitivity={20}
            glowColor="30 95 60"
            backgroundColor={isDark ? '#0e0e0e' : '#ffffff'}
            borderRadius={16}
            glowRadius={28}
            glowIntensity={0.9}
            coneSpread={30}
            colors={['#FF9500', '#ff6b00', '#ffcc44']}
        >
            <div ref={ref} className="p-5 text-center">
                <div className="text-3xl font-bold text-[#FF9500]">
                    {prefix}{count}{suffix}
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-[#888888]">{label}</div>
            </div>
        </BorderGlow>
    );
}

const valueBullets = [
    { title: 'Direct access', desc: 'You talk to the developer building your site — no account managers, no middlemen.' },
    { title: 'Fast delivery', desc: 'Landing pages in 3–5 days. Business websites in 5–7 days. Always.' },
    { title: 'Honest pricing', desc: 'Quoted before we start. No surprise invoices. No scope creep billing.' },
    { title: 'Modern stack', desc: 'React + Next.js. Fast, SEO-friendly, and easy to maintain.' },
];

export default function AboutPreview() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const bgColor = isDark ? '#0a0a0a' : '#ffffff';
    const glowColors = ['#FF9500', '#ff6b00', '#ffcc44'];

    return (
        <section id="about" className="py-20">
            <div className="mx-auto max-w-7xl px-4">
                <div className="grid gap-12 lg:grid-cols-2 items-start">

                    {/* Left: Narrative wrapped in BorderGlow */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6 }}
                    >
                        <BorderGlow
                            edgeSensitivity={25}
                            glowColor="30 100 60"
                            backgroundColor={bgColor}
                            borderRadius={24}
                            glowRadius={40}
                            glowIntensity={1}
                            coneSpread={25}
                            colors={glowColors}
                            animated
                        >
                            <div className="p-8">
                                <span className="inline-block text-xs font-medium uppercase tracking-widest text-[#FF9500] mb-3">
                                    About Zocktech
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                    Built by a developer who gets your business.
                                </h2>
                                <p className="mt-5 text-base text-gray-600 dark:text-[#888888] leading-relaxed">
                                    Zocktech is an indie web development studio run by Daksh Tandel. No agency overhead.
                                    You talk directly to the developer building your site. Fast delivery, honest pricing,
                                    and work you can actually show off.
                                </p>

                                {/* Stats */}
                                <div className="mt-8 grid grid-cols-3 gap-4">
                                    <AnimatedStat target={50} suffix="+" label="Projects delivered" isDark={isDark} />
                                    <AnimatedStat target={5} prefix="" label="Days avg delivery" isDark={isDark} />
                                    <AnimatedStat target={100} suffix="%" label="Client satisfaction" isDark={isDark} />
                                </div>

                                {/* CTAs */}
                                <div className="mt-8 flex flex-wrap items-center gap-4">
                                    <GlowButton
                                        asLink
                                        variant="primary"
                                        href={WHATSAPP}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Chat on WhatsApp
                                    </GlowButton>
                                    <GlowButton asLink variant="secondary" href="#portfolio">
                                        See Results
                                    </GlowButton>
                                </div>
                            </div>
                        </BorderGlow>
                    </motion.div>

                    {/* Right: Value bullets — each card wrapped in BorderGlow */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="grid gap-4 sm:grid-cols-2"
                    >
                        {valueBullets.map(({ title, desc }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ delay: 0.1 * i, duration: 0.5 }}
                            >
                                <BorderGlow
                                    edgeSensitivity={25}
                                    glowColor="30 100 60"
                                    backgroundColor={bgColor}
                                    borderRadius={20}
                                    glowRadius={32}
                                    glowIntensity={0.9}
                                    coneSpread={28}
                                    colors={glowColors}
                                >
                                    <div className="p-5 h-full">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="h-2 w-2 rounded-full bg-[#FF9500]" />
                                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h4>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-[#888888] leading-relaxed">{desc}</p>
                                    </div>
                                </BorderGlow>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
