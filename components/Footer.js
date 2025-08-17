// components/Footer.js
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="mt-20 border-t border-white/5 bg-[#0B0B0F] text-white">
            {/* Top */}
            <div className="mx-auto max-w-7xl px-4 py-12">
                <div className="grid gap-10 md:grid-cols-4">
                    {/* Brand + Blurb */}
                    <div>
                        <Link href="/" aria-label="Zocktech home" className="flex items-center gap-2">
                            <Image
                                src="/logo-3.png"
                                alt="Zocktech Logo"
                                width={160}
                                height={48}
                                priority={false}
                                className="h-12 w-auto"
                            />
                        </Link>

                        <p className="mt-4 text-base text-gray-400">
                            Premium, high‑converting websites for small businesses. WordPress, Shopify, and MERN/Next.js builds—delivered fast.
                        </p>

                        {/* Social */}
                        <div className="mt-6 flex items-center gap-3">
                            <SocialIcon href="#" label="Twitter/X">
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                                    <path d="M18.244 2H21l-6.53 7.46L22.5 22h-6.79l-5.32-6.67L4.3 22H1.5l7.19-8.2L1.5 2h6.89l4.78 6.06L18.244 2Zm-1.19 18h1.85L7.01 4h-1.9l11.934 16Z" />
                                </svg>
                            </SocialIcon>
                            <SocialIcon href="#" label="LinkedIn">
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                                    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0H12v2.2h.06c.63-1.2 2.18-2.46 4.49-2.46 4.8 0 5.69 3.16 5.69 7.26V24h-5V16.4c0-1.81-.03-4.14-2.52-4.14-2.53 0-2.92 1.97-2.92 4v7.74H7.5V8z" />
                                </svg>
                            </SocialIcon>
                            <SocialIcon href="#" label="GitHub">
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                                    <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.38 7.86 10.9.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.71.08-.71 1.18.08 1.8 1.22 1.8 1.22 1.04 1.79 2.73 1.27 3.4.97.11-.76.41-1.27.75-1.56-2.55-.29-5.24-1.28-5.24-5.71 0-1.26.45-2.29 1.2-3.09-.12-.29-.52-1.47.11-3.07 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.6.23 2.78.12 3.07.75.8 1.2 1.83 1.2 3.09 0 4.44-2.7 5.42-5.26 5.7.42.36.8 1.07.8 2.17v3.21c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
                                </svg>
                            </SocialIcon>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-base font-semibold">Company</h3>
                        <ul className="mt-4 space-y-2 text-base text-gray-400">
                            <li><a className="hover:text-white" href="#about">About</a></li>
                            <li><a className="hover:text-white" href="#services">Services</a></li>
                            <li><a className="hover:text-white" href="#pricing">Pricing</a></li>
                            <li><a className="hover:text-white" href="#portfolio">Portfolio</a></li>
                            <li><Link className="hover:text-white" href="/case-studies">Case Studies</Link></li>
                            <li><a className="hover:text-white" href="#faqs">FAQs</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-base font-semibold">What We Do</h3>
                        <ul className="mt-4 space-y-2 text-base text-gray-400">
                            <li>WordPress Websites</li>
                            <li>Shopify Stores</li>
                            <li>MERN/Next.js Development</li>
                            <li>Maintenance & Support</li>
                            <li>SEO & Analytics Setup</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-base font-semibold">Contact</h3>
                        <ul className="mt-4 space-y-2 text-base text-gray-400">
                            <li><a className="hover:text-white" href="mailto:hello@zocktech.com">hello@zocktech.com</a></li>
                            <li><a className="hover:text-white" href="tel:+917829475479">+91 7829475479</a></li>
                            <li className="text-gray-500">Mon–Sat: 9:30am–6:30pm IST</li>
                            <li className="text-gray-500">India • Remote</li>
                        </ul>
                        <div className="mt-4">
                            <a
                                href="#contact"
                                className="inline-flex items-center rounded-md bg-[#FF7302] px-4 py-2 text-base font-semibold text-black hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7302]/60"
                            >
                                Get a Free Quote
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/5">
                <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-base text-gray-500">
                        © {new Date().getFullYear()} Zocktech. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 text-base text-gray-400">
                        <Link className="hover:text-white" href="/privacy">Privacy Policy</Link>
                        <span className="text-gray-600">•</span>
                        <Link className="hover:text-white" href="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ href, label, children }) {
    const isInternal = href?.startsWith('/');
    if (isInternal) {
        // Internal route: use Link
        return (
            <Link
                href={href}
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/80 hover:text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7302]/60"
            >
                {children}
            </Link>
        );
    }
    // External: use <a> with target and rel
    return (
        <a
            href={href}
            aria-label={label}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/80 hover:text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7302]/60"
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    );
}
