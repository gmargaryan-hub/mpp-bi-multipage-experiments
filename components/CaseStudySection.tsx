'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { asset } from '@/lib/basePath'

const results = [
  'Handles sensitive social services data entirely on its own infrastructure',
  'Reporting pulls from multiple systems into one consistent view',
  'Relies far less on the Microsoft ecosystem',
  'Ready to take on new data sources and more users as it grows',
]

export default function CaseStudySection() {
  return (
    <section className="relative py-24 bg-[#F5F7FA]" id="case-study">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Case study
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-4">
            A Government Foundation That Left Power BI Behind
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden"
          style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.08)' }}
        >
          {/* Dashboard screenshot — container aspect ratio matches the image exactly
              (1280x600), so it displays with no cropping and no distortion. The card
              itself is capped at max-w-4xl above so the image lands around 768px wide —
              the source is only 1280px wide, and stretching further softens noticeably
              on high-DPI displays. */}
          <div className="pt-8 px-8 md:pt-10 md:px-10">
            <div className="relative w-full rounded-xl overflow-hidden bg-[#0D1B2A]" style={{ aspectRatio: '1280 / 600' }}>
              <Image
                src={asset('/case-study/wise-dashboard.png')}
                alt="Social services analytics dashboard built on MPP BI for the WISE foundation"
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                quality={100}
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-10">
            <div className="flex items-center gap-5 mb-6">
              <div className="relative h-8 w-24">
                <Image src={asset('/case-study/wise.png')} alt="WISE" fill className="object-contain object-left" />
              </div>
              <div className="relative h-9 w-20">
                <Image src={asset('/case-study/undp.png')} alt="UNDP" fill className="object-contain object-left" />
              </div>
              <div className="relative h-10 w-16">
                <Image
                  src={asset('/case-study/ministry-of-labor-armenia.png')}
                  alt="Republic of Armenia, Ministry of Labour & Social Affairs"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>

            <p className="text-[#6B7280] text-sm mb-5 leading-relaxed max-w-2xl">
              In partnership with the United Nations Development Programme (UNDP), for the
              WISE foundation, which runs digital social services systems for Armenia&apos;s
              Ministry of Labour and Social Affairs.
            </p>

            <p className="text-[#374151] text-base leading-relaxed mb-6 max-w-2xl">
              WISE needed a BI tool that could run fully on its own infrastructure and scale
              as it grew. Power BI couldn&apos;t offer that, so WISE switched to MPP BI. Now
              they run their reporting independently, pull data from multiple systems into
              one view, and can keep adding new sources and users without limits.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 mb-8 max-w-3xl">
              {results.map((r) => (
                <li key={r} className="flex items-start gap-2.5">
                  <CheckCircle2 size={17} className="text-[#10B981] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#374151]">{r}</span>
                </li>
              ))}
            </ul>

            <Link
              href="https://mpp-insights.com/blog/social-services-analytics"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0AAEDB] hover:gap-2.5 transition-all w-fit"
            >
              Read the full case study
              <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
