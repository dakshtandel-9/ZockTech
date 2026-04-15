'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '@/components/ThemeProvider';

/**
 * AnimatedThemeToggler — MagicUI-style circular view-transition wipe.
 * Falls back to instant toggle on browsers without View Transitions API.
 * Syncs with ThemeProvider so the Hero blur-in re-triggers on switch.
 */
export function AnimatedThemeToggler({ duration = 400, className = '', ...props }) {
    const { toggleTheme } = useTheme();
    const [isDark, setIsDark] = useState(false);
    const buttonRef = useRef(null);

    // Mirror whatever class the HTML element currently has
    useEffect(() => {
        const update = () =>
            setIsDark(document.documentElement.classList.contains('dark'));
        update();

        const observer = new MutationObserver(update);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });
        return () => observer.disconnect();
    }, []);

    const handleToggle = useCallback(() => {
        const button = buttonRef.current;
        if (!button) return;

        const { top, left, width, height } = button.getBoundingClientRect();
        const x = left + width / 2;
        const y = top + height / 2;
        const vw = window.visualViewport?.width ?? window.innerWidth;
        const vh = window.visualViewport?.height ?? window.innerHeight;
        const maxRadius = Math.hypot(Math.max(x, vw - x), Math.max(y, vh - y));

        // toggleTheme updates ThemeProvider state (animationKey, theme, DOM class)
        const applyTheme = () => {
            toggleTheme();
        };

        if (typeof document.startViewTransition !== 'function') {
            applyTheme();
            return;
        }

        const transition = document.startViewTransition(() => {
            flushSync(applyTheme);
        });

        transition?.ready?.then(() => {
            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${maxRadius}px at ${x}px ${y}px)`,
                    ],
                },
                {
                    duration,
                    easing: 'ease-in-out',
                    pseudoElement: '::view-transition-new(root)',
                }
            );
        });
    }, [toggleTheme, duration]);

    return (
        <button
            type="button"
            ref={buttonRef}
            onClick={handleToggle}
            className={`rounded-full p-2 bg-gray-200 dark:bg-[#1f1f1f] text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-300 dark:hover:bg-white/10 transition-colors ${className}`}
            aria-label="Toggle theme"
            {...props}
        >
            {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
