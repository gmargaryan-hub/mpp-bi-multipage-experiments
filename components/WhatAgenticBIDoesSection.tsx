'use client'

import { motion } from 'framer-motion'
import { MessageSquare, TrendingUp, LifeBuoy, Box, LayoutDashboard } from 'lucide-react'

const features = [
  {
    icon: MessageSquare,
    title: 'Ask questions in plain language',
    body: 'Type a question in natural language, then the system pulls the right data and gives you an answer.',
  },
  {
    icon: TrendingUp,
    title: 'See the likely reason, not just the number',
    body: 'Alongside the change, the system highlights what is likely driving it.',
  },
  {
    icon: LifeBuoy,
    title: 'Get help using MPP BI',
    body: "Ask how to do something in the interface, and the system explains it or walks you through it, so you're not searching on your own.",
  },
  {
    icon: Box,
    title: 'Build a cube by describing it',
    body: 'A cube is a structured way of organizing your data for fast analysis. Instead of setting one up manually, describe what you need and the system builds it for you.',
  },
  {
    icon: LayoutDashboard,
    title: 'Build and edit dashboards and reports',
    body: "Describe the dashboard or report you want, and the system builds it. You can review it, edit it, and share it once it's ready.",
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
            What Agentic MPP BI Does For Your Business
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed">
            Agentic MPP BI works alongside your dashboards to answer questions and point
            your team toward what to do next.
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
          Every answer is built from your own data sources and business definitions, not
          generic AI knowledge.
        </motion.p>
      </div>
    </section>
  )
}
