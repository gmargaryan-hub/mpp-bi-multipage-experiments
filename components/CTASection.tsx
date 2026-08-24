'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { openDemoModal } from '@/lib/openDemoModal'
import { asset } from '@/lib/basePath'

export default function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden bg-[#0D1B2A]">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-20" />
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[900px] h-[600px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(10,174,219,0.15) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-10">

        {/* Logo with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="relative flex items-center justify-center"
        >
          {/* Glow behind logo */}
          <div className="absolute w-72 h-28 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(10,174,219,0.35) 0%, transparent 70%)', filter: 'blur(16px)' }} />
          <Image src={asset('/mppbi-logo-dark-bg.svg')} alt="MPP BI" width={240} height={71} className="object-contain relative z-10" unoptimized />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Stop Moving Your Data
            <br />
            <span className="text-[#0AAEDB]">to Your BI Tool.</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/50 font-medium">
            Bring your BI tool to your data.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <button onClick={openDemoModal} className="bg-[#0AAEDB] hover:bg-[#0074A6] text-white font-semibold text-base px-8 py-4 rounded-lg transition-colors duration-200 flex items-center gap-2 min-w-[220px] justify-center">Book a Strategy Call <ArrowRight size={18} /></button>
        </motion.div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col items-center gap-2 text-sm text-white/30"
        >
          <p>MPP BI is developed by MPP Insights LLC — headquartered in Richmond, Virginia with an R&amp;D center in Yerevan, Armenia. Global delivery. UN Supplier.</p>
          <a
            href="https://mpp-insights.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-[#0AAEDB] transition-colors underline underline-offset-2 text-xs mt-1"
          >
            mpp-insights.com
          </a>
        </motion.div>
      </div>
    </section>
  )
}
