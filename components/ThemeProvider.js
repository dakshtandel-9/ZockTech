'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ThemeContext = createContext({
    theme: 'dark',
    toggleTheme: () => {},
    ready: false,           // true once the initial loader has finished
    animationKey: 0,        // increments on every toggle — used to re-trigger animations
});

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('dark');
    const [mounted, setMounted] = useState(false);
    const [ready, setReady] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        setMounted(true);
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
            if (storedTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        } else {
            // Default: dark theme
            document.documentElement.classList.add('dark');
            setTheme('dark');
        }
    }, []);

    // Called by Loader when it finishes
    const markReady = useCallback(() => setReady(true), []);

    const toggleTheme = useCallback(() => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        // Bump key so Hero can re-run the text animation
        setAnimationKey(k => k + 1);
    }, [theme]);

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, ready, markReady, animationKey }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
