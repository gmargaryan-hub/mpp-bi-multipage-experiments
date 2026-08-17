'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const points = [
  {
    title: 'Everything happens next to your data',
    body: "MPP BI's application server runs inside your database. Your business logic, access permissions, and dashboard settings all live in the same place as your data. Because there's no separate server in between, there's also nothing extra between you and your data. When you open a dashboard, your browser talks directly to the MPP BI server, which transforms your query into SQL for your database.",
    callout: 'Fewer steps = fewer places for something to slow down or go wrong.',
  },
  {
    title: 'Two layers of protection',
    body: "Most BI tools pull your data out first, then filter out what a user isn't allowed to see. MPP BI does it the other way around: it checks what you're allowed to see before it ever pulls the data. Every request gets translated into a query that runs directly on your database, using your database's own processing power. Your data never has to leave its source to be analyzed.",
    callout: 'Permissions are checked \u2192 data is filtered, then fetched \u2192 you see what you\u2019re permitted to.',
  },
  {
    title: 'Works with what you already have',
    body: "MPP BI doesn't ask you to change your environment to fit the tool. It runs on-premises, in the cloud (AWS, Azure, GCP), in containers, or in a mix of these. It works on Linux systems and with both Intel and AMD hardware.",
    callout: null,
  },
]

export default function BuiltDifferentlySection() {
  return (
    <section className="relative py-24 bg-white" id="built-differently">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            The design choice
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-5">
            How MPP BI Is Built Differently
          </h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-[#E2E8F0] p-7 flex flex-col md:flex-row md:items-start gap-5"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: '#0AAEDB15', border: '1px solid #0AAEDB30' }}
              >
                <CheckCircle2 size={18} style={{ color: '#0AAEDB' }} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#0D1B2A] mb-2.5">{p.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-4">{p.body}</p>
                {p.callout && (
                  <p className="text-xs font-mono px-3 py-2.5 rounded-lg bg-[#F5F7FA] text-[#0D1B2A]/70 border border-[#E2E8F0] leading-snug inline-block">
                    {p.callout}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
