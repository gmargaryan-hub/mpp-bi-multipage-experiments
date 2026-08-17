'use client'

import { motion } from 'framer-motion'
import { Check, Minus } from 'lucide-react'

const groups = [
  {
    label: 'View & Explore',
    rows: [
      { feature: 'View dashboards and reports', readOnly: true, admin: true },
      { feature: 'Filter, drill down, and explore', readOnly: true, admin: true },
      { feature: 'Export Excel reports and PDF/PPTX presentations', readOnly: true, admin: true },
      { feature: 'Ask questions in plain language *', readOnly: true, admin: true },
    ],
  },
  {
    label: 'Build & Prepare',
    rows: [
      { feature: 'Build and edit dashboards', readOnly: false, admin: true },
      { feature: 'Create reports and presentations', readOnly: false, admin: true },
      { feature: 'Prepare data with MPP ETL', readOnly: false, admin: true },
      { feature: 'Set up forecasting', readOnly: false, admin: true },
      { feature: 'Connect new data sources', readOnly: false, admin: true },
      { feature: 'Build dashboards and reports with AI *', readOnly: false, admin: true },
    ],
  },
  {
    label: 'Manage',
    rows: [{ feature: 'Manage users, groups with access and security', readOnly: false, admin: true }],
  },
]

function Cell({ included }: { included: boolean }) {
  return included ? (
    <Check size={15} className="text-[#10B981] mx-auto sm:w-[17px] sm:h-[17px]" />
  ) : (
    <Minus size={13} className="text-[#D1D5DB] mx-auto sm:w-[15px] sm:h-[15px]" />
  )
}

export default function PricingTableSection() {
  return (
    <section className="relative py-24 bg-white" id="monthly">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-[#F97316] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Monthly subscription
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-5">
            Two Seat Types, Priced for How People Actually Use BI
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed">
            Most users in a team only need to view and work with dashboards. Only a small
            group actually builds them. This balance is what keeps costs efficient at scale.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-[#E2E8F0] overflow-hidden"
        >
          <div className="grid grid-cols-[1fr_auto_auto]">
            <div className="p-3 sm:p-5" />
            <div className="p-3 sm:p-5 text-center border-l border-[#E2E8F0] w-20 sm:w-36">
              <p className="text-[9px] sm:text-xs font-bold uppercase tracking-wide text-[#6B7280] mb-1">
                <span className="sm:hidden">Read-Only</span>
                <span className="hidden sm:inline">Read-Only User</span>
              </p>
              <p className="text-lg sm:text-2xl font-black font-display text-[#0D1B2A]">$10</p>
              <p className="text-[8px] sm:text-[10px] text-[#9CA3AF]">
                <span className="sm:hidden">/mo</span>
                <span className="hidden sm:inline">/user per month</span>
              </p>
            </div>
            <div className="p-3 sm:p-5 text-center border-l border-[#E2E8F0] w-20 sm:w-36" style={{ background: '#FFF4EC' }}>
              <p className="text-[9px] sm:text-xs font-bold uppercase tracking-wide text-[#F97316] mb-1">
                <span className="sm:hidden">Admin</span>
                <span className="hidden sm:inline">Admin User</span>
              </p>
              <p className="text-lg sm:text-2xl font-black font-display text-[#0D1B2A]">$18</p>
              <p className="text-[8px] sm:text-[10px] text-[#9CA3AF]">
                <span className="sm:hidden">/mo</span>
                <span className="hidden sm:inline">/user per month</span>
              </p>
            </div>
          </div>

          {groups.map((g) => (
            <div key={g.label}>
              <div className="px-3 sm:px-5 py-2.5 bg-[#F5F7FA] border-t border-[#E2E8F0]">
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#6B7280]">{g.label}</p>
              </div>
              {g.rows.map((r) => (
                <div key={r.feature} className="grid grid-cols-[1fr_auto_auto] border-t border-[#F1F5F9] items-center">
                  <div className="px-3 sm:px-5 py-3.5">
                    <p className="text-xs sm:text-sm text-[#374151] leading-snug">{r.feature}</p>
                  </div>
                  <div className="w-20 sm:w-36 border-l border-[#F1F5F9] py-3.5">
                    <Cell included={r.readOnly} />
                  </div>
                  <div className="w-20 sm:w-36 border-l border-[#F1F5F9] py-3.5" style={{ background: '#FFF4EC40' }}>
                    <Cell included={r.admin} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </motion.div>

        <p className="text-xs text-[#9CA3AF] mt-4">* AI-powered feature.</p>
      </div>
    </section>
  )
}
