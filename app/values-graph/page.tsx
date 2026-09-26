import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DemoButton from '@/components/DemoButton'
import CTABand from '@/components/CTABand'
import ValuesGraphDiagram from '@/components/ValuesGraphDiagram'
import { PageHeader, Preview, RuleList, Screenshot, Section, TextLink } from '@/components/ui'

// The values graph: a preview from the lab installation, not in the released product.
// Every number here was measured there (web-res branch feat/values-graph; the worklog and
// the notes' values pages hold the runs).

export const metadata: Metadata = {
  title: 'Every number explains itself (preview) | MPP BI',
  description:
    'A preview from the MPP BI lab: every number on a dashboard knows the cube aggregates it was made from and what moved it, including on pages an agent wrote, with no change to their code.',
}

const mapping = [
  { micrograd: 'Value(data)', ours: 'A cube aggregate: its measure, filters and the server’s value. It splits by any field, and the parts must add back up.' },
  { micrograd: '+ − × ÷', ours: 'The measure’s own formula: a ratio, a share, a change, a total.' },
  { micrograd: 'backward()', ours: 'The sensitivity ∂ of the number to every input: how far it moves when that input moves by one.' },
  { micrograd: 'no equivalent', ours: 'What moved it: the change between two periods, split exactly across the inputs.' },
  { micrograd: 'draw_dot', ours: 'The graph on hover in edit mode, and as data that agents and checks can read.' },
]

const traced = [
  'Numbers in text and headlines, including ones the page computes itself, such as a running total or a percentage change.',
  'KPIs, table cells, chart marks and sparkline points.',
  'Built-in charts, KPIs and simple tables, and every kind of spec chart, with no change to them either.',
  'Where a number can’t be mapped exactly, the card says why instead of guessing.',
]

const proof = [
  { value: '288 of 288', label: 'values in the graph equal the server’s own answer; the worst difference is 1.3 × 10⁻¹⁵' },
  { value: '535 hovers', label: 'over every mark, number and table cell on two atlases, with 0 mismatches' },
  { value: '−$15.29', label: 'ADR from June to July, split by channel; the parts add up within 1.1 × 10⁻⁸' },
  { value: '$58.22T', label: 'NASDAQ’s total opens as one aggregate over 3,500 rows and splits into 13 sectors' },
  { value: '73 of 73', label: 'cases pass in a red-team fuzz harness, with 0 page errors and 0 cards for the wrong number' },
]

const call = `explain_number({
  schemaName: "ds_211",
  dashletId: 36,
  filters: { month: ["=", "2025-07-01"] },
  compare: { month: ["=", "2025-06-01"] },
  split: "channel"
})`

const answer = `adr = 151.367. Against month = 2025-06-01:
166.656 → 151.367 (Δ -15.2895), most from
Direct -13.4622, OTA -6.00436, Corporate 4.177;
the parts add up to the change within 1.1e-8.
5 data requests.

#9 adr [/] = 151.367 | grad 1
  #7 sum(revenue) [sum] = 32846.5 | grad 0.00460829
  #8 sum(nights) [sum] = 217 | grad -0.697542`

export default function ValuesGraphPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHeader
          eyebrow={<Preview />}
          title="Every number explains itself"
          lede="Hover a number on a dashboard and see how it was made: the cube aggregates underneath, the formula that joins them, and how strongly each one moves the result. Compare two periods and the change is split exactly across its parts. It works on the dashboards agents build, with no change to their code."
        >
          <DemoButton label="Ask for a walkthrough" />
          <TextLink href="#proof">How we checked it</TextLink>
        </PageHeader>

        <Section id="idea">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <p className="font-mono text-sm text-brand">micrograd for BI</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                A number that knows how it was made
              </h2>
              <p className="mt-4 text-lg leading-relaxed">
                micrograd is Andrej Karpathy’s tiny autograd engine. Each value in it remembers the operation and the inputs
                that produced it, and backward() works out how much the result depends on each input. We gave every number
                on a dashboard the same memory.
              </p>
              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[18rem] text-left text-sm">
                  <thead className="border-b border-line text-slate">
                    <tr>
                      <th scope="col" className="py-2 pr-4 font-medium">micrograd</th>
                      <th scope="col" className="py-2 font-medium">A number on a dashboard</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mapping.map((m) => (
                      <tr key={m.micrograd} className="border-b border-line align-top">
                        <td className="whitespace-nowrap py-2.5 pr-4 font-mono text-xs leading-6 text-ink">{m.micrograd}</td>
                        <td className="py-2.5 leading-relaxed">{m.ours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <ValuesGraphDiagram />
          </div>
        </Section>

        <Section id="native" tone="paper">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Nothing to add to the components agents write
            </h2>
            <p className="mt-4 text-lg leading-relaxed">
              When you switch a dashboard to edit mode, the platform makes a traced twin of each custom component in the
              browser: the same source, with its arithmetic, formatting and chart data routed through a small runtime. Every
              number the component shows then explains itself on hover. Leave edit mode and the published code comes back.
            </p>
            <p className="mt-4 leading-relaxed">
              View mode is untouched: each component runs its own published code byte for byte, with the same requests,
              script time and memory.
            </p>
          </div>

          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
            <Screenshot
              src="/values-graph/pulse-edit.webp"
              alt="Climate pulse in edit mode: hovering 38.6 opens a card showing sum of CO₂ for 2024 divided by 1,000"
              width={905}
              height={944}
              caption="Climate pulse, the page an agent wrote, unchanged. In edit mode, 38.6 opens as sum(co2) for 2024 ÷ 1,000."
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
            alt="A card explaining 1,623 Gt: the page’s running total, recognised as one sum of CO₂ over 1950–2024 divided by 1,000, split by year"
            width={1600}
            height={661}
            caption="A running total the page adds up in the browser is recognised as one cube aggregate, sum(co2) over 1950–2024 ÷ 1,000, and splits by year."
            unoptimized
          />
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <Screenshot
              src="/values-graph/nascar.webp"
              alt="A card explaining 877 points as sum of points for Kyle Larson, Hendrick Motorsports, Chevrolet"
              width={1352}
              height={392}
              caption="The NASCAR oval, published before the values graph existed: all 47 driver tiles explain themselves, such as 877 = sum(points) for Kyle Larson."
              unoptimized
            />
            <Screenshot
              src="/values-graph/builtins.webp"
              alt="Four cards from built-in charts: monthly revenue with what moved it, bookings in a table cell, rate per night in a heatmap cell split into revenue and nights, and quarterly revenue in a column"
              width={1536}
              height={764}
              caption="Built-in charts, unchanged: a monthly revenue point with what moved it, a table cell, a spec-chart heatmap cell split into revenue ÷ nights, and a column."
              unoptimized
            />
          </div>
        </Section>

        <Section id="moved">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">Why did the rate per night fall?</h2>
            <p className="mt-4 text-lg leading-relaxed">
              Open a number and ask what moved it. The same graph is evaluated for two periods, and the change is split
              exactly across its inputs. On the sample hotel data, the rate per night fell from $166.66 in June 2025 to
              $151.37 in July. By channel: Direct −$13.46, OTA −$6.00, Corporate +$4.18.
            </p>
          </div>
          <Screenshot
            className="mt-10"
            src="/values-graph/adr-graph.webp"
            alt="How the rate per night is made: $151.37 equals revenue 32,846.5 divided by nights 217, both split by channel, with what moved it from June to July"
            width={1600}
            height={506}
            caption="$151.37 = sum(revenue) 32,846.5 ÷ sum(nights) 217. The sensitivities are the ones you get by hand: 1/217 = 0.00461 and −0.698."
            unoptimized
          />
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <Screenshot
              src="/values-graph/adr-split.webp"
              alt="The Corporate revenue leaf split by room type into Standard, Deluxe and Suite"
              width={1600}
              height={629}
              caption="Click a leaf to split it by any field: Corporate revenue by room type adds back up to 4,259.44."
              unoptimized
            />
            <Screenshot
              src="/values-graph/pulse-split.webp"
              alt="Cumulative CO₂ from 1950 to 1991 split by year, seven years shown and 35 more folded"
              width={1600}
              height={664}
              caption="A sparkline point on Climate pulse, CO₂ from 1950 to 1991, split by year. The 42 years add up to the page’s own sum."
              unoptimized
            />
          </div>
        </Section>

        <Section id="agents" tone="paper">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                Assistants answer from the data, not from guesses
              </h2>
              <p className="mt-4 text-lg leading-relaxed">
                The agent’s explain_number tool returns a number’s graph, the query behind every input and what moved it.
                Asked why ADR fell, an assistant reads the split instead of inventing a reason.
              </p>
              <RuleList
                className="mt-6"
                items={[
                  'It works in the product’s chat and for outside agents through MPP BI’s MCP server.',
                  'The agent’s render check uses the same graph: it flags a chart whose parts don’t add up to its total.',
                ]}
              />
            </div>
            <div className="min-w-0 overflow-hidden rounded-lg border border-brand-strong bg-brand-deep">
              <p className="border-b border-white/10 px-4 py-2.5 font-mono text-xs text-mist">The call, on the lab installation</p>
              <pre className="whitespace-pre-wrap break-words px-4 py-4 font-mono text-xs leading-relaxed text-white">{call}</pre>
              <p className="border-y border-white/10 px-4 py-2.5 font-mono text-xs text-mist">Its answer, shortened</p>
              <pre className="whitespace-pre-wrap break-words px-4 py-4 font-mono text-xs leading-relaxed text-white">{answer}</pre>
            </div>
          </div>
        </Section>

        <Section id="proof">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">Checked against the server, not against itself</h2>
            <p className="mt-4 text-lg leading-relaxed">
              We compared the values in the graphs with the answers the database gives to the same questions, and the
              numbers on screen with their graphs. Then we tried to break it.
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
              alt="The NASDAQ market track in edit mode: $58.22T opens as the sum of market cap over all 3,500 rows divided by a trillion, split into sectors"
              width={1200}
              height={1012}
              caption="The NASDAQ total, $58.22T: one sum(market_cap) over all 3,500 rows, split by sector."
              unoptimized
            />
            <div>
              <h3 className="text-lg font-semibold">Hardened by a red team</h3>
              <p className="mt-2 leading-relaxed">
                Heavy pages broke the first version: a 3D globe froze on a hover, and the NASDAQ total opened blank. After a
                fix round, a red team that only wrote tests built a harness: 73 fuzz cases, each in its own process, and a
                60-second browser stress of every dashboard. The first run passed 40 of the 73. After a hardening round all 73
                pass, with no page errors and no card opening for a number other than the one under the pointer.
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
                'Not traced yet: names and years stored as text, text drawn on a canvas or in WebGL, and numbers that only a chart’s label formatter computes.',
                'Distinct counts, medians and ranks don’t split into parts; the card says so and shows them whole.',
              ]}
            />
          </div>
          <div className="mt-10 flex flex-col gap-4 rounded-lg border border-line bg-white p-6 md:flex-row md:items-center md:justify-between md:gap-8">
            <p className="text-ink">
              <span className="font-medium">The rest of the governance side.</span>{' '}
              <span className="text-body">
                The semantic model agents work in, checks on what they build, how data stays current and the permissions they
                run under, each marked available, in the lab or planned.
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
