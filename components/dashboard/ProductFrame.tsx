'use client'

import { MoreVertical } from 'lucide-react'
import { asset } from '@/lib/basePath'
import type { DashboardDef } from '@/components/dashboard/RetailDashboards'

/**
 * A dashboard in MPP BI's own chrome: breadcrumb bar, dashboard list, white dashlet
 * cards on the product's lavender background. `shown` controls which dashlets exist yet.
 */
export default function ProductFrame({
  atlas,
  dashboards,
  active,
  onSelect,
  shown = () => true,
  highlight,
}: {
  atlas: string
  dashboards: DashboardDef[]
  active: number
  onSelect?: (i: number) => void
  shown?: (dashboard: number, dashlet: number) => boolean
  highlight?: (dashboard: number, dashlet: number) => boolean
}) {
  const board = dashboards[active]
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-[#f1f1f8] text-ink shadow-[0_10px_30px_rgba(79,79,155,0.08)]">
      <div className="flex h-11 items-center gap-3 border-b border-line bg-white px-3 sm:px-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset('/brand/logo.svg')} alt="" className="h-5 w-5" />
        <p className="min-w-0 truncate text-xs text-slate">
          Atlases <span className="mx-1 text-mist">›</span> {atlas} <span className="mx-1 text-mist">›</span>
          <span className="font-medium text-ink">{board.title}</span>
        </p>
        <span className="ml-auto hidden h-5 w-5 rounded-full sm:block" style={{ background: 'var(--gradient-ai)' }} title="AI assistant" />
      </div>
      <div className="flex">
        <nav className="hidden w-36 shrink-0 border-r border-line bg-white py-2 md:block" aria-label="Dashboards">
          {dashboards.map((d, i) => (
            <button
              key={d.title}
              type="button"
              onClick={() => onSelect?.(i)}
              className={`block w-full px-3 py-1.5 text-left text-xs ${i === active ? 'bg-[#e9e9f5] font-medium text-ink' : 'text-slate hover:text-ink'}`}
            >
              {d.title}
            </button>
          ))}
        </nav>
        <div className="min-w-0 flex-1 p-2 sm:p-2.5">
          <div className="mb-2 flex gap-1 md:hidden">
            {dashboards.map((d, i) => (
              <button key={d.title} type="button" onClick={() => onSelect?.(i)} className={`rounded px-2 py-1 text-[0.6875rem] ${i === active ? 'bg-white font-medium text-ink' : 'text-slate'}`}>
                {d.title}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {board.dashlets.map((d, i) => {
              const on = shown(active, i)
              return (
                <div
                  key={d.title}
                  className={`flex flex-col rounded-md bg-white p-2.5 transition-all duration-500 ${
                    d.span === 4 ? 'col-span-2 lg:col-span-4' : d.span === 2 ? 'col-span-2' : ''
                  } ${d.tall ? 'h-44 sm:h-48' : 'h-[5.5rem]'} ${on ? 'opacity-100' : 'opacity-0'} ${
                    highlight?.(active, i) ? 'ring-2 ring-brand/40' : ''
                  }`}
                >
                  <div className="mb-1.5 flex items-center justify-between">
                    <p className="truncate text-[0.75rem] font-semibold text-ink">{d.title}</p>
                    <MoreVertical size={12} className="shrink-0 text-mist" aria-hidden />
                  </div>
                  <div className="min-h-0 flex-1">{d.body}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
