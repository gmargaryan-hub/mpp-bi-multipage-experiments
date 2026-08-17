'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap, Layers, RefreshCw } from 'lucide-react'
import { openDemoModal } from '@/lib/openDemoModal'

const stats = [
  {
    icon: Zap,
    label: 'Faster',
    stat: '2x–12x',
    statLabel: 'faster than traditional BI',
    color: '#0AAEDB',
  },
  {
    icon: Layers,
    label: 'Architecture',
    stat: '2-Tier',
    statLabel: 'no calculation engine required',
    color: '#10B981',
  },
  {
    icon: RefreshCw,
    label: 'Live',
    stat: '100%',
    statLabel: 'of functions work in live mode',
    color: '#6366F1',
  },
]

export default function ArchitectureHero() {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden bg-[#0D1B2A]" id="hero">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px]"
          style={{ background: 'radial-gradient(ellipse, rgba(10,174,219,0.14) 0%, transparent 65%)' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[#0AAEDB] text-xs font-semibold tracking-[0.18em] uppercase mb-5"
        >
          Architecture
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-white mb-6"
        >
          BI, Rebuilt <span style={{ color: '#0AAEDB' }}>From the Ground Up</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[#94A3B8] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-4"
        >
          A new architecture for a new generation of BI.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="text-[#64748B] text-base max-w-2xl mx-auto leading-relaxed mb-10"
        >
          That speed isn&apos;t the result of faster hardware or clever optimization. It comes
          from removing an entire piece of the system that other legacy BI tools can&apos;t
          function without.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-14"
        >
          <button
            onClick={openDemoModal}
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-[#0A0E1A] transition-all duration-200 hover:opacity-90"
            style={{ background: '#0AAEDB' }}
          >
            Book a Demo
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5"
        >
          {stats.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.label}
                className="text-left rounded-2xl border border-white/8 bg-white/4 p-6 flex flex-col gap-4"
              >
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
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
