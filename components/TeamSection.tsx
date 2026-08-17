'use client'

import { motion } from 'framer-motion'

const team = [
  {
    initials: 'SS',
    name: 'Sergei Shestakov',
    role: 'Founder & CEO',
    bio: 'Sergei founded MPP Insights after more than 20 years designing enterprise data architecture and analytics systems. Today, he leads the product vision and technical direction behind MPP BI and MPP ETL.',
    color: '#0AAEDB',
  },
  {
    initials: 'PB',
    name: 'Peter Bilzerian',
    role: 'U.S. Managing Director',
    bio: 'Before joining MPP Insights, Peter led data engineering and business intelligence initiatives at Bank of America, where his work helped drive an estimated $20 million in cost savings. At MPP Insights, he leads U.S. strategy and operations, including market expansion, client relationships, and delivery coordination between the U.S. and Armenia teams.',
    color: '#10B981',
  },
]

const industries = [
  'Healthcare',
  'Transportation & Logistics',
  'Telecom',
  'Finance & Banking',
  'Oil & Gas',
  'Retail',
  'Public Sector',
]

export default function TeamSection() {
  return (
    <section className="relative py-24 bg-[#F5F7FA]" id="team">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            The team
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-5">
            The Team Behind MPP Insights
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed">
            A dashboard is only useful if it understands the business behind it. A chart
            that ignores banking regulations, supply chain complexity, or healthcare
            compliance is just a report &mdash; it doesn&apos;t help anyone make a decision.
            MPP Insights has delivered projects across these industries, and we know the
            data structures, business rules, and day-to-day realities of each one.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2.5 mb-14">
          {industries.map((ind) => (
            <span
              key={ind}
              className="px-3.5 py-2 rounded-lg text-sm font-medium bg-white border border-[#E2E8F0] text-[#374151]"
            >
              {ind}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-bold text-[#0D1B2A] mb-6">Meet the Team Behind MPP BI</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-[#E2E8F0] bg-white p-7"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-base font-black font-display mb-5"
                style={{ background: `${member.color}18`, color: member.color, border: `2px solid ${member.color}40` }}
              >
                {member.initials}
              </div>
              <h4 className="text-lg font-bold text-[#0D1B2A]">{member.name}</h4>
              <p className="text-sm font-medium mb-3" style={{ color: member.color }}>
                {member.role}
              </p>
              <p className="text-[#6B7280] text-sm leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
