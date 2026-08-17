'use client'

import { motion } from 'framer-motion'

const milestones = [
  {
    year: '2001',
    title: 'Where it started',
    body: 'Sergei Shestakov, the founder of MPP Insights, earned his PhD in Artificial Intelligence. He then began working in and researching data architecture. Over the next 20 years, he applied that research to solving enterprise data problems.',
  },
  {
    year: '2022',
    title: 'From experience to a company',
    body: 'That experience became MPP Insights. The architecture behind MPP BI and MPP ETL comes directly from those two decades of hands-on work and research.',
  },
  {
    year: '2025',
    title: 'A U.S. company',
    body: 'MPP Insights expanded into the U.S. to serve more enterprise clients. Peter Bilzerian joined as U.S. Managing Director, leading market growth, client relationships, and delivery coordination between the U.S. and Armenia teams. Our R&D office remains in Yerevan, where our engineering team continues to develop MPP BI and MPP ETL.',
  },
]

export default function CompanyTimelineSection() {
  return (
    <section className="relative py-24 bg-white" id="timeline">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Our story
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A]">
            20 Years of Experience, Built Into a Platform
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mt-5 max-w-xl mx-auto">
            MPP BI is a product by MPP Insights. What makes it different is where it came
            from.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[27px] top-2 bottom-2 w-px bg-[#E2E8F0] hidden sm:block" />
          <div className="flex flex-col gap-10">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex gap-6 sm:pl-0"
              >
                <div
                  className="hidden sm:flex w-14 h-14 rounded-full items-center justify-center flex-shrink-0 z-10 text-xs font-black font-display"
                  style={{ background: '#0AAEDB15', border: '2px solid #0AAEDB', color: '#0774A0' }}
                >
                  {m.year}
                </div>
                <div className="flex-1 pt-1">
                  <p className="sm:hidden text-xs font-black font-display text-[#0AAEDB] mb-1">{m.year}</p>
                  <h3 className="text-xl font-bold text-[#0D1B2A] mb-2.5">{m.title}</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed">{m.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
