'use client'

import { motion } from 'framer-motion'
import { Palette, Ruler, FileOutput, Headphones, Wrench } from 'lucide-react'

const brandItems = [
  { icon: Palette, title: 'Built around your brand', body: "MPP BI doesn't have a fixed interface — white-labeled deployment is supported, so it feels like part of your own product or platform." },
  { icon: Ruler, title: 'Pixel-perfect visualizations', body: 'Every element can be precisely customized to match your design requirements. Designers can define the layout, and dashboards can be adapted to follow that design exactly.' },
  { icon: FileOutput, title: 'Flexible reporting and output', body: 'Users can create, adjust, and export reports and presentations directly from dashboards.' },
]

const supportItems = [
  { icon: Headphones, title: 'Direct technical support', body: "When issues come up, you don't go through a ticket queue of generic answers. You get help from people who understand how MPP BI is deployed and used in real environments." },
  { icon: Wrench, title: 'Help with setup and integration', body: 'Most support cases are about installation, configuration, or connecting MPP BI to systems you already use. Our team supports you through this to make sure your setup is successful.' },
]

export default function BrandAndSupportSection() {
  return (
    <section className="relative py-24 bg-white" id="brand-support">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-10"
        >
          <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Make it yours
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0D1B2A]">
            Look and Feel Like Your Product
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {brandItems.map((it, i) => {
            const Icon = it.icon
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-[#E2E8F0] p-6"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: '#0AAEDB15', border: '1px solid #0AAEDB30' }}
                >
                  <Icon size={18} style={{ color: '#0AAEDB' }} />
                </div>
                <h3 className="text-sm font-bold text-[#0D1B2A] mb-2">{it.title}</h3>
                <p className="text-[#6B7280] text-xs leading-relaxed">{it.body}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-10"
        >
          <p className="text-[#10B981] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Support
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0D1B2A]">
            Support From the People Behind the Product
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {supportItems.map((it, i) => {
            const Icon = it.icon
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-[#E2E8F0] p-6 flex gap-4"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: '#10B98115', border: '1px solid #10B98130' }}
                >
                  <Icon size={18} style={{ color: '#10B981' }} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0D1B2A] mb-1.5">{it.title}</h3>
                  <p className="text-[#6B7280] text-xs leading-relaxed">{it.body}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
