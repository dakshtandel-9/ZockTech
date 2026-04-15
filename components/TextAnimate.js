'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
    blurIn: {
        hidden: { opacity: 0, filter: 'blur(12px)' },
        show:   { opacity: 1, filter: 'blur(0px)',  transition: { duration: 0.45, ease: 'easeOut' } },
    },
    blurInUp: {
        hidden: { opacity: 0, filter: 'blur(12px)', y: 16 },
        show:   { opacity: 1, filter: 'blur(0px)',  y: 0,   transition: { duration: 0.45, ease: 'easeOut' } },
    },
    fadeIn: {
        hidden: { opacity: 0, y: 14 },
        show:   { opacity: 1, y: 0,  transition: { duration: 0.35, ease: 'easeOut' } },
    },
    slideUp: {
        hidden: { opacity: 0, y: 22 },
        show:   { opacity: 1, y: 0,  transition: { duration: 0.35, ease: 'easeOut' } },
    },
    slideDown: {
        hidden: { opacity: 0, y: -22 },
        show:   { opacity: 1, y: 0,  transition: { duration: 0.35, ease: 'easeOut' } },
    },
};

function TextAnimateBase({
    children,
    animation = 'blurIn',
    by = 'word',
    delay = 0,
    stagger = 0.07,
    as: Tag = 'p',
    startOnView = false,
    className = '',
    segmentClassName = '',
    style,
}) {
    // Only start animating after the component mounts on the client.
    // This prevents SSR painting the final visible state before JS loads.
    const [mounted, setMounted] = useState(false);
    const viewRef = useRef(null);

    useEffect(() => {
        // Tiny delay so the browser sees the "hidden" state first
        const t = setTimeout(() => setMounted(true), 20);
        return () => clearTimeout(t);
    }, []);

    const segments = by === 'character'
        ? children.split('')
        : children.split(/(\s+)/); // keep whitespace tokens for natural spacing

    const containerVariants = {
        hidden: { opacity: 1 },
        show: {
            opacity: 1,
            transition: {
                delayChildren: delay,
                staggerChildren: stagger,
            },
        },
    };

    const childVariant = itemVariants[animation] ?? itemVariants.blurIn;

    const MotionTag = motion[Tag] ?? motion.div;

    return (
        <MotionTag
            ref={viewRef}
            aria-label={children}
            variants={containerVariants}
            initial="hidden"
            // Always pass an explicit string so Framer Motion reliably transitions:
            // - 'hidden' until mounted (client-side), so initial blur/opacity is real
            // - 'show'   once mounted, triggering the stagger animation
            // For scroll-triggered sections, delegate to whileInView instead.
            animate={!startOnView ? (mounted ? 'show' : 'hidden') : undefined}
            whileInView={startOnView ? 'show' : undefined}
            viewport={startOnView ? { once: true, margin: '-60px' } : undefined}
            className={`whitespace-pre-wrap ${className}`}
            style={style}
        >
            {segments.map((seg, i) => (
                <motion.span
                    key={`${i}-${seg}`}
                    variants={childVariant}
                    aria-hidden="true"
                    className={`inline-block whitespace-pre ${segmentClassName}`}
                >
                    {seg}
                </motion.span>
            ))}
        </MotionTag>
    );
}

export const TextAnimate = memo(TextAnimateBase);
