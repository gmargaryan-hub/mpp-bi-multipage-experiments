'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const dashboards = [
  {
    id: 'construction',
    label: 'Construction',
    industry: 'Procurement & Transparency',
    src: '/dashboards/dashboard-construction.png',
    width: 2138,
    height: 1060,
    metric: '$1M+',
    metricLabel: 'annual savings',
    description: 'Real-time procurement transparency — suspicious items, overpayment detection, and supplier analysis across 500+ entities. Business logic runs inside the database, data never extracted.',
  },
  {
    id: 'oilgas-safety',
    label: 'Oil & Gas',
    industry: 'Safety Command Center',
    src: '/dashboards/dashboard-oilgas-safety.png',
    width: 2436,
    height: 1366,
    metric: 'Live',
    metricLabel: 'incident monitoring',
    description: 'Offshore safety command center: incident tracking, personnel status, equipment monitoring, and vessel logistics — streaming via Kafka at 7,000+ events/sec.',
  },
  {
    id: 'oilgas-wells',
    label: 'Oil & Gas',
    industry: 'Well Analytics',
    src: '/dashboards/dashboard-oilgas-wells.png',
    width: 2532,
    height: 1302,
    metric: '2×–12×',
    metricLabel: 'faster than traditional BI',
    description: 'Well profile analytics with spacer placement recommendations, CP/Collector monitoring, and deviation analysis — computation runs inside the database, zero data movement.',
  },
  {
    id: 'operations',
    label: 'Operations',
    industry: 'Network Operations',
    src: '/dashboards/dashboard-operations.png',
    width: 2340,
    height: 1268,
    metric: '500',
    metricLabel: 'concurrent users · 16 cores / 32GB RAM',
    description: 'Work planning across incident management, change tracking, and personnel deployment — sub-second performance on 16 cores / 32GB RAM with 500 concurrent users.',
  },
  {
    id: 'servicedesk',
    label: 'Financial Services',
    industry: 'SLA & Agent Analytics',
    src: '/dashboards/dashboard-servicedesk.png',
    width: 2084,
    height: 1392,
    metric: '100%',
    metricLabel: 'functions in live mode',
    description: "Service desk analytics: SLA violation rates, resolution speed, agent performance ratings, and ticket flow — all 100% of MPP BI's functions available in live connection mode.",
  },
]

export default function DashboardShowcase() {
  const [active, setActive] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const current = dashboards[active]

  return (
    <section className="py-24 relative bg-[#F5F7FA]" id="dashboards">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.1em] uppercase mb-4">See It in Action</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-6">
            See What Analytics Looks Like{' '}
            <span className="gradient-text">Without Compromise.</span>
          </h2>
          <p className="text-[#374151] text-lg max-w-2xl mx-auto">
            Real dashboards. Real deployments. Data never leaves the source.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-[#E2E8F0] pb-0">
            {dashboards.map((d, i) => (
              <button
                key={d.id}
                onClick={() => setActive(i)}
                className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-all duration-200 cursor-pointer ${
                  active === i
                    ? 'border-[#0AAEDB] text-[#0AAEDB]'
                    : 'border-transparent text-[#6B7280] hover:text-[#0D1B2A]'
                }`}
              >
                <span className="text-[10px] text-[#9CA3AF] mr-1.5 uppercase tracking-wide">{d.label}</span>
                {d.industry}
              </button>
            ))}
          </div>

          {/* Browser chrome frame */}
          <div
            className="relative rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white"
            style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.10)' }}
          >
            <div className="flex items-center gap-2 px-4 py-3 bg-[#F5F7FA] border-b border-[#E2E8F0]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
              </div>
              <div className="flex-1 mx-4 bg-white rounded-md px-3 py-1 text-xs text-[#9CA3AF] font-mono text-center border border-[#E2E8F0]">
                mppbi.com/dashboard
              </div>
            </div>
            {/* Container aspect ratio matches the current image's real dimensions —
                none of the 5 screenshots are actually 16:9 (they range from 1.50 to
                2.02), so a fixed aspect-[16/9] here was cropping every one of them. */}
            <div
              className="relative w-full bg-[#F5F7FA]"
              style={{ aspectRatio: `${current.width} / ${current.height}` }}
            >
              <Image
                src={current.src}
                alt={`${current.industry} dashboard`}
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                quality={100}
                className="object-cover"
                priority={active === 0}
              />
            </div>
          </div>

          {/* Metric bar */}
          <div className="mt-6 flex flex-wrap items-center gap-6 bg-white rounded-xl border border-[#E2E8F0] px-6 py-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#0AAEDB] font-display">{current.metric}</span>
              <span className="text-sm text-[#6B7280]">{current.metricLabel}</span>
            </div>
            <p className="text-sm text-[#374151] max-w-xl leading-relaxed flex-1">{current.description}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
