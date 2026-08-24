import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import BenefitsSection from '@/components/BenefitsSection'
import TrustedGloballySection from '@/components/TrustedGloballySection'
import ProblemSection from '@/components/ProblemSection'
import ArchitectureSection from '@/components/ArchitectureSection'
import EliminatedSection from '@/components/EliminatedSection'
import LPEvsDaxSection from '@/components/LPEvsDaxSection'
import ComparisonTable from '@/components/ComparisonTable'
import UseCasesSection from '@/components/UseCasesSection'
import FeaturesGrid from '@/components/FeaturesGrid'
import DashboardShowcase from '@/components/DashboardShowcase'
import StatsBar from '@/components/StatsBar'
import PricingSection from '@/components/PricingSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <HeroSection />
        <BenefitsSection />
        <TrustedGloballySection />
        <ProblemSection />
        <ArchitectureSection />
        <EliminatedSection />
        <LPEvsDaxSection />
        <ComparisonTable />
        <UseCasesSection />
        <FeaturesGrid />
        <DashboardShowcase />
        <StatsBar />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
