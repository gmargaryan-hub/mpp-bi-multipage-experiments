'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Server, Layers } from 'lucide-react'

const stats = [
  {
    icon: MessageCircle,
    label: 'Ask',
    stat: 'Plain Language',
    body: 'type a question, get an answer',
    color: '#7C7AED',
  },
  {
    icon: Server,
    label: 'Infrastructure',
    stat: 'Your Choice',
    body: 'on-prem or third-party LLM',
    color: '#6366F1',
  },
  {
    icon: Layers,
    label: 'Integration',
    stat: 'No Migration',
    body: 'built into your existing MPP BI setup',
    color: '#10B981',
  },
]

export default function AgenticBIStatsSection() {
  return (
    <section className="relative py-20 bg-white" id="agentic-glance">
      <div className="max-w-[1440px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5"
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
