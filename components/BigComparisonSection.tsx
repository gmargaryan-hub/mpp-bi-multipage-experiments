'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

const rows: { feature: string; mpp: string; mppGood?: boolean; tableau: string; tableauGood?: boolean; power: string; powerGood?: boolean }[] = [
  { feature: 'Read-only user / month', mpp: '$10', tableau: '~$35', power: '~$14*' },
  { feature: 'Creator / admin / month', mpp: '$18', tableau: '~$115', power: '~$24' },
  { feature: 'Business logic runs in database', mpp: 'Yes', mppGood: true, tableau: 'No', tableauGood: false, power: 'No', powerGood: false },
  { feature: 'Calculation engine', mpp: 'Not required', mppGood: true, tableau: 'Required', tableauGood: false, power: 'Required', powerGood: false },
  { feature: 'Internal data storage', mpp: 'Not required', mppGood: true, tableau: 'Required', tableauGood: false, power: 'Required', powerGood: false },
  { feature: 'Data extraction required', mpp: 'Never', mppGood: true, tableau: 'Always', tableauGood: false, power: 'Always', powerGood: false },
  { feature: 'Functions in live mode', mpp: '100%', tableau: 'Approx. 60%', power: 'Approx. 60%' },
  { feature: 'On-premises (full)', mpp: 'Yes', mppGood: true, tableau: 'Limited', power: 'Limited' },
  { feature: 'AI/ML integrated on-prem', mpp: 'Built-in', tableau: 'Add-on', power: 'Add-on' },
  { feature: 'Source code available', mpp: 'Per license', mppGood: true, tableau: 'No', tableauGood: false, power: 'No', powerGood: false },
  { feature: '500 concurrent users \u2014 16 cores / 32GB RAM', mpp: 'Production proven', mppGood: true, tableau: 'Not available', tableauGood: false, power: 'Not available', powerGood: false },
  { feature: 'Performance vs traditional BI', mpp: '2x\u201312x faster', tableau: 'Baseline', power: 'Baseline' },
]

function Indicator({ good }: { good?: boolean }) {
  if (good === true) return <Check size={13} className="text-[#10B981] inline mr-1" />
  if (good === false) return <X size={13} className="text-[#E05A2B] inline mr-1" />
  return null
}

export default function BigComparisonSection() {
  return (
    <section className="relative py-24 bg-white" id="comparison">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            The comparison
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-5">
            See How MPP BI Compares
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed">
            Everything that sets MPP BI apart from Tableau and Power BI, in one table.
          </p>
        </motion.div>

        <p className="sm:hidden text-center text-xs text-[#9CA3AF] mb-3">← Swipe to see all columns →</p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-[#E2E8F0] overflow-x-auto"
        >
          <table className="w-full text-sm border-collapse min-w-[640px]">
            <thead>
              <tr>
                <th className="text-left px-5 py-4 bg-[#F5F7FA] text-xs font-bold uppercase tracking-wide text-[#6B7280] border-b border-[#E2E8F0]">
                  Feature
                </th>
                <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wide border-b border-[#E2E8F0]" style={{ background: '#0AAEDB12', color: '#0774A0' }}>
                  MPP BI
                </th>
                <th className="text-left px-5 py-4 bg-[#F5F7FA] text-xs font-bold uppercase tracking-wide text-[#6B7280] border-b border-[#E2E8F0]">
                  Tableau
                </th>
                <th className="text-left px-5 py-4 bg-[#F5F7FA] text-xs font-bold uppercase tracking-wide text-[#6B7280] border-b border-[#E2E8F0]">
                  Power BI
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.feature} className={i !== rows.length - 1 ? 'border-b border-[#F1F5F9]' : ''}>
                  <td className="px-5 py-3.5 text-[#374151]">{r.feature}</td>
                  <td className="px-5 py-3.5 font-semibold text-[#0D1B2A]" style={{ background: '#0AAEDB08' }}>
                    <Indicator good={r.mppGood} />
                    {r.mpp}
                  </td>
                  <td className="px-5 py-3.5 text-[#6B7280]">
                    <Indicator good={r.tableauGood} />
                    {r.tableau}
                  </td>
                  <td className="px-5 py-3.5 text-[#6B7280]">
                    <Indicator good={r.powerGood} />
                    {r.power}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <p className="text-xs text-[#9CA3AF] mt-4 leading-relaxed">
          * Pricing as of Q2 2026. Power BI Pro requires a Microsoft 365 subscription. Full
          enterprise capability requires Power BI Premium at significantly higher cost.
        </p>
      </div>
    </section>
  )
}
