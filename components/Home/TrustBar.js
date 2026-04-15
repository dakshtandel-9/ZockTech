'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function TrustBar() {
    const logos = [
        { alt: '1', src: '/trustB/1.webp', width: 160, height: 40 },
        { alt: '2', src: '/trustB/2.webp', width: 160, height: 40 },
        { alt: '3', src: '/trustB/3.svg', width: 160, height: 40 },
        { alt: '4', src: '/trustB/4.png', width: 180, height: 40 },
        { alt: '5', src: '/trustB/5.avif', width: 180, height: 40 },
        { alt: '6', src: '/trustB/6.png', width: 180, height: 40 },
        { alt: '7', src: '/trustB/7.png', width: 180, height: 40 },
        { alt: '8', src: '/trustB/8.svg', width: 180, height: 40 },
        { alt: '9', src: '/trustB/9.avif', width: 180, height: 40 },
        { alt: '10', src: '/trustB/10.png', width: 180, height: 40 },
    ];

    const loopLogos = [...logos, ...logos];

    return (
        <section className="py-10 border-y border-gray-200 dark:border-[#1f1f1f] bg-gray-50 dark:bg-[#111111]">
            <div className="mx-auto max-w-7xl px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-6"
                >
                    <span className="text-xs font-medium uppercase tracking-widest text-gray-600 dark:text-[#888888]">
                        Trusted by 50+ businesses across India
                    </span>
                </motion.div>

                {/* Logo strip */}
                <div className="relative overflow-hidden">
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-50 dark:from-[#111111] to-transparent z-10" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-50 dark:from-[#111111] to-transparent z-10" />

                    <div className="group" aria-label="Trusted brands carousel">
                        <ul className="animate-trustbar group-hover:[animation-play-state:paused] flex shrink-0 items-center gap-10 py-2">
                            {loopLogos.map((logo, i) => (
                                <li key={`${logo.alt}-${i}`} className="shrink-0 flex items-center">
                                    <span className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 shadow-sm">
                                        <Image
                                            src={logo.src}
                                            alt={logo.alt}
                                            width={logo.width}
                                            height={logo.height}
                                            loading="lazy"
                                            className="h-8 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                                        />
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <p className="sr-only">Logo carousel pauses on hover.</p>
            </div>
        </section>
    );
}
