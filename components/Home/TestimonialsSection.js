'use client';
import { motion } from 'framer-motion';
import { Marquee } from '@/components/Marquee';

import testimonialData from '@/data/testimonials.json';

const reviews = testimonialData;

const firstRow = [reviews[0], reviews[1], reviews[2]];
const secondRow = [reviews[3], reviews[4], reviews[5]];
const thirdRow = [reviews[1], reviews[5], reviews[0]];
const fourthRow = [reviews[4], reviews[2], reviews[3]];

const ReviewCard = ({ img, name, username, body }) => {
    return (
        <figure
            className="relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05] dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15] transition-colors"
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-full" width="32" height="32" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40">{username}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm text-gray-800 dark:text-gray-300">
                &ldquo;{body}&rdquo;
            </blockquote>
        </figure>
    );
};

export default function TestimonialsSection() {
    return (
        <section id="testimonials" className="py-20 relative overflow-hidden bg-white dark:bg-[#0a0a0a]">
            <div className="mx-auto max-w-7xl px-4 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5 }}
                        className="inline-block text-xs font-medium uppercase tracking-widest text-[#FF9500] mb-3"
                    >
                        Testimonials
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
                    >
                        What clients say
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="mt-3 text-base text-gray-600 dark:text-[#888888]"
                    >
                        Real feedback from businesses we&apos;ve built for.
                    </motion.p>
                </div>

                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                    {/* Row 1 — scrolls LEFT */}
                    <Marquee pauseOnHover className="[--duration:25s]">
                        {firstRow.map((review, i) => (
                            <ReviewCard key={i} {...review} />
                        ))}
                    </Marquee>
                    {/* Row 2 — scrolls RIGHT */}
                    <Marquee reverse pauseOnHover className="[--duration:25s]">
                        {secondRow.map((review, i) => (
                            <ReviewCard key={i} {...review} />
                        ))}
                    </Marquee>
                    {/* Row 3 — scrolls LEFT */}
                    <Marquee pauseOnHover className="[--duration:25s]">
                        {thirdRow.map((review, i) => (
                            <ReviewCard key={i} {...review} />
                        ))}
                    </Marquee>
                    {/* Gradient edges */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent z-10"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent z-10"></div>
                </div>
            </div>
        </section>
    );
}
