'use client'

import { motion } from 'framer-motion'

export default function MissionSection() {
  return (
    <section className="relative py-24 bg-white" id="mission">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-6">
            Our Mission
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed">
            At MPP Insights, we uncover the full potential of your data and reveal insights
            that drive real change. We empower organizations to make smarter, faster and
            more impactful decisions by understanding their complex data.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
