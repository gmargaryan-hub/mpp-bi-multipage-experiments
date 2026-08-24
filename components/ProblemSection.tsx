'use client'

import { motion } from 'framer-motion'
import { Database, Server, AlertTriangle } from 'lucide-react'

const problems = [
  {
    icon: Database,
    title: 'Your Data Leaves Home',
    description:
      'Tableau and Power BI extract your data into their own storage engines — Hyper and VertiPaq respectively. Every full-scale query requires a data copy. Latency. Security surface area. Infrastructure cost paid twice — once for the database, once for the BI layer that duplicates it.',
    callout: 'Import Mode = Data Copy = Stale Data',
  },
  {
    icon: Server,
    title: "You're Paying for an Engine You Don't Need",
    description:
      "Power BI Premium. Tableau Server. License it, manage it, scale it, secure it — and it's still slower than running analytics where the data already lives. Switch to DirectQuery or Live Connection mode and roughly 40% of your calculation functions break. Not a bug. An architectural consequence.",
    callout: 'DirectQuery Wall ≈ 40% of Functions Disabled',
  },
  {
    icon: AlertTriangle,
    title: 'Three Tiers. Three Points of Failure.',
    description:
      "Client → Application Server → Database. Every hop introduces latency, synchronization lag, and security exposure. This architecture hasn't fundamentally changed since the 1990s. The calculation engine was a workaround for slow databases. Databases are no longer slow. The engine is just overhead.",
    callout: 'Client → App Server → Calc Engine → Source',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function ProblemSection() {
  return (
    <section className="py-32 relative bg-white overflow-hidden" id="problem">
      {/* Subtle warm glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] opacity-40"
          style={{ background: 'radial-gradient(ellipse, rgba(224,90,43,0.06) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65 }}
          className="text-center mb-16"
        >
          <p className="text-[#E05A2B] text-xs font-semibold tracking-[0.15em] uppercase mb-4">The Problem</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-6">
            Traditional BI Has a <span className="text-[#E05A2B]">Dirty Secret.</span>
          </h2>
          <p className="text-[#374151] text-lg max-w-2xl mx-auto leading-relaxed">
            Every major BI platform was built around a calculation engine invented when databases were too slow for real-time analytics. Databases are no longer too slow. The engine is now just overhead.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {problems.map((problem) => {
            const Icon = problem.icon
            return (
              <motion.div
                key={problem.title}
                variants={cardVariant}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="group relative bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden cursor-default"
                style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)' }}
              >
                {/* Coral accent top bar */}
                <div className="h-[3px] w-full" style={{ background: 'linear-gradient(90deg, #E05A2B80, #E05A2B, #E05A2B80)' }} />

                <div className="p-8">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-6"
                    style={{
                      background: '#FEF2EE',
                      border: '1px solid rgba(224,90,43,0.2)',
                      boxShadow: '0 0 16px rgba(224,90,43,0.1)',
                    }}
                  >
                    <Icon size={20} color="#E05A2B" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0D1B2A] mb-4 leading-snug">{problem.title}</h3>
                  <p className="text-[#374151] text-sm leading-relaxed mb-6">{problem.description}</p>
                  <div className="border-t border-[#E2E8F0] pt-4">
                    <p className="text-xs font-mono px-3 py-2.5 rounded-lg bg-[#FEF2EE] text-[#E05A2B] border border-[#E05A2B]/15 leading-snug tracking-wide">
                      {problem.callout}
                    </p>
                  </div>
                </div>

                {/* Hover border glow */}
                <div className="absolute inset-0 rounded-2xl border border-[#E05A2B]/0 group-hover:border-[#E05A2B]/25 transition-colors duration-300 pointer-events-none" />
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-[#6B7280] text-base leading-relaxed">
            MPP BI was designed from day one to{' '}
            <span className="text-[#0AAEDB] font-semibold">eliminate both the calculation engine and internal data storage</span>
            {' '}— by running business logic directly inside your database.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
