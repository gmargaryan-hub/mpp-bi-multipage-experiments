'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { openDemoModal } from '@/lib/openDemoModal'

const saasBenefits = [
  'Read-Only User: $10/seat/month',
  'Creator/Admin: $18/seat/month',
  'Integrated MPP ETL included',
  'All visualization types',
  'Cloud or on-premises deployment',
  'Standard support: +20% of license',
]

const perpetualBenefits = [
  'Read-Only User: $240/seat (billed annually)',
  'Creator/Admin: $432/seat (billed annually)',
  'Integrated MPP ETL included',
  'Full on-premises deployment',
  'Source code available per license',
  'Standard support: +20% of license',
]

export default function PricingSection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 relative bg-[#F5F7FA]" id="pricing">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.1em] uppercase mb-4">Pricing</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-6">
            Transparent Pricing.{' '}
            <span className="gradient-text">No Surprises.</span>
          </h2>
          <p className="text-[#374151] text-lg max-w-2xl mx-auto">
            Two paths to the same world-class analytics platform. Choose what fits your procurement model.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* SaaS Card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm flex flex-col"
            style={{ boxShadow: '0 4px 24px rgba(10,174,219,0.08)' }}
          >
            <div className="absolute -top-3 left-8">
              <span className="bg-[#6B7280] text-white text-xs font-bold px-4 py-1 rounded-full tracking-wider uppercase">
                Subscription
              </span>
            </div>
            <div className="mb-8 mt-2">
              <h3 className="text-2xl font-bold text-[#0D1B2A] mb-2">SaaS Subscription</h3>
              <p className="text-[#6B7280] text-sm">Pay monthly or annually. Scale seats as your team grows.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8 p-5 rounded-xl bg-[#EBF8FD] border border-[#0AAEDB]/20">
              <div className="text-center">
                <div className="text-3xl font-black text-[#0AAEDB] font-display leading-none mb-1">$10</div>
                <div className="text-xs text-[#6B7280]">/ seat / month</div>
                <div className="text-xs text-[#9CA3AF] mt-1 font-medium">Read-Only User</div>
              </div>
              <div className="text-center border-l border-[#0AAEDB]/20">
                <div className="text-3xl font-black text-[#0AAEDB] font-display leading-none mb-1">$18</div>
                <div className="text-xs text-[#6B7280]">/ seat / month</div>
                <div className="text-xs text-[#9CA3AF] mt-1 font-medium">Creator / Admin</div>
              </div>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {saasBenefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-[#374151]">
                  <Check size={14} className="text-[#0AAEDB] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  {b}
                </li>
              ))}
            </ul>
            <button onClick={openDemoModal} className="w-full bg-[#0AAEDB] hover:bg-[#0074A6] text-white font-semibold text-sm px-6 py-3.5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">Book a Demo<ArrowRight size={15} /></button>
          </motion.div>

          {/* Perpetual Card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="relative bg-[#0D1B2A] rounded-2xl p-8 border border-[#0D1B2A] flex flex-col"
          >
            <div className="absolute -top-3 left-8">
              <span className="bg-[#0AAEDB] text-white text-xs font-bold px-4 py-1 rounded-full tracking-wider uppercase">
                Perpetual
              </span>
            </div>
            <div className="mb-8 mt-2">
              <h3 className="text-2xl font-bold text-white mb-2">Perpetual License</h3>
              <p className="text-white/50 text-sm">One-time fee. Own your deployment. Ideal for regulated and air-gapped environments.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8 p-5 rounded-xl bg-[#0AAEDB]/10 border border-[#0AAEDB]/20">
              <div className="text-center">
                <div className="text-3xl font-black text-[#0AAEDB] font-display leading-none mb-1">$240</div>
                <div className="text-xs text-white/50">/ seat / year</div>
                <div className="text-xs text-white/40 mt-1 font-medium">Read-Only User</div>
              </div>
              <div className="text-center border-l border-white/10">
                <div className="text-3xl font-black text-[#0AAEDB] font-display leading-none mb-1">$432</div>
                <div className="text-xs text-white/50">/ seat / year</div>
                <div className="text-xs text-white/40 mt-1 font-medium">Creator / Admin</div>
              </div>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {perpetualBenefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-white/70">
                  <Check size={14} className="text-[#0AAEDB] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  {b}
                </li>
              ))}
            </ul>
            <button onClick={openDemoModal} className="w-full border border-white/30 hover:border-white text-white font-semibold text-sm px-6 py-3.5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">Talk to Sales <ArrowRight size={15} /></button>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 text-sm text-[#6B7280] text-center max-w-2xl mx-auto"
        >
          Tableau Creator starts at ~$75/seat/month. Power BI Pro requires Microsoft 365 and caps capability without Power BI Premium. MPP BI includes integrated ETL, on-premises deployment, and source code availability — with no separate BI server required.
        </motion.p>
      </div>
    </section>
  )
}
