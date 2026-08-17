import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import AboutUsHero from '@/components/AboutUsHero'
import CompanyTimelineSection from '@/components/CompanyTimelineSection'
import TeamSection from '@/components/TeamSection'
import MissionSection from '@/components/MissionSection'
import SimpleCTASection from '@/components/SimpleCTASection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About MPP Insights | The Team Behind MPP BI',
  description:
    "Meet the team behind MPP BI. See why MPP Insights builds enterprise data and BI systems the way we do, and what shaped our approach. Book a demo.",
}

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <AboutUsHero />
        <CompanyTimelineSection />
        <TeamSection />
        <MissionSection />
        <SimpleCTASection
          title="Ready to See It for Yourself?"
          body="We'd rather show you than tell you. Tell us what you're working with, and we'll walk you through how MPP BI fits."
          ctaLabel="Book a Demo"
          accentColor="#0AAEDB"
        />
      </main>
      <Footer />
    </div>
  )
}
