import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DemoButton from '@/components/DemoButton'
import CTABand from '@/components/CTABand'
import { PageHeader, Screenshot, Section, TextLink } from '@/components/ui'

// The governance side of agent-built analytics, each item with an honest status.
// Sources: the site's own features and architecture pages (permissions, row-level security,
// audit, MPP ETL scheduling, update patterns); the BI MCP server's README ("Log in: config and
// auth", "Identity, the page and the write boundary", render_dashboard); the chat's
// publish checks (web-res src/plugins/chat/customComponents/compileModule.ts) and audit rules
// (tools/audit/auditRules.ts); the import fixes (web-res f9f44b903f, 54b41b5587); the values
// graph on the lab stand. "Available" means it works today in MPP BI or in the agent tools on
// our showcase installation; "In the lab" runs only on our lab installation; "Planned" is not
// built.

export const metadata: Metadata = {
  title: 'Governance: model, trace, checks and permissions | MPP BI',
  description:
    'How agent-built analytics in MPP BI stay governed: the semantic model agents work in, the trace behind each number, checks on what they build, how data stays current, and the permissions they run under. Each item marked available, in the lab or planned.',
}

type Status = 'available' | 'lab' | 'planned'

const statusStyle: Record<Status, { label: string; className: string }> = {
  available: { label: 'Available', className: 'border-brand bg-brand text-white' },
  lab: { label: 'In the lab', className: 'border-brand/30 bg-tint text-brand' },
  planned: { label: 'Planned', className: 'border-dashed border-mist bg-white text-slate' },
}

function Badge({ s }: { s: Status }) {
  return (
    <span className={`inline-block whitespace-nowrap rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${statusStyle[s].className}`}>
      {statusStyle[s].label}
    </span>
  )
}

type Item = { status: Status; title: string; body: string }

const areas: { id: string; kicker: string; title: string; intro: string; items: Item[] }[] = [
  {
    id: 'model',
    kicker: '01 The data model',
    title: 'Agents build on the semantic model',
    intro:
      'In MPP BI a chart doesn’t read a table. It asks a cube: a named view over your database with its dimensions and measures, queried in LPE, the calculation language that compiles to SQL. The agent works in the same model, with the same parts a person uses.',
    items: [
      {
        status: 'available',
        title: 'Atlases, cubes, dimensions, measures',
        body: 'The agent lists cubes, previews queries against them, and creates or edits cubes and their fields. Every chart it makes asks a cube, never a raw table.',
      },
      {
        status: 'available',
        title: 'Cube SQL does the heavy lifting',
        body: 'Derived fields, window functions for ranks, shares and indexes, and small pre-aggregated cubes for heavy history live in the cube, so every chart on it gets them and the browser only draws.',
      },
      {
        status: 'available',
        title: 'Calculations run in your database',
        body: 'Measures are LPE expressions over the cube. They compile to SQL and run where the data lives, under the same permissions as any other query.',
      },
    ],
  },
  {
    id: 'trace',
    kicker: '02 Traceability',
    title: 'Every number can say where it came from',
    intro:
      'A number people can’t trace is a number they argue about. Two mechanisms make the trail visible: declared facts in reports, and a graph behind any number on a dashboard.',
    items: [
      {
        status: 'available',
        title: 'Report kit facts',
        body: 'In a report filled from the kit, every number is a declared fact: a measure or a ratio with its filters and format. Hover it to see how it is made; a Sources panel lists every query, and a click on a number jumps to its card.',
      },
      {
        status: 'lab',
        title: 'Every number explains itself',
        body: 'In edit mode, any number on a dashboard opens as a graph down to the cube aggregates it is made of, with what moved it between two periods. It works on agent-written components with no change to their code.',
      },
      {
        status: 'lab',
        title: 'explain_number for agents',
        body: 'Assistants read the same graph, so “why did ADR fall?” is answered from the split, not from a guess.',
      },
    ],
  },
  {
    id: 'quality',
    kicker: '03 Data quality',
    title: 'Checks on what the agent imports and builds',
    intro:
      'The agent doesn’t stop at “created”. It checks the data on the way in and the dashboard on the way out, and each finding names the fix.',
    items: [
      {
        status: 'available',
        title: 'Typed imports',
        body: 'Codes with leading zeros, such as car “07”, stay text; integers past the 32-bit range are stored as 64-bit numbers; long files are sampled at the end too, so a late large value still sets the type.',
      },
      {
        status: 'available',
        title: 'The render check',
        body: 'Opens what the agent built in a browser, as the user, and reports what a viewer would see: a blank dashboard, clipped or overlapping text, an empty chart, and the cost of the load: heavy data, too many requests, a blocked browser, canvas memory.',
      },
      {
        status: 'available',
        title: 'The dashboard audit',
        body: 'Reviews the saved charts without reading data: a missing cube, a measure without an aggregate, percentages on the wrong scale, mixed scales and formats, overlapping cards, raw field names. It returns the fixes ready to apply.',
      },
      {
        status: 'lab',
        title: 'Numbers that must add up',
        body: 'The render check’s values mode splits each chart’s numbers by a field and flags one whose parts don’t add up to its total.',
      },
    ],
  },
  {
    id: 'updates',
    kicker: '04 Data updates',
    title: 'Dashboards stay current without copies',
    intro:
      'MPP BI keeps no extract of your data to refresh. What an agent builds asks the same cubes as everything else, so it shows new data as soon as the tables behind the cubes change.',
    items: [
      {
        status: 'available',
        title: 'Live by default',
        body: 'Dashboards query your database when they open. Each can follow the update pattern that fits it: live, refreshed on a schedule or on a trigger, or fixed history.',
      },
      {
        status: 'available',
        title: 'Scheduled flows in MPP ETL',
        body: 'MPP ETL, included in every license, runs flows at fixed times or when an event arrives, and refreshes the tables the cubes read. Excel files can also be uploaded on a schedule.',
      },
      {
        status: 'available',
        title: 'Agent-built dashboards follow the data',
        body: 'They read cubes, not snapshots of them. A file the agent imports in the chat is the exception: it stays as it was imported until something refreshes it.',
      },
      {
        status: 'planned',
        title: 'From a one-off pipeline to a scheduled flow',
        body: 'Turning a pipeline the agent ran once in the chat, such as download, clean and import, into a scheduled MPP ETL flow.',
      },
    ],
  },
  {
    id: 'access',
    kicker: '05 Access control',
    title: 'The agent works as you, and only as you',
    intro:
      'There is no service account behind the agent. It uses your signed-in session, so the permissions you already set decide what it can read and change.',
    items: [
      {
        status: 'available',
        title: 'Your session, your permissions',
        body: 'In the product’s chat and through MPP BI’s MCP server, every tool call carries the user’s own session. The product’s role-based permissions decide what it may read or change.',
      },
      {
        status: 'available',
        title: 'Permissions before queries',
        body: 'Access rules down to rows and individual charts are applied before data is fetched, for people and agents alike.',
      },
      {
        status: 'available',
        title: 'Writes through the product',
        body: 'The agent changes things through the product’s own APIs, the ones the interface uses, so the product logs them like any other action. Deleting needs a confirmed second call.',
      },
      {
        status: 'available',
        title: 'A write boundary when you want one',
        body: 'An agent can be confined to named atlases and to the cubes it created; other writes and tools are refused.',
      },
      {
        status: 'available',
        title: 'Publish checks on agent code',
        body: 'A component the agent writes may import only the host’s modules, and is refused if it calls the network, eval, storage or cookies, other windows, raw HTML or the REST API directly. This is a review, not a sandbox: the component runs in the viewer’s page with the viewer’s session.',
      },
      {
        status: 'available',
        title: 'A check that only reads',
        body: 'While the render check steps through a page, its browser may only read: any request other than a GET or a data query is refused and reported.',
      },
    ],
  },
]

const chain = [
  { title: 'You, signed in', body: 'through your directory or single sign-on' },
  { title: 'The agent', body: 'in the chat or over MCP, with your session' },
  { title: 'MPP BI server', body: 'checks permissions first' },
  { title: 'Cubes', body: 'the semantic model' },
  { title: 'Your database', body: 'runs the SQL' },
]

export default function GovernancePage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHeader
          eyebrow={
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate">
              <Badge s="available" />
              <Badge s="lab" />
              <Badge s="planned" />
              <span className="ml-1">each item says where it stands</span>
            </div>
          }
          title="Built on your model, under your permissions"
          lede="What keeps agent-built analytics trustworthy: the semantic model agents work in, the trace behind each number, the checks on what they build, how the data stays current, and the permissions they run under."
        >
          <DemoButton label="Ask about governance" />
          <TextLink href="#access">Access control</TextLink>
        </PageHeader>

        <nav aria-label="On this page" className="border-b border-line bg-white py-5">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-2 px-4 text-sm sm:px-6">
            {areas.map((a) => (
              <a key={a.id} href={`#${a.id}`} className="text-slate transition-colors hover:text-ink">
                {a.title}
              </a>
            ))}
          </div>
        </nav>

        {areas.map((a, i) => (
          <Section key={a.id} id={a.id} tone={i % 2 ? 'paper' : 'white'}>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-12">
              <div>
                <p className="font-mono text-sm text-brand">{a.kicker}</p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">{a.title}</h2>
                <p className="mt-4 text-lg leading-relaxed">{a.intro}</p>
                {a.id === 'trace' && (
                  <div className="mt-6">
                    <TextLink href="/values-graph">The values graph preview</TextLink>
                  </div>
                )}
              </div>
              <ul className="divide-y divide-line border-y border-line">
                {a.items.map((it) => (
                  <li key={it.title} className="py-5">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <h3 className="text-lg font-semibold">{it.title}</h3>
                      <Badge s={it.status} />
                    </div>
                    <p className="mt-2 leading-relaxed">{it.body}</p>
                  </li>
                ))}
              </ul>
            </div>

            {a.id === 'trace' && (
              <Screenshot
                className="mt-12"
                src="/governance/report-hover.webp"
                alt="Hovering $147 in a kit report shows how it is made: revenue 2025 divided by nights 2025, each with its measure and date filter"
                width={1200}
                height={408}
                caption="A report kit number, hovered: $147 is revenue for 2025 ÷ nights for 2025, each with its own query and filters."
                unoptimized
              />
            )}

            {a.id === 'access' && (
              <>
              <p className="mt-12 text-sm font-medium text-slate">The path of every request an agent makes</p>
              <ol className="mt-3 grid gap-3 md:grid-cols-5" aria-label="The path of an agent’s request">
                {chain.map((c, j) => (
                  <li
                    key={c.title}
                    className={`relative rounded-lg border p-4 ${j === 2 ? 'border-brand bg-brand text-white' : 'border-line bg-white'}`}
                  >
                    <p className={`font-mono text-xs ${j === 2 ? 'text-mist' : 'text-slate'}`}>{String(j + 1).padStart(2, '0')}</p>
                    <p className={`mt-1 font-semibold ${j === 2 ? 'text-white' : 'text-ink'}`}>{c.title}</p>
                    <p className={`mt-1 text-sm leading-snug ${j === 2 ? 'text-white/85' : 'text-slate'}`}>{c.body}</p>
                  </li>
                ))}
              </ol>
              </>
            )}
          </Section>
        ))}

        <CTABand
          title="Bring your rules, see the agent follow them"
          body="Tell us how your data, roles and refresh schedules are set up. We will show you the agent working inside them."
          label="Book a session"
        />
      </main>
      <Footer />
    </>
  )
}
