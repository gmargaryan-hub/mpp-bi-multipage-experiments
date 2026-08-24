'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function useInView() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.08 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

const cards = [
  {
    number: '01',
    title: 'The Calculation Engine',
    verdict: 'Gone. Entirely.',
    verdictColor: '#F97316',
    body: `The in-memory calculation engine is the most expensive, most limiting component in legacy BI. It requires dedicated RAM. It imposes hard dataset size limits. It's the reason DirectQuery breaks — the engine can't push complex computations to the data source, so vendors disable those functions rather than fix the architecture.

MPP BI eliminated it. Computation happens at the data source, pushed there by OctoLang. No engine. No RAM cost. No ceiling. No broken functions. The absence of this component is not a missing feature — it's the product's most significant engineering decision.`,
  },
  {
    number: '02',
    title: 'The Separate App Server',
    verdict: 'Absorbed. Simplified.',
    verdictColor: '#0AAEDB',
    body: `Legacy BI separates the app server (query prep, user management, session handling) from metadata storage (dashboard configs, access rights, audit logs). Two systems to deploy, synchronize, and maintain. Two surfaces to secure.

MPP BI Core unifies both into one block, running inside PostgreSQL. One system. Half the infrastructure footprint. Metadata-enforced access rights are applied before query execution — not after data has already moved.`,
  },
  {
    number: '03',
    title: 'The Data Copy',
    verdict: 'Eliminated. No import mode. No cache. No stale data.',
    verdictColor: '#10B981',
    body: `Legacy BI's import mode exists because the calculation engine needs data fed to it. The engine cannot reach into your data source and compute there — so the data must come to it. Without import mode, DirectQuery's limitations make the tool unusable for complex analytics. This is a workaround for a structural flaw.

MPP BI has no import mode because it has no calculation engine. Your data lives where it lives. The query goes to the data. Always fresh. Always live. Always complete.`,
  },
]

export default function EliminatedSection() {
  const { ref, visible } = useInView()

  return (
    <section className="py-24 relative bg-[#0D1B2A]" id="eliminated">
      {/* Dot grid — matches CTA section */}
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(249,115,22,0.06) 0%, transparent 70%)' }} />

      <div ref={ref} className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[#F97316] text-sm font-semibold tracking-widest uppercase mb-4">Structural Decisions</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What We Removed.{' '}
            <span style={{ color: '#F97316' }}>And Why That Matters.</span>
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-2xl">
            Most BI vendors add features. We removed the component that makes those features necessary.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 28 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }}
              className="group relative bg-white/5 rounded-2xl border border-white/10 p-8 flex flex-col gap-5 hover:border-white/20 transition-colors duration-300 overflow-hidden"
            >
              {/* Number watermark */}
              <span className="text-5xl font-black text-white/5 font-mono leading-none select-none absolute top-6 right-7">
                {card.number}
              </span>

              {/* Top accent line */}
              <div className="h-px w-full rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${card.verdictColor}70, transparent)` }} />

              {/* Title */}
              <div>
                <h3 className="text-lg font-bold text-white mb-3">{card.title}</h3>
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wide"
                  style={{ background: `${card.verdictColor}18`, color: card.verdictColor, border: `1px solid ${card.verdictColor}35` }}
                >
                  {card.verdict}
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-col gap-3">
                {card.body.split('\n\n').map((para, j) => (
                  <p key={j} className="text-[#94A3B8] text-sm leading-relaxed">{para}</p>
                ))}
              </div>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-8 right-8 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${card.verdictColor}50, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
