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

const daxCode = `// DAX — CALCULATE in DirectQuery mode
CALCULATE(
  SUM(Sales[Revenue]),
  FILTER(
    ALL(Sales),
    Sales[Date] >= DATEADD(TODAY(), -90, DAY)
  )
)

// ⚠ Not supported in DirectQuery
// Switch to Import Mode to use this function.
// Your data will no longer be live.`

const lpeCode = `-- OctoLang — same calculation, live connection
SELECT
  SUM(revenue)
FROM sales
WHERE
  sale_date >= CURRENT_DATE - INTERVAL '90 days'
  AND {user_access_filter}

-- ✅ Runs live. Against your data source.
-- Always. No exceptions. No mode switching.`

export default function OctoLangvsDaxSection() {
  const { ref, visible } = useInView()

  return (
    <section className="py-24 relative" id="lpe">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(0,194,255,0.04) 0%, transparent 70%)' }} />

      <div ref={ref} className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#0AAEDB] text-sm font-semibold tracking-widest uppercase mb-4">Language & Architecture</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-6">
            The Language Makes{' '}
            <span className="gradient-text">the Architecture Work</span>
          </h2>
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
            A BI tool's analytical language is either built for live data or it isn't.
            There's no middle ground that survives production.
          </p>
        </motion.div>

        {/* Two column comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">

          {/* LEFT — DAX */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-[#F5F7FA]/80 rounded-2xl border border-[#E05A2B]/20 p-8 flex flex-col gap-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E05A2B]/10 border border-[#E05A2B]/25 mb-4">
                <span className="text-[11px] font-mono text-[#E05A2B] tracking-widest uppercase">DAX — Power BI DirectQuery</span>
              </div>
              <h3 className="text-2xl font-bold text-[#0D1B2A] mb-2">Powerful language.</h3>
              <h3 className="text-2xl font-bold text-[#E05A2B]">Crippled in live mode.</h3>
            </div>

            <div className="space-y-3">
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Power BI's DAX is a sophisticated analytical language — in import mode. Switch to
                DirectQuery and a significant portion of DAX functions are unsupported, return
                errors, or produce different results. This is documented by Microsoft.
              </p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Your analysts know this wall. They've hit it. They go back to import mode and
                accept stale data, refreshed on a schedule, disconnected from reality.
              </p>
            </div>

            {/* Code block */}
            <div className="rounded-xl border border-[#E05A2B]/20 bg-[#080c16] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#E05A2B]/10 bg-[#E05A2B]/5">
                <span className="text-[11px] font-mono text-[#6B7280]">example.dax</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-[#E05A2B]/80">⚠</span>
                  <span className="text-[10px] font-mono text-[#E05A2B]/80">Not supported in DirectQuery</span>
                </div>
              </div>
              <pre className="p-4 text-xs font-mono text-[#6B7280] leading-relaxed overflow-x-auto whitespace-pre">
                {daxCode}
              </pre>
            </div>

            {/* What Microsoft says */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white/3 px-4 py-3">
              <p className="text-[11px] font-mono text-[#6B7280] leading-relaxed">
                "Some DAX functions and query patterns are not supported in DirectQuery models."
              </p>
              <p className="text-[10px] text-[#4B5563] mt-1">— Microsoft Power BI documentation</p>
            </div>
          </motion.div>

          {/* RIGHT — OctoLang */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#F5F7FA]/80 rounded-2xl border border-[#0AAEDB]/20 p-8 flex flex-col gap-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0AAEDB]/10 border border-[#0AAEDB]/25 mb-4">
                <span className="text-[11px] font-mono text-[#0AAEDB] tracking-widest uppercase">OctoLang — MPP BI</span>
              </div>
              <h3 className="text-2xl font-bold text-[#0D1B2A] mb-2">Built for live.</h3>
              <h3 className="text-2xl font-bold text-[#0AAEDB]">No exceptions.</h3>
            </div>

            <div className="space-y-3">
              <p className="text-[#6B7280] text-sm leading-relaxed">
                OctoLang is MPP BI's analytical language. It was designed as
                DirectQuery-native from the first line of code. There is no import mode to fall
                back on. There is no degraded functionality in live connection.
              </p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Every OctoLang function, every aggregation, every complex business calculation runs
                live, pushed down to your data source, against any volume of data. Not because
                we tried to make it work in live mode. Because we never designed it any other way.
              </p>
            </div>

            {/* Code block */}
            <div className="rounded-xl border border-[#0AAEDB]/20 bg-[#080c16] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#0AAEDB]/10 bg-[#0AAEDB]/5">
                <span className="text-[11px] font-mono text-[#6B7280]">example.octolang</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-[#10B981]">✓</span>
                  <span className="text-[10px] font-mono text-[#10B981]">Runs live. Always.</span>
                </div>
              </div>
              <pre className="p-4 text-xs font-mono text-[#374151] leading-relaxed overflow-x-auto whitespace-pre">
                <span className="text-[#6B7280]">-- OctoLang — same calculation, live connection{'\n'}</span>
                <span className="text-[#0AAEDB]">SELECT{'\n'}</span>
                <span className="text-[#0D1B2A]">  SUM(revenue){'\n'}</span>
                <span className="text-[#0AAEDB]">FROM</span>
                <span className="text-[#0D1B2A]"> sales{'\n'}</span>
                <span className="text-[#0AAEDB]">WHERE{'\n'}</span>
                <span className="text-[#0D1B2A]">  sale_date {'>'}= </span>
                <span className="text-[#10B981]">CURRENT_DATE</span>
                <span className="text-[#0D1B2A]"> - INTERVAL </span>
                <span className="text-[#10B981]">'90 days'</span>
                <span className="text-[#0D1B2A]">{'\n'}  AND </span>
                <span className="text-[#0AAEDB]">&#123;user_access_filter&#125;{'\n\n'}</span>
                <span className="text-[#6B7280]">-- ✅ Runs live. Against your data source.{'\n'}</span>
                <span className="text-[#6B7280]">-- Always. No exceptions. No mode switching.</span>
              </pre>
            </div>

            {/* Always live callout */}
            <div className="rounded-xl border border-[#10B981]/20 bg-[#10B981]/5 px-4 py-3">
              <p className="text-[11px] font-mono text-[#10B981]/80 leading-relaxed">
                Every OctoLang aggregation, window function, and complex calculation is pushdown-compatible by construction. The language has no import-mode variant, no fallback, and no degraded mode.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stark bottom line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center py-10 border-t border-b border-[#E2E8F0]"
        >
          <p className="text-lg md:text-xl text-[#6B7280] leading-relaxed max-w-3xl mx-auto">
            <span className="text-[#E05A2B]">DAX was built for import mode</span>
            {' '}and adapted for live connection.
            <br />
            <span className="text-[#0D1B2A] font-semibold">OctoLang was built for live connection from day one. Full stop.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
