'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { openDemoModal } from '@/lib/openDemoModal'

export default function HeroSection() {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden bg-[#0D1B2A]" id="hero">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px]"
          style={{ background: 'radial-gradient(ellipse, rgba(10,174,219,0.14) 0%, transparent 65%)' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[#0AAEDB] text-xs font-semibold tracking-[0.18em] uppercase mb-5"
        >
          MPP BI by MPP Insights
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-white mb-6"
        >
          Business Intelligence That Runs{' '}
          <span style={{ color: '#0AAEDB' }}>Inside Your Data</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[#94A3B8] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          MPP BI connects straight to your databases and runs calculations where your data
          already lives — no data copies, no calculation engine, no compromise. Built for
          enterprises that need speed, scale, and full control over their data.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={openDemoModal}
            className="group flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-[#0A0E1A] transition-all duration-200 hover:opacity-90"
            style={{ background: '#0AAEDB' }}
          >
            Book a Demo
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </button>
          <a
            href="/why-mpp-bi"
            className="px-6 py-3.5 rounded-lg text-sm font-semibold text-white/80 border border-white/15 hover:border-white/30 hover:text-white transition-colors"
          >
            See how it compares
          </a>
        </motion.div>
      </div>
    </section>
  )
}
