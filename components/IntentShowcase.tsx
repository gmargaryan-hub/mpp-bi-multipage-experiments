'use client'

import { useState } from 'react'
import Execution from '@/components/Execution'
import type { Intent } from '@/lib/intents'

/** A set of real goals: pick one and see what MPP BI did with it. */
export default function IntentShowcase({ intents }: { intents: Intent[] }) {
  const [active, setActive] = useState(0)
  const it = intents[active]
  if (!it) return null
  return (
    <div>
      {intents.length > 1 && (
        <div role="tablist" aria-label="Goals" className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {intents.map((x, i) => (
            <button
              key={x.slug}
              role="tab"
              aria-selected={i === active}
              type="button"
              onClick={() => setActive(i)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                i === active ? 'border-brand bg-brand text-white' : 'border-line bg-white text-body hover:border-mist'
              }`}
            >
              {x.kind}
            </button>
          ))}
        </div>
      )}
      <Execution key={it.slug} intent={it.intent} steps={it.steps} seconds={it.seconds} sources={it.sources} results={it.results} />
    </div>
  )
}
