// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Enable optimization for specific remote image hosts you use
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'assets.faballey.com' },
      { protocol: 'https', hostname: 'mediahub.boohoo.com' },
      { protocol: 'https', hostname: 'gangafashions.com' },
      { protocol: 'https', hostname: 'www.damart.co.uk' },
      { protocol: 'https', hostname: 'cmsimages.shoppersstop.com' },
      { protocol: 'https', hostname: 'zocktech.com' },
      { protocol: 'https', hostname: '*.zocktech.com' },
      { protocol: 'https', hostname: 'ppdanmjlcbfryiqveetm.supabase.co' },
      { protocol: 'https', hostname: 'iad.microlink.io' },
      { protocol: 'https', hostname: 'api.microlink.io' },
      { protocol: 'https', hostname: '**.microlink.io' },
      // Add more domains if you render images from other hosts
    ],
  },

  // Optional: tweak experimental/appDir if you need it (App Router is default in recent Next.js)
  // experimental: {
  //   appDir: true,
  // },
};

export default nextConfig;
