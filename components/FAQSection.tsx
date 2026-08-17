'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Can I run MPP BI fully on-premise, with no cloud connection at all?',
    a: "Yes. You can run it entirely on your own servers, on-premises, with no dependency on any cloud provider. You don't even need an internet connection to run it inside your infrastructure. This is one of the main reasons government, healthcare, and finance teams choose it.",
  },
  {
    q: 'We use Power BI today. How hard is it to switch?',
    a: "Easier than most teams expect. You don't have to rebuild everything at once or move your data into a new place. MPP BI connects to the systems you already use, so your data stays where it is while we help you set up your reports and dashboards. We start by looking at what you have in Power BI today and map out a switch that fits your timeline.",
  },
  {
    q: 'Do I need a separate tool to prepare my data?',
    a: 'No. Data preparation, also called ETL (the step where raw data gets cleaned and organized before reporting), is built into MPP BI through our MPP ETL. Tableau and Looker charge for this separately.',
  },
  {
    q: 'Does MPP BI support AI features, like asking questions in plain language?',
    a: "Because MPP BI runs on your own infrastructure, it's a strong fit for advanced AI features such as Agentic BI, where an AI assistant helps you explore and act on your data. Running these on your own servers also avoids the steep costs that cloud-based AI can rack up.",
  },
  {
    q: 'Is MPP BI secure enough for sensitive data?',
    a: 'Yes. MPP BI is built for teams that handle sensitive information, with safe sign-in through your existing company accounts, multi-factor authentication, and encryption for data in transit. You control exactly who sees what, down to individual rows and charts, and every action is logged for review.',
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="relative py-24 bg-[#F5F7FA]" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            FAQ
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A]">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-xl border border-[#E2E8F0] bg-white overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4.5 text-left"
                >
                  <span className="text-sm font-semibold text-[#0D1B2A]">{f.q}</span>
                  <ChevronDown
                    size={16}
                    className={`flex-shrink-0 text-[#9CA3AF] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-[#6B7280] leading-relaxed">{f.a}</p>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
