'use client'

import { motion } from 'framer-motion'
import { Database, BookMarked, MessageCircleOff, Settings2 } from 'lucide-react'

const points = [
  {
    icon: Database,
    title: 'Same data environment',
    body: "Agentic BI works with the data already connected to MPP BI. You don't need to create a separate data environment for AI.",
  },
  {
    icon: BookMarked,
    title: 'Same business definitions',
    body: 'Agentic BI uses the semantic layer of MPP BI, so business terms such as revenue, customers, or active users follow the definitions your team already uses.',
  },
  {
    icon: MessageCircleOff,
    title: 'No separate chatbot',
    body: "You don't need to move between a BI platform and a separate AI tool. Agentic BI works within the MPP BI environment.",
  },
  {
    icon: Settings2,
    title: 'Your choice of AI model',
    body: "Run Agentic BI with a local LLM on-premise, or connect it to a third-party model such as OpenAI's API. The choice of model does not change the rest of your BI environment.",
  },
]

export default function BuiltIntoMPPBISection() {
  return (
    <section className="relative py-24 bg-white" id="built-in">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <p className="text-[#7C7AED] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Built in, not bolted on
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-5">
            Built Into MPP BI
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed">
            Agentic BI works as part of MPP BI, alongside the dashboards, data models, and
            data sources you already use.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {points.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-[#E2E8F0] p-6 flex gap-4"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: '#7C7AED15', border: '1px solid #7C7AED30' }}
                >
                  <Icon size={18} style={{ color: '#7C7AED' }} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0D1B2A] mb-2 leading-snug">{p.title}</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed">{p.body}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
