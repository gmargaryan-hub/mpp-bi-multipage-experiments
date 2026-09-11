'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const flowSteps = ['A question', 'the right data', 'analysis', 'an explanation', 'the next step']

export default function DataToActionSection() {
  return (
    <section className="relative py-24 bg-[#0D1B2A] overflow-hidden" id="one-environment">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#7C7AED] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            One environment
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            From Data to Action, In One Environment
          </h2>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            MPP BI already brings data, preparation, analytics, dashboards, and reporting
            into one environment. Agentic BI adds a new way to work with all of it. Your
            team can move from:
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {flowSteps.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className="px-3.5 py-2 rounded-full text-sm font-semibold text-white bg-white/8 border border-white/15">
                {step}
              </span>
              {i !== flowSteps.length - 1 && <ArrowRight size={14} className="text-white/30 flex-shrink-0" />}
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[#94A3B8] text-sm"
        >
          without having to manually manage every part of the process.
        </motion.p>
      </div>
    </section>
  )
}
