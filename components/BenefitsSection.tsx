'use client'

import { motion } from 'framer-motion'
import { Zap, Layers, Shield, DollarSign, Radio } from 'lucide-react'

const benefits = [
  {
    icon: Zap,
    title: 'Faster',
    stat: '2×–12×',
    statLabel: 'faster than traditional BI',
    body: 'Performance improvements validated in production across banking, insurance, oil & gas, and construction. The speed gap widens as query complexity grows.',
    color: '#0AAEDB',
  },
  {
    icon: Layers,
    title: 'Scalable',
    stat: '2B+',
    statLabel: 'records, no RAM ceiling',
    body: 'No dataset size limits. Billions of records processed natively at the data source. 500 concurrent users on 16 cores and 32GB of RAM.',
    color: '#10B981',
  },
  {
    icon: Shield,
    title: 'Secure',
    stat: 'Zero',
    statLabel: 'data extraction required',
    body: 'Data never leaves your environment. Access rights enforced at the metadata layer before any query executes — not after data has already moved. SSO, RBAC, full audit logging.',
    color: '#6366F1',
  },
  {
    icon: DollarSign,
    title: 'Affordable',
    stat: '$10',
    statLabel: 'per viewer / month',
    body: 'No separate BI server. No calculation engine infrastructure. No expensive RAM tiers that scale with your data volume. A fraction of what legacy BI costs.',
    color: '#F97316',
  },
  {
    icon: Radio,
    title: 'Always Live',
    stat: 'No',
    statLabel: 'import mode. Ever.',
    body: 'Live connection is not a mode in MPP BI — it is the only mode. There is no import mode, no scheduled refresh, no stale cache. Your queries go directly to the data source.',
    color: '#0AAEDB',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const card = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
}

export default function BenefitsSection() {
  return (
    <section className="relative py-28 overflow-hidden bg-[#0D1B2A]" id="benefits">
      {/* Dot grid — matches CTA section */}
      <div className="absolute inset-0 dot-grid opacity-20" />
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px]"
          style={{ background: 'radial-gradient(ellipse, rgba(10,174,219,0.12) 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px]"
          style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.06) 0%, transparent 65%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65 }}
          className="text-center mb-20"
        >
          <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.18em] uppercase mb-5">Why MPP BI</p>
          <h2 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-white mb-6">
            Built Inside Your Data.<br />
            <span style={{ color: '#0AAEDB' }}>The New Age of BI.</span>
          </h2>
          <p className="text-[#94A3B8] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Every major BI tool on the market was built for a world where data was smaller. MPP BI&apos;s architecture is built for the future of big data in real time.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
        >
          {benefits.map((b) => {
            const Icon = b.icon
            return (
              <motion.div
                key={b.title}
                variants={card}
                className="group relative rounded-2xl border border-white/8 bg-white/4 p-7 flex flex-col gap-5 hover:border-white/15 transition-colors duration-300 overflow-hidden"
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${b.color}12 0%, transparent 70%)` }}
                />

                {/* Top accent */}
                <div className="h-px w-full rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${b.color}60, transparent)` }} />

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${b.color}15`, border: `1px solid ${b.color}30` }}
                >
                  <Icon size={20} style={{ color: b.color }} />
                </div>

                {/* Title — big and in accent color */}
                <div>
                  <p className="text-2xl font-black font-display leading-none mb-2 uppercase tracking-tight" style={{ color: b.color }}>
                    {b.title}
                  </p>
                  <p className="text-4xl font-black font-display leading-none text-white">{b.stat}</p>
                  <p className="text-xs text-[#64748B] font-medium mt-1 tracking-wide">{b.statLabel}</p>
                </div>

                {/* Body */}
                <p className="text-[#94A3B8] text-sm leading-relaxed flex-1">{b.body}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
