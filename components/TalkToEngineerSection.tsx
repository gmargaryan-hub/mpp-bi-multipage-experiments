'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { openDemoModal } from '@/lib/openDemoModal'

export default function TalkToEngineerSection() {
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
        className="relative z-10 max-w-2xl mx-auto px-6 text-center"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
          Talk to an Engineer
        </h2>
        <p className="text-[#94A3B8] text-lg mb-10 leading-relaxed">
          If you have any architecture questions &mdash; how pushdown queries work with your
          database, how the metadata layer handles permissions, or what deployment looks
          like in your environment &mdash; book a call with our technical staff.
        </p>
        <button
          onClick={openDemoModal}
          className="group inline-flex items-center gap-2 px-7 py-4 rounded-lg text-sm font-semibold text-[#0A0E1A] transition-all duration-200 hover:opacity-90"
          style={{ background: '#0AAEDB' }}
        >
          Book a Technical Demo
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </motion.div>
    </section>
  )
}
