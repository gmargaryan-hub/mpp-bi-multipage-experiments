import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DemoButton from '@/components/DemoButton'
import CTABand from '@/components/CTABand'
import { Container, PageHeader, RuleList, Screenshot, Section, TextLink } from '@/components/ui'
import { examples, speedups, type Example } from '@/lib/showcase'

export const metadata: Metadata = {
  title: 'What the engine builds | MPP BI',
  description:
    'Exoplanets, earthquakes, CO₂, a stock market, 78 seasons of racing and an annual report: what an AI agent built inside MPP BI, with the measured numbers.',
}

const credits = [
  { what: 'Galaxy of worlds', source: 'NASA Exoplanet Archive (Caltech/IPAC).' },
  { what: 'Shaking Earth and the raw feed', source: 'USGS Earthquake Hazards Program.' },
  { what: 'Climate pulse', source: 'Our World in Data, CC BY 4.0.' },
  { what: 'Market track', source: 'NASDAQ stock screener snapshot, Sep 24, 2026.' },
  { what: 'The oval', source: 'nascaR.data, with race results from DriverAverages.com.' },
]

function Numbers({ items }: { items: Example['numbers'] }) {
  return (
    <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 md:grid-cols-4">
      {items.map((n) => (
        <div key={n.label} className="flex flex-col-reverse justify-end">
          <dt className="mt-1 text-sm leading-snug text-slate">{n.label}</dt>
          <dd className="text-lg font-semibold tabular-nums text-ink md:text-xl">{n.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function ExampleSection({ e, tone }: { e: Example; tone: 'white' | 'paper' }) {
  return (
    <Section id={e.slug} tone={tone}>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="font-mono text-sm text-brand">{e.kicker}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">{e.heading ?? e.title}</h2>
          <p className="mt-4 text-lg leading-relaxed">
            <span className="font-medium text-ink">The ask: </span>
            {e.asked}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-slate">What the agent did</h3>
          <RuleList className="mt-3" items={e.did} />
        </div>
      </div>

      <Numbers items={e.numbers} />

      {e.pair ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {e.pair.map((s) => (
            <Screenshot key={s.src} src={s.src} alt={s.alt} width={s.width} height={s.height} caption={s.caption} unoptimized />
          ))}
        </div>
      ) : (
        <Screenshot className="mt-10" src={e.shot.src} alt={e.shot.alt} width={e.shot.width} height={e.shot.height} unoptimized />
      )}

      {e.more && (
        <div className="mt-8 grid items-center gap-6 md:grid-cols-2 md:gap-10">
          <Screenshot src={e.more.shot.src} alt={e.more.shot.alt} width={e.more.shot.width} height={e.more.shot.height} unoptimized />
          <p className="leading-relaxed">{e.more.text}</p>
        </div>
      )}
    </Section>
  )
}

export default function ShowcasePage() {
  const built = examples.filter((e) => e.slug !== 'report')
  const report = examples.find((e) => e.slug === 'report')!

  return (
    <>
      <Navigation />
      <main>
        <PageHeader
          title="What the engine builds"
          lede="An AI agent built each of these inside an MPP BI installation with MPP BI’s own agent tools. Six use public data: the agent imported it, modeled it and drew the visuals, and for the first five it then measured each page and moved the heavy work into the database. The report uses a sample hotel dataset. The agent was Claude Opus, working through MPP BI’s MCP server, except where DeepSeek V4 Flash is named."
        >
          <DemoButton label="Try it on your data" />
          <TextLink href="#fast">How it stays fast</TextLink>
        </PageHeader>

        {built.map((e, i) => (
          <ExampleSection key={e.slug} e={e} tone={i % 2 ? 'paper' : 'white'} />
        ))}

        <Section id="fast" tone={built.length % 2 ? 'paper' : 'white'}>
          <div className="mb-10 max-w-2xl md:mb-12">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">How it stays fast</h2>
            <p className="mt-4 text-lg leading-relaxed">
              After building, the agent opens the page and gets measured feedback: requests, rows, main-thread time and
              memory. Then it fixes what the numbers show, mostly by moving aggregation into the database, where MPP BI runs
              every calculation anyway.
            </p>
            <p className="mt-4 leading-relaxed">
              On the oval, it moved rankings and career totals into small pre-aggregated tables. The page went from loading
              55,732 rows to 2,251, and its slowest query from 3.2 s to 0.21 s.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[20rem] max-w-3xl text-left text-sm">
              <thead className="border-b border-line text-slate">
                <tr>
                  <th scope="col" className="py-2 pr-4 font-medium">Page</th>
                  <th scope="col" className="py-2 pr-4 font-medium">Measured</th>
                  <th scope="col" className="py-2 pr-4 text-right font-medium">Before</th>
                  <th scope="col" className="py-2 text-right font-medium">After</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {speedups.map((r) => (
                  <tr key={`${r.page}-${r.measure}`} className="border-b border-line">
                    <td className="py-2.5 pr-4 text-ink">{r.page}</td>
                    <td className="py-2.5 pr-4">{r.measure}</td>
                    <td className="whitespace-nowrap py-2.5 pr-4 text-right text-slate">{r.before}</td>
                    <td className="whitespace-nowrap py-2.5 text-right font-medium text-ink">{r.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <ExampleSection e={report} tone={built.length % 2 ? 'white' : 'paper'} />

        <section className="border-t border-line py-10" aria-label="Data and credits">
          <Container>
            <h2 className="text-sm font-medium text-ink">Data and credits</h2>
            <ul className="mt-3 space-y-1 text-sm text-slate">
              {credits.map((c) => (
                <li key={c.what}>
                  <span className="text-body">{c.what}:</span> {c.source}
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-3xl text-sm text-slate">
              NASA, USGS, Nasdaq and NASCAR are trademarks of their respective owners. These are independent demos on public
              data and are not endorsed by them.
            </p>
          </Container>
        </section>

        <CTABand
          title="See what it builds on your data"
          body="Bring a dataset or a question. We will hand it to the agent together and look at what comes back."
          label="Book a session"
        />
      </main>
      <Footer />
    </>
  )
}
