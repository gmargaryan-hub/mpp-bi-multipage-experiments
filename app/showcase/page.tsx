import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DemoButton from '@/components/DemoButton'
import CTABand from '@/components/CTABand'
import { Container, PageHeader, Preview, RuleList, Screenshot, Section, TextLink, buttonClass } from '@/components/ui'
import { asset } from '@/lib/basePath'
import { cases, dataCases, heroes, mechanisms, speedups, type Case, type Hero, type Stat } from '@/lib/showcase'

export const metadata: Metadata = {
  title: 'What the engine builds | MPP BI',
  description:
    'Armenia in 3D hexagons, earthquakes on a 3D globe, the NASDAQ as a ring of treemaps, 78 seasons of racing on an oval and CO₂ over a live aurora: what an AI agent built inside MPP BI, every case and how it was solved, with the measured numbers.',
}

const credits = [
  { what: 'Shaking Earth and the raw feed', source: 'USGS Earthquake Hazards Program.' },
  { what: 'Climate pulse and Who emits', source: 'Our World in Data, CC BY 4.0.' },
  { what: 'Market track and Sector stats', source: 'NASDAQ stock screener snapshot, Sep 24, 2026.' },
  { what: 'The oval and Legends', source: 'nascaR.data, with race results from DriverAverages.com.' },
  { what: 'Europe in charts', source: 'World Bank World Development Indicators, CC BY 4.0.' },
  {
    what: 'Armenia',
    source:
      'Kontur Population 2023 (CC BY 4.0), © OpenStreetMap contributors (ODbL) via Geofabrik, geoBoundaries (CC BY 4.0), World Bank World Development Indicators (CC BY 4.0).',
  },
]

const contents = [
  { href: '#use-cases', label: 'Five use cases' },
  { href: '#cases', label: 'Every case, and how it was solved' },
  { href: '#data', label: 'Data of any complexity' },
  { href: '#fast', label: 'How it stays fast' },
  { href: '#values', label: 'Every number explains itself' },
]

function Stats({ items }: { items: Stat[] }) {
  return (
    <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-5 border-t border-line pt-6 sm:grid-cols-3">
      {items.map((n) => (
        <div key={n.label} className="flex flex-col-reverse justify-end">
          <dt className="mt-1 text-sm leading-snug text-slate">{n.label}</dt>
          <dd className="text-lg font-semibold tabular-nums text-ink md:text-xl">{n.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function HeroSection({ h, n, tone }: { h: Hero; n: number; tone: 'white' | 'paper' }) {
  return (
    <Section id={h.slug} tone={tone}>
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-12">
        <div>
          <p className="font-mono text-sm text-brand">
            {String(n).padStart(2, '0')} · {h.kicker}
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">{h.title}</h2>
          <p className="mt-4 text-xl leading-snug text-ink md:text-2xl">{h.hook}</p>
        </div>
        <div className="border-l-2 border-brand pl-5">
          <p className="text-sm font-medium text-slate">The question it answers</p>
          <p className="mt-2 text-lg leading-snug text-ink">“{h.question}”</p>
        </div>
      </div>

      <Screenshot className="mt-10" src={h.shot.src} alt={h.shot.alt} width={h.shot.width} height={h.shot.height} priority={n === 1} unoptimized />
      <Stats items={h.numbers} />

      {h.rounds && (
        <div className="mt-12">
          <h3 className="text-xl font-semibold">Before and after our design guidance</h3>
          <p className="mt-2 max-w-2xl leading-relaxed">{h.rounds.intro}</p>
          <div className="mt-8 space-y-10">
            {h.rounds.items.map((r) => (
              <div key={r.title}>
                <h4 className="font-semibold text-ink">{r.title}</h4>
                <div className="mt-3 grid grid-cols-2 gap-3 md:gap-6">
                  <Screenshot src={r.before.src} alt={r.before.alt} width={r.before.width} height={r.before.height} caption="First pass" unoptimized />
                  <Screenshot src={r.after.src} alt={r.after.alt} width={r.after.width} height={r.after.height} caption="After the guidance" unoptimized />
                </div>
                <p className="mt-3 max-w-3xl leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <details className="mt-8 border-t border-line pt-5">
        <summary className="cursor-pointer text-sm font-medium text-brand">The brief, and what the agent did</summary>
        <div className="mt-5 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <p className="leading-relaxed">
            <span className="font-medium text-ink">The ask: </span>
            {h.asked}
          </p>
          <RuleList items={h.did} />
        </div>
      </details>
    </Section>
  )
}

function CaseCard({ c }: { c: Case }) {
  return (
    <li id={`case-${c.slug}`} className="flex flex-col overflow-hidden rounded-lg border border-line bg-white">
      <div className="border-b border-line bg-paper">
        <Image
          src={asset(c.thumb.src)}
          alt=""
          width={c.thumb.width}
          height={c.thumb.height}
          className="block aspect-[16/9] w-full object-cover object-left-top"
          style={c.focus ? { objectPosition: c.focus } : undefined}
          unoptimized
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-slate">
          <span className="font-medium text-ink">{c.title}</span>
          {c.by ? ` · ${c.by}` : ''} · {c.data}
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-snug">{c.question}</h3>
        <p className="mt-2 text-sm leading-relaxed">{c.how}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="How it was solved">
          {c.uses.map((u) => (
            <li key={u} className="rounded bg-tint px-2 py-0.5 text-xs text-brand">
              {mechanisms[u].label}
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t border-line pt-3">
          <p className="text-xs font-medium uppercase tracking-wide text-slate">Result</p>
          <ul className="mt-1.5 space-y-1 text-sm leading-snug text-ink">
            {c.result.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
        {c.href && (
          <div className="mt-auto pt-4">
            <Link href={c.href.startsWith('#') ? `/showcase${c.href}` : c.href} className={buttonClass.link}>
              {c.href.startsWith('#') ? 'See it above' : 'See the preview'}
            </Link>
          </div>
        )}
      </div>
    </li>
  )
}

export default function ShowcasePage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHeader
          title="What the engine builds"
          lede="An AI agent built these projects inside an MPP BI installation, with MPP BI’s own agent tools. First, five with custom plots no chart menu has. Then every case we have run: the question it answers, how it was solved and what it measured. Then the data they ran on. The agent was Claude Opus, working through MPP BI’s MCP server, except where DeepSeek V4 Flash is named."
        >
          <DemoButton label="Try it on your data" />
          <TextLink href="#cases">Find a case like yours</TextLink>
        </PageHeader>

        <nav aria-label="On this page" className="border-b border-line bg-white py-5">
          <Container>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {contents.map((c) => (
                <li key={c.href}>
                  <a href={c.href} className="text-slate transition-colors hover:text-ink">
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </nav>

        <div id="use-cases">
          {heroes.map((h, i) => (
            <HeroSection key={h.slug} h={h} n={i + 1} tone={i % 2 ? 'paper' : 'white'} />
          ))}
        </div>

        <Section id="cases" tone={heroes.length % 2 ? 'paper' : 'white'}>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">Every case, and how it was solved</h2>
            <p className="mt-4 text-lg leading-relaxed">
              Every project the agent built, with our reference samples and a preview from the lab. Each card starts with the
              question it answers, so you can find the one that looks like yours, then says how it was solved and what we
              measured.
            </p>
          </div>
          <dl className="mt-8 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(mechanisms)
              .filter((m) => m.label !== 'In the lab')
              .map((m) => (
                <div key={m.label}>
                  <dt className="inline rounded bg-tint px-2 py-0.5 text-xs text-brand">{m.label}</dt>
                  <dd className="mt-1 leading-snug text-slate">{m.text}</dd>
                </div>
              ))}
          </dl>
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((c) => (
              <CaseCard key={c.slug} c={c} />
            ))}
          </ul>
        </Section>

        <Section id="data" tone={heroes.length % 2 ? 'white' : 'paper'}>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">Data of any complexity</h2>
            <p className="mt-4 text-lg leading-relaxed">
              None of this data arrived clean. Here is what each dataset brought, the problem it posed, and how it ended up
              living in the platform. Everything after the import was the agent’s work.
            </p>
          </div>
          <div className="mt-10 border-t border-line">
            <div className="hidden gap-8 border-b border-line py-3 text-sm font-medium text-slate lg:grid lg:grid-cols-[1fr_1fr_1.2fr]">
              <p>The data</p>
              <p>The problem it posed</p>
              <p>How the platform handled it</p>
            </div>
            {dataCases.map((d) => (
              <div key={d.data} className="grid gap-3 border-b border-line py-5 lg:grid-cols-[1fr_1fr_1.2fr] lg:gap-8">
                <div>
                  <p className="font-medium leading-snug text-ink">{d.data}</p>
                  <p className="mt-1 font-mono text-xs text-slate">{d.project}</p>
                </div>
                <p className="leading-relaxed">
                  <span className="font-medium text-slate lg:hidden">The problem: </span>
                  {d.problem}
                </p>
                <p className="leading-relaxed">
                  <span className="font-medium text-slate lg:hidden">How it was handled: </span>
                  {d.handled}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="fast" tone={heroes.length % 2 ? 'paper' : 'white'}>
          <div className="mb-10 max-w-2xl md:mb-12">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">How it stays fast</h2>
            <p className="mt-4 text-lg leading-relaxed">
              After building, the agent opens the page and gets measured feedback: requests, rows, main-thread time and
              memory. Then it fixes what the numbers show, mostly by moving aggregation into the database, where MPP BI runs
              every calculation anyway.
            </p>
            <p className="mt-4 leading-relaxed">
              The lessons went into the agent’s skills, so later projects start lean: Europe in charts loaded 93 KB in 15
              requests on its first build, and Armenia’s design round added no requests and no data.
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

        <Section id="values" tone={heroes.length % 2 ? 'white' : 'paper'}>
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <Preview />
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">Every number explains itself</h2>
              <p className="mt-4 text-lg leading-relaxed">
                The report kit traces the numbers it declares. In our lab, every number on a dashboard does: hover it in edit
                mode to see the cube aggregates it is made of and what moved it. It works on the pages above as they are, with
                no change to the code the agent wrote.
              </p>
              <div className="mt-6">
                <TextLink href="/values-graph">See the preview</TextLink>
              </div>
            </div>
            <Screenshot
              src="/values-graph/pulse-edit.webp"
              alt="Climate pulse in edit mode: hovering 38.6 opens a card showing it is sum of CO₂ for 2024 divided by 1,000"
              width={905}
              height={944}
              unoptimized
            />
          </div>
        </Section>

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
              USGS, Nasdaq, NASCAR and the World Bank are trademarks of their respective owners. These are independent
              demos on public data and are not endorsed by them. The report kit and the samples use a sample hotel dataset.
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
