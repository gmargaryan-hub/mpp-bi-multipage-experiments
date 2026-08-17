'use client'

import { motion } from 'framer-motion'
import { Palette, Code2, Shapes, Wrench, FileCode2 } from 'lucide-react'

const items = [
  { icon: Palette, title: 'Match your brand', body: 'Apply your full brand: your colors, fonts, logos, and styling throughout. The result looks like your own product, not a tool you bought.' },
  { icon: Code2, title: 'Build the frontend your way', body: "A JavaScript API lets your developers adjust filters, controls, and other on-screen features. Customization is done in React, the framework MPP BI's interface is built on." },
  { icon: Shapes, title: 'Create your own visuals', body: 'Go beyond the standard charts. Build custom views for a single dashboard or redesign the whole interface, including interactive diagrams and facility layouts.' },
  { icon: Wrench, title: 'Turn it into a purpose-built tool', body: 'Reshape the platform into an application made for one specific job, on top of what\u2019s already here.' },
  { icon: FileCode2, title: 'Work with the source code', body: 'Depending on your license, the source code for all components is available, so your team can see how things work and build with full confidence.' },
]

export default function CustomizationSection() {
  return (
    <section className="relative py-24 bg-white" id="customization">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <p className="text-[#F97316] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Customization
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-5">
            Built to Be Customized
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed">
            This is a BI tool and a development platform in one. Out of the box it does the
            job. But if your team wants to shape it, almost nothing is off-limits.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => {
            const Icon = it.icon
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-2xl border border-[#E2E8F0] p-6"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: '#F9731615', border: '1px solid #F9731630' }}
                >
                  <Icon size={18} style={{ color: '#F97316' }} />
                </div>
                <h3 className="text-sm font-bold text-[#0D1B2A] mb-2">{it.title}</h3>
                <p className="text-[#6B7280] text-xs leading-relaxed">{it.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
