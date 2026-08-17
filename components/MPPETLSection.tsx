'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const items = [
  { title: 'Low-code setup', body: "Set up your data flows visually, by connecting blocks together on screen (built on Node-RED). Add your own code when you need more control." },
  { title: 'Connect to your sources', body: 'Works with Kafka, Redis, SAP RFC, PostgreSQL, ClickHouse, and any JDBC source.' },
  { title: 'Support data science work', body: 'Includes Jupyter Notebook, a common tool data scientists use to explore and work with data.' },
  { title: 'Keep up with live data', body: 'Processes up to thousands of events per second when handling fast, continuous data.' },
  { title: 'Handle large volumes', body: 'Works through big batches of data from any connected source.' },
  { title: 'Run faster', body: 'Tuned components for PostgreSQL, Kafka, ClickHouse, and Greenplum keep things moving quickly.' },
  { title: 'Run on a schedule', body: 'Set your data flows to run at fixed times, or have them start automatically when an event happens.' },
]

export default function MPPETLSection() {
  return (
    <section className="relative py-24 bg-white" id="mpp-etl">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <p className="text-[#10B981] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Data preparation
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-5">
            MPP ETL: A Data Preparation Engine
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed">
            MPP ETL (also called Lizardata) is an add-on for MPP BI. ETL stands for
            &ldquo;extract, transform, load&rdquo; &mdash; the standard term for taking data
            from a source, preparing it, and putting it where it&apos;s needed. MPP ETL
            collects data from your sources, cleans and organizes it, and prepares it for
            analysis.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="flex gap-3 rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] p-5"
            >
              <Check size={16} className="text-[#10B981] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-[#0D1B2A] mb-1">{it.title}</p>
                <p className="text-xs text-[#6B7280] leading-relaxed">{it.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
