'use client'

import { motion } from 'framer-motion'
import { MessageSquare, TrendingUp, Lightbulb, LayoutDashboard, LifeBuoy } from 'lucide-react'

const features = [
  {
    icon: MessageSquare,
    title: 'Ask questions about your data',
    body: 'Ask questions in plain language. Agentic BI finds the relevant data and gives you an answer based on your business definitions.',
  },
  {
    icon: TrendingUp,
    title: 'Investigate what changed',
    body: 'When a number changes, Agentic BI can look into the data and help identify the factors that may be driving the change.',
  },
  {
    icon: Lightbulb,
    title: 'Explain the answer',
    body: "You don't have to work through the numbers yourself. Agentic BI can explain the result in plain language and show the reasoning behind it.",
  },
  {
    icon: LayoutDashboard,
    title: 'Build what you need',
    body: 'Describe a dashboard, report, or data cube in plain language. Agentic BI can help create it, then you can review and edit the result.',
  },
  {
    icon: LifeBuoy,
    title: 'Get help with MPP BI',
    body: 'Ask how to use a feature or complete a task in MPP BI. Agentic BI can explain the steps instead of making you search through documentation.',
  },
]

export default function WhatAgenticBIDoesSection() {
  return (
    <section className="relative py-24 bg-[#F5F7FA]" id="what-it-does">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <p className="text-[#7C7AED] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            What it does
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-5">
            What You Can Delegate to Agentic BI
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed">
            Agentic BI is designed to handle the work between a business question and a
            useful answer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-2xl border border-[#E2E8F0] bg-white p-6"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: '#7C7AED15', border: '1px solid #7C7AED30' }}
                >
                  <Icon size={18} style={{ color: '#7C7AED' }} />
                </div>
                <h3 className="text-base font-bold text-[#0D1B2A] mb-2 leading-snug">{f.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{f.body}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-sm font-medium px-5 py-4 rounded-xl border max-w-2xl mx-auto"
          style={{ background: '#7C7AED0D', borderColor: '#7C7AED30', color: '#4B3FC4' }}
        >
          Every answer is based on your connected data and business definitions, not
          generic AI knowledge.
        </motion.p>
      </div>
    </section>
  )
}
