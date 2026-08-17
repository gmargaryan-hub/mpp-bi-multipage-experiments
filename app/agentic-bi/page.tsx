import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import AgenticBIHero from '@/components/AgenticBIHero'
import TraditionalVsAgenticSection from '@/components/TraditionalVsAgenticSection'
import WhatAgenticBIDoesSection from '@/components/WhatAgenticBIDoesSection'
import EnterpriseAndIntegrationSection from '@/components/EnterpriseAndIntegrationSection'
import SimpleCTASection from '@/components/SimpleCTASection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Agentic BI: AI-Powered Answers From Your Data | MPP BI',
  description:
    'Agentic BI is an AI feature built into MPP BI. Ask questions in plain language, catch changes automatically, and get answers grounded in your own data. Book a demo.',
}

export default function AgenticBIPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <AgenticBIHero />
        <TraditionalVsAgenticSection />
        <WhatAgenticBIDoesSection />
        <EnterpriseAndIntegrationSection />
        <SimpleCTASection
          title="See What Agentic BI Can Do With Your Data"
          body="Every business asks different questions, and Agentic BI is built to work with the data and setup you already have. Tell us what you're trying to solve, and we'll show you how it would work for your team."
          ctaLabel="Book a Demo"
          accentColor="#7C7AED"
        />
      </main>
      <Footer />
    </div>
  )
}
