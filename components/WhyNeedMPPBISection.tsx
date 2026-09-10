'use client'

import { motion } from 'framer-motion'
import { Eye, Workflow, Network, Bot } from 'lucide-react'

export default function WhyNeedMPPBISection() {
  return (
    <section className="relative py-24 bg-[#F5F7FA]" id="why-need-it">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-5">
            Why Does Your Team Need MPP BI?
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed">
            Teams need analytics and visualization because raw data alone doesn&apos;t tell
            a clear story. A dashboard turns that data into something people can read and
            act on.
          </p>
        </motion.div>

        {/* Visibility for Leadership */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-[#E2E8F0] bg-white p-7 flex gap-4 mb-6"
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: '#10B98115', border: '1px solid #10B98130' }}
          >
            <Eye size={20} style={{ color: '#10B981' }} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0D1B2A] mb-2.5">Visibility for Leadership</h3>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              MPP BI provides visibility to leadership to make executive decisions and
              changes. Leaders can spot a problem or an opportunity as it happens, instead
              of waiting for someone to build a report by hand.
            </p>
          </div>
        </motion.div>

        {/* Data Infrastructure and Agentic Workflows */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="rounded-2xl border border-[#E2E8F0] bg-white p-7"
        >
          <div className="flex gap-4 mb-6">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: '#7C7AED15', border: '1px solid #7C7AED30' }}
            >
              <Workflow size={20} style={{ color: '#7C7AED' }} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0D1B2A] mb-2.5">
                Data Infrastructure and Agentic Workflows
              </h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                We can build dashboards and reports. Is that not enough? We can build data
                infrastructure and agentic workflows.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#F1F5F9]">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <Network size={16} style={{ color: '#7C7AED' }} />
                <h4 className="text-sm font-bold text-[#0D1B2A]">Data Infrastructure</h4>
              </div>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                We can build the data infrastructure behind your dashboards, the pipelines
                that move data from where it&apos;s created to where it&apos;s needed. Solid
                pipelines are the foundation of data reliability. If they&apos;re weak,
                everything built on top of them is weak too.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <Bot size={16} style={{ color: '#7C7AED' }} />
                <h4 className="text-sm font-bold text-[#0D1B2A]">Agentic Workflows</h4>
              </div>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Analytics and reporting goes further with agentic workflows, the new
                generation of BI where AI becomes part of how you manage your business. It
                uses several agents, each built for one job, following instructions made for
                that exact task. These agents connect to your data, your systems, and your
                documents, so they can do the work inside your business.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
