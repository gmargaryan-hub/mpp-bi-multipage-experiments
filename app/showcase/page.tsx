import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DemoButton from '@/components/DemoButton'
import CTABand from '@/components/CTABand'
import { Container, PageHeader, Preview, RuleList, Screenshot, Section, TextLink, buttonClass } from '@/components/ui'
import { asset } from '@/lib/basePath'
import { cases, dataCases, heroes, mechanisms, type Case, type Hero, type Mechanism } from '@/lib/showcase'

export const metadata: Metadata = {
  title: 'What the engine builds | MPP BI',
  description:
    'Armenia in 3D hexagons, earthquakes on a 3D globe, the NASDAQ as a ring of treemaps, 78 seasons of racing on an oval and CO₂ over a live aurora: what AI agents built inside MPP BI, how, and what keeps their work grounded.',
}

const credits = [
  { what: 'Armenia', source: 'Kontur Population 2023 (CC BY 4.0), © OpenStreetMap contributors (ODbL) via Geofabrik, geoBoundaries (CC BY 4.0), World Bank World Development Indicators (CC BY 4.0).' },
  { what: 'Shaking Earth and the raw feed', source: 'USGS Earthquake Hazards Program.' },
  { what: 'The oval and Legends', source: 'nascaR.data, with race results from DriverAverages.com.' },
  { what: 'Climate pulse and Who emits', source: 'Our World in Data, CC BY 4.0.' },
  { what: 'Europe in charts', source: 'World Bank World Development Indicators, CC BY 4.0.' },
  { what: 'Market track and Sector stats', source: 'NASDAQ stock screener snapshot, Sep 24, 2026.' },
]

const contents = [
  { href: '#use-cases', label: 'Five use cases' },
  { href: '#cases', label: 'Every case' },
  { href: '#data', label: 'Data of any complexity' },
  { href: '#grounded', label: 'What keeps it grounded' },
  { href: '#lab', label: 'From the lab' },
]

type Status = 'available' | 'lab'

const grounding: { title: string; body: string; status: Status[]; href: string; link: string }[] = [
  {
    title: 'One semantic model',
    body: 'Every visual above asks a cube, never a raw table. Measures are LPE expressions that run in your database, and heavy logic lives in the cube, where every chart can use it.',
    status: ['available'],
    href: '/governance#model',
    link: 'The data model',
  },
  {
    title: 'Checks that look at what’s rendered',
    body: 'The agent opens what it built in a browser, as you, and reads what a viewer sees and what the page costs to load. Then it fixes what it finds: labels that collide, a heatmap scrambled by a partial day, heavy work that belongs in the database.',
    status: ['available'],
    href: '/governance#quality',
    link: 'Checks on what it builds',
  },
  {
    title: 'Every number traceable',
    body: 'In a report kit page every number is a declared query you can hover to trace. In our lab, any number on any dashboard opens down to the cube aggregates it is made of.',
    status: ['available', 'lab'],
    href: '/values-graph',
    link: 'Every number explains itself',
  },
  {
    title: 'The agent acts as you',
    body: 'It works in your signed-in session, with your permissions and no service account, so it sees and changes only what you may. Its code passes publish checks before it reaches a dashboard.',
    status: ['available'],
    href: '/governance#access',
    link: 'Access control',
  },
]

const lab = [
  {
    title: 'Every number explains itself',
    body: 'Hover any number in edit mode, including on the pages above, and see the cube aggregates it is made of and what moved it between two periods.',
    href: '/values-graph',
  },
  {
    title: 'Answers from the data',
    body: 'Assistants read the same graph, so “why did the rate per night fall?” is answered from the split, not from a guess.',
    href: '/values-graph#agents',
  },
  {
    title: 'Numbers that must add up',
    body: 'The render check splits a chart’s numbers by a field and flags one whose parts don’t add up to its total.',
    href: '/governance#quality',
  },
]

function Tags({ uses, className = '' }: { uses: Mechanism[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="How it was built">
      {uses.map((u) => (
        <li key={u} className="rounded bg-tint px-2 py-0.5 text-xs text-brand">
          {mechanisms[u].label}
        </li>
      ))}
    </ul>
  )
}

function StatusBadge({ s }: { s: Status }) {
  return s === 'lab' ? (
    <span className="whitespace-nowrap rounded-full border border-brand/30 bg-tint px-2.5 py-0.5 font-mono text-[11px] text-brand">In the lab</span>
  ) : (
    <span className="whitespace-nowrap rounded-full border border-brand bg-brand px-2.5 py-0.5 font-mono text-[11px] text-white">Available</span>
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

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        <div>
          <h3 className="text-sm font-medium text-slate">What the agent did</h3>
          <RuleList className="mt-3" items={h.did} />
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-slate">The ask</h3>
            <p className="mt-2 rounded-lg rounded-tl-sm bg-tint px-4 py-3 leading-relaxed text-ink">{h.asked}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate">Built with</h3>
            <Tags className="mt-2" uses={h.uses} />
          </div>
        </div>
      </div>
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
        <Tags className="mt-3" uses={c.uses} />
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
          lede="AI agents built these inside an MPP BI installation with MPP BI’s own agent tools: they took on the data, modeled it, wrote the visuals and pages, then looked at the result and fixed what they found. A country in hexagons, a 3D globe, a market as a ring of treemaps, a racing oval that is a treemap and a live aurora page, all on one semantic model. The agent was Claude Opus, working through MPP BI’s MCP server, except where DeepSeek V4 Flash is named."
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
              Every project the agents built, with our reference samples. Each card starts with the question it answers, so
              you can find the one that looks like yours, then says how it was solved.
            </p>
          </div>
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

        <Section id="grounded" tone={heroes.length % 2 ? 'paper' : 'white'}>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">What keeps the agent’s work grounded</h2>
            <p className="mt-4 text-lg leading-relaxed">
              Freedom to build anything only helps if you can trust what was built. The same things hold under every project
              on this page.
            </p>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {grounding.map((g) => (
              <li key={g.title} className="flex flex-col rounded-lg border border-line bg-white p-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <h3 className="text-lg font-semibold">{g.title}</h3>
                  {g.status.map((st) => (
                    <StatusBadge key={st} s={st} />
                  ))}
                </div>
                <p className="mt-2 leading-relaxed">{g.body}</p>
                <div className="mt-auto pt-4">
                  <TextLink href={g.href}>{g.link}</TextLink>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="lab" tone={heroes.length % 2 ? 'white' : 'paper'}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-12">
            <div>
              <Preview />
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">From the lab</h2>
              <p className="mt-4 text-lg leading-relaxed">
                What we are building next on top of these pages. It runs on our lab installation, not in the released product.
              </p>
            </div>
            <ul className="divide-y divide-line border-y border-line">
              {lab.map((l) => (
                <li key={l.title} className="py-5">
                  <h3 className="text-lg font-semibold">
                    <Link href={l.href} className="hover:text-brand">
                      {l.title}
                    </Link>
                  </h3>
                  <p className="mt-1.5 leading-relaxed">{l.body}</p>
                </li>
              ))}
            </ul>
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
              USGS, Nasdaq, NASCAR and the World Bank are trademarks of their respective owners. These are independent demos
              on public data and are not endorsed by them. The report kit and the samples use a sample hotel dataset.
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
