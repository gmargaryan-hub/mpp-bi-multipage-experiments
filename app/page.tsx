import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DemoButton from '@/components/DemoButton'
import ArchitectureDiagram from '@/components/ArchitectureDiagram'
import CaseStudy from '@/components/CaseStudy'
import CTABand from '@/components/CTABand'
import { Container, Section, SectionHeader, Screenshot, TextLink, buttonClass } from '@/components/ui'
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

const differences = [
  {
    title: 'No copy of your data',
    body: 'Queries go to your database. There is no import mode, no extract to refresh and no second store to secure.',
  },
  {
    title: 'No calculation engine',
    body: 'There is no in-memory tier to size, license and patch. The MPP BI server runs inside PostgreSQL and only prepares queries.',
  },
  {
    title: 'Every function works live',
    body: 'The calculation language was designed for pushdown, so nothing is disabled when you connect live. Power BI, by contrast, restricts DAX in DirectQuery.',
  },
]

const deployments = [
  {
    src: '/dashboards/dashboard-construction.png',
    width: 2138,
    height: 1060,
    alt: 'Procurement transparency dashboard',
    caption: 'Construction procurement: suspicious items, overpayment and supplier analysis across 500+ entities. Over $1M saved per year.',
  },
  {
    src: '/dashboards/dashboard-oilgas-safety.png',
    width: 2436,
    height: 1366,
    alt: 'Offshore safety command center dashboard',
    caption: 'Offshore safety: incidents, personnel, equipment and vessels, streamed from Kafka at 7,000+ events per second.',
  },
  {
    src: '/dashboards/dashboard-servicedesk.png',
    width: 2084,
    height: 1392,
    alt: 'Service desk SLA dashboard',
    caption: 'Service desk: SLA violations, resolution time and agent performance, on a live connection.',
  },
  {
    src: '/dashboards/dashboard-oilgas-wells.png',
    width: 2532,
    height: 1302,
    alt: 'Well profile analytics dashboard',
    caption: 'Well profiles: spacer placement, collector monitoring and deviation analysis, computed in the database.',
  },
]

const capabilities = [
  { title: 'Dashboards', body: 'More than 30 chart types, maps, floor plans and schematics. Export to PNG, Excel, PDF or PowerPoint, or embed in your own product.', href: '/features#visualization' },
  { title: 'AI assistant', body: 'Ask in plain language and the assistant queries your data or builds the dashboard. It runs on your infrastructure, with the model you choose.', href: '/features#ai-ml' },
  { title: 'MPP ETL included', body: 'A visual pipeline builder for Kafka, Redis, SAP RFC, PostgreSQL, ClickHouse and any JDBC source, in every license.', href: '/features#mpp-etl' },
  { title: 'Security', body: 'Active Directory, Kerberos, OAuth 2.0 and OpenID Connect sign-in, MFA, row-level permissions and SIEM-ready audit logs.', href: '/features#security' },
  { title: 'Your brand, your code', body: 'White-label the interface, build custom views in React, and get the source code with the right license.', href: '/features#customization' },
  { title: 'Runs where you need it', body: 'On-premises and air-gapped, on AWS, Azure or Google Cloud, in Docker, or as a VM image. One node or a cluster.', href: '/features#deployment-options' },
]

const numbers = [
  { value: '2B+', label: 'records queried in under 5 seconds' },
  { value: '500', label: 'concurrent users on 2 nodes of 16 cores and 32 GB' },
  { value: '51%', label: 'fewer payment defaults at an insurance client' },
  { value: '$1M+', label: 'saved per year in construction procurement' },
]

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <section className="pt-32 pb-16 md:pt-40 md:pb-24">
          <Container>
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
                Business intelligence that runs inside your database
              </h1>
              <p className="mt-6 text-lg md:text-xl leading-relaxed">
                MPP BI sends every calculation to the database your data already lives in. No extracts, no in-memory engine,
                no second copy to keep in sync. Dashboards stay live on billions of rows, 2 to 12 times faster than
                traditional BI.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <DemoButton />
                <Link href="/architecture" className={buttonClass.secondary}>
                  How it works
                </Link>
              </div>
              <p className="mt-8 text-sm text-slate">
                In production in government, banking, oil and gas, insurance and construction. UN supplier.
              </p>
            </div>
            <Screenshot
              className="mt-14 md:mt-20"
              src="/dashboards/dashboard-construction.png"
              alt="An MPP BI procurement dashboard"
              width={2138}
              height={1060}
              priority
            />
          </Container>
        </section>

        <section className="border-y border-line py-10" aria-label="Clients and partners">
          <Container>
            <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
              {clients.map((c) => (
                <li key={c.alt}>
                  <Image
                    src={asset(c.src)}
                    alt={c.alt}
                    width={c.width}
                    height={c.height}
                    className="h-12 w-auto object-contain grayscale"
                    unoptimized
                  />
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <Section id="architecture">
          <SectionHeader
            title="The same dashboards, one less tier"
            lede="Most BI tools were designed when databases were too slow for interactive analysis, so they copy data into an engine of their own. Databases are fast now. MPP BI removes the engine and lets the database do the work."
          />
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            {differences.map((d) => (
              <div key={d.title} className="border-t border-navy pt-5">
                <h3 className="text-lg font-semibold">{d.title}</h3>
                <p className="mt-2 leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
          <ArchitectureDiagram />
          <div className="mt-8">
            <TextLink href="/architecture">Read how the architecture works</TextLink>
          </div>
        </Section>

        <Section tone="paper">
          <SectionHeader
            title="Built for real deployments"
            lede="Dashboards from client projects. Each one queries the client’s own systems directly."
          />
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
            {deployments.map((d) => (
              <Screenshot key={d.src} {...d} />
            ))}
          </div>
          <dl className="mt-16 grid grid-cols-2 gap-8 border-t border-line pt-10 md:grid-cols-4">
            {numbers.map((n) => (
              <div key={n.label}>
                <dt className="text-3xl font-semibold tracking-tight text-ink">{n.value}</dt>
                <dd className="mt-1 text-sm leading-snug text-slate">{n.label}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section>
          <SectionHeader title="What comes with it" lede="One platform for data preparation, dashboards, AI and administration." />
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <div key={c.title}>
                <h3 className="text-lg font-semibold">
                  <Link href={c.href} className="hover:text-navy">{c.title}</Link>
                </h3>
                <p className="mt-2 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section tone="paper">
          <CaseStudy />
        </Section>

        <Section>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">Public pricing, per seat</h2>
              <p className="mt-4 text-lg leading-relaxed">
                Pay monthly, or buy the seats once and own them. ETL, on-premises deployment and source-code access are part
                of the product, not add-ons.
              </p>
              <div className="mt-6">
                <TextLink href="/pricing">See pricing and the cost calculator</TextLink>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-line">
              <table className="w-full text-left text-sm">
                <thead className="bg-paper text-slate">
                  <tr>
                    <th className="px-5 py-3 font-medium">Seat</th>
                    <th className="px-5 py-3 font-medium">Monthly</th>
                    <th className="px-5 py-3 font-medium">Perpetual</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  <tr>
                    <td className="px-5 py-4 text-ink">Viewer</td>
                    <td className="px-5 py-4"><span className="text-lg font-semibold text-ink">$10</span> / month</td>
                    <td className="px-5 py-4"><span className="text-lg font-semibold text-ink">$240</span> once</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 text-ink">Creator or admin</td>
                    <td className="px-5 py-4"><span className="text-lg font-semibold text-ink">$18</span> / month</td>
                    <td className="px-5 py-4"><span className="text-lg font-semibold text-ink">$432</span> once</td>
                  </tr>
                </tbody>
              </table>
              <p className="border-t border-line bg-paper px-5 py-3 text-xs text-slate">Standard support is 20% of the license.</p>
            </div>
          </div>
        </Section>

        <CTABand />
      </main>
      <Footer />
    </>
  )
}
