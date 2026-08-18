'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, BookOpenCheck, Layers, RefreshCw, Send, Plug } from 'lucide-react'

const enterprisePoints = [
  {
    icon: ShieldCheck,
    title: 'You choose the model',
    body: "Run Agentic BI fully on-premise with a local LLM, or connected to a third-party LLM if you prefer, like OpenAI's API. Either way, it stays part of MPP BI, not a separate chatbot bolted on top.",
  },
  {
    icon: BookOpenCheck,
    title: 'It already understands your business terms',
    body: 'It uses the same semantic layer as MPP BI. That means terms like "revenue" or "active users" already match how your team defines them.',
  },
]

const integrationPoints = [
  { icon: Layers, title: 'Same platform, more capability', body: 'You keep your existing data sources and setup. Agentic BI runs alongside them, not instead of them.' },
  { icon: RefreshCw, title: 'No migration needed', body: 'There\u2019s nothing to move and nothing to rebuild. Agentic BI works with the data and structure you already have in MPP BI.' },
  { icon: Send, title: 'Available on request', body: 'Agentic BI is a feature you can add to your MPP BI setup when you\u2019re ready for it.' },
  { icon: Plug, title: 'Works with the rest of your setup', body: 'Agentic BI can pull from what\u2019s already connected through MPP ETL, so your data prep doesn\u2019t change either.' },
]

export default function EnterpriseAndIntegrationSection() {
  return (
    <section className="relative py-24 bg-white" id="enterprise">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Designed for Enterprise BI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-10"
        >
          <h2 className="text-[#7C7AED] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Designed for enterprise BI
          </h2>
          <p className="font-display text-3xl md:text-4xl font-bold text-[#0D1B2A] mb-5">
            Not a Chatbot Bolted On Top
          </p>
          <p className="text-[#374151] text-lg leading-relaxed">
            Most AI features in BI tools are a chatbot added on top of a dashboard. It
            connects to a third-party AI model and sends your data out to answer a question,
            with little control over where that data goes. MPP BI is built for enterprise
            environments, where control over data and infrastructure matters.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {enterprisePoints.map((p, i) => {
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

        {/* Integration & Compatibility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-10"
        >
          <h2 className="text-[#7C7AED] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Integration &amp; compatibility
          </h2>
          <p className="font-display text-3xl md:text-4xl font-bold text-[#0D1B2A] mb-5">
            Nothing to Migrate, Nothing to Rebuild
          </p>
          <p className="text-[#374151] text-lg leading-relaxed">
            Agentic MPP BI isn&apos;t a new platform you have to learn or migrate to.
            It&apos;s MPP BI with AI capabilities added on top.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {integrationPoints.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-2xl border border-[#E2E8F0] bg-[#F5F7FA] p-5"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: '#7C7AED15', border: '1px solid #7C7AED30' }}
                >
                  <Icon size={16} style={{ color: '#7C7AED' }} />
                </div>
                <h3 className="text-sm font-bold text-[#0D1B2A] mb-1.5 leading-snug">{p.title}</h3>
                <p className="text-[#6B7280] text-xs leading-relaxed">{p.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
