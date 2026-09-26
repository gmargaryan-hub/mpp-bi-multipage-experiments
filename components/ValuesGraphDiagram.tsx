// One number opened up, redrawn in the site's style: the rate per night (ADR) on the sample
// hotel dashboard for July 2025, with the values the lab installation returned for it
// (explain_number on ds_211 dashlet 36, split by channel, compared with June 2025).
// Diverging bars: the two hues were checked with the dataviz palette validator (light mode).

const NEGATIVE = '#b4432f'
const POSITIVE = '#2f63a0'

const leaves = [
  {
    measure: 'Revenue',
    value: '32,846.5',
    grad: '+$1,000 adds $4.61',
    parts: [
      ['Corporate', '4,259.44'],
      ['Direct', '8,871.90'],
      ['OTA', '19,715.20'],
    ],
  },
  {
    measure: 'Nights',
    value: '217',
    grad: 'one more takes off $0.70',
    parts: [
      ['Corporate', '27'],
      ['Direct', '66'],
      ['OTA', '124'],
    ],
  },
]

const moved = [
  { label: 'Direct', value: -13.46 },
  { label: 'OTA', value: -6.0 },
  { label: 'Corporate', value: 4.18 },
]
const scale = Math.max(...moved.map((m) => Math.abs(m.value)))
const signed = (v: number) => `${v < 0 ? '−' : '+'}$${Math.abs(v).toFixed(2)}`

export default function ValuesGraphDiagram() {
  return (
    <figure className="rounded-lg border border-line bg-paper p-4 sm:p-6">
      <figcaption className="text-xs leading-relaxed text-slate">
        One number, opened up: rate per night on the sample hotel data, July 2025
      </figcaption>

      <div className="mt-5">
        <div className="mx-auto w-fit rounded-md border-2 border-brand bg-white px-5 py-3 text-center">
          <p className="text-xs text-slate">Rate per night, on screen</p>
          <p className="text-2xl font-semibold tabular-nums text-ink">$151.37</p>
          <p className="text-xs text-slate">revenue ÷ nights</p>
        </div>

        <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="block h-7 w-full" aria-hidden>
          <path
            d="M50 0 V12 M25 12 H75 M25 12 V28 M75 12 V28"
            fill="none"
            stroke="#b9c3ce"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {leaves.map((l) => (
            <div key={l.measure} className="rounded-md border border-line bg-white p-3 sm:p-4">
              <p className="text-xs font-medium text-slate">{l.measure}</p>
              <p className="mt-0.5 text-lg font-semibold tabular-nums text-ink">{l.value}</p>
              <p className="text-[11px] leading-snug text-slate sm:text-xs">{l.grad}</p>
              <dl className="mt-3 space-y-1 border-t border-line pt-2 text-xs sm:text-sm">
                {l.parts.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2">
                    <dt className="text-slate">{k}</dt>
                    <dd className="tabular-nums text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-2 text-[11px] leading-snug text-slate sm:text-xs">by channel, adds back up</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-line pt-5">
        <p className="text-sm font-medium text-ink">What moved it</p>
        <p className="mt-1 text-sm tabular-nums text-slate">June $166.66 → July $151.37, −$15.29</p>
        <ul className="mt-4 space-y-2.5">
          {moved.map((m) => {
            const width = `${(Math.abs(m.value) / scale) * 50}%`
            return (
              <li key={m.label} className="grid grid-cols-[4.75rem_1fr_3.75rem] items-center gap-3 text-sm">
                <span className="text-body">{m.label}</span>
                <span className="relative h-2.5">
                  <span className="absolute inset-y-[-3px] left-1/2 w-px bg-mist" aria-hidden />
                  <span
                    className={`absolute inset-y-0 ${m.value < 0 ? 'right-1/2 rounded-l' : 'left-1/2 rounded-r'}`}
                    style={{ width, background: m.value < 0 ? NEGATIVE : POSITIVE }}
                    aria-hidden
                  />
                </span>
                <span className="text-right font-medium tabular-nums text-ink">{signed(m.value)}</span>
              </li>
            )
          })}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-slate">
          The parts add up to the change, before rounding to cents. Numbers from our lab installation.
        </p>
      </div>
    </figure>
  )
}
