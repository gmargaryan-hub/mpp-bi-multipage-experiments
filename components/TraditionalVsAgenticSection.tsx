'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const rows = [
  { trad: 'You find the right report or dashboard', agentic: 'You describe what you need' },
  { trad: 'Analysts write queries to investigate questions', agentic: 'Agents retrieve and analyze the relevant data' },
  { trad: 'You look for changes in the dashboard', agentic: 'The system can point out important changes' },
  { trad: 'Root cause analysis takes manual work', agentic: 'Agents investigate likely drivers' },
  { trad: 'Building reports and dashboards requires setup', agentic: 'Describe what you need and the system can build it' },
  { trad: 'You need to know how the BI tool works', agentic: 'You can ask the system how to do something' },
]

const flowSteps = ['Goal', 'Plan', 'Retrieve', 'Analyze', 'Verify', 'Answer']

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
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-8">
            From Asking Questions to Delegating the Work
          </h2>

          <p className="text-xs font-bold uppercase tracking-wide text-[#6B7280] mb-2">Traditional BI</p>
          <p className="text-[#374151] text-base leading-relaxed mb-6">
            Helps you explore data through dashboards, reports, and queries. But getting an
            answer can still take time. You may need to find the right report, write a
            query, or ask an analyst to look into the numbers.
          </p>

          <p className="text-xs font-bold uppercase tracking-wide text-[#7C7AED] mb-2">Agentic BI</p>
          <p className="text-[#374151] text-base leading-relaxed">
            Lets you delegate that work. Describe what you need in plain language. The
            agents work through the task step by step, using your data, business
            definitions, and the instructions they are given.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-2 mb-16"
        >
          {flowSteps.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className="px-3.5 py-2 rounded-full text-sm font-semibold text-[#7C7AED] bg-[#7C7AED]/8 border border-[#7C7AED]/20">
                {step}
              </span>
              {i !== flowSteps.length - 1 && <ArrowRight size={14} className="text-[#CBD5E1] flex-shrink-0" />}
            </div>
          ))}
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="text-lg font-bold text-[#0D1B2A] mb-5"
        >
          Traditional BI vs. Agentic BI
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden"
        >
          <p className="sm:hidden text-center text-[10px] text-[#9CA3AF] pt-3">← swipe →</p>
          <div className="overflow-x-auto">
            <div className="min-w-[560px]">
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
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
