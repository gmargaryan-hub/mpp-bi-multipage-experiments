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
  title: 'Governance: your data model, checks and permissions | MPP BI',
  description:
    'How agent-built analytics in MPP BI stay trustworthy: the data model agents work in, the trail behind each number, checks on what they build, how data stays current, and the permissions they work under. Each item marked available, in the lab or planned.',
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
    kicker: '01 Your data model',
    title: 'Agents build on your data model',
    intro:
      'In MPP BI a chart doesn’t read raw tables. It reads a model of your data: named measures and the fields you slice them by, calculated in your own database. The agent works in the same model, with the same parts your team uses.',
    items: [
      {
        status: 'available',
        title: 'Measures and fields, not raw tables',
        body: 'The agent explores the model, previews what a chart would show, and adds or changes measures and fields. Every chart it makes reads the model.',
      },
      {
        status: 'available',
        title: 'Heavy logic lives in the model',
        body: 'Derived fields, ranks, shares, running totals and summaries of long histories are worked out once in the model, so every chart gets them and pages stay light.',
      },
      {
        status: 'available',
        title: 'Calculations run in your database',
        body: 'Measures are calculated where the data lives, under the same permissions as any other query.',
      },
    ],
  },
  {
    id: 'trace',
    kicker: '02 Traceability',
    title: 'Every number can say where it came from',
    intro:
      'A number people can’t trace is a number they argue about. Two things make the trail visible: reports that show the source of every figure, and a trail behind any number on a dashboard.',
    items: [
      {
        status: 'available',
        title: 'Reports that show their sources',
        body: 'In a report filled from a ready-made page, every number is declared with its filters and format. Hover it to see how it is made; a sources list shows the data behind every figure, and a click on a number jumps to it.',
      },
      {
        status: 'lab',
        title: 'Every number explains itself',
        body: 'While you edit a dashboard, any number on it opens down to the figures it was built from, with what moved it between two periods. It works on pages agents built, with no change to them.',
      },
      {
        status: 'lab',
        title: 'Ask the assistant why',
        body: 'The assistant reads the same trail, so “why did the rate per night fall?” is answered from the split, not from a guess.',
      },
    ],
  },
  {
    id: 'quality',
    kicker: '03 Data quality',
    title: 'The agent checks its own work',
    intro:
      'The agent doesn’t stop at “done”. It checks the data on the way in and the dashboard on the way out, and fixes what it finds.',
    items: [
      {
        status: 'available',
        title: 'Data that keeps its meaning',
        body: 'Codes with leading zeros, such as car “07”, stay exactly as written; very large numbers are stored in full; long files are checked at the end too, so a late large value still counts.',
      },
      {
        status: 'available',
        title: 'A look in a real browser',
        body: 'The agent opens what it built, as you, and sees what a viewer would: a blank page, cut-off or overlapping text, an empty chart, or a page that loads too much or too slowly.',
      },
      {
        status: 'available',
        title: 'A review of every chart',
        body: 'It reviews each chart’s settings without reading any data: a missing data source, figures listed row by row that should be totalled, percentages on the wrong scale, mixed formats, overlapping cards, raw field names. The fixes come ready to apply.',
      },
      {
        status: 'lab',
        title: 'Numbers that must add up',
        body: 'The agent splits a chart’s numbers by a field and flags one whose parts don’t add up to its total.',
      },
    ],
  },
  {
    id: 'updates',
    kicker: '04 Data updates',
    title: 'Dashboards stay current without copies',
    intro:
      'MPP BI keeps no copy of your data to refresh. What an agent builds reads the same data model as everything else, so it shows new data as soon as the tables behind it change.',
    items: [
      {
        status: 'available',
        title: 'Live by default',
        body: 'Dashboards query your database when they open. Each can follow the update pattern that fits it: live, refreshed on a schedule or on a trigger, or fixed history.',
      },
      {
        status: 'available',
        title: 'Scheduled data flows',
        body: 'MPP ETL, included in every license, runs data flows at fixed times or when an event arrives, and refreshes the tables your dashboards read. Excel files can also be uploaded on a schedule.',
      },
      {
        status: 'available',
        title: 'Agent-built dashboards follow the data',
        body: 'They read your data model, not snapshots of it. A file the agent brings in through the chat is the exception: it stays as it was until something refreshes it.',
      },
      {
        status: 'planned',
        title: 'From a one-off to a schedule',
        body: 'Turning a pipeline the agent ran once in the chat, such as download, clean and load, into a data flow that runs on a schedule.',
      },
    ],
  },
  {
    id: 'access',
    kicker: '05 Permissions',
    title: 'The agent works as you, and only as you',
    intro:
      'There is no service account behind the agent. It uses your signed-in session, so the permissions you already set decide what it can read and change.',
    items: [
      {
        status: 'available',
        title: 'Your session, your permissions',
        body: 'In the product’s chat and in any AI assistant you connect to MPP BI, every action carries your own session. Your roles and permissions decide what it may read or change.',
      },
      {
        status: 'available',
        title: 'Permissions before queries',
        body: 'Access rules down to rows and individual charts are applied before data is fetched, for people and agents alike.',
      },
      {
        status: 'available',
        title: 'Changes through the product',
        body: 'The agent changes things the same way the product’s own screens do, so every change is logged like any other. Deleting needs a second, confirmed step.',
      },
      {
        status: 'available',
        title: 'Limits when you want them',
        body: 'You can confine an agent to chosen projects and to the data it created itself; anything else is refused.',
      },
      {
        status: 'available',
        title: 'Checks on what it writes',
        body: 'Anything the agent writes for a page is checked before it goes live: no reaching out to the internet, no hidden storage, no running outside code. It is a check before publishing, not a wall: the page then runs in the viewer’s own session, like any dashboard.',
      },
      {
        status: 'available',
        title: 'Checks that change nothing',
        body: 'When the agent tries a page out in its browser, that browser may only read; anything else is refused and reported.',
      },
    ],
  },
]

const chain = [
  { title: 'You, signed in', body: 'through your directory or single sign-on' },
  { title: 'The agent', body: 'in the chat or your own AI assistant, with your session' },
  { title: 'MPP BI', body: 'checks your permissions first' },
  { title: 'Your data model', body: 'measures and the fields you slice them by' },
  { title: 'Your database', body: 'does the calculation' },
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
          lede="What keeps agent-built analytics trustworthy: the data model agents work in, the trail behind each number, the checks on what they build, how the data stays current, and the permissions they work under."
        >
          <DemoButton label="Ask about governance" />
          <TextLink href="#access">Permissions</TextLink>
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
                    <TextLink href="/values-graph">Every number explains itself</TextLink>
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
                alt="Hovering $147 in a report shows how it is made: 2025 revenue divided by 2025 nights, each with its date filter"
                width={1200}
                height={408}
                caption="A report number, hovered: $147 is 2025 revenue divided by 2025 nights, each with its own filters."
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
