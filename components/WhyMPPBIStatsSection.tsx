'use client'

import { motion } from 'framer-motion'
import { Gauge, Layers, ShieldCheck, Palette } from 'lucide-react'

const stats = [
  {
    icon: Gauge,
    label: 'Performance',
    stat: '2B+ records',
    body: 'processed in under 5 seconds',
    color: '#E05A2B',
  },
  {
    icon: Layers,
    label: 'Scalable',
    stat: '500 users',
    body: 'proven at 16 cores / 32GB RAM',
    color: '#10B981',
  },
  {
    icon: ShieldCheck,
    label: 'Proven',
    stat: 'Government-tested',
    body: 'chosen over Power BI by a UN-backed government project',
    color: '#0AAEDB',
  },
  {
    icon: Palette,
    label: 'Customizable',
    stat: 'White-labeled',
    body: 'looks and feels like your own product, not ours',
    color: '#E0459A',
  },
]

export default function WhyMPPBIStatsSection() {
  return (
    <section className="relative py-16 bg-[#0D1B2A]" id="why-glance">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative max-w-[1440px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {stats.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-[#0A0E1A] p-6 flex flex-col gap-4"
              >
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 border"
                  style={{ borderColor: s.color }}
                >
                  <Icon size={14} style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: s.color }}>
                    {s.label}
                  </p>
                  <p className="text-xl font-black font-display leading-tight text-white">{s.stat}</p>
                  <p className="text-xs text-[#94A3B8] mt-1.5">{s.body}</p>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
