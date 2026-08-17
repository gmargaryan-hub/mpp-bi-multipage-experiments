import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import StatsSection from '@/components/StatsSection'
import ConnectsWithDataSection from '@/components/ConnectsWithDataSection'
import UseCasesSection from '@/components/UseCasesSection'
import CaseStudySection from '@/components/CaseStudySection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <HeroSection />
        <StatsSection />
        <ConnectsWithDataSection />
        <UseCasesSection />
        <CaseStudySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
