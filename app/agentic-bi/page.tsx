import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import AgenticBIHero from '@/components/AgenticBIHero'
import AgenticBIStatsSection from '@/components/AgenticBIStatsSection'
import TraditionalVsAgenticSection from '@/components/TraditionalVsAgenticSection'
import AgenticStructureSection from '@/components/AgenticStructureSection'
import GovernanceSection from '@/components/GovernanceSection'
import WhatAgenticBIDoesSection from '@/components/WhatAgenticBIDoesSection'
import BuiltIntoMPPBISection from '@/components/BuiltIntoMPPBISection'
import DataToActionSection from '@/components/DataToActionSection'
import SimpleCTASection from '@/components/SimpleCTASection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Agentic BI for Enterprise Data Analytics | MPP BI',
  description:
    'Discover Agentic BI in MPP BI. Delegate data analysis, investigate changes, build dashboards, and get answers using your business data and definitions.',
}

export default function AgenticBIPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <AgenticBIHero />
        <AgenticBIStatsSection />
        <TraditionalVsAgenticSection />
        <AgenticStructureSection />
        <GovernanceSection />
        <WhatAgenticBIDoesSection />
        <BuiltIntoMPPBISection />
        <DataToActionSection />
        <SimpleCTASection
          title="See Agentic BI in Action"
          body="Every business has its own data, definitions, and questions. Tell us what your team needs to investigate, build, or understand. We'll show you how Agentic BI can handle the work inside your MPP BI environment."
          ctaLabel="Book a Demo"
          accentColor="#7C7AED"
        />
      </main>
      <Footer />
    </div>
  )
}
