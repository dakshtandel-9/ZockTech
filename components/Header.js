'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Header() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const close = () => setOpen(false);
        window.addEventListener('hashchange', close);
        return () => window.removeEventListener('hashchange', close);
    }, []);

    return (
        <header
            className={`bg-black-100 sticky top-0 z-50 transition-colors ${scrolled ? 'backdrop-blur bg-[#0B0B0F]/80 border-b border-white/10' : 'bg-transparent'
                }`}
            role="banner"
        >
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-2" aria-label="Zocktech home">
                        <span className="text-base font-semibold tracking-tight text-white">
                            <Image
                                src="/logo-3.png"
                                alt="Zocktech Logo"
                                width={160}
                                height={48}
                                className="h-12 w-auto"
                            />
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav aria-label="Primary" className="hidden md:flex items-center gap-6">
                        <HeaderLink href="/#services">Services</HeaderLink>
                        <HeaderLink href="/#pricing">Pricing</HeaderLink>
                        <HeaderLink href="/#portfolio">Portfolio</HeaderLink>
                        <HeaderLink href="/#faqs">FAQs</HeaderLink>
                        <HeaderLink href="/#contact">Contact</HeaderLink>
                    </nav>

                    {/* Desktop CTA (WhatsApp removed) */}
                    <div className="hidden md:flex items-center gap-3">
                        <PrimaryButton href="/#contact" ariaLabel="Get a free quote">
                            Get a Free Quote
                        </PrimaryButton>
                    </div>

                    {/* Mobile Toggle */}
                    <MobileToggle open={open} setOpen={setOpen} />
                </div>
            </div>

            {/* Mobile Menu */}
            <MobileMenu open={open} setOpen={setOpen} />
        </header>
    );
}

/* Subcomponents */

function HeaderLink({ href, children }) {
    return (
        <Link
            href={href}
            className="text-base text-gray-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7302]/60 rounded"
        >
            {children}
        </Link>
    );
}

function PrimaryButton({ href, ariaLabel, children }) {
    return (
        <Link
            href={href}
            aria-label={ariaLabel}
            className="inline-flex items-center rounded-md bg-[#FF7302] px-4 py-2 text-base font-semibold text-black
                 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7302]/60 transition-colors"
        >
            {children}
        </Link>
    );
}

function MobileToggle({ open, setOpen }) {
    return (
        <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 hover:bg-white/5
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7302]/60"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
        >
            <span className="sr-only">Open menu</span>
            <div className="relative h-4 w-5">
                <span className={`absolute left-0 top-0 block h-0.5 w-5 bg-white transition-transform duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`} />
                <span className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 bg-white transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute left-0 bottom-0 block h-0.5 w-5 bg-white transition-transform duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
            </div>
        </button>
    );
}

function MobileMenu({ open, setOpen }) {
    return (
        <div
            id="mobile-menu"
            className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-out ${open ? 'max-h-96' : 'max-h-0'} border-t border-white/5 bg-[#0B0B0F]`}
            role="dialog"
            aria-modal="false"
        >
            <div className="mx-auto max-w-7xl px-4 py-4">
                <nav aria-label="Mobile" className="grid gap-2 text-white/90">
                    <MobileLink onClick={() => setOpen(false)} href="#services">Services</MobileLink>
                    <MobileLink onClick={() => setOpen(false)} href="#pricing">Pricing</MobileLink>
                    <MobileLink onClick={() => setOpen(false)} href="#portfolio">Portfolio</MobileLink>
                    <MobileLink onClick={() => setOpen(false)} href="#faqs">FAQs</MobileLink>
                    <MobileLink onClick={() => setOpen(false)} href="#contact">Contact</MobileLink>
                </nav>
                <div className="mt-4 flex items-center gap-3">
                    {/* Only primary CTA remains */}
                    <Link
                        href="#contact"
                        className="flex-1 text-center rounded-md bg-[#FF7302] px-4 py-2 text-base font-semibold text-black
                       hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7302]/60 transition-colors"
                    >
                        Get a Free Quote
                    </Link>
                </div>
            </div>
        </div>
    );
}

function MobileLink({ href, children, onClick }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="rounded px-2 py-2 text-base hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7302]/60"
        >
            {children}
        </Link>
    );
}
