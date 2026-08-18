'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, MessageCircle, TrendingUp, Workflow, ArrowRight } from 'lucide-react'

const items = [
  {
    icon: Sparkles,
    title: 'Agentic BI',
    body: 'An AI assistant that works inside MPP BI. Just ask it, in plain words, to pull data, build a dashboard, create a report, or look into a question. It does the work and brings you the answer.',
    link: '/agentic-bi',
    linkLabel: 'Explore Agentic BI',
  },
  {
    icon: MessageCircle,
    title: 'Plain-language summaries',
    body: 'MPP BI can add a sentence or two explaining what it shows, so anyone can understand it.',
  },
  {
    icon: TrendingUp,
    title: 'Forecasting',
    body: "MPP BI looks at your past numbers and shows you what's likely to happen next, so you can plan ahead.",
  },
  {
    icon: Workflow,
    title: 'Build your own AI workflows',
    body: 'Connect AI models into your own step-by-step workflows using a simple, no-code tool. Turn any of your data processes into an AI assistant in just a few clicks.',
  },
]

export default function AIMLFeaturesSection() {
  return (
    <section className="relative py-24 bg-[#F5F7FA]" id="ai-ml">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-[#7C7AED] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            AI &amp; machine learning
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-5">
            AI and Machine Learning Features
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed">
            MPP BI works with AI and machine learning, applied to your own data. These
            features are available on request, so you can add the ones you need, when you
            need them.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {items.map((it, i) => {
            const Icon = it.icon
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-[#E2E8F0] bg-white p-6"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: '#7C7AED15', border: '1px solid #7C7AED30' }}
                >
                  <Icon size={18} style={{ color: '#7C7AED' }} />
                </div>
                <h3 className="text-base font-bold text-[#0D1B2A] mb-2">{it.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-3">{it.body}</p>
                {it.link && (
                  <Link
                    href={it.link}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold"
                    style={{ color: '#7C7AED' }}
                  >
                    {it.linkLabel}
                    <ArrowRight size={13} />
                  </Link>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
