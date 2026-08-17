import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import FeaturesHero from '@/components/FeaturesHero'
import DataSourcesSection from '@/components/DataSourcesSection'
import VisualizationSection from '@/components/VisualizationSection'
import AIMLFeaturesSection from '@/components/AIMLFeaturesSection'
import MPPETLSection from '@/components/MPPETLSection'
import SecuritySection from '@/components/SecuritySection'
import CustomizationSection from '@/components/CustomizationSection'
import DeploymentOptionsSection from '@/components/DeploymentOptionsSection'
import SimpleCTASection from '@/components/SimpleCTASection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'MPP BI: Connect, Visualize & Analyze All Your Data | Features',
  description:
    'See what MPP BI can do. Connect to any data source, build live dashboards, and analyze data securely on your own infrastructure. Book a demo today.',
}

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <FeaturesHero />
        <DataSourcesSection />
        <VisualizationSection />
        <AIMLFeaturesSection />
        <MPPETLSection />
        <SecuritySection />
        <CustomizationSection />
        <DeploymentOptionsSection />
        <SimpleCTASection
          title="Not Sure Where to Start? Let's Talk It Through."
          body="You've seen what MPP BI can do. The next step is seeing how it fits your data, your team, and the way you work. Tell us what you're trying to solve, and one of our experts will walk you through it."
          ctaLabel="Talk to an Expert"
          accentColor="#0AAEDB"
        />
      </main>
      <Footer />
    </div>
  )
}
