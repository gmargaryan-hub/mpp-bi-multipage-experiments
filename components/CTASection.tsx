'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { openDemoModal } from '@/lib/openDemoModal'

export default function CTASection() {
  return (
    <section className="relative py-28 overflow-hidden bg-[#0D1B2A]" id="booking">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px]"
          style={{ background: 'radial-gradient(ellipse, rgba(10,174,219,0.14) 0%, transparent 65%)' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65 }}
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
          See How MPP BI Fits Your Setup
        </h2>
        <p className="text-[#94A3B8] text-lg mb-10 leading-relaxed">
          You have a specific environment, specific data, and specific rules you have to work
          within. The fastest way to know if MPP BI is the right fit is to show us.
        </p>
        <button
          onClick={openDemoModal}
          className="group inline-flex items-center gap-2 px-7 py-4 rounded-lg text-sm font-semibold text-[#0A0E1A] transition-all duration-200 hover:opacity-90"
          style={{ background: '#0AAEDB' }}
        >
          Talk to Our Team
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </motion.div>
    </section>
  )
}
