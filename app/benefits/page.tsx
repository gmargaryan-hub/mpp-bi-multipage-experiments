import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import BenefitsHero from '@/components/BenefitsHero'
import BenefitsListSection from '@/components/BenefitsListSection'
import SimpleCTASection from '@/components/SimpleCTASection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Why Teams Choose MPP BI: Real Business Benefits',
  description:
    'See how MPP BI turns raw data into fast, accurate decisions. Connect every source, automate reports, and give your team answers in seconds.',
}

export default function BenefitsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <BenefitsHero />
        <BenefitsListSection />
        <SimpleCTASection
          title="See What MPP BI Can Do For Your Team"
          body="Every business runs on different data and different systems with different rules. Let's show you how MPP BI fits yours."
          ctaLabel="Book a Demo"
          accentColor="#0AAEDB"
        />
      </main>
      <Footer />
    </div>
  )
}
