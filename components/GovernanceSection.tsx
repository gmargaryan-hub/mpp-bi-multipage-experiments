'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { asset } from '@/lib/basePath'

export default function GovernanceSection() {
  return (
    <section className="relative py-24 bg-[#F5F7FA]" id="governance">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-[#E2E8F0] overflow-hidden mb-14 bg-white"
        >
          <p className="sm:hidden text-center text-[10px] text-[#9CA3AF] pt-3">← swipe to see the full diagram →</p>
          <div className="overflow-x-auto p-4">
            <div className="relative min-w-[680px]" style={{ aspectRatio: '1200 / 575' }}>
              <Image
                src={asset('/diagrams/agentic-bi-user-question-flow-architecture.webp')}
                alt="Architecture diagram showing how a user's question moves through Agentic BI's governance layer, agents, and LLM server to pull an answer from the BI server."
                fill
                sizes="(max-width: 768px) 680px, 896px"
                className="object-contain"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-[#7C7AED] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Governance
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-6">
            Governance Is Part of How the Agent Works
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-4">
            In enterprise BI, knowing what the data means is just as important as being able
            to access it. MPP BI uses your existing business definitions to give Agentic BI
            the context it needs to work with your data.
          </p>

          <p className="text-base font-semibold text-[#0D1B2A] px-5 py-4 rounded-xl border border-[#7C7AED]/25 bg-[#7C7AED]/5 mb-4">
            Schema tells the agent what the data looks like.
            <br />
            Governance tells the agent what the data means.
          </p>

          <p className="text-[#374151] text-lg leading-relaxed mb-4">
            This means the agent does not just see tables and fields. It works within the
            definitions, rules, and access controls of your BI environment.
          </p>
          <p className="text-[#374151] text-lg leading-relaxed">
            Governance is therefore part of the runtime, not just documentation sitting
            outside the system.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
