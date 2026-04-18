'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TextAnimate } from '@/components/TextAnimate';
import { useTheme } from '@/components/ThemeProvider';
import { InteractiveGridPattern } from '@/components/InteractiveGridPattern';
import GlowButton from '@/components/RainbowButton';

export default function Hero() {
    const { ready, animationKey } = useTheme();

    return (
        <section className="relative overflow-hidden min-h-[90vh] flex items-center">
            {/* Interactive grid background */}
            <InteractiveGridPattern
                width={20}
                height={20}
                squares={[80, 80]}
                className="[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] pointer-events-auto"
                squaresClassName="hover:fill-[rgba(255,149,0,0.15)] dark:hover:fill-[rgba(255,149,0,0.12)]"
            />

            {/* Radial orange glow */}
            <div
                className="pointer-events-none absolute inset-0 -z-0"
                style={{
                    background: 'radial-gradient(600px circle at 50% 0%, rgba(255,149,0,0.12), transparent 60%)',
                }}
                aria-hidden="true"
            />

            <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-20 text-center w-full">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                    <span
                        className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-[#FF9500] uppercase"
                        style={{ background: 'rgba(255,149,0,0.1)', border: '1px solid rgba(255,149,0,0.3)' }}
                    >
                        Web Development Agency · India
                    </span>
                </motion.div>

                {/* H1 — only render after loader finishes; re-mount key forces animation replay on theme toggle */}
                {ready && (
                    <div key={animationKey} className="mt-6">
                        <TextAnimate
                            animation="blurIn"
                            by="word"
                            as="h1"
                            startOnView={false}
                            delay={0}
                            stagger={0.07}
                            className="text-4xl md:text-6xl font-bold leading-tight text-gray-900 dark:text-white"
                            style={{ letterSpacing: '-0.02em' }}
                        >
                            {"Professional Websites That Bring"}
                        </TextAnimate>
                        <TextAnimate
                            animation="blurIn"
                            by="word"
                            as="p"
                            startOnView={false}
                            delay={0.55}
                            stagger={0.09}
                            className="text-4xl md:text-6xl font-bold leading-tight text-[#FF9500]"
                            style={{ letterSpacing: '-0.02em' }}
                        >
                            {"You Customers"}
                        </TextAnimate>
                    </div>
                )}

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.6, ease: 'easeOut' }}
                    className="mt-5 text-lg md:text-xl text-gray-600 dark:text-[#888888] max-w-2xl mx-auto leading-relaxed"
                >
                    We design and build fast, modern websites that help businesses attract, engage, and convert customers delivered in {' '}
                    <span className="text-gray-900 dark:text-white font-semibold">3–5 days</span>.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
                    className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <GlowButton
                        asLink
                        variant="primary"
                        size="lg"
                        href="https://wa.me/917829475479"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Chat on WhatsApp"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        Chat on WhatsApp
                    </GlowButton>

                    <GlowButton asLink variant="secondary" href="#portfolio">
                        Our Work
                    </GlowButton>
                </motion.div>

                {/* Trust row */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
                    className="mt-8 text-sm text-gray-600 dark:text-[#888888]"
                >
                    <span className="text-[#FF9500]">✦</span>{' '}
                    ⚡ Limited slots available this week
                    {' '}<span className="text-[#FF9500]">✦</span>
                </motion.p>
            </div>
        </section>
    );
} 