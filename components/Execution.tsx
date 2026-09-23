'use client'

import { useState } from 'react'
import Image from 'next/image'
import { asset } from '@/lib/basePath'

export type Step = { at: number; text: string; groom?: boolean }
export type Result = { src: string; width: number; height: number; caption: string }

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`

/**
 * One goal handed to MPP BI and what it did about it: the request in the user's words,
 * the agent's real steps against its own clock, and screenshots of the real result.
 */
export default function Execution({
  intent,
  steps,
  seconds,
  sources,
  results,
}: {
  intent: string
  steps: Step[]
  seconds: number
  sources?: string
  results: Result[]
}) {
  const [shown, setShown] = useState(0)
  const result = results[shown]
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-10">
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate">The goal</p>
        <p className="mt-1.5 rounded-lg rounded-tl-sm bg-tint px-4 py-3 leading-relaxed text-ink">{intent}</p>
        {sources && <p className="mt-3 text-xs text-slate">Works with: {sources}</p>}

        <p className="mt-6 text-xs font-medium text-slate">What MPP BI did</p>
        <ol className="relative mt-3 space-y-3 border-l border-line pl-5">
          {steps.flatMap((s, i) => [
            ...(s.groom && !steps[i - 1]?.groom
              ? [<li key={`groom-${i}`} className="-ml-5 border-t border-dashed border-line pt-3 text-xs font-medium text-slate">Then you asked it to polish</li>]
              : []),
            <li key={`${s.at}-${s.text}`} className="relative text-sm leading-snug">
              <span className="absolute -left-[1.4rem] top-1.5 h-2 w-2 rounded-full bg-brand" aria-hidden />
              <span className="mr-2 font-mono text-xs tabular-nums text-slate">{mmss(s.at)}</span>
              <span className="text-body">{s.text}</span>
            </li>,
          ])}
          <li className="relative text-sm font-medium text-ink">
            <span className="absolute -left-[1.45rem] top-1 h-2.5 w-2.5 rounded-full" style={{ background: 'var(--gradient-ai)' }} aria-hidden />
            <span className="mr-2 font-mono text-xs tabular-nums text-slate">{mmss(seconds)}</span>
            Done
          </li>
        </ol>
      </div>

      {result && (
      <figure className="min-w-0">
        <div className="overflow-hidden rounded-lg border border-line bg-paper shadow-[0_10px_30px_rgba(25,47,80,0.08)]">
          <Image
            key={result.src}
            src={asset(result.src)}
            alt={result.caption}
            width={result.width}
            height={result.height}
            sizes="(max-width: 1024px) 100vw, 760px"
            className="block h-auto w-full"
          />
        </div>
        <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-slate">
          <span>{result.caption}</span>
          {results.length > 1 && (
            <span className="flex gap-1.5">
              {results.map((r, i) => (
                <button
                  key={r.src}
                  type="button"
                  onClick={() => setShown(i)}
                  aria-label={`Show ${r.caption}`}
                  className={`h-2 w-6 rounded-full ${i === shown ? 'bg-brand' : 'bg-line hover:bg-mist'}`}
                />
              ))}
            </span>
          )}
        </figcaption>
      </figure>
      )}
    </div>
  )
}
