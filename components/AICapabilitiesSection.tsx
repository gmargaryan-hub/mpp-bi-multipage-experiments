'use client'

import { motion } from 'framer-motion'
import { MessageSquare, LayoutDashboard, TrendingUp } from 'lucide-react'

const items = [
  {
    icon: MessageSquare,
    title: 'Ask your data',
    body: 'Ask questions in plain English and get answers based on your business data.',
    example: 'Which region has the highest profit margin?',
  },
  {
    icon: LayoutDashboard,
    title: 'Create dashboards with AI',
    body: 'Describe the dashboard you need, and MPP BI builds it for you. Review and customize it, then share it with your team.',
    example: 'Create a sales dashboard showing revenue by region and top customers.',
  },
  {
    icon: TrendingUp,
    title: 'Forecast what comes next',
    body: 'Use historical data to estimate future trends. This is useful for supporting planning and decision-making.',
    example: null,
  },
]

export default function AICapabilitiesSection() {
  return (
    <section className="relative py-24 bg-[#F5F7FA]" id="ai">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <p className="text-[#7C7AED] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            AI, run on-premise
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-5">
            AI Capabilities Built In
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed">
            Go beyond dashboards. Use AI to ask questions, build reports, discover trends,
            and plan ahead &mdash; all without your data leaving your infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it, i) => {
            const Icon = it.icon
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-[#E2E8F0] bg-white p-6 flex flex-col"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: '#7C7AED15', border: '1px solid #7C7AED30' }}
                >
                  <Icon size={18} style={{ color: '#7C7AED' }} />
                </div>
                <h3 className="text-base font-bold text-[#0D1B2A] mb-2">{it.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-4 flex-1">{it.body}</p>
                {it.example && (
                  <p className="text-xs font-mono px-3 py-2.5 rounded-lg bg-[#F5F7FA] text-[#0D1B2A]/70 border border-[#E2E8F0]">
                    &ldquo;{it.example}&rdquo;
                  </p>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
