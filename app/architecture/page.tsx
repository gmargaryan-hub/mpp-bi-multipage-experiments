import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ArchitectureDiagram from '@/components/ArchitectureDiagram'
import CTABand from '@/components/CTABand'
import { PageHeader, Section, SectionHeader } from '@/components/ui'

export const metadata: Metadata = {
  title: "How MPP BI's Architecture Works",
  description:
    'MPP BI has no calculation engine and keeps no copy of your data. Its server runs inside PostgreSQL and pushes every query down to your database.',
}

const legacyCosts = [
  {
    title: 'The copy goes stale',
    body: 'To use its engine, a traditional BI tool copies your data in first. The copy falls behind every time the source changes, and you pay to store and secure the data twice.',
  },
  {
    title: 'Live mode is a reduced mode',
    body: 'Power BI’s DirectQuery and Tableau’s Live Connection skip the copy, but the engines were not built for it. Microsoft documents DAX functions and patterns that DirectQuery does not support.',
  },
  {
    title: 'More tiers, more to run',
    body: 'Browser, application server, metadata store, engine, storage, database. Each hop adds latency and one more system to size, license, patch and secure.',
  },
]

const design = [
  {
    title: 'The server lives next to the data',
    body: 'The MPP BI application server, business logic, permissions and dashboard settings run as one service inside PostgreSQL. When a dashboard opens, that service turns the request into SQL for your database.',
  },
  {
    title: 'Permissions first, then the query',
    body: 'MPP BI works out what a user may see before it writes the query, so rows they cannot see are never fetched. Other tools often fetch first and filter afterwards.',
  },
  {
    title: 'Your database does the computing',
    body: 'Aggregations, windows and time calculations run where the data is, on the database’s own hardware. Performance scales with the database, not with a BI server’s RAM.',
  },
]

const language = [
  ['Designed for imported data; live mode added later', 'Designed for live queries from the first version'],
  ['Some functions are unsupported or behave differently live', 'Every function works the same way, always live'],
  ['Time intelligence is limited in live mode', 'Full time-based calculations on live data'],
  ['Teams often keep an import and a live version of a report', 'One version of each report'],
]

export default function ArchitecturePage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHeader
          title="How MPP BI is built"
          lede="Traditional BI puts a calculation engine and a copy of your data between the dashboard and the database. MPP BI has two tiers: the browser, and a server inside PostgreSQL that hands every calculation to your database."
        />

        <Section>
          <ArchitectureDiagram />
        </Section>

        <Section tone="paper">
          <SectionHeader
            title="Why other tools need an engine"
            lede="In-memory engines such as Tableau’s Hyper and Power BI’s VertiPaq were built when databases were too slow for interactive analysis. Databases have caught up; the engine and its costs remain."
          />
          <div className="grid gap-8 md:grid-cols-3">
            {legacyCosts.map((c) => (
              <div key={c.title} className="border-t border-mist pt-5">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <SectionHeader title="What MPP BI does instead" />
          <div className="grid gap-8 md:grid-cols-3">
            {design.map((c) => (
              <div key={c.title} className="border-t border-navy pt-5">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section tone="paper" id="calc-language">
          <SectionHeader
            title="A calculation language built for live data"
            lede="The formula language decides what an engine-free BI can do. MPP BI’s language compiles to SQL for your database, so nothing in it depends on an import. The same language runs in the browser and inside the database, and developers can call it from JavaScript."
          />
          <div className="overflow-hidden rounded-lg border border-line bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-paper text-slate">
                <tr>
                  <th className="w-1/2 px-5 py-3 font-medium">DAX in Power BI DirectQuery</th>
                  <th className="w-1/2 px-5 py-3 font-medium text-ink">MPP BI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {language.map(([dax, mpp]) => (
                  <tr key={dax} className="align-top">
                    <td className="px-5 py-4">{dax}</td>
                    <td className="px-5 py-4 text-ink">{mpp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <CTABand
          title="Talk to an engineer"
          body="Questions about pushdown on your database, how permissions are enforced, or what deployment looks like in your environment? Book a call with our technical team."
          label="Book a technical call"
        />
      </main>
      <Footer />
    </>
  )
}
