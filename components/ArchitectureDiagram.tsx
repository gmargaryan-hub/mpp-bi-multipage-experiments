function Box({ title, note, tone = 'plain' }: { title: string; note: string; tone?: 'plain' | 'extra' | 'mpp' | 'data' }) {
  const styles = {
    plain: 'border-line bg-white',
    extra: 'border-dashed border-mist bg-paper',
    mpp: 'border-navy bg-navy text-white',
    data: 'border-navy bg-tint',
  }[tone]
  return (
    <div className={`rounded-md border px-4 py-3 ${styles}`}>
      <p className={`text-sm font-medium ${tone === 'mpp' ? 'text-white' : 'text-ink'}`}>{title}</p>
      <p className={`mt-0.5 text-xs leading-snug ${tone === 'mpp' ? 'text-mist' : 'text-slate'}`}>{note}</p>
    </div>
  )
}

function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 py-1.5 pl-6 text-xs text-slate">
      <span className="font-mono text-mist" aria-hidden>↓</span>
      {label}
    </div>
  )
}

/** Side-by-side request path: a typical in-memory BI stack and MPP BI. */
export default function ArchitectureDiagram() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-lg border border-line p-5 sm:p-6">
        <p className="text-sm font-medium text-ink">Typical BI stack</p>
        <p className="mb-5 text-xs text-slate">Tableau, Power BI and similar tools</p>
        <Box title="Browser" note="Dashboards" />
        <Arrow />
        <Box title="Application server" note="Sessions, routing, query preparation" />
        <Arrow />
        <Box title="Metadata store" note="Dashboards, users, permissions" />
        <Arrow />
        <div className="grid grid-cols-2 gap-2">
          <Box tone="extra" title="Calculation engine" note="In-memory, sized by RAM" />
          <Box tone="extra" title="Imported copy" note="Refreshed on a schedule" />
        </div>
        <Arrow label="Extract and import" />
        <Box title="Your database" note="Data is copied out" />
      </div>

      <div className="rounded-lg border border-navy p-5 sm:p-6">
        <p className="text-sm font-medium text-ink">MPP BI</p>
        <p className="mb-5 text-xs text-slate">Two tiers, no engine in between</p>
        <Box title="Browser" note="The same dashboards" />
        <Arrow />
        <Box tone="mpp" title="MPP BI server" note="Application server and metadata in one service inside PostgreSQL. Checks permissions, then writes the query." />
        <Arrow label="Query pushed down" />
        <Box tone="data" title="Your database" note="Runs every calculation. Data stays where it is." />
      </div>
    </div>
  )
}
