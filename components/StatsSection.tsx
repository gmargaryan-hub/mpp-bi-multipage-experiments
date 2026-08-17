'use client'

import { motion } from 'framer-motion'
import { Zap, Layers, Shield, RefreshCw, DollarSign } from 'lucide-react'

const stats = [
  {
    icon: Zap,
    label: 'Faster',
    stat: '2x–12x',
    statLabel: 'faster than traditional BI',
    body: 'Runs calculations where your data already lives, with no separate engine. Proven across real deployments.',
    color: '#0AAEDB',
  },
  {
    icon: Layers,
    label: 'Scalable',
    stat: '500 users',
    statLabel: 'running on just 2 nodes',
    body: 'Add capacity by adding nodes, not by rebuilding your whole setup.',
    color: '#10B981',
  },
  {
    icon: Shield,
    label: 'Secure',
    stat: 'Full control',
    statLabel: 'over who sees your data',
    body: 'Runs fully on-premise if you need it. Checks who can see what before any data moves.',
    color: '#6366F1',
  },
  {
    icon: RefreshCw,
    label: 'Flexible',
    stat: '4 ways',
    statLabel: 'to keep data current',
    body: 'Scheduled, trigger-based, real-time, or historical. Pick what fits each dashboard.',
    color: '#0AAEDB',
  },
  {
    icon: DollarSign,
    label: 'Affordable',
    stat: '$10',
    statLabel: 'per user, per month',
    body: 'Less than most BI tools. Pricing is public, no quote required.',
    color: '#F97316',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const card = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function StatsSection() {
  return (
    <section className="relative py-24 bg-[#0D1B2A] border-t border-white/5" id="stats">
      <div className="max-w-[1440px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Features at a glance
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Built to Be Faster, Bigger, and Safer
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
            Five numbers that sum up what MPP BI does differently.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
        >
          {stats.map((s) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                variants={card}
                className="group relative rounded-2xl border border-white/8 bg-white/4 p-6 flex flex-col gap-4 hover:border-white/15 transition-colors duration-300 overflow-hidden"
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${s.color}12 0%, transparent 70%)` }}
                />
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}
                >
                  <Icon size={18} style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: s.color }}>
                    {s.label}
                  </p>
                  <p className="text-2xl font-black font-display leading-tight text-white">{s.stat}</p>
                  <p className="text-xs text-[#64748B] font-medium mt-1">{s.statLabel}</p>
                </div>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{s.body}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
