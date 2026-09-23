import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DemoButton from '@/components/DemoButton'
import PricingCalculator from '@/components/PricingCalculator'
import CTABand from '@/components/CTABand'
import { PageHeader, Section, SectionHeader } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Pricing | MPP BI',
  description:
    'Published MPP BI pricing: $10 per month for viewer seats, $18 per month for creator and admin seats, or one-time perpetual licenses.',
}

const capabilities: { group: string; rows: [string, boolean][] }[] = [
  {
    group: 'View and explore',
    rows: [
      ['View dashboards and reports', true],
      ['Filter, drill down and explore', true],
      ['Export to Excel, PDF and PowerPoint', true],
      ['Ask the AI assistant questions', true],
    ],
  },
  {
    group: 'Build and prepare',
    rows: [
      ['Build and edit dashboards and reports', false],
      ['Build dashboards with the AI assistant', false],
      ['Connect data sources', false],
      ['Prepare data with MPP ETL', false],
      ['Set up forecasting', false],
    ],
  },
  {
    group: 'Administer',
    rows: [['Manage users, groups and access', false]],
  },
]

export default function PricingPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHeader
          title="Pricing"
          lede="Two seat types, priced by what people do. Most people only view and explore dashboards; a few build them. Pay monthly, or buy seats once."
        >
          <DemoButton />
        </PageHeader>

        <Section>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-line p-6 sm:p-8">
              <h2 className="text-xl font-semibold">Monthly subscription</h2>
              <p className="mt-2 text-slate">Add or remove seats as your team changes.</p>
              <dl className="mt-6 grid grid-cols-2 gap-6">
                <div>
                  <dt className="text-sm text-slate">Viewer</dt>
                  <dd className="text-3xl font-semibold tracking-tight text-ink">$10<span className="text-base font-normal text-slate"> / month</span></dd>
                </div>
                <div>
                  <dt className="text-sm text-slate">Creator or admin</dt>
                  <dd className="text-3xl font-semibold tracking-tight text-ink">$18<span className="text-base font-normal text-slate"> / month</span></dd>
                </div>
              </dl>
            </div>
            <div className="rounded-lg border border-brand p-6 sm:p-8">
              <h2 className="text-xl font-semibold">Perpetual license</h2>
              <p className="mt-2 text-slate">Pay once and keep the seats. Pays for itself in about two years; suited to regulated and air-gapped sites.</p>
              <dl className="mt-6 grid grid-cols-2 gap-6">
                <div>
                  <dt className="text-sm text-slate">Viewer</dt>
                  <dd className="text-3xl font-semibold tracking-tight text-ink">$240<span className="text-base font-normal text-slate"> once</span></dd>
                </div>
                <div>
                  <dt className="text-sm text-slate">Creator or admin</dt>
                  <dd className="text-3xl font-semibold tracking-tight text-ink">$432<span className="text-base font-normal text-slate"> once</span></dd>
                </div>
              </dl>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate">
            Every license includes MPP ETL, on-premises or cloud deployment, and source-code access where the license allows.
            Standard support is 20% of the license.
          </p>
        </Section>

        <Section tone="paper" id="seats">
          <SectionHeader title="What each seat can do" />
          <div className="overflow-hidden rounded-lg border border-line bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-paper text-slate">
                <tr>
                  <th className="px-5 py-3 font-medium"></th>
                  <th className="w-24 px-3 py-3 text-center font-medium sm:w-40">Viewer</th>
                  <th className="w-24 px-3 py-3 text-center font-medium sm:w-40">Creator or admin</th>
                </tr>
              </thead>
              {capabilities.map((g) => (
                <tbody key={g.group} className="divide-y divide-line border-t border-line">
                  <tr>
                    <th colSpan={3} className="bg-paper/60 px-5 py-2 text-xs font-medium text-slate">{g.group}</th>
                  </tr>
                  {g.rows.map(([label, viewer]) => (
                    <tr key={label}>
                      <td className="px-5 py-3 text-ink">{label}</td>
                      <td className="px-3 py-3 text-center">{viewer ? 'Yes' : <span className="text-mist">—</span>}</td>
                      <td className="px-3 py-3 text-center">Yes</td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </Section>

        <Section id="calculator">
          <SectionHeader title="Estimate your cost" lede="Subscription prices for your team size. For larger teams, perpetual licenses or a custom deployment, we will quote exact numbers." />
          <PricingCalculator />
        </Section>

        <CTABand title="Get a quote for your setup" body="Tell us how many people will view and build dashboards, and where you want to run MPP BI." label="Talk to sales" />
      </main>
      <Footer />
    </>
  )
}
