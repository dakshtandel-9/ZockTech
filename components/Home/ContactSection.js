'use client';
import { motion } from 'framer-motion';
import GlowButton from '@/components/RainbowButton';

const WHATSAPP = 'https://wa.me/917829475479';

export default function ContactSection() {
    return (
        <section id="contact" className="py-20">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mx-auto max-w-2xl text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5 }}
                        className="inline-block text-xs font-medium uppercase tracking-widest text-[#FF9500] mb-3"
                    >
                        Get Started
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
                    >
                        Ready to get started?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="mt-4 text-lg text-gray-600 dark:text-[#888888] leading-relaxed"
                    >
                        Chat with Daksh directly on WhatsApp. Most projects are scoped
                        and started within 24 hours.
                    </motion.p>

                    {/* WhatsApp CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mt-8"
                    >
                        <GlowButton
                            asLink
                            variant="primary"
                            size="lg"
                            href={WHATSAPP}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                            Chat on WhatsApp Now
                        </GlowButton>
                    </motion.div>

                    {/* Contact details */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-gray-600 dark:text-[#888888]"
                    >
                        <a href="tel:+917829475479" className="hover:text-[#FF9500] transition-colors">
                            +91 78294 75479
                        </a>
                        <span className="hidden sm:inline text-gray-300 dark:text-[#1f1f1f]">·</span>
                        <a href="mailto:hello@zocktech.com" className="hover:text-[#FF9500] transition-colors">
                            hello@zocktech.com
                        </a>
                        <span className="hidden sm:inline text-gray-300 dark:text-[#1f1f1f]">·</span>
                        <span>Mon–Sat 9:30am–6:30pm IST</span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
