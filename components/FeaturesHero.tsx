'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { openDemoModal } from '@/lib/openDemoModal'

export default function FeaturesHero() {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden bg-[#0D1B2A]" id="hero">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px]"
          style={{ background: 'radial-gradient(ellipse, rgba(10,174,219,0.14) 0%, transparent 65%)' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[#0AAEDB] text-xs font-semibold tracking-[0.18em] uppercase mb-5"
        >
          Features
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-white mb-6"
        >
          Enterprise BI, Without <span style={{ color: '#0AAEDB' }}>Enterprise Headaches</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[#94A3B8] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Packed with powerful features that your data team craves.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <button
            onClick={openDemoModal}
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-[#0A0E1A] transition-all duration-200 hover:opacity-90"
            style={{ background: '#0AAEDB' }}
          >
            Book a Demo
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
