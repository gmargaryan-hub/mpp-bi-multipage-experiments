'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { openDemoModal } from '@/lib/openDemoModal'

export default function AgenticBIHero() {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden bg-[#0D1B2A]" id="hero">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px]"
          style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.16) 0%, transparent 65%)' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[#7C7AED] text-xs font-semibold tracking-[0.18em] uppercase mb-5"
        >
          Agentic BI
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-white mb-6"
        >
          Advanced AI Feature, <span style={{ color: '#7C7AED' }}>Built Into MPP BI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[#94A3B8] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Agentic BI works alongside your dashboards to detect changes, investigate what is
          driving them, explain the causes, and support next steps for your team.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <button
            onClick={openDemoModal}
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
            style={{ background: '#7C7AED' }}
          >
            Book a Demo
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
