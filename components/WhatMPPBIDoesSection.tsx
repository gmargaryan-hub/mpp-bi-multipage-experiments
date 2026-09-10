'use client'

import { motion } from 'framer-motion'
import { LayoutDashboard, Database, Blocks } from 'lucide-react'

const items = [
  {
    icon: LayoutDashboard,
    title: 'Dashboards and Reporting',
    body: 'MPP BI gives your team dashboards and reporting built directly on top of your data, with more than 30 visualization types. You can export reports as Excel files, PDF, or PowerPoint presentations, or embed them directly into your own website or system.',
  },
  {
    icon: Database,
    title: 'A Data-Centric Tool',
    body: 'MPP BI is a data-centric tool and it connects directly to where the data lives (for example your database) with no need to copy the data first. This makes analytics faster and more accurate.',
  },
  {
    icon: Blocks,
    title: 'Build Your Own Data Products',
    body: "MPP BI is also flexible enough to become the base for your own data products. Your team can build on top of it and shape it into something that fits your business. And if you'd rather not build it alone, our team can white-glove it and handle the setup.",
  },
]

export default function WhatMPPBIDoesSection() {
  return (
    <section className="relative py-24 bg-white" id="what-it-does">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-12"
        >
          What Does MPP BI Do?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-[#E2E8F0] bg-[#F5F7FA] p-7"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: '#0AAEDB15', border: '1px solid #0AAEDB30' }}
                >
                  <Icon size={20} style={{ color: '#0AAEDB' }} />
                </div>
                <h3 className="text-lg font-bold text-[#0D1B2A] mb-3">{item.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{item.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
