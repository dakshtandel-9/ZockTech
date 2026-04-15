"use client";

import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';

export default function Loader() {
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);
    const { markReady } = useTheme();

    useEffect(() => {
        setLoading(true);

        const timer = setTimeout(() => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            const maxRadius = Math.hypot(cx, cy);

            const reveal = () => {
                flushSync(() => {
                    setLoading(false);
                    markReady();
                });
            };

            if (typeof document.startViewTransition === 'function') {
                // Same circular wipe as the theme toggle, but from screen center
                const transition = document.startViewTransition(reveal);

                transition?.ready?.then(() => {
                    document.documentElement.animate(
                        {
                            clipPath: [
                                `circle(0px at ${cx}px ${cy}px)`,
                                `circle(${maxRadius}px at ${cx}px ${cy}px)`,
                            ],
                        },
                        {
                            duration: 700,
                            easing: 'ease-in-out',
                            pseudoElement: '::view-transition-new(root)',
                        }
                    );
                });
            } else {
                // Fallback: just remove loader instantly
                reveal();
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [pathname, markReady]);

    const [counter, setCounter] = useState(0);

    // Run the percentage counter
    useEffect(() => {
        if (!loading) return;
        let start = null;
        let pId;
        const duration = 900; // Finish counting slightly before the 1000ms timeout
        
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const percentage = Math.min(Math.floor((progress / duration) * 100), 100);
            setCounter(percentage);
            
            if (progress < duration) {
                pId = window.requestAnimationFrame(step);
            }
        };
        pId = window.requestAnimationFrame(step);
        return () => window.cancelAnimationFrame(pId);
    }, [loading]);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0a] font-mono">
            
            {/* Minimalist Progress Container */}
            <div className="w-64 max-w-[80vw]">
                {/* Header text */}
                <div className="flex justify-between items-end mb-2 text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-[#888]">
                    <span>Initializing</span>
                    <span className="text-[#FF9500] font-bold">{counter}%</span>
                </div>
                
                {/* Progress Bar Track */}
                <div className="h-[2px] w-full bg-gray-200 dark:bg-[#1f1f1f] rounded-full overflow-hidden">
                    {/* Progress Fill */}
                    <div 
                        className="h-full bg-[#FF9500] rounded-full transition-all duration-75 ease-linear"
                        style={{ width: `${counter}%` }}
                    />
                </div>
            </div>

        </div>
    );
}