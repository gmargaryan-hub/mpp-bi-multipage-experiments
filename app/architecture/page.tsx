import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import ArchitectureHero from '@/components/ArchitectureHero'
import LegacyProblemSection from '@/components/LegacyProblemSection'
import ArchitectureDiagramSection from '@/components/ArchitectureDiagramSection'
import BuiltDifferentlySection from '@/components/BuiltDifferentlySection'
import CalcLanguageSection from '@/components/CalcLanguageSection'
import TalkToEngineerSection from '@/components/TalkToEngineerSection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: "How MPP BI's Architecture Works",
  description:
    "A look at the architecture behind MPP BI, how it's built, and why it works differently from other BI tools.",
}

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <ArchitectureHero />
        <LegacyProblemSection />
        <ArchitectureDiagramSection />
        <BuiltDifferentlySection />
        <CalcLanguageSection />
        <TalkToEngineerSection />
      </main>
      <Footer />
    </div>
  )
}
