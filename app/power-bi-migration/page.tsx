import type { Metadata } from 'next'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DemoButton from '@/components/DemoButton'
import CTABand from '@/components/CTABand'
import Execution from '@/components/Execution'
import RunGrid from '@/components/proof/RunGrid'
import { PageHeader, RuleList, Section, SectionHeader } from '@/components/ui'
import { asset } from '@/lib/basePath'
import { notYetMigrated, retailRun } from '@/lib/proof'

export const metadata: Metadata = {
  title: 'Move from Power BI to MPP BI | MPP BI',
  description:
    'Attach a Power BI project or .pbix and the MPP BI agent rebuilds its model, pages and visuals, then reports what it mapped. Several agents can move a whole library in parallel.',
}

const steps = [
  { title: 'Attach the report', body: 'A Power BI project folder, a saved .pbix or a .pbit template, with the Excel or CSV files it reads.' },
  { title: 'The agent rebuilds it', body: 'Data source, cubes with the model’s field names, one dashboard per page and one chart per visual, with the same measures.' },
  { title: 'You read the report', body: 'It lists what was mapped exactly, what was approximated with the closest chart, and what was skipped, so nothing is silently lost.' },
]

export default function PowerBiMigrationPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHeader
          title="Move your Power BI reports, all of them"
          lede="Leaving Power BI usually means rebuilding every report by hand. With MPP BI you attach the report and the agent rebuilds it. Run several agents side by side and a whole library moves in an afternoon, not a quarter."
        >
          <DemoButton label="Bring a report" />
        </PageHeader>

        <Section>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="border-t-2 border-brand pt-5">
                <p className="font-mono text-sm text-brand">{String(i + 1).padStart(2, '0')}</p>
                <h2 className="mt-2 text-lg font-semibold">{s.title}</h2>
                <p className="mt-2 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section tone="paper">
          <SectionHeader
            title="What happens when you hand over a report"
            lede="A three-page retail report in Power BI, handed to the agent. The steps and times are the agent’s own; the screens are the dashboards it built, captured after reload."
          />
          <Execution
            intent="Here is our Power BI project and the workbook it reads. Move it to MPP BI: same pages, same visuals, same numbers. Tell me what you mapped, approximated or skipped."
            steps={retailRun.steps}
            seconds={626}
            sources="a Power BI project (TMDL model, PBIR report) and retail-sales.xlsx"
            results={[]}
          />
        </Section>

        <Section id="runs">
          <SectionHeader
            title="Built to run at scale"
            lede="We test the agent the way a migration team works: a library of reports in different formats and languages, moved by several agents at once, each result reloaded and checked against the source data."
          />
          <RunGrid />
          <details className="mt-8 max-w-3xl rounded-md border border-line bg-white px-5 py-4">
            <summary className="flex cursor-pointer items-center gap-3 text-sm font-medium text-ink">
              <Image src={asset('/brand/mascot-sad.svg')} alt="" width={200} height={200} className="h-8 w-8" unoptimized />
              What the agent does not migrate yet
            </summary>
            <RuleList className="mt-4 text-sm" items={notYetMigrated} />
            <p className="mt-4 text-sm text-slate">Anything it cannot map, it lists in the migration report instead of guessing.</p>
          </details>
        </Section>

        <CTABand
          title="Bring one of your Power BI reports"
          body="We will run the agent on it with you, on your data, and go through the migration report together."
          label="Book a session"
        />
      </main>
      <Footer />
    </>
  )
}
