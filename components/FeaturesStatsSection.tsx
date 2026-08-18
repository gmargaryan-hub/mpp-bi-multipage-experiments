'use client'

import { motion } from 'framer-motion'
import { Layers, BarChart3, Sparkles, ShieldCheck, Server } from 'lucide-react'

const stats = [
  {
    icon: Layers,
    label: 'Connect',
    stat: 'Any Source',
    body: 'databases, warehouses, files, and APIs',
    color: '#0AAEDB',
  },
  {
    icon: BarChart3,
    label: 'Visualize',
    stat: '30+ Types',
    body: 'KPIs, maps, and live schematics',
    color: '#E05A2B',
  },
  {
    icon: Sparkles,
    label: 'AI-Powered',
    stat: 'Agentic BI',
    body: 'ask questions, get instant answers',
    color: '#7C7AED',
  },
  {
    icon: ShieldCheck,
    label: 'Secure',
    stat: 'Fully On-Prem',
    body: 'no cloud connection required',
    color: '#10B981',
  },
  {
    icon: Server,
    label: 'Scalable',
    stat: '500 Users',
    body: 'on just two nodes',
    color: '#F97316',
  },
]

export default function FeaturesStatsSection() {
  return (
    <section className="relative py-20 bg-white" id="features-glance">
      <div className="max-w-[1440px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
        >
          {stats.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.label}
                className="rounded-2xl border border-[#E2E8F0] bg-[#F5F7FA] p-6 flex flex-col gap-4"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}
                >
                  <Icon size={18} style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: s.color }}>
                    {s.label}
                  </p>
                  <p className="text-xl font-black font-display leading-tight text-[#0D1B2A]">{s.stat}</p>
                  <p className="text-xs text-[#6B7280] mt-1.5">{s.body}</p>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
