import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DemoButton from '@/components/DemoButton'
import CTABand from '@/components/CTABand'
import ValuesGraphDiagram from '@/components/ValuesGraphDiagram'
import { PageHeader, Preview, RuleList, Screenshot, Section, TextLink } from '@/components/ui'

// "Every number explains itself": a preview from the lab installation (the values graph, web-res
// branch feat/values-graph), told as what a customer gets. Every number here was measured there;
// the worklog and the notes' values pages hold the runs. No internal or tool names in the copy.

export const metadata: Metadata = {
  title: 'Every number explains itself (preview) | MPP BI',
  description:
    'A preview from the MPP BI lab: hover any number on a dashboard to see what it was built from and what moved it, including on pages an agent built, with nothing extra to set up.',
}

const knows = [
  { title: 'What it’s made of', body: 'The totals from your data it was built from, and how they combine: a sum, a ratio, a share, a change.' },
  { title: 'What moves it', body: 'How much the number changes when each part changes, so you know which lever matters.' },
  { title: 'What moved it', body: 'The change between two periods, split exactly across its parts.' },
  { title: 'Split by anything', body: 'Open any part by region, channel or any other field, and the pieces add back up to the whole.' },
]

const traced = [
  'Numbers in text and headlines, including ones a page works out itself, such as a running total or a percentage change.',
  'Key figures, table cells, points on charts and on trend lines.',
  'The product’s own charts and simple tables, with no change to them either.',
  'Where a number can’t be explained exactly, the card says why instead of guessing.',
]

const proof = [
  { value: '288 of 288', label: 'numbers in the trail equal your database’s own answer; the largest difference is 1.3 × 10⁻¹⁵' },
  { value: '535 hovers', label: 'over every chart point, number and table cell on two sets of dashboards, with 0 mismatches' },
  { value: '−$15.29', label: 'the fall in the rate per night from June to July, split by channel; the parts add up to the change' },
  { value: '$58.22T', label: 'the NASDAQ total opens as one total over 3,500 companies and splits into 13 sectors' },
  { value: '73 of 73', label: 'stress tests pass, with no page errors and no card opening for the wrong number' },
]

export default function ValuesGraphPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHeader
          eyebrow={<Preview />}
          title="Every number explains itself"
          lede="Hover a number on a dashboard and see how it was made: the figures from your data underneath, how they combine, and which of them moves it most. Compare two periods and the change is split exactly across its parts. It works on the dashboards agents build, with nothing extra to set up."
        >
          <DemoButton label="Ask for a walkthrough" />
          <TextLink href="#proof">How we checked it</TextLink>
        </PageHeader>

        <Section id="idea">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">A number that knows how it was made</h2>
              <p className="mt-4 text-lg leading-relaxed">
                A number on a dashboard usually arrives with no story. Why is the rate per night $151.37? What is it made of,
                and why is it lower than last month? Today someone has to rebuild it by hand to find out.
              </p>
              <p className="mt-4 leading-relaxed">
                We borrowed the idea from micrograd, a tiny teaching tool in which every value remembers how it was computed.
                Here every number on a dashboard carries the same memory, so it can tell you four things:
              </p>
              <dl className="mt-6 divide-y divide-line border-y border-line">
                {knows.map((k) => (
                  <div key={k.title} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
                    <dt className="font-medium text-ink">{k.title}</dt>
                    <dd className="leading-relaxed">{k.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <ValuesGraphDiagram />
          </div>
        </Section>

        <Section id="native" tone="paper">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">Nothing to add to what agents build</h2>
            <p className="mt-4 text-lg leading-relaxed">
              Open a dashboard for editing and every number on it explains itself on hover. That includes pages an agent
              built for one question, with no change to them, and the product’s own charts.
            </p>
            <p className="mt-4 leading-relaxed">
              When you’re just viewing, nothing changes: the page runs exactly as it was published, as fast as before.
            </p>
          </div>

          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
            <Screenshot
              src="/values-graph/pulse-edit.webp"
              alt="Climate pulse while editing: hovering 38.6 opens a card showing it is the 2024 CO₂ total divided by 1,000"
              width={905}
              height={944}
              caption="Climate pulse, the page an agent built, unchanged. Hover 38.6 and it opens as the 2024 CO₂ total, divided by 1,000 to show billions of tonnes."
              unoptimized
            />
            <div>
              <h3 className="text-sm font-medium text-slate">What explains itself</h3>
              <RuleList className="mt-3" items={traced} />
            </div>
          </div>

          <Screenshot
            className="mt-12"
            src="/values-graph/running-total.webp"
            alt="A card explaining 1,623 Gt: the page’s running total, recognised as one CO₂ total over 1950–2024 divided by 1,000, split by year"
            width={1600}
            height={661}
            caption="A running total the page adds up itself is recognised as one total of CO₂ over 1950–2024, and splits by year."
            unoptimized
          />
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <Screenshot
              src="/values-graph/nascar.webp"
              alt="A card explaining 877 points as Kyle Larson’s points for Hendrick Motorsports and Chevrolet"
              width={1352}
              height={392}
              caption="The NASCAR oval, built before this existed: all 47 driver tiles explain themselves, such as Kyle Larson’s 877 points."
              unoptimized
            />
            <Screenshot
              src="/values-graph/builtins.webp"
              alt="Four cards from the product’s own charts: monthly revenue with what moved it, bookings in a table cell, rate per night in a heatmap cell split into revenue and nights, and quarterly revenue in a column"
              width={1536}
              height={764}
              caption="The product’s own charts, unchanged: a month’s revenue with what moved it, a table cell, a heatmap cell split into revenue and nights, and a column."
              unoptimized
            />
          </div>
        </Section>

        <Section id="moved">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">Why did the rate per night fall?</h2>
            <p className="mt-4 text-lg leading-relaxed">
              Open a number and ask what moved it. On the sample hotel data, the rate per night fell from $166.66 in June 2025
              to $151.37 in July. Split by sales channel, the answer is exact: Direct −$13.46, OTA −$6.00, Corporate +$4.18.
            </p>
          </div>
          <Screenshot
            className="mt-10"
            src="/values-graph/adr-graph.webp"
            alt="How the rate per night is made: $151.37 equals revenue 32,846.5 divided by 217 nights, both split by channel, with what moved it from June to July"
            width={1600}
            height={499}
            caption="$151.37 is revenue of 32,846.5 over 217 nights. Each extra $1,000 of revenue would add $4.61; one more night at the same revenue would take off about $0.70."
            unoptimized
          />
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <Screenshot
              src="/values-graph/adr-split.webp"
              alt="The Corporate revenue part split by room type into Standard, Deluxe and Suite"
              width={1600}
              height={625}
              caption="Open any part by another field: Corporate revenue by room type adds back up to 4,259.44."
              unoptimized
            />
            <Screenshot
              src="/values-graph/pulse-split.webp"
              alt="Cumulative CO₂ from 1950 to 1991 split by year, seven years shown and 35 more folded"
              width={1600}
              height={664}
              caption="A point on a trend line, CO₂ from 1950 to 1991, split by year. The 42 years add up to the page’s own total."
              unoptimized
            />
          </div>
        </Section>

        <Section id="agents" tone="paper">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">Ask the assistant why a number moved</h2>
              <p className="mt-4 text-lg leading-relaxed">
                The assistant reads the same trail: what each number is made of, where each part comes from and what moved it.
                So it answers from your data instead of guessing.
              </p>
              <RuleList
                className="mt-6"
                items={[
                  'It works in the product’s chat and in any AI assistant you connect to MPP BI.',
                  'The agent uses it to check its own work too: a chart whose parts don’t add up to its total gets flagged.',
                ]}
              />
            </div>
            <figure className="min-w-0 rounded-lg border border-line bg-white p-5">
              <figcaption className="text-xs text-slate">A question and the answer the lab installation gave, in plain words</figcaption>
              <p className="mt-4 ml-auto w-fit max-w-[85%] rounded-lg rounded-tr-sm bg-brand px-4 py-2.5 text-sm leading-relaxed text-white">
                Why did the rate per night fall in July?
              </p>
              <div className="mt-4 max-w-[92%] rounded-lg rounded-tl-sm bg-tint px-4 py-3 text-sm leading-relaxed text-ink">
                <p>It fell from $166.66 in June to $151.37 in July, down $15.29.</p>
                <p className="mt-2">
                  By channel: Direct took off $13.46 and OTA $6.00, while Corporate added $4.18. The three parts add up to the
                  whole change.
                </p>
                <p className="mt-2">The rate is revenue ÷ nights: 32,846.5 over 217 nights in July.</p>
              </div>
            </figure>
          </div>
        </Section>

        <Section id="proof">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">Checked against your database, not against itself</h2>
            <p className="mt-4 text-lg leading-relaxed">
              We compared the numbers in the trail with the answers the database gives to the same questions, and the numbers
              on screen with their trails. Then we tried to break it.
            </p>
          </div>
          <dl className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-3">
            {proof.map((n) => (
              <div key={n.value} className="flex flex-col-reverse justify-end">
                <dt className="mt-1 text-sm leading-snug text-slate">{n.label}</dt>
                <dd className="text-lg font-semibold tabular-nums text-ink md:text-xl">{n.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
            <Screenshot
              src="/values-graph/nasdaq-total.webp"
              alt="The NASDAQ market track while editing: $58.22T opens as the total market value of all 3,500 companies divided by a trillion, split into sectors"
              width={1200}
              height={1012}
              caption="The NASDAQ total, $58.22T: one total over all 3,500 companies, split by sector."
              unoptimized
            />
            <div>
              <h3 className="text-lg font-semibold">Tested by a team trying to break it</h3>
              <p className="mt-2 leading-relaxed">
                Heavy pages broke the first version: a 3D globe froze on a hover, and the NASDAQ total opened blank. After a
                round of fixes, a separate team whose only job was to break it wrote 73 stress tests and put every dashboard
                through a minute of hard use. The first run passed 40 of the 73. Now all 73 pass, with no page errors and no
                card opening for a number other than the one under the pointer.
              </p>
            </div>
          </div>
        </Section>

        <Section tone="paper" id="limits">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
            <h2 className="text-2xl font-semibold leading-tight tracking-tight md:text-3xl">Where it stops today</h2>
            <RuleList
              items={[
                'It runs on our lab installation and has not been reviewed for release.',
                'Not explained yet: names and years stored as text, text drawn inside a 3D view or an image, and numbers a chart only works out for its labels.',
                'Distinct counts, medians and ranks don’t split into parts; the card says so and shows them whole.',
              ]}
            />
          </div>
          <div className="mt-10 flex flex-col gap-4 rounded-lg border border-line bg-white p-6 md:flex-row md:items-center md:justify-between md:gap-8">
            <p className="text-ink">
              <span className="font-medium">The rest of the trust story.</span>{' '}
              <span className="text-body">
                Your data model, how the agent checks its work, how data stays current and the permissions it works under, each
                marked available, in the lab or planned.
              </span>
            </p>
            <div className="shrink-0">
              <TextLink href="/governance">Governance</TextLink>
            </div>
          </div>
          <div className="mt-8">
            <TextLink href="/showcase">See what the agent built</TextLink>
          </div>
        </Section>

        <CTABand
          title="Ask where your numbers come from"
          body="Bring a dashboard your team argues about. We will open its numbers together and see what moved them."
          label="Book a session"
        />
      </main>
      <Footer />
    </>
  )
}
