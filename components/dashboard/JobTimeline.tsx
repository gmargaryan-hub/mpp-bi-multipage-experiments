'use client'

import { useEffect, useRef, useState } from 'react'
import ProductFrame from '@/components/dashboard/ProductFrame'
import { retailDashboards } from '@/components/dashboard/RetailDashboards'

// Phase boundaries in seconds, from the agent's own timestamps when it rebuilt the
// three-page Retail Stores report (tool calls at 77 s, 160 s, 204 s, 433 s, 622 s).
const phases = [
  { name: 'Reads the brief', from: 0, to: 77, body: 'Opens what you attached and lists the tables, measures, pages and visuals it has to produce.' },
  { name: 'Loads the data', from: 77, to: 160, body: 'Creates an atlas and adds the workbook as its data source. Nothing leaves your installation.' },
  { name: 'Models it', from: 160, to: 204, body: 'Builds cubes with your field names and the measures you already use.' },
  { name: 'Builds dashboards', from: 204, to: 433, body: 'One dashboard per page, one chart per visual, each checked with a preview query first.' },
  { name: 'Checks its work', from: 433, to: 622, body: 'Reviews every chart, fixes what is off, and looks at each dashboard as you will see it.' },
  { name: 'Hands it back', from: 622, to: 660, body: 'Writes down what it built and what it could not, so you review before anyone else sees it.' },
]
const END = 660
const SPEED = 22 // the ten minutes play in about thirty seconds

// When each dashlet appears (seconds): Overview at 297 s, Stores at 375 s, Products at 390 s.
const bornAt = (board: number, i: number) => [297, 375, 390][board] + i * 5
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`

export default function JobTimeline({ request, atlas = 'Retail Stores' }: { request: string; atlas?: string }) {
  const [t, setT] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [picked, setPicked] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const pos = useRef(0)
  const started = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      pos.current = END
      setT(END)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        setPlaying(true)
      }
    }, { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!playing) return
    let frame = 0
    let last: number | undefined
    const tick = (now: number) => {
      if (last !== undefined) pos.current = Math.min(END, pos.current + ((now - last) / 1000) * SPEED)
      last = now
      setT(pos.current)
      if (pos.current < END) frame = requestAnimationFrame(tick)
      else setPlaying(false)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [playing])

  const jump = (i: number) => {
    setPlaying(false)
    pos.current = phases[i].to
    setT(phases[i].to)
  }

  const phase = Math.max(0, phases.findIndex((p) => t < p.to) === -1 ? phases.length - 1 : phases.findIndex((p) => t < p.to))
  // Follow the build across pages unless the visitor picked one.
  const auto = t >= 390 && t < 433 ? 2 : t >= 375 && t < 433 ? 1 : 0
  const active = picked ?? auto
  const reviewing = t >= 433 && t < 622

  return (
    <div ref={ref}>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-8">
        <div className="min-w-0">
          <p className="text-xs font-medium text-slate">You ask</p>
          <p className="mt-1.5 rounded-lg rounded-tl-sm bg-tint px-4 py-3 leading-relaxed text-ink">{request}</p>

          <ol className="mt-6 space-y-1">
            {phases.map((p, i) => {
              const state = t >= p.to ? 'done' : i === phase ? 'now' : 'next'
              return (
                <li key={p.name}>
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    className={`grid w-full grid-cols-[1.25rem_1fr_auto] items-baseline gap-2 rounded-md px-2 py-2 text-left transition-colors ${
                      state === 'now' ? 'bg-white shadow-[0_1px_3px_rgba(79,79,155,0.12)]' : 'hover:bg-white/60'
                    }`}
                  >
                    <span
                      className={`mt-1 h-2.5 w-2.5 rounded-full ${state === 'next' ? 'border border-mist' : ''}`}
                      style={state === 'now' ? { background: 'var(--gradient-ai)' } : state === 'done' ? { background: 'var(--color-brand)' } : undefined}
                      aria-hidden
                    />
                    <span>
                      <span className={`block text-sm ${state === 'next' ? 'text-slate' : 'font-medium text-ink'}`}>{p.name}</span>
                      {state === 'now' && <span className="mt-1 block text-[0.8125rem] leading-snug text-body">{p.body}</span>}
                    </span>
                    <span className="font-mono text-xs tabular-nums text-slate">{mmss(p.to - p.from)}</span>
                  </button>
                </li>
              )
            })}
          </ol>
          {t >= END && (
            <p className="mt-4 rounded-lg border border-line bg-white px-4 py-3 text-sm leading-relaxed text-body">
              <span className="font-medium text-ink">Handed back:</span> an atlas with 3 dashboards and 16 charts, plus a note of
              what was built exactly, what was approximated and what was left out. Nothing is shared until you share it.
            </p>
          )}
        </div>

        <div className="min-w-0">
          <ProductFrame
            atlas={atlas}
            dashboards={retailDashboards}
            active={active}
            onSelect={(i) => setPicked(i)}
            shown={(b, i) => t >= bornAt(b, i)}
            highlight={(b, i) => reviewing && Math.floor((t - 433) / 12) % retailDashboards[b].dashlets.length === i}
          />
          <div className="mt-3 flex items-center gap-3" aria-hidden>
            <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-tint">
              {phases.map((p) => (
                <span key={p.name} className="absolute top-0 h-full border-r-2 border-white" style={{ left: `${(p.from / END) * 100}%`, width: `${((p.to - p.from) / END) * 100}%` }} />
              ))}
              <span className="absolute left-0 top-0 h-full" style={{ width: `${(t / END) * 100}%`, background: 'var(--gradient-ai)' }} />
            </div>
            <span className="font-mono text-xs tabular-nums text-slate">{mmss(Math.min(t, 626))} of about 10 min</span>
          </div>
        </div>
      </div>
    </div>
  )
}
