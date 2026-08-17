'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { openDemoModal } from '@/lib/openDemoModal'

export default function PerpetualLicenseSection() {
  return (
    <section className="relative py-20 bg-[#F5F7FA]" id="perpetual">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-[#E2E8F0] bg-white p-8 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center"
        >
          <div>
            <p className="text-[#F97316] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
              Perpetual license
            </p>
            <h2 className="font-display text-3xl font-bold text-[#0D1B2A] mb-4">
              Buy Your Seats Instead of Renting Them
            </h2>
            <p className="text-[#374151] text-base leading-relaxed mb-3">
              Most BI platforms (e.g. Tableau and Power BI) keep you on a subscription, so
              the bill never ends. With MPP BI, you pay one time, and the seats are yours
              for good.
            </p>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              A perpetual license pays for itself in about two years, then keeps lowering
              your total cost of ownership.
            </p>
          </div>
          <button
            onClick={openDemoModal}
            className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white whitespace-nowrap transition-all duration-200 hover:opacity-90"
            style={{ background: '#0D1B2A' }}
          >
            Talk to Sales About Perpetual Licensing
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
