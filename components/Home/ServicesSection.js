import { SiWordpress, SiShopify, SiNextdotjs } from 'react-icons/si';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid';

export default function ServicesSection() {
  const services = [
    {
      title: 'WordPress Websites',
      desc: 'Modern, fast, and easy to manage—built for conversions.',
      Icon: () => <SiWordpress className="h-6 w-6" color="#21759B" />,
    },
    {
      title: 'Shopify Stores',
      desc: 'From setup to sales—optimized product pages and smooth checkout.',
      Icon: () => <SiShopify className="h-6 w-6" color="#95BF47" />,
    },
    {
      title: 'Custom (MERN/Next.js)',
      desc: 'Performance, flexibility, and integrations that scale.',
      Icon: () => <SiNextdotjs className="h-6 w-6" color="#FFFFFF" />,
    },
    {
      title: 'Maintenance & Support',
      desc: 'Security, updates, backups, and performance monitoring.',
      Icon: () => <WrenchScrewdriverIcon className="h-6 w-6 text-gray-300" />,
    },
  ];

  return (
    <section id="services" className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-semibold text-white">Services</h2>
        <p className="mt-2 text-base text-gray-400">End‑to‑end delivery focused on ROI.</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map(({ title, desc, Icon }) => (
            <div key={title} className="rounded-lg border border-white/5 bg-[#111116] p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-md border border-white/10 bg-white/5">
                <Icon />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-2 text-base text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
