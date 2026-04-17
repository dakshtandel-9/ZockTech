'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';
import GlowButton from '@/components/RainbowButton';

const WHATSAPP = 'https://wa.me/917829475479';
const INSTAGRAM = 'https://instagram.com/zocktech';

const NAV_LINKS = [
    ['Services',  '/#services'],
    ['Portfolio', '/#portfolio'],
    ['Pricing',   '/#pricing'],
    ['FAQs',      '/#faqs'],
    ['Contact',   '/#contact'],
];

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.55, delay, ease: 'easeOut' },
});

export default function Footer() {
    const { theme } = useTheme();

    return (
        <>
            <style>{`
                /* ── Footer wrapper ── */
                .ft-root {
                    position: relative;
                    background: #f9f9f9;
                    overflow: hidden;
                }
                .dark .ft-root { background: #0a0a0a; }

                /* subtle dot grid */
                .ft-root::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(circle, rgba(255,149,0,0.05) 1px, transparent 1px);
                    background-size: 30px 30px;
                    pointer-events: none;
                }

                /* ── CTA band ── */
                .ft-cta {
                    position: relative;
                    z-index: 1;
                    border-top: 1px solid rgba(0,0,0,0.07);
                    padding: 80px 24px;
                    text-align: center;
                }
                .dark .ft-cta { border-top-color: rgba(255,255,255,0.06); }

                /* orange glow behind CTA */
                .ft-cta::before {
                    content: '';
                    position: absolute;
                    top: -60px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 600px;
                    height: 300px;
                    background: radial-gradient(ellipse at center, rgba(255,149,0,0.12) 0%, transparent 70%);
                    pointer-events: none;
                }

                .ft-cta-eyebrow {
                    display: inline-block;
                    font-size: 0.7rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.13em;
                    color: #FF9500;
                    margin-bottom: 18px;
                }
                .ft-cta-heading {
                    font-size: clamp(2rem, 5vw, 3.25rem);
                    font-weight: 800;
                    line-height: 1.15;
                    color: #111827;
                    margin: 0 auto 28px;
                    max-width: 640px;
                    letter-spacing: -0.02em;
                }
                .dark .ft-cta-heading { color: #ffffff; }

                .ft-cta-heading span {
                    color: #FF9500;
                }


                /* ── Main footer body ── */
                .ft-body {
                    position: relative;
                    z-index: 1;
                    border-top: 1px solid rgba(0,0,0,0.07);
                    padding: 60px 24px 0;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .dark .ft-body { border-top-color: rgba(255,255,255,0.06); }

                .ft-grid {
                    display: grid;
                    grid-template-columns: 1.6fr 1fr 1fr 1fr;
                    gap: 48px;
                }
                @media (max-width: 900px) {
                    .ft-grid { grid-template-columns: 1fr 1fr; }
                }
                @media (max-width: 560px) {
                    .ft-grid { grid-template-columns: 1fr; gap: 36px; }
                }

                /* Brand column */
                .ft-brand-desc {
                    font-size: 0.875rem;
                    line-height: 1.7;
                    color: #6b7280;
                    margin-top: 16px;
                    max-width: 260px;
                }
                .dark .ft-brand-desc { color: #888888; }

                .ft-socials {
                    display: flex;
                    gap: 10px;
                    margin-top: 24px;
                }
                .ft-social-btn {
                    width: 38px;
                    height: 38px;
                    border-radius: 10px;
                    border: 1px solid rgba(0,0,0,0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #6b7280;
                    text-decoration: none;
                    transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.2s;
                }
                .dark .ft-social-btn {
                    border-color: rgba(255,255,255,0.08);
                    color: #888888;
                }
                .ft-social-btn:hover {
                    transform: translateY(-2px);
                }
                .ft-social-btn.wa:hover  { color: #25D366; border-color: #25D366; background: rgba(37,211,102,0.08); }
                .ft-social-btn.ig:hover  { color: #E1306C; border-color: #E1306C; background: rgba(225,48,108,0.08); }

                /* Nav columns */
                .ft-col-title {
                    font-size: 0.7rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                    color: #FF9500;
                    margin-bottom: 18px;
                }
                .ft-col-links {
                    display: flex;
                    flex-direction: column;
                    gap: 11px;
                }
                .ft-col-links a {
                    font-size: 0.875rem;
                    color: #6b7280;
                    text-decoration: none;
                    transition: color 0.18s ease, transform 0.18s ease;
                    display: inline-block;
                }
                .dark .ft-col-links a { color: #888888; }
                .ft-col-links a:hover { color: #FF9500; transform: translateX(3px); }

                /* Contact info */
                .ft-contact-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    font-size: 0.875rem;
                    color: #6b7280;
                    margin-bottom: 12px;
                    text-decoration: none;
                    transition: color 0.18s;
                }
                .dark .ft-contact-item { color: #888888; }
                .ft-contact-item:hover { color: #FF9500; }
                .ft-contact-icon {
                    flex-shrink: 0;
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    background: rgba(255,149,0,0.08);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #FF9500;
                }

                /* ── Bottom bar ── */
                .ft-bottom {
                    position: relative;
                    z-index: 1;
                    border-top: 1px solid rgba(0,0,0,0.07);
                    margin-top: 48px;
                    padding: 20px 24px;
                    max-width: 1200px;
                    margin-left: auto;
                    margin-right: auto;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                .dark .ft-bottom { border-top-color: rgba(255,255,255,0.06); }
                .ft-bottom-text {
                    font-size: 0.75rem;
                    color: #9ca3af;
                }
                .dark .ft-bottom-text { color: #555555; }
                .ft-bottom-badge {
                    font-size: 0.7rem;
                    font-weight: 600;
                    color: #FF9500;
                    background: rgba(255,149,0,0.08);
                    border: 1px solid rgba(255,149,0,0.2);
                    border-radius: 999px;
                    padding: 3px 12px;
                    letter-spacing: 0.04em;
                }

                /* bottom bar full-width border */
                .ft-bottom-outer {
                    border-top: 1px solid rgba(0,0,0,0.07);
                    background: #f9f9f9;
                    position: relative;
                    z-index: 1;
                }
                .dark .ft-bottom-outer {
                    border-top-color: rgba(255,255,255,0.06);
                    background: #0a0a0a;
                }
            `}</style>

            <footer className="ft-root">

                {/* ── CTA Band ── */}
                <div className="ft-cta">
                    <motion.span className="ft-cta-eyebrow" {...fadeUp(0)}>
                        Ready to grow?
                    </motion.span>
                    <motion.h2 className="ft-cta-heading" {...fadeUp(0.08)}>
                        Let's build something <span>remarkable</span> together
                    </motion.h2>
                    <motion.div {...fadeUp(0.16)} className="inline-flex">
                        <GlowButton variant="primary" size="lg" asLink href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                            Start your project
                        </GlowButton>
                    </motion.div>
                </div>

                {/* ── Main body ── */}
                <div className="ft-body">
                    <div className="ft-grid">

                        {/* Brand */}
                        <motion.div {...fadeUp(0)}>
                            <Link href="/" aria-label="Zocktech home">
                                <Image
                                    src={theme === 'dark' ? '/zocktechLogo/darkLogo.png' : '/zocktechLogo/lightLogo.png'}
                                    alt="Zocktech Logo"
                                    width={140}
                                    height={40}
                                    className="h-10 w-auto"
                                />
                            </Link>
                            <p className="ft-brand-desc">
                                We build fast, conversion-focused websites for Indian businesses that want to grow online.
                            </p>
                            <div className="ft-socials">
                                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="ft-social-btn wa">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                    </svg>
                                </a>
                                <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="ft-social-btn ig">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </a>
                            </div>
                        </motion.div>

                        {/* Navigation */}
                        <motion.div {...fadeUp(0.08)}>
                            <p className="ft-col-title">Navigation</p>
                            <nav className="ft-col-links">
                                {NAV_LINKS.map(([label, href]) => (
                                    <a key={label} href={href}>{label}</a>
                                ))}
                            </nav>
                        </motion.div>

                        {/* Services */}
                        <motion.div {...fadeUp(0.14)}>
                            <p className="ft-col-title">Services</p>
                            <div className="ft-col-links">
                                {['Landing Page', 'Business Website', 'E-commerce Store', 'Custom Web App'].map(s => (
                                    <a key={s} href="/#services">{s}</a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Contact */}
                        <motion.div {...fadeUp(0.2)}>
                            <p className="ft-col-title">Contact</p>
                            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="ft-contact-item">
                                <span className="ft-contact-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                    </svg>
                                </span>
                                +91 78294 75479
                            </a>
                            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="ft-contact-item">
                                <span className="ft-contact-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </span>
                                @zocktech
                            </a>
                        </motion.div>

                    </div>
                </div>

                {/* ── Bottom bar ── */}
                <div className="ft-bottom-outer" style={{ marginTop: '48px' }}>
                    <div className="ft-bottom">
                        <span className="ft-bottom-text">© 2026 Zocktech · Made by Daksh Tandel</span>
                        <span className="ft-bottom-badge">Built with Next.js</span>
                    </div>
                </div>

            </footer>
        </>
    );
}
