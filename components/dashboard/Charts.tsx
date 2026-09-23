// Small, real-data charts drawn in the MPP BI product palette (themes.js: primary
// #6666AD / #9797C4 lavender, highlight #E85498 for the second series).

export const palette = { a: '#6666ad', b: '#e85498', c: '#9797c4', grid: '#e3e3f0', text: '#686868' }

type Pair = readonly [string, number]

const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : `${Math.round(n)}`)

export function Card({ value }: { value: string }) {
  return <p className="text-2xl font-semibold tracking-tight text-ink tabular-nums sm:text-[1.75rem]">{value}</p>
}

export function Columns({ data, color = palette.a }: { data: readonly Pair[]; color?: string }) {
  const max = Math.max(...data.map((d) => d[1]))
  const w = 300, h = 130, bw = (w - 20) / data.length
  return (
    <svg viewBox={`0 0 ${w} ${h + 16}`} className="h-full w-full" role="img">
      {[0.5, 1].map((f) => <line key={f} x1={0} x2={w} y1={h - f * (h - 8)} y2={h - f * (h - 8)} stroke={palette.grid} />)}
      {data.map(([k, v], i) => {
        const bh = (v / max) * (h - 8)
        return (
          <g key={k}>
            <rect x={10 + i * bw + bw * 0.18} y={h - bh} width={bw * 0.64} height={bh} rx={2} fill={color} />
            <text x={10 + i * bw + bw / 2} y={h + 12} textAnchor="middle" fontSize={9} fill={palette.text}>{k.length > 9 ? k.slice(0, 8) + '…' : k}</text>
          </g>
        )
      })}
    </svg>
  )
}

export function Bars({ data, color = palette.a }: { data: readonly Pair[]; color?: string }) {
  const max = Math.max(...data.map((d) => d[1]))
  const rows = data.slice(0, 8), rh = 16
  return (
    <svg viewBox={`0 0 300 ${rows.length * rh + 4}`} className="h-full w-full" role="img">
      {rows.map(([k, v], i) => (
        <g key={k} transform={`translate(0 ${i * rh + 2})`}>
          <text x={0} y={10} fontSize={9} fill={palette.text}>{k.length > 16 ? k.slice(0, 15) + '…' : k}</text>
          <rect x={92} y={2} width={((300 - 130) * v) / max} height={10} rx={2} fill={color} />
          <text x={96 + ((300 - 130) * v) / max} y={10} fontSize={8.5} fill={palette.text}>{fmt(v)}</text>
        </g>
      ))}
    </svg>
  )
}

export function Line({ data }: { data: readonly Pair[] }) {
  const max = Math.max(...data.map((d) => d[1])), min = Math.min(...data.map((d) => d[1]))
  const w = 300, h = 130
  const x = (i: number) => 6 + (i * (w - 12)) / (data.length - 1)
  const y = (v: number) => 8 + (1 - (v - min) / (max - min)) * (h - 16)
  const pts = data.map(([, v], i) => `${x(i)},${y(v)}`).join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${h + 16}`} className="h-full w-full" role="img">
      {[0, 0.5, 1].map((f) => <line key={f} x1={0} x2={w} y1={8 + f * (h - 16)} y2={8 + f * (h - 16)} stroke={palette.grid} />)}
      <polygon points={`${x(0)},${h} ${pts} ${x(data.length - 1)},${h}`} fill={palette.a} opacity={0.08} />
      <polyline points={pts} fill="none" stroke={palette.a} strokeWidth={2} strokeLinejoin="round" />
      {[0, Math.floor(data.length / 2), data.length - 1].map((i) => (
        <text key={i} x={x(i)} y={h + 12} textAnchor={i === 0 ? 'start' : i === data.length - 1 ? 'end' : 'middle'} fontSize={9} fill={palette.text}>{data[i][0]}</text>
      ))}
    </svg>
  )
}

export function Donut({ data, center }: { data: readonly Pair[]; center?: string }) {
  const total = data.reduce((s, d) => s + d[1], 0)
  const colors = [palette.a, palette.b, palette.c]
  const r = 42, c = 2 * Math.PI * r
  let acc = 0
  return (
    <div className="flex h-full items-center gap-3">
      <svg viewBox="0 0 110 110" className="h-full max-h-32 w-auto shrink-0" role="img">
        {data.map(([k, v], i) => {
          const len = (v / total) * c
          const el = <circle key={k} cx={55} cy={55} r={r} fill="none" stroke={colors[i % 3]} strokeWidth={16} strokeDasharray={`${len} ${c}`} strokeDashoffset={-acc} transform="rotate(-90 55 55)" />
          acc += len
          return el
        })}
        {center && <text x={55} y={59} textAnchor="middle" fontSize={11} fontWeight={600} fill="#363636">{center}</text>}
      </svg>
      <ul className="space-y-1 text-[0.6875rem] text-slate">
        {data.map(([k, v], i) => (
          <li key={k} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: colors[i % 3] }} />
            {k} <span className="tabular-nums text-ink">{Math.round((v / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Scatter({ data }: { data: readonly (readonly [string, number, number])[] }) {
  const xs = data.map((d) => d[2]), ys = data.map((d) => d[1])
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)]
  const w = 300, h = 130
  return (
    <svg viewBox={`0 0 ${w} ${h + 16}`} className="h-full w-full" role="img">
      <line x1={20} x2={w} y1={h} y2={h} stroke={palette.grid} /><line x1={20} x2={20} y1={0} y2={h} stroke={palette.grid} />
      {data.map(([k, ty, u]) => {
        const cx = 34 + ((u - x0) / (x1 - x0 || 1)) * (w - 70), cy = 14 + (1 - (ty - y0) / (y1 - y0 || 1)) * (h - 30)
        return <g key={k}><circle cx={cx} cy={cy} r={5} fill={palette.a} opacity={0.85} /><text x={cx + 8} y={cy + 3} fontSize={8.5} fill={palette.text}>{k}</text></g>
      })}
      <text x={w} y={h + 12} textAnchor="end" fontSize={8.5} fill={palette.text}>units →</text>
      <text x={24} y={8} fontSize={8.5} fill={palette.text}>avg ticket</text>
    </svg>
  )
}

export function Stacked({ data }: { data: readonly (readonly [string, number, number])[] }) {
  const max = Math.max(...data.map((d) => d[1] + d[2]))
  const w = 300, h = 120, bw = (w - 8) / data.length
  return (
    <div className="flex h-full flex-col">
      <svg viewBox={`0 0 ${w} ${h}`} className="min-h-0 w-full flex-1" role="img" preserveAspectRatio="none">
        {data.map(([k, a, b], i) => {
          const ha = (a / max) * (h - 4), hb = (b / max) * (h - 4)
          return <g key={k}><rect x={4 + i * bw + 1} y={h - ha} width={bw - 2} height={ha} fill={palette.a} /><rect x={4 + i * bw + 1} y={h - ha - hb} width={bw - 2} height={hb} fill={palette.b} /></g>
        })}
      </svg>
      <p className="mt-1 flex gap-3 text-[0.6875rem] text-slate">
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ background: palette.a }} />In-store</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ background: palette.b }} />Online</span>
      </p>
    </div>
  )
}

export function Treemap({ data }: { data: readonly Pair[] }) {
  // Simple slice-and-dice: first item takes a column, the rest split the remainder.
  const total = data.reduce((s, d) => s + d[1], 0)
  const [first, ...rest] = data
  const restTotal = total - first[1]
  const w1 = (first[1] / total) * 100
  const colors = [palette.a, '#7f7fbb', palette.c, '#b9b9da', '#d2d2e8']
  return (
    <div className="flex h-full gap-0.5 text-[0.6875rem] text-white">
      <div className="flex flex-col justify-end rounded-sm p-1.5" style={{ width: `${w1}%`, background: colors[0] }}>{first[0]}</div>
      <div className="flex flex-1 flex-col gap-0.5">
        {rest.map(([k, v], i) => (
          <div key={k} className="flex items-end rounded-sm p-1.5" style={{ flex: v / restTotal, background: colors[(i + 1) % colors.length], color: i > 1 ? '#363636' : 'white' }}>{k}</div>
        ))}
      </div>
    </div>
  )
}

export function Table({ head, rows }: { head: string[]; rows: readonly (readonly (string | number)[])[] }) {
  return (
    <table className="w-full text-left text-[0.6875rem] tabular-nums">
      <thead className="text-slate"><tr>{head.map((h, i) => <th key={h} className={`border-b border-line py-1 font-medium ${i ? 'text-right' : ''}`}>{h}</th>)}</tr></thead>
      <tbody>
        {rows.slice(0, 6).map((r) => (
          <tr key={String(r[0])}>{r.map((c, i) => <td key={i} className={`border-b border-line/60 py-1 text-ink ${i ? 'text-right' : ''}`}>{typeof c === 'number' ? c.toLocaleString('en-US') : c}</td>)}</tr>
        ))}
      </tbody>
    </table>
  )
}

export function Slicer({ options }: { options: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o, i) => (
        <span key={o} className={`rounded-full border px-2.5 py-1 text-[0.6875rem] ${i === 0 ? 'border-brand bg-brand text-white' : 'border-line text-slate'}`}>{o}</span>
      ))}
    </div>
  )
}
