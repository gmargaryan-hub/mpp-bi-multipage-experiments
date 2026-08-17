'use client'

import { motion } from 'framer-motion'
import { HeartPulse, Truck, Radio, Landmark, Fuel, ShoppingCart, Building2 } from 'lucide-react'

const industries = [
  { icon: HeartPulse, name: 'Healthcare', color: '#0AAEDB' },
  { icon: Truck, name: 'Transportation & Logistics', color: '#10B981' },
  { icon: Radio, name: 'Telecom', color: '#6366F1' },
  { icon: Landmark, name: 'Finance & Banking', color: '#F97316' },
  { icon: Fuel, name: 'Oil & Gas', color: '#0AAEDB' },
  { icon: ShoppingCart, name: 'Retail', color: '#10B981' },
  { icon: Building2, name: 'Public Sector', color: '#6366F1' },
]

export default function UseCasesSection() {
  return (
    <section className="relative py-24 bg-white" id="use-cases">
      <div className="max-w-[1440px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Built for industries
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-4">
            We Know the Data Behind Your Industry
          </h2>
          <p className="text-[#374151] text-lg max-w-2xl mx-auto leading-relaxed">
            A dashboard is only useful if it understands the business behind it. We&apos;ve
            delivered projects across these industries, and know the data structures,
            business rules, and day-to-day realities of each one.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5"
        >
          {industries.map((ind) => {
            const Icon = ind.icon
            return (
              <div
                key={ind.name}
                className="card-hover flex flex-col items-center text-center gap-3 p-6 bg-[#F5F7FA] border border-[#E2E8F0] rounded-2xl"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${ind.color}12`, border: `1px solid ${ind.color}30` }}
                >
                  <Icon size={22} style={{ color: ind.color }} />
                </div>
                <p className="text-sm font-semibold text-[#0D1B2A]">{ind.name}</p>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
