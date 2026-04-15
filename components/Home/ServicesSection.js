'use client';
import { motion } from 'framer-motion';
import FlowingMenu from '@/components/FlowingMenu';
import { useTheme } from '@/components/ThemeProvider';

const menuItems = [
  {
    text: 'Landing Page',
    link: '/#contact',
    image: '/portfolio/35frames.png',
  },
  {
    text: 'Business Website',
    link: '/#contact',
    image: '/portfolio/sarala.png',
  },
  {
    text: 'E-commerce Store',
    link: '/#contact',
    image: '/portfolio/identity.png',
  },
  {
    text: 'Custom Web App',
    link: '/#contact',
    image: '/portfolio/insightoriatesting.png',
  },
];

export default function ServicesSection() {
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <section id="services" className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-medium uppercase tracking-widest text-[#FF9500] mb-3"
          >
            What We Build
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
          >
            Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-3 text-base text-gray-600 dark:text-[#888888]"
          >
            React + Next.js only. Fast delivery, clean code, no bloat.
          </motion.p>
        </div>

        {/* Flowing Menu */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden border border-gray-200 dark:border-[#1f1f1f]"
          style={{ height: '400px' }}
        >
          <FlowingMenu
            items={menuItems}
            speed={18}
            bgColor={isDark ? '#0a0a0a' : '#f9fafb'}
            textColor={isDark ? '#ffffff' : '#111111'}
            marqueeBgColor="#FF9500"
            marqueeTextColor="#000000"
            borderColor={isDark ? '#1f1f1f' : '#e5e7eb'}
          />
        </motion.div>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-5 text-center text-xs text-gray-400 dark:text-[#555555] tracking-wide uppercase"
        >
          Hover over a service to explore ↑
        </motion.p>
      </div>
    </section>
  );
}
