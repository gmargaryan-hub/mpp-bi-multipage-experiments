'use client'

import { motion } from 'framer-motion'
import { Users, Gauge, Database } from 'lucide-react'

export default function ScaleAndPerformanceSection() {
  return (
    <section className="relative py-24 bg-white" id="scale">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Enterprise scale */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
              style={{ background: '#0AAEDB15', border: '1px solid #0AAEDB30' }}
            >
              <Users size={20} style={{ color: '#0AAEDB' }} />
            </div>
            <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.18em] uppercase mb-3">
              Enterprise scale
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0D1B2A] mb-4">
              Built for Many Users at Once
            </h2>
            <p className="text-[#6B7280] text-sm leading-relaxed mb-4">
              MPP BI is built for environments where hundreds of people work with data at
              the same time. When someone runs a report, the work happens right where the
              data lives. This data-centric architecture removes extra delay and keeps every
              response fast. Requests are also spread across the system, so the load never
              piles up in one place and no bottleneck forms when traffic is high.
            </p>
            <p className="text-sm font-medium text-[#0D1B2A] px-4 py-3 rounded-lg bg-[#F5F7FA] border border-[#E2E8F0]">
              The result: analysts, managers, and whole teams can run dashboards, refresh
              reports, and explore data at once, without slowing each other down.
            </p>
          </motion.div>

          {/* Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
              style={{ background: '#10B98115', border: '1px solid #10B98130' }}
            >
              <Gauge size={20} style={{ color: '#10B981' }} />
            </div>
            <p className="text-[#10B981] text-xs font-semibold tracking-[0.18em] uppercase mb-3">
              Performance
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0D1B2A] mb-4">
              Faster Than Traditional BI
            </h2>
            <p className="text-[#6B7280] text-sm leading-relaxed mb-3">
              MPP BI answers 2 to 12 times faster than traditional BI tools like Tableau and
              Power BI. That gap doesn&apos;t stay the same size &mdash; it grows as your
              questions get harder. Teams switching from Power BI or Tableau usually notice
              the difference within their first week.
            </p>
            <p className="text-[#6B7280] text-sm leading-relaxed mb-5">
              Because of its data-centric architecture, MPP BI is built to process every
              query faster, right where your data lives.{' '}
              <a href="/architecture" className="font-medium underline" style={{ color: '#0AAEDB' }}>
                See how the architecture works
              </a>
              .
            </p>
            <div className="flex items-center gap-3 px-4 py-3.5 rounded-lg bg-[#F5F7FA] border border-[#E2E8F0]">
              <Database size={18} className="text-[#10B981] flex-shrink-0" />
              <p className="text-sm font-semibold text-[#0D1B2A]">
                2B+ records, under 5 seconds &mdash; real enterprise data volumes, not a lab test.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
