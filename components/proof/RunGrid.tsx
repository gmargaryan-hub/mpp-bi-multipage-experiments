import { trial24, trial24Summary as s } from '@/lib/proof'

const MAX_MINUTES = 12

/** Every attempt from the recorded run: one cell per project, time as a bar, misses shown. */
export default function RunGrid() {
  return (
    <div>
      <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {[
          [`${s.migrated} of ${s.projects}`, 'projects migrated, every graded chart matching the source'],
          [`${s.firstAttempt}`, 'passed on the first attempt; one needed a second'],
          [`${s.medianMinutes} min`, 'median time per project, start to report'],
          [`${s.wallMinutes} min`, `for all ${s.projects}, with ${s.agents} agents working in parallel`],
        ].map(([v, l]) => (
          <div key={l} className="border-t border-brand pt-4">
            <dt className="text-3xl font-semibold tracking-tight text-ink">{v}</dt>
            <dd className="mt-1 text-sm leading-snug text-slate">{l}</dd>
          </div>
        ))}
      </dl>

      <ol className="mt-10 grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {trial24.map((e) => (
          <li
            key={`${e.task}-${e.attempt}`}
            className={`rounded-md border px-2.5 pb-2 pt-2 ${e.pass ? 'border-line bg-white' : 'border-dashed border-mist bg-paper'}`}
            title={`${e.name}: ${e.pass ? 'passed' : 'failed'} in ${e.minutes} min, ${e.calls} tool calls`}
          >
            <div className="flex items-center justify-between gap-2 font-mono text-[0.6875rem] text-slate">
              <span>
                {e.task}
                {e.attempt > 1 && <span className="text-ink"> · retry</span>}
              </span>
              <span>
                {e.format}
                {e.lang === 'RU' && ' · RU'}
              </span>
            </div>
            <p className={`mt-1 truncate text-[0.8125rem] leading-snug ${e.pass ? 'text-ink' : 'text-slate line-through decoration-mist'}`}>{e.name}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="h-1 flex-1 rounded-full bg-tint">
                <span className={`block h-1 rounded-full ${e.pass ? 'bg-brand' : 'bg-mist'}`} style={{ width: `${(e.minutes / MAX_MINUTES) * 100}%` }} />
              </span>
              <span className="font-mono text-[0.6875rem] tabular-nums text-slate">{e.minutes.toFixed(1)}m</span>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs leading-relaxed text-slate">
        Each cell is one attempt from the same recorded run. PBIP is a Power BI project folder, PBIX a saved report, PBIT a
        template; RU marks requests written in Russian. The bar is the time from request to finished report. Projects are
        synthetic, generated for the test, and the model was {s.model}.
      </p>
    </div>
  )
}
