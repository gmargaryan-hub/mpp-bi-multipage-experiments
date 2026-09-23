import type { Metadata } from 'next'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CTABand from '@/components/CTABand'
import { PageHeader, Section, SectionHeader } from '@/components/ui'
import { asset } from '@/lib/basePath'

export const metadata: Metadata = {
  title: 'About MPP Insights | The Team Behind MPP BI',
  description:
    'MPP Insights builds MPP BI and MPP ETL, from an R&D center in Yerevan and a head office in Richmond, Virginia.',
}

const team = [
  {
    photo: '/team/sergei-shestakov.webp',
    name: 'Sergei Shestakov',
    role: 'Founder and CEO',
    bio: 'Sergei spent more than 20 years designing enterprise data architecture and analytics systems after a PhD in artificial intelligence in 2001. He leads the product and technical direction of MPP BI and MPP ETL.',
  },
  {
    photo: '/team/peter-bilzerian.webp',
    name: 'Peter Bilzerian',
    role: 'U.S. Managing Director',
    bio: 'Peter led data engineering and BI work at Bank of America, where it contributed an estimated $20 million in savings. He runs U.S. strategy, client relationships and delivery between the U.S. and Armenia teams.',
  },
]

const history = [
  { year: '2001', body: 'Sergei Shestakov completes a PhD in artificial intelligence and turns to data architecture, the work that shapes MPP BI.' },
  { year: '2022', body: 'Two decades of enterprise data projects become MPP Insights and the architecture of MPP BI and MPP ETL.' },
  { year: '2025', body: 'MPP Insights opens in the U.S., headquartered in Richmond, Virginia. Engineering stays in Yerevan.' },
]

export default function AboutUsPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHeader
          title="About MPP Insights"
          lede="We build MPP BI, a business intelligence platform that runs analytics inside your database instead of copying data into a separate engine, and MPP ETL, the data-preparation tool that ships with it. Our clients run it on their own infrastructure, often in government and regulated industries."
        />

        <Section>
          <SectionHeader title="Team" />
          <div className="grid gap-10 md:grid-cols-2">
            {team.map((m) => (
              <div key={m.name} className="flex gap-5">
                <Image src={asset(m.photo)} alt={m.name} width={240} height={240} className="h-20 w-20 shrink-0 rounded-full object-cover" />
                <div>
                  <h3 className="text-lg font-semibold">{m.name}</h3>
                  <p className="text-sm text-slate">{m.role}</p>
                  <p className="mt-3 leading-relaxed">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section tone="paper">
          <SectionHeader title="History" />
          <ol className="max-w-3xl divide-y divide-line border-y border-line">
            {history.map((h) => (
              <li key={h.year} className="grid gap-2 py-5 sm:grid-cols-[6rem_1fr] sm:gap-6">
                <span className="font-mono text-sm text-brand">{h.year}</span>
                <p className="leading-relaxed">{h.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Beyond dashboards</h2>
              <p className="mt-4 leading-relaxed">
                MPP BI can be the base for your own data products, and we can build the pipelines behind it, so data arrives
                reliably from where it is created to where it is needed. We also build agent workflows: AI agents with one job
                each, connected to your data, systems and documents.
              </p>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Offices</h2>
              <p className="mt-4 leading-relaxed">
                Headquarters in Richmond, Virginia. Research and development in Yerevan, Armenia. We deliver worldwide and are a
                UN supplier.
              </p>
              <p className="mt-4">
                <a href="mailto:welcome@mpp-insights.com" className="text-brand underline underline-offset-4 decoration-mist hover:decoration-brand">
                  welcome@mpp-insights.com
                </a>
              </p>
            </div>
          </div>
        </Section>

        <CTABand />
      </main>
      <Footer />
    </>
  )
}
