'use client'

import { motion } from 'framer-motion'

export default function MissionSection() {
  return (
    <section className="relative py-24 bg-white" id="mission">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.18em] uppercase mb-4 text-center">
            Our mission
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0D1B2A] mb-8 text-center">
            Built From Where We&apos;d Already Seen BI Fail
          </h2>

          <p className="text-[#374151] text-base leading-relaxed mb-5">
            We&apos;ve spent 20 years inside enterprise data problems, long before we built
            anything to sell. We kept seeing the same pattern: a company buys a BI tool, it
            works fine in the demo, then it breaks the moment real conditions hit it &mdash;
            data that keeps changing, strict compliance rules, a team that isn&apos;t made up
            of analysts.
          </p>
          <p className="text-[#374151] text-base leading-relaxed mb-10">
            The tools themselves made this worse. Most BI platforms lock you into one
            ecosystem, require a separate tool just to prepare your data, and run on an old
            architecture that was never built to keep up once things change. None of that
            was built for how enterprises actually operate &mdash; it was patched on to sell
            to them.
          </p>

          <blockquote className="border-l-2 pl-6 py-1 mb-10" style={{ borderColor: '#0AAEDB' }}>
            <p className="text-xl md:text-2xl font-display font-semibold text-[#0D1B2A] leading-snug italic">
              &ldquo;We didn&apos;t build MPP BI to follow where BI was going &mdash; we built
              it based on where we&apos;d already seen it fail.&rdquo;
            </p>
          </blockquote>

          <p className="text-[#374151] text-base leading-relaxed">
            MPP BI was built to close that gap. Every part of it was designed for enterprise
            conditions from the start, so it never needed the kind of adjustments most tools
            require later.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
