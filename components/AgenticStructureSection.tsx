'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Brain, Wrench, Database, BookOpen, Layers, ShieldCheck } from 'lucide-react'
import { asset } from '@/lib/basePath'

const layers = [
  { icon: Brain, title: 'Model', body: 'The model understands the request and helps decide how to approach the task.' },
  { icon: Wrench, title: 'Tools', body: 'Tools let the agent work with the systems around it. They can include data sources, APIs, and other connected services.' },
  { icon: Database, title: 'Memory', body: 'Memory gives the agent context about your data and previous questions, so it does not have to start from zero every time.' },
  { icon: BookOpen, title: 'Skills', body: "Skills are the agent's playbooks. They contain step-by-step instructions for specific tasks, similar to the procedures analysts already follow." },
  { icon: Layers, title: 'Harness', body: 'The harness connects the model with its tools, memory, and skills. It gives the agent the environment it needs to actually perform a task.' },
  { icon: ShieldCheck, title: 'Governance', body: 'Governance controls what the agent can access and do. It applies across the model, tools, memory, and skills.' },
]

export default function AgenticStructureSection() {
  return (
    <section className="relative py-24 bg-white" id="structure">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-10"
        >
          <p className="text-[#7C7AED] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            The structure
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-5">
            What Makes MPP BI Agentic
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed">
            A chatbot can answer a question. An agent can work through a task, and it needs
            more than a model. Agentic BI combines an AI model with the tools, memory,
            skills, and controls it needs to complete that work.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-[#E2E8F0] overflow-hidden mb-14 bg-[#FAFAF9]"
        >
          <p className="sm:hidden text-center text-[10px] text-[#9CA3AF] pt-3">← swipe to see the full diagram →</p>
          <div className="overflow-x-auto p-4">
            <div className="relative min-w-[680px]" style={{ aspectRatio: '1200 / 601' }}>
              <Image
                src={asset('/diagrams/agentic-bi-governance-harness-agent-architecture.webp')}
                alt="Diagram of Agentic BI's structure: governance surrounds the agent, which runs on a harness of tools, memory, and skills connected to the AI model, with human oversight over every output."
                fill
                sizes="(max-width: 768px) 680px, 896px"
                className="object-contain"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {layers.map((l, i) => {
            const Icon = l.icon
            return (
              <motion.div
                key={l.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-2xl border border-[#E2E8F0] bg-[#F5F7FA] p-5"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: '#7C7AED15', border: '1px solid #7C7AED30' }}
                >
                  <Icon size={16} style={{ color: '#7C7AED' }} />
                </div>
                <h3 className="text-sm font-bold text-[#0D1B2A] mb-1.5">{l.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{l.body}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-base font-semibold text-[#0D1B2A] max-w-2xl mx-auto"
        >
          Together, these layers turn an AI model into an agent that can work with your BI
          environment.
        </motion.p>
      </div>
    </section>
  )
}
