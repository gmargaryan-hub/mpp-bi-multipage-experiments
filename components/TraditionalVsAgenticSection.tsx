'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const rows = [
  { trad: 'Analysts pull data and build reports', agentic: 'Answers are generated on demand' },
  { trad: 'You read the dashboard to find the insight', agentic: 'The system adds a plain-language explanation alongside it' },
  { trad: 'Root cause analysis is manual', agentic: 'The system helps narrow down likely drivers' },
  { trad: 'Work is centered around reports', agentic: 'Work is centered around questions' },
  { trad: 'Building a dashboard or report takes manual setup', agentic: 'Describe what you need, and the system builds it' },
]

export default function TraditionalVsAgenticSection() {
  return (
    <section className="relative py-24 bg-white" id="comparison">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <p className="text-[#7C7AED] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            The shift
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-5">
            Traditional BI vs. Agentic BI
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed">
            Agentic BI doesn&apos;t replace your dashboards &mdash; it adds a layer on top
            that notices, explains, and answers.
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
            <div className="px-5 py-4 border-b border-r border-[#E2E8F0] bg-[#F5F7FA]">
              <p className="text-xs font-bold uppercase tracking-wide text-[#6B7280]">Traditional BI</p>
            </div>
            <div className="px-5 py-4 border-b border-[#E2E8F0]" style={{ background: '#7C7AED12' }}>
              <p className="text-xs font-bold uppercase tracking-wide text-[#7C7AED]">Agentic BI</p>
            </div>
          </div>
          {rows.map((r, i) => (
            <div key={i} className={`grid grid-cols-2 ${i !== rows.length - 1 ? 'border-b border-[#E2E8F0]' : ''}`}>
              <div className="px-5 py-4 border-r border-[#E2E8F0] flex items-center">
                <p className="text-sm text-[#6B7280] leading-snug">{r.trad}</p>
              </div>
              <div className="px-5 py-4 flex items-start gap-2.5">
                <ArrowRight size={15} className="text-[#7C7AED] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[#0D1B2A] font-medium leading-snug">{r.agentic}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
