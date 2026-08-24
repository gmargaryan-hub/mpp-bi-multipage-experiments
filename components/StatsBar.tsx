'use client'

import { motion } from 'framer-motion'

interface Stat {
  value: string
  label: string
}

const stats: Stat[] = [
  { value: '2×–12×', label: 'Faster than traditional BI' },
  { value: '2B+', label: 'Records processed in under 5 seconds' },
  { value: '500', label: 'Concurrent users · 16 cores / 32GB RAM' },
  { value: '51%', label: 'Reduction in payment defaults' },
  { value: '$1M+', label: 'Annual savings from analytics' },
  { value: '100%', label: 'Of functions work in live mode' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function StatsBar() {
  return (
    <section className="relative border-y border-[#E2E8F0] overflow-hidden" style={{
      background: 'radial-gradient(ellipse 80% 100% at 50% 50%, rgba(10,174,219,0.04) 0%, transparent 70%), #F5F7FA'
    }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-[#E2E8F0]"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={item}
              className="flex flex-col items-center gap-1.5 px-6 py-7"
            >
              <span className="text-3xl md:text-4xl font-bold text-[#0AAEDB] font-display leading-none tabular-nums">
                {stat.value}
              </span>
              <span className="text-xs text-[#6B7280] text-center leading-snug max-w-[130px]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
        <p className="text-center text-[10px] text-[#9CA3AF] pb-3">
          Production benchmarks across financial services, oil &amp; gas, insurance, and construction deployments.
        </p>
      </div>
    </section>
  )
}
