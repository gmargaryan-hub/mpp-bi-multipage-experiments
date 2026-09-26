'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { asset } from '@/lib/basePath'
import { buttonClass } from '@/components/ui'
import type { Goal } from '@/lib/goals'

/** Our top cases as goals: pick one and see what the agent did with it and what came out. */
export default function GoalShowcase({ goals }: { goals: Goal[] }) {
  const [active, setActive] = useState(0)
  const g = goals[active]
  if (!g) return null
  return (
    <div>
      <div role="tablist" aria-label="Goals" className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {goals.map((x, i) => (
          <button
            key={x.slug}
            id={`goal-tab-${x.slug}`}
            role="tab"
            aria-selected={i === active}
            aria-controls="goal-panel"
            type="button"
            onClick={() => setActive(i)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
              i === active ? 'border-brand bg-brand text-white' : 'border-line bg-white text-body hover:border-mist'
            }`}
          >
            {x.tab}
          </button>
        ))}
      </div>

      <div id="goal-panel" role="tabpanel" aria-labelledby={`goal-tab-${g.slug}`}>
        <div className="max-w-3xl">
          <p className="text-xs font-medium text-slate">The goal</p>
          <p className="mt-1.5 rounded-lg rounded-tl-sm bg-tint px-4 py-3 text-lg leading-relaxed text-ink">{g.goal}</p>
          <p className="mt-2 text-xs text-slate">Data: {g.data}</p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] lg:gap-10">
          <figure className="min-w-0">
            <div className="overflow-hidden rounded-lg border border-line bg-brand-deep shadow-[0_10px_30px_rgba(25,47,80,0.10)]">
              <Image
                key={g.shot.src}
                src={asset(g.shot.src)}
                alt={g.shot.alt}
                width={g.shot.width}
                height={g.shot.height}
                className="block h-auto w-full"
                priority={active === 0}
                unoptimized
              />
            </div>
            <figcaption className="mt-3">
              <Link href={`/showcase#${g.slug}`} className={buttonClass.link}>
                See it in the showcase
              </Link>
            </figcaption>
          </figure>

          <div className="min-w-0">
            <p className="text-xs font-medium text-slate">What the agent did</p>
            <ol className="mt-3 space-y-5">
              {g.steps.map((s, i) => (
                <li key={s.text} className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand font-mono text-xs text-white" aria-hidden>
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wide text-brand">{s.tag}</p>
                    <p className="mt-0.5 text-sm leading-snug text-body">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
