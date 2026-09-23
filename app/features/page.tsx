import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DemoButton from '@/components/DemoButton'
import FeatureBlock from '@/components/FeatureBlock'
import CTABand from '@/components/CTABand'
import { Container, PageHeader } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Features | MPP BI',
  description:
    'Data sources, dashboards, the AI assistant, MPP ETL, security, customization and deployment options in MPP BI.',
}

const sources = [
  { group: 'Relational databases', list: 'PostgreSQL, Oracle, Microsoft SQL Server, MySQL, IBM Db2, SAP HANA, ClickHouse, Greenplum' },
  { group: 'Warehouses and OLAP', list: 'Teradata, SQL Server Analysis Services, MDX-based stores' },
  { group: 'Big data', list: 'Hadoop, HBase, Hive, Amazon S3' },
  { group: 'Streaming', list: 'Kafka, NATS, MQTT, RabbitMQ, Redis, Syslog, SNMP' },
  { group: 'Files', list: 'Excel (manual or scheduled upload), CSV, ODS, Parquet, Avro, DBF, QVD' },
  { group: 'APIs', list: 'SAP RFC, REST, JDBC, custom connectors' },
]

const sections = [
  { id: 'data-sources', label: 'Data sources' },
  { id: 'visualization', label: 'Dashboards' },
  { id: 'ai-ml', label: 'AI' },
  { id: 'mpp-etl', label: 'MPP ETL' },
  { id: 'security', label: 'Security' },
  { id: 'customization', label: 'Customization' },
  { id: 'deployment-options', label: 'Deployment' },
]

export default function FeaturesPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHeader
          title="Everything in the platform"
          lede="Connect to your sources, build dashboards, ask the AI assistant, prepare data and control access, all in one product that runs on your infrastructure."
        >
          <DemoButton />
        </PageHeader>

        <nav aria-label="On this page" className="border-b border-line">
          <Container className="flex gap-6 overflow-x-auto py-4 text-sm">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="shrink-0 text-slate hover:text-ink">
                {s.label}
              </a>
            ))}
          </Container>
        </nav>

        <FeatureBlock
          id="data-sources"
          title="Connect to data where it lives"
          intro={<p>MPP BI queries each source directly. You do not move data into MPP BI before you can report on it.</p>}
        >
          <dl className="divide-y divide-line border-y border-line">
            {sources.map((s) => (
              <div key={s.group} className="grid gap-1 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
                <dt className="font-medium text-ink">{s.group}</dt>
                <dd>{s.list}</dd>
              </div>
            ))}
          </dl>
        </FeatureBlock>

        <FeatureBlock
          id="visualization"
          tone="paper"
          title="More than 30 visualization types"
          intro={<p>Standard charts, plus the views operations teams need: maps, floor plans and live equipment schematics.</p>}
          items={[
            { term: 'KPIs and trends', body: 'Cards, trend lines and metric panels for the numbers people check every day.' },
            { term: 'Maps', body: 'Location data on Google Maps, OpenStreetMap or ArcGIS.' },
            { term: 'Live schematics', body: 'Interactive diagrams of equipment and facilities that change color with their status.' },
            { term: 'Floor plans', body: 'Plans, shop layouts and blueprints with your data laid over them.' },
            { term: 'Targets and status', body: 'Red, amber and green indicators against targets, from executive to shift level.' },
            { term: 'Drill-down', body: 'From a headline number down to the transactions behind it.' },
            { term: 'Export', body: 'Charts as PNG, tables as Excel, dashboards as PDF or PowerPoint.' },
            { term: 'Embedding', body: 'Put dashboards into your own systems or on a public website.' },
          ]}
        />

        <FeatureBlock
          id="ai-ml"
          title="An AI assistant inside the BI"
          intro={
            <>
              <p>
                Ask a question in plain language. The assistant finds the right data, runs the query, explains the result and can
                build the dashboard for you to review and share.
              </p>
              <p>It runs on your infrastructure, with the model you choose, under the same permissions as the user asking.</p>
            </>
          }
          items={[
            { term: 'Ask your data', body: 'Questions like “which region has the highest margin?” answered from your live data.' },
            { term: 'Build dashboards', body: 'Describe the dashboard you need; review and edit what it builds.' },
            { term: 'Summaries', body: 'A sentence or two under a chart that says what it shows.' },
            { term: 'Forecasting', body: 'Projections from your historical data, so you can plan ahead.' },
            { term: 'Your own AI workflows', body: 'Wire models into data processes with the no-code pipeline builder.' },
          ]}
        />

        <FeatureBlock
          id="mpp-etl"
          tone="paper"
          title="MPP ETL, included"
          intro={
            <p>
              MPP ETL collects data from your sources, cleans it and prepares it for analysis. It ships with every MPP BI license,
              so there is no separate data-preparation tool to buy.
            </p>
          }
          items={[
            { term: 'Visual flows', body: 'Build pipelines by connecting blocks on a canvas (built on Node-RED), and drop into code when you need to.' },
            { term: 'Sources', body: 'Kafka, Redis, SAP RFC, PostgreSQL, ClickHouse and any JDBC source.' },
            { term: 'Streaming and batch', body: 'Thousands of events per second for live feeds, large batches for everything else.' },
            { term: 'Scheduling', body: 'Run flows at fixed times or when an event arrives.' },
            { term: 'Notebooks', body: 'Jupyter is included for exploration and data-science work.' },
          ]}
        />

        <FeatureBlock
          id="security"
          title="Security"
          intro={
            <p>
              Permissions are checked before any data is fetched, not filtered afterwards. For regulated work we recommend
              on-premises deployment, which keeps sign-in, storage and the audit trail under your control.
            </p>
          }
          items={[
            { term: 'Sign-in', body: 'Active Directory, Kerberos and LDAP, OAuth 2.0 and OpenID Connect (Keycloak and others), plus MFA.' },
            { term: 'Access control', body: 'Separate permissions for data sources, cubes, atlases, dashboards and individual charts.' },
            { term: 'Row-level security', body: 'Two people can open the same dashboard and each see only their own records.' },
            { term: 'Audit', body: 'Every action is logged in a SIEM-ready format and can be exported at any time.' },
            { term: 'Encryption', body: 'Traffic is encrypted in transit; passwords are stored only as hashes.' },
          ]}
        />

        <FeatureBlock
          id="customization"
          tone="paper"
          title="Customization"
          intro={<p>Use MPP BI as it ships, or shape it into your own product. The interface is React, and nothing is locked away.</p>}
          items={[
            { term: 'White label', body: 'Your colors, fonts and logos throughout.' },
            { term: 'JavaScript API', body: 'Control filters and on-screen behavior from your own code.' },
            { term: 'Custom views', body: 'New chart types for one dashboard, or a redesign of the whole interface.' },
            { term: 'Purpose-built apps', body: 'Turn the platform into a tool for one specific job.' },
            { term: 'Source code', body: 'Available for all components, depending on the license.' },
          ]}
        />

        <FeatureBlock
          id="deployment-options"
          title="Deployment"
          intro={
            <p>
              Run it on your own servers, in your cloud account, or both. Start on one machine and grow to a cluster without
              changing the setup.
            </p>
          }
          items={[
            { term: 'On-premises', body: 'Rocky Linux 8 and 9, Red Hat and other UNIX-compatible systems. Works fully air-gapped.' },
            { term: 'Cloud', body: 'AWS, Azure or Google Cloud.' },
            { term: 'Containers', body: 'One Docker container per component, run together or split across hosts.' },
            { term: 'Virtual machines', body: 'A ready OVA image for Hyper-V, VirtualBox and KVM.' },
            { term: 'Scaling', body: 'Add nodes behind the built-in Nginx load balancer, or add CPU and memory to the ones you have.' },
            { term: 'Availability', body: 'Database clustering with Patroni, and scheduled hot and cold backups.' },
          ]}
        >
          <div className="overflow-x-auto rounded-lg border border-line">
            <table className="w-full text-left text-sm">
              <caption className="border-b border-line bg-paper px-5 py-3 text-left font-medium text-ink">Hardware</caption>
              <thead className="text-slate">
                <tr>
                  <th className="px-5 py-3 font-medium"></th>
                  <th className="px-5 py-3 font-medium">Minimum</th>
                  <th className="px-5 py-3 font-medium">500 concurrent users</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                <tr><td className="px-5 py-3 text-ink">Nodes</td><td className="px-5 py-3">1</td><td className="px-5 py-3">2</td></tr>
                <tr><td className="px-5 py-3 text-ink">CPU</td><td className="px-5 py-3">8 cores</td><td className="px-5 py-3">16 cores each</td></tr>
                <tr><td className="px-5 py-3 text-ink">Memory</td><td className="px-5 py-3">24 GB</td><td className="px-5 py-3">32 GB each</td></tr>
              </tbody>
            </table>
          </div>
        </FeatureBlock>

        <CTABand />
      </main>
      <Footer />
    </>
  )
}
