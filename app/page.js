'use client'
import Hero from '@/components/Home/Hero';
import TrustBar from '@/components/Home/TrustBar';
import ServicesSection from '@/components/Home/ServicesSection';
import AboutPreview from '@/components/Home/AboutPreview';
import PricingSection from '@/components/Home/PricingSection';
import PortfolioPreview from '@/components/Home/PortfolioPreview';
import ProcessSection from '@/components/Home/ProcessSection';
import ClientReelsSection from '@/components/Home/ClientReelsSection';
import TestimonialsSection from '@/components/Home/TestimonialsSection';
import FAQSection from '@/components/Home/FAQSection';


export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <TrustBar />
        <ServicesSection />
        <AboutPreview />
        <PricingSection />
        <PortfolioPreview />
        <ClientReelsSection />
        <ProcessSection />
        <TestimonialsSection />
        <FAQSection />
      </main>

    </>
  );
}
