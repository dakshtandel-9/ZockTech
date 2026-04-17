'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clientVideos from '@/data/clientVideos.json';

const reels = clientVideos.filter(reel => reel.status !== 'hide');

// ─── Reel card ────────────────────────────────────────────────────────────────
function ReelCard({ reel, onOpen, index }) {
    return (
        <motion.div
            className="cr-card"
            onClick={() => onOpen(reel)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ y: -8 }}
        >
            {/* Thumbnail */}
            <div className="cr-thumb-wrap">
                <img src={reel.thumbnail} alt={reel.client} className="cr-thumb" />
                <div className="cr-overlay" />

                {/* Play button */}
                <div className="cr-play">
                    <svg viewBox="0 0 24 24" fill="white" width="30" height="30">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            </div>

            {/* Card footer */}
            <div className="cr-card-footer">
                <div className="cr-client-info">
                    <span className="cr-client-tag">Client Video</span>
                    <h3 className="cr-client-name">{reel.client}</h3>
                </div>
                <div className="cr-watch-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function VideoModal({ reel, onClose }) {
    const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };

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
                <button className="cr-modal-close" onClick={onClose} aria-label="Close">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                <p className="cr-modal-label">{reel.client}</p>

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

    if (reels.length === 0) return null;

    const isFew = reels.length < 3;

    return (
        <>
            <style>{`
                /* ── Section ── */
                .cr-section {
                    padding: 100px 0;
                    background: #ffffff;
                    position: relative;
                    overflow: hidden;
                }
                .dark .cr-section { background: #0a0a0a; }

                /* subtle dot grid */
                .cr-section::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(circle, rgba(255,149,0,0.04) 1px, transparent 1px);
                    background-size: 32px 32px;
                    pointer-events: none;
                }

                .cr-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 24px;
                    position: relative;
                }

                /* ── Header ── */
                .cr-header {
                    text-align: center;
                    max-width: 42rem;
                    margin: 0 auto 64px;
                }
                .cr-badge {
                    display: inline-block;
                    font-size: 0.75rem;
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: #FF9500;
                    margin-bottom: 0.75rem;
                }
                .cr-title {
                    font-size: 1.875rem;
                    font-weight: 700;
                    color: #111827;
                    margin: 0;
                    line-height: 1.2;
                }
                .dark .cr-title { color: #ffffff; }
                @media (min-width: 768px) { .cr-title { font-size: 2.25rem; } }
                .cr-sub {
                    font-size: 1rem;
                    color: #4b5563;
                    margin-top: 0.75rem;
                    line-height: 1.5;
                }
                .dark .cr-sub { color: #888888; }

                /* ── Grid ── */
                .cr-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 28px;
                    justify-content: center;
                }
                .cr-grid.cr-grid--few {
                    justify-content: center;
                }

                /* ── Card ── */
                .cr-card {
                    position: relative;
                    width: 260px;
                    border-radius: 20px;
                    overflow: hidden;
                    cursor: pointer;
                    background: #f9f9f9;
                    border: 1px solid rgba(0,0,0,0.07);
                    box-shadow: 0 4px 24px rgba(0,0,0,0.07);
                    transition: box-shadow 0.3s ease;
                    flex: 0 0 auto;
                }
                .dark .cr-card {
                    background: #141414;
                    border: 1px solid rgba(255,255,255,0.07);
                    box-shadow: 0 8px 40px rgba(0,0,0,0.35);
                }
                .cr-card:hover {
                    box-shadow: 0 20px 60px rgba(255,149,0,0.15), 0 8px 32px rgba(0,0,0,0.2);
                }
                .dark .cr-card:hover {
                    box-shadow: 0 20px 60px rgba(255,149,0,0.18), 0 8px 32px rgba(0,0,0,0.5);
                }

                /* Thumbnail area — 9:16 portrait */
                .cr-thumb-wrap {
                    position: relative;
                    aspect-ratio: 9/16;
                    width: 100%;
                    overflow: hidden;
                }
                .cr-thumb {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                    transition: transform 0.4s ease;
                }
                .cr-card:hover .cr-thumb { transform: scale(1.06); }

                .cr-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%);
                }

                /* Play button */
                .cr-play {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: rgba(255,149,0,0.92);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 24px rgba(255,149,0,0.5);
                    transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
                }
                .cr-card:hover .cr-play {
                    transform: translate(-50%, -50%) scale(1.14);
                    background: #FF9500;
                    box-shadow: 0 8px 36px rgba(255,149,0,0.65);
                }

                /* Card footer */
                .cr-card-footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 16px 18px;
                }
                .cr-client-tag {
                    display: block;
                    font-size: 10px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    color: #FF9500;
                    margin-bottom: 4px;
                }
                .cr-client-name {
                    font-size: 15px;
                    font-weight: 700;
                    color: #111827;
                    margin: 0;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 160px;
                }
                .dark .cr-client-name { color: #ffffff; }
                .cr-watch-btn {
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                    background: rgba(255,149,0,0.1);
                    color: #FF9500;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    transition: background 0.2s ease, transform 0.2s ease;
                }
                .cr-card:hover .cr-watch-btn {
                    background: rgba(255,149,0,0.2);
                    transform: translateX(2px);
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
                    .cr-card { width: 200px; }
                    .cr-grid { gap: 18px; }
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
                            Tap any video to hear what real clients say about ZockTech.
                        </motion.p>
                    </div>

                    {/* ── Cards grid ── */}
                    <div className={`cr-grid${isFew ? ' cr-grid--few' : ''}`}>
                        {reels.map((reel, i) => (
                            <ReelCard key={reel.id} reel={reel} onOpen={setActive} index={i} />
                        ))}
                    </div>

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
