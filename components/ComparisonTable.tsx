'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, AlertTriangle } from 'lucide-react'

type CellValue =
  | { type: 'check' }
  | { type: 'x' }
  | { type: 'partial'; label: string }
  | { type: 'text'; label: string }
  | { type: 'highlight'; label: string }
  | { type: 'warn'; label: string }

interface Row {
  label: string
  mpp: CellValue
  tableau: CellValue
  powerbi: CellValue
}

const rows: Row[] = [
  { label: 'Read-only user / month', mpp: { type: 'highlight', label: '$10' }, tableau: { type: 'text', label: '~$35' }, powerbi: { type: 'text', label: '~$14*' } },
  { label: 'Creator / admin / month', mpp: { type: 'highlight', label: '$18' }, tableau: { type: 'text', label: '~$115' }, powerbi: { type: 'text', label: '~$24' } },
  { label: 'Perpetual license', mpp: { type: 'check' }, tableau: { type: 'x' }, powerbi: { type: 'x' } },
  { label: 'Business logic runs in database', mpp: { type: 'check' }, tableau: { type: 'x' }, powerbi: { type: 'x' } },
  { label: 'Calculation engine', mpp: { type: 'highlight', label: 'None' }, tableau: { type: 'text', label: 'Hyper' }, powerbi: { type: 'text', label: 'VertiPaq' } },
  { label: 'Internal data storage', mpp: { type: 'highlight', label: 'None' }, tableau: { type: 'text', label: 'Required' }, powerbi: { type: 'text', label: 'Required' } },
  { label: 'Data extraction required', mpp: { type: 'highlight', label: 'Never' }, tableau: { type: 'text', label: 'Always' }, powerbi: { type: 'text', label: 'Always' } },
  { label: '100% functions in live mode', mpp: { type: 'check' }, tableau: { type: 'partial', label: 'Approx. 60%' }, powerbi: { type: 'partial', label: 'Approx. 60%' } },
  { label: 'On-premises (full)', mpp: { type: 'check' }, tableau: { type: 'partial', label: 'Limited' }, powerbi: { type: 'partial', label: 'Limited' } },
  { label: 'AI/ML integrated on-prem', mpp: { type: 'highlight', label: 'Native' }, tableau: { type: 'partial', label: 'Add-on' }, powerbi: { type: 'partial', label: 'Add-on' } },
  { label: 'Source code available', mpp: { type: 'highlight', label: 'Per license' }, tableau: { type: 'x' }, powerbi: { type: 'x' } },
  { label: 'Hot/Warm/Cold data layers', mpp: { type: 'check' }, tableau: { type: 'x' }, powerbi: { type: 'x' } },
  { label: '500 concurrent users — 16 cores / 32GB RAM', mpp: { type: 'highlight', label: 'Production proven' }, tableau: { type: 'partial', label: 'Requires Premium' }, powerbi: { type: 'partial', label: 'Requires Premium' } },
  { label: '2B+ records in under 5 seconds', mpp: { type: 'highlight', label: 'Production proven' }, tableau: { type: 'warn', label: 'Not validated' }, powerbi: { type: 'warn', label: 'Not validated' } },
  { label: 'Performance vs traditional BI', mpp: { type: 'highlight', label: '2x–12x faster' }, tableau: { type: 'text', label: 'Baseline' }, powerbi: { type: 'text', label: 'Baseline' } },
  { label: 'Integrated ETL', mpp: { type: 'highlight', label: 'Included' }, tableau: { type: 'x' }, powerbi: { type: 'partial', label: 'Limited' } },
]

function Cell({ value, isMpp = false }: { value: CellValue; isMpp?: boolean }) {
  if (value.type === 'check') {
    return (
      <div className="flex justify-center">
        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#10B981]/15 border border-[#10B981]/30">
          <Check size={13} className="text-[#10B981]" strokeWidth={3} />
        </div>
      </div>
    )
  }
  if (value.type === 'x') {
    return (
      <div className="flex justify-center">
        <div className="w-5 h-5 rounded-full bg-[#F3F4F6] flex items-center justify-center">
          <X size={11} className="text-[#D1D5DB]" strokeWidth={2.5} />
        </div>
      </div>
    )
  }
  if (value.type === 'partial') {
    return <div className="flex justify-center"><span className="text-xs text-[#F59E0B] font-medium">{value.label}</span></div>
  }
  if (value.type === 'warn') {
    return (
      <div className="flex justify-center items-center gap-1">
        <AlertTriangle size={11} className="text-[#9CA3AF]" />
        <span className="text-xs text-[#9CA3AF]">{value.label}</span>
      </div>
    )
  }
  if (value.type === 'highlight') {
    return <div className="flex justify-center"><span className={`text-sm font-bold ${isMpp ? 'text-[#0AAEDB]' : 'text-[#6B7280]'}`}>{value.label}</span></div>
  }
  return <div className="flex justify-center"><span className="text-sm text-[#6B7280]">{value.label}</span></div>
}

export default function ComparisonTable() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 relative bg-white" id="comparison">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.1em] uppercase mb-4">By the Numbers</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-6">
            The Numbers <span className="gradient-text">Don&apos;t Lie.</span>
          </h2>
          <p className="text-[#374151] text-lg max-w-2xl mx-auto">
            How MPP BI compares to the tools your team is already evaluating.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="overflow-x-auto rounded-2xl border border-[#E2E8F0] shadow-sm"
        >
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-[#0D1B2A] text-white">
                <th className="text-left py-4 px-6 text-sm font-semibold w-[42%]">Feature</th>
                <th className="py-4 px-4 text-center bg-[#0AAEDB]/20 border-l-2 border-[#0AAEDB]">
                  <span className="text-sm font-bold text-[#0AAEDB]">MPP BI</span>
                </th>
                <th className="py-4 px-4 text-center text-sm font-semibold text-white/70">Tableau</th>
                <th className="py-4 px-4 text-center text-sm font-semibold text-white/70">Power BI</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} className={`border-b border-[#E2E8F0] hover:bg-[#F5F7FA] transition-colors ${i % 2 === 0 ? '' : 'bg-[#FAFAFA]'}`}>
                  <td className="py-3.5 px-6 text-sm text-[#374151] font-medium">{row.label}</td>
                  <td className="py-3.5 px-4 bg-[#EBF8FD]/60 border-l-2 border-[#0AAEDB]"><Cell value={row.mpp} isMpp /></td>
                  <td className="py-3.5 px-4"><Cell value={row.tableau} /></td>
                  <td className="py-3.5 px-4"><Cell value={row.powerbi} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-5 text-xs text-[#9CA3AF] text-center max-w-2xl mx-auto"
        >
          Pricing as of Q1 2026. *Power BI Pro requires Microsoft 365 subscription. Full enterprise capability requires Power BI Premium at significantly higher cost.
        </motion.p>
      </div>
    </section>
  )
}
