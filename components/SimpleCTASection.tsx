'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { openDemoModal } from '@/lib/openDemoModal'

type Props = {
  eyebrow?: string
  title: string
  body: string
  ctaLabel: string
  /** Override only if this CTA should do something other than open the demo/contact modal. */
  onClickOverride?: () => void
  accentColor?: string
}

export default function SimpleCTASection({
  title,
  body,
  ctaLabel,
  onClickOverride,
  accentColor = '#0AAEDB',
}: Props) {
  return (
    <section className="relative py-28 overflow-hidden bg-[#0D1B2A]" id="booking">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px]"
          style={{ background: `radial-gradient(ellipse, ${accentColor}26 0%, transparent 65%)` }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65 }}
        className="relative z-10 max-w-2xl mx-auto px-6 text-center"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">{title}</h2>
        <p className="text-[#94A3B8] text-lg mb-10 leading-relaxed">{body}</p>
        <button
          onClick={onClickOverride ?? openDemoModal}
          className="group inline-flex items-center gap-2 px-7 py-4 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90"
          style={{ background: accentColor, color: accentColor === '#7C7AED' ? '#fff' : '#0A0E1A' }}
        >
          {ctaLabel}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </motion.div>
    </section>
  )
}
