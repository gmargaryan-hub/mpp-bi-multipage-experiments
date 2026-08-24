'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ─── Stack block component ────────────────────────────────────────────────────
function StackBlock({
  label,
  sub,
  highlight,
  ghost,
  delay,
  visible,
}: {
  label: string
  sub?: string
  highlight?: 'red' | 'cyan'
  ghost?: boolean
  delay: number
  visible: boolean
}) {
  const border = highlight === 'red'
    ? 'border-[#E05A2B]/60'
    : highlight === 'cyan'
    ? 'border-[#0AAEDB]/60'
    : 'border-white/10'

  const bg = highlight === 'red'
    ? 'bg-[#E05A2B]/8'
    : highlight === 'cyan'
    ? 'bg-[#0AAEDB]/8'
    : ghost
    ? 'bg-white/3'
    : 'bg-white'

  const labelColor = highlight === 'red'
    ? 'text-[#E05A2B]'
    : highlight === 'cyan'
    ? 'text-[#0AAEDB]'
    : ghost
    ? 'text-white/25'
    : 'text-[#0D1B2A]'

  return (
    <motion.div
      initial={{ opacity: 0, x: highlight === 'red' ? -16 : 16 }}
      animate={visible ? { opacity: ghost ? 0.35 : 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={`relative rounded-xl border ${border} ${bg} px-5 py-4 ${ghost ? 'border-dashed' : ''}`}
    >
      {highlight && (
        <div
          className="absolute inset-0 rounded-xl opacity-10 pointer-events-none"
          style={{ background: highlight === 'red' ? 'radial-gradient(ellipse at 50% 50%, #FF4D6D 0%, transparent 70%)' : 'radial-gradient(ellipse at 50% 50%, #00C2FF 0%, transparent 70%)' }}
        />
      )}
      <p className={`font-semibold text-sm ${labelColor} ${ghost ? 'line-through decoration-white/30' : ''}`}>{label}</p>
      {sub && (
        <p className={`text-xs mt-1 leading-relaxed ${ghost ? 'text-white/20' : 'text-[#6B7280]'}`}>{sub}</p>
      )}
      {highlight === 'red' && (
        <span className="absolute top-3 right-4 text-[10px] font-mono text-[#E05A2B]/70 tracking-widest uppercase">bottleneck</span>
      )}
      {highlight === 'cyan' && (
        <span className="absolute top-3 right-4 text-[10px] font-mono text-[#0AAEDB]/70 tracking-widest uppercase">unified</span>
      )}
    </motion.div>
  )
}

// ─── Arrow connector ──────────────────────────────────────────────────────────
function Arrow({ color = '#374151', long = false, label }: { color?: string; long?: boolean; label?: string }) {
  return (
    <div className="flex flex-col items-center" style={{ gap: 0 }}>
      {label && <span className="text-[10px] font-mono text-[#6B7280] mb-1 tracking-wide">{label}</span>}
      <div className="flex flex-col items-center gap-0">
        <div className="w-px bg-gradient-to-b from-transparent" style={{ height: long ? 32 : 16, background: `linear-gradient(to bottom, transparent, ${color})` }} />
        <div className="w-px" style={{ height: long ? 20 : 10, background: color }} />
        {/* arrowhead */}
        <svg width="10" height="6" viewBox="0 0 10 6">
          <polygon points="5,6 0,0 10,0" fill={color} />
        </svg>
      </div>
    </div>
  )
}

// ─── Stat comparison card ──────────────────────────────────────────────────────
function StatCard({ legacy, mpp, delay, visible }: { legacy: string; mpp: string; delay: number; visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-[#E05A2B]/20 bg-[#E05A2B]/4">
        <p className="text-[10px] font-mono text-[#E05A2B]/70 tracking-widest uppercase mb-1">Legacy BI</p>
        <p className="text-sm text-[#0D1B2A]/80 leading-snug">{legacy}</p>
      </div>
      <div className="px-6 py-4 bg-[#0AAEDB]/4">
        <p className="text-[10px] font-mono text-[#0AAEDB]/70 tracking-widest uppercase mb-1">MPP BI</p>
        <p className="text-sm text-[#10B981] font-semibold leading-snug">{mpp}</p>
      </div>
    </motion.div>
  )
}

export default function ArchitectureSection() {
  const { ref, visible } = useInView(0.08)

  return (
    <section className="py-24 relative" id="architecture">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#0AAEDB] text-sm font-semibold tracking-widest uppercase mb-4">Architecture</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-6">
            The Central Flaw in{' '}
            <span className="gradient-text">Every Legacy BI Tool</span>
          </h2>
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
            It's not a feature gap. It's a structural one. And it's been there since the 1990s.
          </p>
        </motion.div>

        {/* TWO SIDE-BY-SIDE STACKS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">

          {/* ── LEFT: Legacy BI ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#F5F7FA]/80 rounded-2xl border border-[#E05A2B]/20 p-6"
          >
            {/* Stack label */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E05A2B]/10 border border-[#E05A2B]/25 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E05A2B]" />
                <span className="text-[11px] font-mono text-[#E05A2B] tracking-widest uppercase">Legacy BI — Tableau · Power BI · Looker</span>
              </div>
              <p className="text-[#6B7280] text-sm font-medium">4 Layers. 3 Bottlenecks. 1 Fundamental Flaw.</p>
            </div>

            {/* Stack */}
            <div className="flex flex-col gap-1.5">
              <StackBlock label="Browser Client" sub="Renders dashboards. Sends queries." delay={0.15} visible={visible} />
              <div className="flex justify-center"><Arrow color="#374151" /></div>

              <StackBlock label="App Server" sub="Session management, query prep, user routing" delay={0.2} visible={visible} />
              <div className="flex justify-center"><Arrow color="#374151" /></div>

              <StackBlock label="Metadata Storage" sub="Dashboard configs, users, audit logs, stored reports" delay={0.25} visible={visible} />
              <div className="flex justify-center"><Arrow color="#FF4D6D80" /></div>

              <StackBlock
                label="Calculation Engine"
                sub="In-memory compute. Expensive RAM. Hard size limits. Breaks DirectQuery. The reason DAX functions fail in live connection mode. The reason you copy your data."
                highlight="red"
                delay={0.3}
                visible={visible}
              />
              <div className="flex justify-center">
                <Arrow color="#37415180" long label="data must travel here ↑" />
              </div>

              {/* Data Source — external, distant */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={visible ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
                className="rounded-xl border border-white/10 bg-[#0a0e1a] px-5 py-3 text-center"
              >
                <p className="text-[#6B7280] text-xs font-mono tracking-widest uppercase">Data Source</p>
                <p className="text-[#4B5563] text-[11px] mt-0.5">Externally connected. Data extracted and moved.</p>
              </motion.div>
            </div>

            {/* Callout */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={visible ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="mt-6 rounded-xl border border-[#E05A2B]/20 bg-[#E05A2B]/5 px-5 py-4"
            >
              <p className="text-[#E05A2B]/80 text-xs leading-relaxed">
                The calculation engine is why your data moves. It's why DirectQuery breaks.
                It's why you need expensive RAM. It's the bottleneck at the center of every
                legacy BI problem.
              </p>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: MPP BI ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-[#F5F7FA]/80 rounded-2xl border border-[#0AAEDB]/20 p-6"
          >
            {/* Stack label */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0AAEDB]/10 border border-[#0AAEDB]/25 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0AAEDB]" />
                <span className="text-[11px] font-mono text-[#0AAEDB] tracking-widest uppercase">MPP BI</span>
              </div>
              <p className="text-[#6B7280] text-sm font-medium">2 Layers. 0 Bottlenecks. No Calculation Engine.</p>
            </div>

            {/* Stack */}
            <div className="flex flex-col gap-1.5">
              <StackBlock label="Browser Client" sub="Identical thin client. No plugins. Mobile ready." delay={0.2} visible={visible} />
              <div className="flex justify-center"><Arrow color="#00C2FF80" /></div>

              <StackBlock
                label="MPP BI Core"
                sub="App Server + Metadata Storage + Microservices. One unified block. Written in PL/pgSQL, running inside PostgreSQL. Prepares and pushes queries. Does not compute."
                highlight="cyan"
                delay={0.25}
                visible={visible}
              />
              <div className="flex justify-center"><Arrow color="#374151" /></div>

              {/* Ghost zone */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={visible ? { opacity: 1 } : {}}
                transition={{ delay: 0.35 }}
                className="rounded-xl border border-dashed border-[#E05A2B]/20 bg-[#E05A2B]/3 px-5 py-4 text-center relative overflow-hidden"
              >
                {/* Cross-out lines */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <svg className="w-full h-full absolute inset-0 opacity-15">
                    <line x1="0" y1="0" x2="100%" y2="100%" stroke="#FF4D6D" strokeWidth="1.5" />
                    <line x1="100%" y1="0" x2="0" y2="100%" stroke="#FF4D6D" strokeWidth="1.5" />
                  </svg>
                </div>
                <p className="text-[#E05A2B]/40 text-xs font-mono tracking-widest uppercase">No Calculation Engine</p>
                <p className="text-[#E05A2B]/30 text-[11px] mt-1">Eliminated. By design.</p>
              </motion.div>

              <div className="flex justify-center"><Arrow color="#00C2FF80" label="query pushed down ↓" /></div>

              {/* Data Source — close */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={visible ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
                className="rounded-xl border border-[#10B981]/30 bg-[#10B981]/5 px-5 py-3"
              >
                <p className="text-[#10B981] text-xs font-mono tracking-widest uppercase text-center">Your Data Source</p>
                <p className="text-[#6B7280] text-[11px] mt-1 text-center">Query pushed down. Runs natively. Full OctoLang support. Billions of records. No limits.</p>
              </motion.div>
            </div>

            {/* Callout */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={visible ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="mt-6 rounded-xl border border-[#0AAEDB]/20 bg-[#0AAEDB]/5 px-5 py-4"
            >
              <p className="text-[#0AAEDB]/80 text-xs leading-relaxed">
                MPP BI's computation language was built as DirectQuery-native from day one.
                Every function. Every aggregation. Every complex calculation. All of it runs
                live, at the data source, without exception.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* THREE COMPARISON STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          <StatCard
            legacy="Dataset size limited by RAM in the calculation engine"
            mpp="No size limit. Billions of records. Runs natively at the source."
            delay={0.55}
            visible={visible}
          />
          <StatCard
            legacy="~40% of DAX functions broken or unsupported in DirectQuery"
            mpp="100% of OctoLang functions work in live connection. Always. No exceptions."
            delay={0.65}
            visible={visible}
          />
          <StatCard
            legacy="4 infrastructure layers to buy, license, manage, and secure"
            mpp="2 infrastructure layers. Period."
            delay={0.75}
            visible={visible}
          />
        </div>

      </div>
    </section>
  )
}
