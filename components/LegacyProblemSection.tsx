'use client'

import { motion } from 'framer-motion'
import { Database, Zap, Link2 } from 'lucide-react'

const points = [
  {
    icon: Database,
    title: 'Your data gets copied, and that copy goes outdated',
    body: 'To use the calculation engine, the BI tool copies your data into it first. That copy falls behind every time your real data changes. You also pay to store your data twice: once in your database, once inside the BI tool.',
    callout: 'Import Mode = Data Copy = Outdated Data',
  },
  {
    icon: Zap,
    title: 'Switching to live data breaks things',
    body: 'Some tools let you connect live instead of copying data. Power BI calls this DirectQuery, Tableau calls it Live Connection. Their calculation engines weren\u2019t built for that. Turn on live connection, and a large part of what the tool can normally do stops working.',
    callout: 'This isn\u2019t a bug they haven\u2019t fixed. It\u2019s a limit built into how the tool works.',
  },
  {
    icon: Link2,
    title: 'More steps between you and your data means more can go wrong',
    body: 'A request has to pass through several stops before it reaches your data. Each stop adds delay, and it\u2019s possible that something could go wrong. This setup hasn\u2019t changed much since the 1990s, even though the reason for it \u2014 slow databases \u2014 no longer applies.',
    callout: 'Client \u2192 App Server \u2192 Calc Engine \u2192 Source',
  },
]

export default function LegacyProblemSection() {
  return (
    <section className="relative py-24 bg-white" id="legacy-problem">
      <div className="max-w-[1440px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <p className="text-[#E05A2B] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            The problem
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-5">
            Why Legacy BI Tools Slow You Down
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed">
            Most BI tools, including Tableau and Power BI, use a calculation engine \u2014 a
            separate mini-database built just for fast calculations. Tableau calls theirs
            Hyper, Power BI calls theirs VertiPaq. That made sense when regular databases
            were too slow for real-time analysis. Databases are fast now. The engine that
            used to solve that problem is now just extra weight.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {points.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-[#E2E8F0] p-7 flex flex-col"
                style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)' }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: '#FEF2EE', border: '1px solid rgba(224,90,43,0.2)' }}
                >
                  <Icon size={20} color="#E05A2B" />
                </div>
                <h3 className="text-lg font-bold text-[#0D1B2A] mb-3 leading-snug">{p.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-5 flex-1">{p.body}</p>
                <p className="text-xs font-mono px-3 py-2.5 rounded-lg bg-[#FEF2EE] text-[#E05A2B] border border-[#E05A2B]/15 leading-snug">
                  {p.callout}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
