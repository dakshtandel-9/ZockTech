'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';
import { AnimatedThemeToggler } from '@/components/AnimatedThemeToggler';
import ShimmerButton from '@/components/ShimmerButton';

export default function Header() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const close = () => setOpen(false);
        window.addEventListener('hashchange', close);
        return () => window.removeEventListener('hashchange', close);
    }, []);

    const { theme } = useTheme();

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`sticky top-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'backdrop-blur-md bg-white/85 dark:bg-[rgba(10,10,10,0.85)] border-b border-gray-200 dark:border-[#1f1f1f]'
                    : 'bg-transparent'
            }`}
            role="banner"
        >
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-2" aria-label="Zocktech home">
                        <Image
                            src={theme === 'dark' ? '/zocktechLogo/darkLogo.png' : '/zocktechLogo/lightLogo.png'}
                            alt="Zocktech Logo"
                            width={160}
                            height={48}
                            className="h-10 w-auto"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav aria-label="Primary" className="hidden md:flex items-center gap-7">
                        <Link href="/#services" className="nav-link" style={{ color: theme === 'light' ? '#555555' : undefined }}>Services</Link>
                        <Link href="/#pricing" className="nav-link" style={{ color: theme === 'light' ? '#555555' : undefined }}>Pricing</Link>
                        <Link href="/#portfolio" className="nav-link" style={{ color: theme === 'light' ? '#555555' : undefined }}>Portfolio</Link>
                        <Link href="/#faqs" className="nav-link" style={{ color: theme === 'light' ? '#555555' : undefined }}>FAQs</Link>
                        <Link href="/#contact" className="nav-link" style={{ color: theme === 'light' ? '#555555' : undefined }}>Contact</Link>
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <AnimatedThemeToggler />
                        <ShimmerButton
                            asLink
                            href="https://wa.me/917829475479"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Chat on WhatsApp"
                            size="sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                            Chat on WhatsApp
                        </ShimmerButton>
                    </div>

                    {/* Mobile Toggle */}
                    <MobileToggle open={open} setOpen={setOpen} />
                </div>
            </div>

            {/* Mobile Menu */}
            <MobileMenu open={open} setOpen={setOpen} />
        </motion.header>
    );
}

function MobileToggle({ open, setOpen }) {
    return (
        <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 dark:border-[#1f1f1f] hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
        >
            <span className="sr-only">Open menu</span>
            <div className="relative h-4 w-5">
                <span className={`absolute left-0 top-0 block h-0.5 w-5 bg-black dark:bg-white transition-transform duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`} />
                <span className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 bg-black dark:bg-white transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute left-0 bottom-0 block h-0.5 w-5 bg-black dark:bg-white transition-transform duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
            </div>
        </button>
    );
}

function MobileMenu({ open, setOpen }) {
    return (
        <div
            id="mobile-menu"
            className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-out ${open ? 'max-h-96' : 'max-h-0'} border-t border-gray-300 dark:border-[#1f1f1f] bg-white dark:bg-[#0a0a0a]`}
            role="dialog"
            aria-modal="false"
        >
            <div className="mx-auto max-w-7xl px-4 py-4">
                <nav aria-label="Mobile" className="grid gap-1 text-white/90">
                    {[
                        ['Services', '#services'],
                        ['Pricing', '#pricing'],
                        ['Portfolio', '#portfolio'],
                        ['FAQs', '#faqs'],
                        ['Contact', '#contact'],
                    ].map(([label, href]) => (
                        <a
                            key={label}
                            href={href}
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-2 py-2.5 text-sm text-gray-700 dark:text-[#888888] hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        >
                            {label}
                        </a>
                    ))}
                </nav>
                <div className="mt-4 flex flex-col gap-3">
                    <AnimatedThemeToggler className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-200 dark:bg-[#1f1f1f] px-4 py-2.5 text-sm font-semibold text-black dark:text-white hover:bg-gray-300 dark:hover:bg-white/10" />
                    <ShimmerButton
                        asLink
                        href="https://wa.me/917829475479"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full justify-center"
                    >
                        Chat on WhatsApp
                    </ShimmerButton>
                </div>
            </div>
        </div>
    );
}
