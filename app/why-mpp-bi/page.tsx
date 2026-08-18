import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import WhyMPPBIHero from '@/components/WhyMPPBIHero'
import WhyMPPBIStatsSection from '@/components/WhyMPPBIStatsSection'
import BigComparisonSection from '@/components/BigComparisonSection'
import DeploymentSection from '@/components/DeploymentSection'
import CaseStudySection from '@/components/CaseStudySection'
import ScaleAndPerformanceSection from '@/components/ScaleAndPerformanceSection'
import AICapabilitiesSection from '@/components/AICapabilitiesSection'
import BrandAndSupportSection from '@/components/BrandAndSupportSection'
import FAQSection from '@/components/FAQSection'
import SimpleCTASection from '@/components/SimpleCTASection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Flexible Business Intelligence Platform | MPP BI',
  description:
    'See why teams choose MPP BI: deploy anywhere, scale to hundreds of users, own your licenses, and keep full control of your data. Book a demo.',
}

export default function WhyMPPBIPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <WhyMPPBIHero />
        <WhyMPPBIStatsSection />
        <BigComparisonSection />
        <DeploymentSection />
        <CaseStudySection />
        <ScaleAndPerformanceSection />
        <AICapabilitiesSection />
        <BrandAndSupportSection />
        <FAQSection />
        <SimpleCTASection
          title="See How MPP BI Fits Your Setup"
          body="You have a specific environment, specific data, and specific rules you have to work within. In a short demo, we'll walk through your deployment needs and show you exactly how it would run for your team."
          ctaLabel="Talk to an Expert"
          accentColor="#0AAEDB"
        />
      </main>
      <Footer />
    </div>
  )
}
