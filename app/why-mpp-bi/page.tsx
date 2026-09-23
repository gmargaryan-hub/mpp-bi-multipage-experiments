import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DemoButton from '@/components/DemoButton'
import ComparisonTable from '@/components/ComparisonTable'
import CTABand from '@/components/CTABand'
import { PageHeader, RuleList, Section, SectionHeader, TextLink } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Why MPP BI | Compared with Tableau and Power BI',
  description:
    'How MPP BI compares with Tableau and Power BI on price, performance, deployment and control of your data.',
}

const reasons = [
  {
    title: 'Faster, and more so as questions get harder',
    body: 'MPP BI answers 2 to 12 times faster than Tableau and Power BI in client deployments. The gap grows with query complexity, because the work runs on the database instead of in a BI engine.',
  },
  {
    title: 'Many users on modest hardware',
    body: 'One node covers standard use. Two nodes of 16 cores and 32 GB serve 500 people at once, and requests are spread so that one heavy report does not slow down everyone else.',
  },
  {
    title: 'Data can be live, but does not have to be',
    body: 'Each dashboard follows the update pattern that fits it: live, refreshed on a schedule or on a trigger, or fixed historical data.',
  },
  {
    title: 'You can own the licenses',
    body: 'Buy seats once instead of renting them. A perpetual license pays for itself in about two years compared with the subscription.',
  },
]

const powerBiOnPrem = [
  'On-premises Power BI needs Windows servers',
  'Power BI Report Server runs only inside the Microsoft stack',
  'Power BI Desktop is Windows-only',
  'Full use usually depends on other Microsoft services',
]

const faq = [
  {
    q: 'Can MPP BI run fully on-premises, with no cloud connection?',
    a: 'Yes. It runs entirely on your own servers and does not need an internet connection. This is the main reason government, healthcare and finance teams choose it.',
  },
  {
    q: 'We use Power BI today. How hard is it to switch?',
    a: 'You do not need to move your data or rebuild everything at once. MPP BI connects to the systems you already use; we start from your existing Power BI reports and plan the move around your timeline.',
  },
  {
    q: 'Do we need a separate tool to prepare data?',
    a: 'No. Data preparation is built in through MPP ETL, which is included in every license.',
  },
  {
    q: 'Does MPP BI support AI, such as asking questions in plain language?',
    a: 'Yes. The AI assistant answers questions and builds dashboards from your data. Because it runs on your infrastructure, you choose the model and avoid per-query cloud AI costs.',
  },
  {
    q: 'Is it secure enough for sensitive data?',
    a: 'MPP BI signs users in through your existing directory with MFA, encrypts traffic, applies permissions down to individual rows and charts, and logs every action.',
  },
]

export default function WhyMppBiPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHeader
          title="Why teams choose MPP BI"
          lede="Most BI tools make you trade off price, scale, where it runs and who controls the data. Here is how MPP BI compares with Tableau and Power BI."
        >
          <DemoButton />
        </PageHeader>

        <Section id="comparison">
          <SectionHeader title="MPP BI, Tableau and Power BI" />
          <ComparisonTable />
        </Section>

        <Section tone="paper" id="benefits">
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            {reasons.map((r) => (
              <div key={r.title} className="border-t border-brand pt-5">
                <h3 className="text-lg font-semibold">{r.title}</h3>
                <p className="mt-2 leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <TextLink href="/architecture">Why it is faster: the architecture</TextLink>
          </div>
        </Section>

        <Section id="deployment">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">On-premises without the Microsoft stack</h2>
              <p className="mt-4 text-lg leading-relaxed">
                MPP BI runs on your own Linux servers or in your cloud account. It is the same product either way; only the
                location changes. Choose on-premises when you need full control of where data lives, and cloud when you would
                rather not run servers.
              </p>
            </div>
            <div className="rounded-lg border border-line p-6">
              <p className="font-medium text-ink">For comparison, Power BI on-premises</p>
              <RuleList className="mt-4" items={powerBiOnPrem} />
            </div>
          </div>
        </Section>

        <Section tone="paper" id="support">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">Support from the people who build it</h2>
            <p className="mt-4 text-lg leading-relaxed">
              No ticket queue of generic answers. Most support cases are about installation, configuration and connecting MPP BI
              to the systems you already run, and the engineers who build the product help you through them.
            </p>
          </div>
        </Section>

        <Section id="faq">
          <SectionHeader title="Questions" />
          <div className="max-w-3xl divide-y divide-line border-y border-line">
            {faq.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-medium text-ink">
                  {f.q}
                  <span className="mt-0.5 font-mono text-slate group-open:rotate-45 transition-transform" aria-hidden>+</span>
                </summary>
                <p className="mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </Section>

        <CTABand />
      </main>
      <Footer />
    </>
  )
}
