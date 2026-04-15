'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clientVideos from '@/data/clientVideos.json';

// ─── Video data ────────────────────────────────────────────────────────────────
// Add your YouTube / Google Drive embed URLs and thumbnail images here.
// thumbnail: image shown in the scrolling strip.
// embedUrl:  the iframe src opened in the modal when clicked.
const reels = clientVideos;

// Triple the list so the infinite loop looks seamless
const track = [...reels, ...reels, ...reels];

// ─── Reel card (thumbnail only) ───────────────────────────────────────────────
function ReelCard({ reel, onOpen }) {
    return (
        <div className="cr-card" onClick={() => onOpen(reel)}>
            <img src={reel.thumbnail} alt={reel.client} className="cr-thumb" />
            {/* dark gradient at bottom */}
            <div className="cr-overlay" />
            {/* Play button */}
            <div className="cr-play">
                <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
                    <path d="M8 5v14l11-7z" />
                </svg>
            </div>
            {/* client label */}
            <span className="cr-label">{reel.client}</span>
        </div>
    );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function VideoModal({ reel, onClose }) {
    // close on backdrop click
    const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };

    // close on Escape
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    return (
        <motion.div
            className="cr-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdrop}
        >
            <motion.div
                className="cr-modal-box"
                initial={{ scale: 0.85, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.85, opacity: 0, y: 40 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            >
                {/* Close button */}
                <button className="cr-modal-close" onClick={onClose} aria-label="Close">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                {/* Client label */}
                <p className="cr-modal-label">{reel.client}</p>

                {/* Video iframe — 9:16 portrait reel format */}
                <div className="cr-video-wrap">
                    <iframe
                        src={reel.embedUrl}
                        title={reel.client}
                        allow="autoplay; encrypted-media; fullscreen"
                        allowFullScreen
                        className="cr-iframe"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function ClientReelsSection() {
    const [active, setActive] = useState(null);
    const trackRef = useRef(null);

    // Continuous CSS-based auto-scroll (no JS timer needed — pure animation)
    // We duplicate handles pause-on-hover via CSS.

    return (
        <>
            <style>{`
                /* Section wrapper */
                .cr-section {
                    padding: 100px 0;
                    background: var(--bg, #ffffff);
                    position: relative;
                    overflow: hidden;
                }
                .dark .cr-section { --bg: #0a0a0a; }

                .cr-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 24px;
                }

                /* ── Header ── */
                .cr-header {
                    text-align: center;
                    max-width: 42rem; /* matches max-w-2xl */
                    margin: 0 auto 48px;
                }
                .cr-badge {
                    display: inline-block;
                    font-size: 0.75rem; /* text-xs */
                    font-weight: 500; /* font-medium */
                    text-transform: uppercase;
                    tracking-widest: 0.1em;
                    letter-spacing: 0.1em;
                    color: #FF9500;
                    margin-bottom: 0.75rem;
                }
                .cr-title {
                    font-size: 1.875rem; /* text-3xl */
                    font-weight: 700; /* font-bold */
                    color: #111827; /* gray-900 */
                    margin: 0;
                }
                .dark .cr-title { color: #fff; }

                @media (min-width: 768px) {
                    .cr-title { font-size: 2.25rem; } /* md:text-4xl */
                }

                .cr-sub {
                    font-size: 1rem; /* text-base */
                    color: #4b5563; /* gray-600 */
                    margin-top: 0.75rem;
                    line-height: 1.5;
                }
                .dark .cr-sub { color: #888888; }

                /* ── Marquee wrapper ── */
                .cr-marquee-wrap {
                    position: relative;
                    overflow: hidden;
                }
                /* fade edges */
                .cr-marquee-wrap::before,
                .cr-marquee-wrap::after {
                    content: '';
                    position: absolute;
                    top: 0; bottom: 0;
                    width: 100px;
                    z-index: 2;
                    pointer-events: none;
                }
                .cr-marquee-wrap::before {
                    left: 0;
                    background: linear-gradient(to right, #ffffff, transparent);
                }
                .cr-marquee-wrap::after {
                    right: 0;
                    background: linear-gradient(to left, #ffffff, transparent);
                }
                .dark .cr-marquee-wrap::before { background: linear-gradient(to right, #0a0a0a, transparent); }
                .dark .cr-marquee-wrap::after  { background: linear-gradient(to left,  #0a0a0a, transparent); }

                /* ── Scrolling track ── */
                .cr-track {
                    display: flex;
                    gap: 18px;
                    width: max-content;
                    padding: 16px 0 24px;
                    animation: crScroll 38s linear infinite;
                }
                .cr-track:hover { animation-play-state: paused; }

                @keyframes crScroll {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(calc(-100% / 3)); }
                }

                /* ── Individual reel card ── */
                .cr-card {
                    position: relative;
                    flex: 0 0 auto;
                    width: 200px;
                    height: 355px;          /* 9:16 portrait */
                    border-radius: 18px;
                    overflow: hidden;
                    cursor: pointer;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.18);
                    transition: transform 0.28s ease, box-shadow 0.28s ease;
                    border: 1px solid rgba(255,255,255,0.08);
                }
                .cr-card:hover {
                    transform: translateY(-6px) scale(1.03);
                    box-shadow: 0 20px 50px rgba(0,0,0,0.35);
                }

                .cr-thumb {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                    transition: transform 0.4s ease;
                }
                .cr-card:hover .cr-thumb { transform: scale(1.07); }

                .cr-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.1) 50%, transparent 100%);
                }

                /* Play icon */
                .cr-play {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 52px;
                    height: 52px;
                    border-radius: 50%;
                    background: rgba(255,149,0,0.92);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 20px rgba(255,149,0,0.5);
                    transition: transform 0.25s ease, background 0.25s ease;
                }
                .cr-card:hover .cr-play {
                    transform: translate(-50%, -50%) scale(1.12);
                    background: #FF9500;
                }

                /* Client label */
                .cr-label {
                    position: absolute;
                    bottom: 14px;
                    left: 14px;
                    right: 14px;
                    font-size: 12px;
                    font-weight: 700;
                    color: #fff;
                    text-align: center;
                    letter-spacing: 0.03em;
                    text-shadow: 0 1px 6px rgba(0,0,0,0.6);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                /* ── Modal backdrop ── */
                .cr-modal-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.82);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }

                /* ── Modal box ── */
                .cr-modal-box {
                    position: relative;
                    width: 100%;
                    max-width: 390px;
                    background: #111;
                    border-radius: 24px;
                    overflow: hidden;
                    box-shadow: 0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.07);
                }

                .cr-modal-close {
                    position: absolute;
                    top: 14px;
                    right: 14px;
                    z-index: 10;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.1);
                    border: 1px solid rgba(255,255,255,0.15);
                    color: #fff;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.2s;
                }
                .cr-modal-close:hover { background: rgba(255,255,255,0.2); }

                .cr-modal-label {
                    padding: 14px 50px 0 18px;
                    font-size: 13px;
                    font-weight: 700;
                    color: #FF9500;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                    margin: 0;
                }

                /* 9:16 portrait video wrapper */
                .cr-video-wrap {
                    position: relative;
                    aspect-ratio: 9/16;
                    width: 100%;
                    margin-top: 10px;
                    background: #000;
                }
                .cr-iframe {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    border: none;
                }

                @media (max-width: 640px) {
                    .cr-card { width: 160px; height: 285px; }
                    .cr-marquee-wrap::before,
                    .cr-marquee-wrap::after { width: 40px; }
                }
            `}</style>

            <section id="client-reels" className="cr-section">
                <div className="cr-inner">

                    {/* ── Header ── */}
                    <div className="cr-header">
                        <motion.span
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.5 }}
                            className="cr-badge"
                        >
                            Client Videos
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.5 }}
                            className="cr-title"
                        >
                            Clients talk about our work
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="cr-sub"
                        >
                            Tap any reel to watch what real clients say about ZockTech.
                        </motion.p>
                    </div>

                    {/* ── Auto-scrolling reel strip ── */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6 }}
                        className="cr-marquee-wrap"
                    >
                        <div className="cr-track" ref={trackRef}>
                            {track.map((reel, i) => (
                                <ReelCard key={`${reel.id}-${i}`} reel={reel} onOpen={setActive} />
                            ))}
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* ── Video modal ── */}
            <AnimatePresence>
                {active && (
                    <VideoModal reel={active} onClose={() => setActive(null)} />
                )}
            </AnimatePresence>
        </>
    );
}
