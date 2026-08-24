'use client'

import { motion } from 'framer-motion'
import { BarChart3, Brain, GitMerge, Lock, Code2, Puzzle } from 'lucide-react'

const features = [
  {
    icon: BarChart3,
    title: '30+ Visualization Types',
    description: 'Dashboards, geographic maps, SVG industrial schematics, heatmaps, Gantt, KPI cards, drill-down. Custom visualizations via TypeScript/JavaScript API.',
    tag: 'Visualizations',
    accent: '#0AAEDB',
  },
  {
    icon: Brain,
    title: 'AI/ML Native',
    description: 'LLM chatbot interface, predictive forecasting, NLP on unstructured data, R and Python model integration. No separate AI infrastructure required.',
    tag: 'Intelligence',
    accent: '#8B5CF6',
  },
  {
    icon: GitMerge,
    title: 'MPP ETL Included',
    description: 'Visual no-code ETL/ELT pipeline builder included in every license. Kafka, Redis, SAP RFC, ClickHouse, Oracle, PostgreSQL. 7,000+ events/sec streaming.',
    tag: 'Data Integration',
    accent: '#10B981',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'AD + Kerberos, OAuth 2.0, OpenID Connect, JWT, SHA-512 hashing, row-level access enforced at metadata layer before query execution. Full audit logging.',
    tag: 'Security',
    accent: '#F59E0B',
  },
  {
    icon: Code2,
    title: '100% Customizable',
    description: 'Full brand kit, JavaScript API for custom visualizations, industrial schematics to exact operator specification. White-label ready. Source code per license.',
    tag: 'Flexibility',
    accent: '#EC4899',
  },
  {
    icon: Puzzle,
    title: 'Embedded Analytics',
    description: 'Embed dashboards into any external system or public website. Authenticated embedding with role inheritance. No MPP BI branding required.',
    tag: 'Embedding',
    accent: '#0AAEDB',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
}

export default function FeaturesGrid() {
  return (
    <section className="py-32 relative overflow-hidden" id="features" style={{
      background: 'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(10,174,219,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 60%, rgba(0,116,166,0.04) 0%, transparent 60%), #F5F7FA'
    }}>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65 }}
          className="text-center mb-16"
        >
          <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.15em] uppercase mb-4">Platform Features</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-6">
            Everything You&apos;d Expect.{' '}
            <span className="gradient-text">Plus What You Wouldn&apos;t.</span>
          </h2>
          <p className="text-[#374151] text-lg max-w-2xl mx-auto leading-relaxed">
            A full-stack analytics platform that lives inside your database — with the features to prove it.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={cardVariant}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ duration: 0.2 }}
                className="group relative bg-white rounded-2xl p-7 border border-[#E2E8F0] flex flex-col gap-4 cursor-default overflow-hidden"
                style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)' }}
              >
                {/* Top shimmer line on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent 0%, ${feature.accent} 50%, transparent 100%)` }}
                />

                <div className="flex items-center justify-between">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${feature.accent}14`,
                      border: `1px solid ${feature.accent}28`,
                      boxShadow: `0 0 20px ${feature.accent}18`,
                    }}
                  >
                    <Icon size={18} color={feature.accent} />
                  </div>
                  <span
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide"
                    style={{
                      background: `${feature.accent}10`,
                      color: feature.accent,
                      border: `1px solid ${feature.accent}22`,
                    }}
                  >
                    {feature.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0D1B2A] leading-snug">{feature.title}</h3>
                <p className="text-sm text-[#374151] leading-relaxed flex-1">{feature.description}</p>

                {/* Hover glow overlay */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1px ${feature.accent}25, 0 20px 60px ${feature.accent}10` }}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
