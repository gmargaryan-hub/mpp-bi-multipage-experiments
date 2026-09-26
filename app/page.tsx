import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DemoButton from '@/components/DemoButton'
import ArchitectureDiagram from '@/components/ArchitectureDiagram'
import CaseStudy from '@/components/CaseStudy'
import GoalShowcase from '@/components/GoalShowcase'
import { goals } from '@/lib/goals'
import { cases } from '@/lib/showcase'
import { Container, Section, TextLink, buttonClass } from '@/components/ui'
import { asset } from '@/lib/basePath'

const clients = [
  { src: '/logos/onepager-undp.png', alt: 'UNDP', width: 320, height: 157 },
  { src: '/logos/henrico-eda.webp', alt: 'Henrico Economic Development Authority', width: 250, height: 200 },
  { src: '/logos/wm-logo.png', alt: 'Washington & Madison', width: 325, height: 200 },
  { src: '/logos/nork.png', alt: 'Nork Technology Center', width: 192, height: 85 },
  { src: '/logos/avromic.jpeg', alt: 'Avromic', width: 367, height: 99 },
  { src: '/logos/stantonlaw.png', alt: 'Stanton Law', width: 222, height: 200 },
  { src: '/logos/marmar.webp', alt: 'Mar Mar Richmond', width: 470, height: 200 },
]

const engine = [
  { title: 'No copy of your data', body: 'Queries go to your database. There is no extract to refresh and no second store to secure.' },
  { title: 'No engine to size', body: 'There is no in-memory tier limited by RAM. The MPP BI server runs inside PostgreSQL and only writes queries.' },
  { title: 'Every function works live', body: 'The calculation language compiles to SQL, so nothing is switched off when you stay live.' },
]

const safety = [
  { art: '/brand/data-source.svg', title: 'The agent works as you', body: 'Its tools run in your own signed-in session. It sees only what you can see and changes only what it created or you gave it.' },
  { art: '/brand/editor-button.svg', title: 'You approve what lands', body: 'Every step shows in the chat. Charts arrive as previews with a diff; you add them or reject them. Deleting needs a confirmed second call.' },
  { art: '/brand/atlas-thumbnail.svg', title: 'It stays on your servers', body: 'The agent, its sandbox and its memory run inside your installation, with the model you choose. It works air-gapped.' },
  { art: '/brand/data-koob.svg', title: 'Permissions before queries', body: 'Access rules down to rows and charts are applied before data is fetched, for people and for the agent alike. Every action is logged.' },
]

const features = [
  { title: 'AI assistant', body: 'Ask questions, build and edit dashboards, attach spreadsheets, run subagents for longer research.', href: '/features#ai-ml' },
  { title: '30+ chart types', body: 'KPIs, maps, floor plans, live schematics, drill-down, export to Excel, PDF and PowerPoint.', href: '/features#visualization' },
  { title: 'MPP ETL included', body: 'Visual pipelines for Kafka, SAP, ClickHouse, PostgreSQL and any JDBC source, in every license.', href: '/features#mpp-etl' },
  { title: 'Forecasts and models', body: 'Forecasts drawn next to actuals; models trained and served from the chat through MPP ETL.', href: '/features#ai-ml' },
  { title: 'Your brand, your code', body: 'White label, custom views in React, source code with the right license.', href: '/features#customization' },
  { title: 'Runs anywhere', body: 'On-premises, AWS, Azure, Google Cloud, Docker or a VM image; one node or a cluster.', href: '/features#deployment-options' },
]

/** Chapter 02: cases beyond the goals at the top of the page. */
const more = ['europe', 'who-emits', 'quake-stats', 'legends', 'report'].map((slug) => cases.find((c) => c.slug === slug)!)

function Chapter({ n, title, lede }: { n: string; title: string; lede: string }) {
  return (
    <div className="mb-10 grid gap-4 md:mb-12 md:grid-cols-[6rem_1fr]">
      <p className="font-mono text-sm text-brand">{n}</p>
      <div className="max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">{title}</h2>
        <p className="mt-4 text-lg leading-relaxed">{lede}</p>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <section className="bg-paper pt-28 pb-16 md:pt-36 md:pb-24">
          <Container>
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
              <div className="max-w-3xl">
                <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-semibold tracking-tight leading-[1.05]">
                  Say what you want to achieve. MPP BI does the work.
                </h1>
                <p className="mt-6 text-lg md:text-xl leading-relaxed">
                  Ask for a view no chart menu has, a report rebuilt in your own BI, a dashboard for store managers. MPP BI
                  plans the steps and carries them out inside your own BI, on your databases, files and streams, with your
                  permissions and on your servers. These are real goals and what it did with them.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <DemoButton label="Try it on your data" />
                  <Link href="#engine" className={buttonClass.secondary}>
                    What you gain
                  </Link>
                </div>
              </div>
              <Image src={asset('/brand/mascot-laptop.svg')} alt="" width={200} height={200} className="hidden h-44 w-44 lg:block" priority unoptimized />
            </div>
            <div className="mt-12 md:mt-16">
              <GoalShowcase goals={goals} />
            </div>
          </Container>
        </section>

        <section className="border-b border-line py-10" aria-label="Clients and partners">
          <Container>
            <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
              {clients.map((c) => (
                <li key={c.alt}>
                  <Image src={asset(c.src)} alt={c.alt} width={c.width} height={c.height} className="h-12 w-auto object-contain grayscale" unoptimized />
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <Section id="engine">
          <Chapter
            n="01 Engine"
            title="Analytics that run inside your database"
            lede="Most BI tools copy your data into an engine of their own. MPP BI sends every calculation to the database the data already lives in, so dashboards stay live and fast on billions of rows, 2 to 12 times faster than traditional BI."
          />
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            {engine.map((d) => (
              <div key={d.title} className="border-t-2 border-brand pt-5">
                <h3 className="text-lg font-semibold">{d.title}</h3>
                <p className="mt-2 leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
          <ArchitectureDiagram />
          <div className="mt-8">
            <TextLink href="/architecture">How the architecture works</TextLink>
          </div>
        </Section>

        <Section id="analyze" className="border-t border-line">
          <Chapter
            n="02 Analyze with ease"
            title="The engine that runs your analytics now builds them"
            lede="Say what you want to see. The agent imports the data, models it, draws visuals no chart menu has, and moves the heavy math into the database so pages stay fast. Beyond the goals above, here is more of what it built in MPP BI: pages on public data, and a report kit whose every number is a declared query."
          />
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 lg:grid-cols-3">
            {more.map((c) => (
              <li key={c.slug}>
                <Link href={`/showcase#case-${c.slug}`} className="group block">
                  <div className="overflow-hidden rounded-lg border border-line bg-paper transition-colors group-hover:border-mist">
                    <Image
                      src={asset(c.thumb.src)}
                      alt=""
                      width={c.thumb.width}
                      height={c.thumb.height}
                      className="block aspect-[16/10] w-full object-cover object-left-top"
                      style={c.focus ? { objectPosition: c.focus } : undefined}
                      unoptimized
                    />
                  </div>
                  <h3 className="mt-3 font-semibold group-hover:text-brand">{c.title}</h3>
                  <p className="mt-1 text-sm leading-snug text-slate">{c.question}</p>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/showcase#cases" className="group flex h-full flex-col">
                <div className="flex aspect-[16/10] w-full flex-col justify-end rounded-lg border border-line bg-paper p-4 transition-colors group-hover:border-mist md:p-5">
                  <p className="font-mono text-xs text-brand">{cases.length} cases</p>
                  <p className="mt-1 text-xs leading-snug text-ink sm:text-sm md:text-base">
                    Kits, spec charts, custom visuals and pages, window functions
                  </p>
                </div>
                <h3 className="mt-3 font-semibold group-hover:text-brand">Every case, and how it was solved</h3>
                <p className="mt-1 text-sm leading-snug text-slate">Find the one that looks like your problem.</p>
              </Link>
            </li>
          </ul>
          <div className="mt-10">
            <TextLink href="/showcase">See what it built</TextLink>
          </div>
        </Section>

        <Section tone="paper" id="safety">
          <Chapter
            n="03 Safety"
            title="An agent you can hand work to"
            lede="Delegating only works if you can trust what the agent touched. In MPP BI that is how the product is built, not a setting to remember."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {safety.map((d) => (
              <div key={d.title} className="grid grid-cols-[6.5rem_1fr] items-start gap-5 rounded-lg border border-line bg-white p-5">
                <Image src={asset(d.art)} alt="" width={200} height={124} className="w-[6.5rem]" unoptimized />
                <div>
                  <h3 className="text-lg font-semibold">{d.title}</h3>
                  <p className="mt-2 leading-relaxed">{d.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="features">
          <Chapter
            n="04 Platform"
            title="Everything else a BI team needs"
            lede="Data preparation, charts, AI and administration in one product, included in every license."
          />
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {features.map((c) => (
              <div key={c.title} className="border-t border-line pt-5">
                <h3 className="text-lg font-semibold">
                  <Link href={c.href} className="hover:text-brand">{c.title}</Link>
                </h3>
                <p className="mt-2 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-4 rounded-lg border border-line bg-paper p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-ink">
              <span className="font-medium">Coming from Power BI?</span>{' '}
              <span className="text-body">The agent moves your reports for you, and several agents can move a library in parallel.</span>
            </p>
            <TextLink href="/power-bi-migration">How migration works</TextLink>
          </div>
        </Section>

        <Section tone="paper">
          <CaseStudy />
        </Section>

        <section className="bg-brand py-16 md:py-20" id="booking">
          <Container className="grid items-center gap-8 md:grid-cols-[auto_1fr_auto]">
            <Image src={asset('/brand/mascot-like.svg')} alt="" width={200} height={200} className="hidden h-28 w-28 md:block" unoptimized />
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">See it on your own data</h2>
              <p className="mt-4 text-lg leading-relaxed text-white/85">
                Bring a workbook or a report. We will hand it to the agent together and look at what comes back. Seats start at
                $10 a month, with the agent and MPP ETL included.
              </p>
            </div>
            <DemoButton label="Book a session" variant="inverted" className="justify-self-start md:justify-self-end" />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
