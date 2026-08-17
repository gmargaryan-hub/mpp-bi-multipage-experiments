'use client'

import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'

const rows = [
  { dax: 'Built for import, adjusted later for live', mpp: 'Built for live connection from the start' },
  { dax: 'Many functions break or behave differently in live mode', mpp: 'Every function works the same, always' },
  { dax: 'Time-based calculations are limited or disabled', mpp: 'Full time-based calculations, even live' },
  { dax: 'Developers often maintain two versions of the same report', mpp: 'One version. One mode. Always live' },
  { dax: 'Gets slower as calculations get more complex', mpp: 'Speed depends on your database, not the tool' },
]

export default function CalcLanguageSection() {
  return (
    <section className="relative py-24 bg-[#F5F7FA]" id="calc-language">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Calculation language
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-5">
            Built for Live Data From Day One
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed">
            Most BI tools have a formula language built assuming your data would be copied
            in first &mdash; Power BI&apos;s is called DAX. Live connections came later, as an
            add-on, so a large part of the language stops working once you switch to one.
            MPP BI&apos;s calculation language was built for live connections from the very
            first line of code.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden"
        >
          <div className="grid grid-cols-2">
            <div className="px-5 py-4 border-b border-r border-[#E2E8F0] bg-[#FEF2EE]">
              <p className="text-xs font-bold uppercase tracking-wide text-[#E05A2B]">
                DAX in Power BI (Live Connection Mode)
              </p>
            </div>
            <div className="px-5 py-4 border-b border-[#E2E8F0] bg-[#0AAEDB]/8">
              <p className="text-xs font-bold uppercase tracking-wide text-[#0774A0]">
                MPP BI&apos;s Language
              </p>
            </div>
          </div>
          {rows.map((r, i) => (
            <div key={i} className={`grid grid-cols-2 ${i !== rows.length - 1 ? 'border-b border-[#E2E8F0]' : ''}`}>
              <div className="px-5 py-4 border-r border-[#E2E8F0] flex items-start gap-2.5">
                <X size={15} className="text-[#E05A2B] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[#374151] leading-snug">{r.dax}</p>
              </div>
              <div className="px-5 py-4 flex items-start gap-2.5">
                <Check size={15} className="text-[#10B981] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[#374151] leading-snug">{r.mpp}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-[#6B7280] text-sm mt-8 max-w-2xl mx-auto"
        >
          This same language works on both sides of MPP BI &mdash; in the browser and inside
          the database &mdash; so your team isn&apos;t learning two different systems for the
          same task. Developers can also use it inside JavaScript, alongside whatever other
          tools or libraries they already use.
        </motion.p>
      </div>
    </section>
  )
}
