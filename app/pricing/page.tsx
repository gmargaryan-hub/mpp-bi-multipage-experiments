import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import PricingHero from '@/components/PricingHero'
import PricingStatsSection from '@/components/PricingStatsSection'
import PricingTableSection from '@/components/PricingTableSection'
import PerpetualLicenseSection from '@/components/PerpetualLicenseSection'
import PricingCalculatorSection from '@/components/PricingCalculatorSection'
import SimpleCTASection from '@/components/SimpleCTASection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'MPP BI Pricing | Clear Pricing for Every Team Size',
  description:
    'Simple, published pricing for MPP BI: $10/month read-only seats, $18/month admin seats, or one-time perpetual licenses. No hidden costs, no quote required.',
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <PricingHero />
        <PricingStatsSection />
        <PricingTableSection />
        <PerpetualLicenseSection />
        <PricingCalculatorSection />
        <SimpleCTASection
          title="Ready to Get Started?"
          body="We'll review your data, your environment, and how your team will use MPP BI. Then we'll recommend the right setup and the right number of seats, so you start with exactly what you need."
          note="For larger teams or more complex deployments, we'll prepare a package and pricing based on your requirements."
          ctaLabel="Talk to an Expert"
          accentColor="#F97316"
        />
      </main>
      <Footer />
    </div>
  )
}
