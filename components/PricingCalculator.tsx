'use client'

import { useState } from 'react'

const VIEWER_PRICE = 10
const CREATOR_PRICE = 18

function Slider({ label, price, value, max, onChange }: { label: string; price: number; value: number; max: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-4">
        <span className="font-medium text-ink">{label}</span>
        <span className="text-sm text-slate">${price} per seat</span>
      </span>
      <span className="mt-3 flex items-center gap-4">
        <input
          type="range"
          min={0}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-brand"
        />
        <input
          type="number"
          min={0}
          value={value}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
          className="w-20 rounded-md border border-line px-2 py-1.5 text-right text-ink tabular-nums"
          aria-label={`${label} count`}
        />
      </span>
    </label>
  )
}

export default function PricingCalculator() {
  const [viewers, setViewers] = useState(50)
  const [creators, setCreators] = useState(5)
  const monthly = viewers * VIEWER_PRICE + creators * CREATOR_PRICE

  return (
    <div className="grid gap-10 rounded-lg border border-line bg-white p-6 sm:p-8 md:grid-cols-[1.4fr_1fr]">
      <div className="space-y-8">
        <Slider label="Viewers" price={VIEWER_PRICE} value={viewers} max={500} onChange={setViewers} />
        <Slider label="Creators and admins" price={CREATOR_PRICE} value={creators} max={100} onChange={setCreators} />
      </div>
      <dl className="grid content-start gap-6 border-t border-line pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0">
        <div>
          <dt className="text-sm text-slate">Per month</dt>
          <dd className="text-4xl font-semibold tracking-tight text-ink tabular-nums">${monthly.toLocaleString('en-US')}</dd>
        </div>
        <div>
          <dt className="text-sm text-slate">Per year</dt>
          <dd className="text-2xl font-semibold text-ink tabular-nums">${(monthly * 12).toLocaleString('en-US')}</dd>
        </div>
      </dl>
    </div>
  )
}
