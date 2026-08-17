'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const READ_ONLY_PRICE = 10
const ADMIN_PRICE = 18

export default function PricingCalculatorSection() {
  const [readOnlyUsers, setReadOnlyUsers] = useState(50)
  const [adminUsers, setAdminUsers] = useState(5)

  const monthlyTotal = readOnlyUsers * READ_ONLY_PRICE + adminUsers * ADMIN_PRICE
  const annualTotal = monthlyTotal * 12

  return (
    <section className="relative py-24 bg-white" id="calculator">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#F97316] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Estimate your cost
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-5">
            License Calculator
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed">
            Move the sliders to match your team, and see roughly what MPP BI would cost per
            month.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-[#E2E8F0] bg-[#F5F7FA] p-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <label className="text-sm font-semibold text-[#0D1B2A]">Read-only users</label>
                <span className="text-sm font-bold text-[#0D1B2A]">{readOnlyUsers}</span>
              </div>
              <input
                type="range"
                min={0}
                max={500}
                step={5}
                value={readOnlyUsers}
                onChange={(e) => setReadOnlyUsers(Number(e.target.value))}
                className="w-full accent-[#0AAEDB]"
              />
              <p className="text-xs text-[#9CA3AF] mt-1.5">$10 / user / month</p>
            </div>
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <label className="text-sm font-semibold text-[#0D1B2A]">Admin users</label>
                <span className="text-sm font-bold text-[#0D1B2A]">{adminUsers}</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={adminUsers}
                onChange={(e) => setAdminUsers(Number(e.target.value))}
                className="w-full accent-[#F97316]"
              />
              <p className="text-xs text-[#9CA3AF] mt-1.5">$18 / user / month</p>
            </div>
          </div>

          <div className="rounded-xl bg-white border border-[#E2E8F0] p-6 grid grid-cols-2 gap-6 text-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[#9CA3AF] mb-1.5">Estimated monthly</p>
              <p className="text-3xl font-black font-display text-[#0D1B2A]">
                ${monthlyTotal.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[#9CA3AF] mb-1.5">Estimated annual</p>
              <p className="text-3xl font-black font-display text-[#0D1B2A]">
                ${annualTotal.toLocaleString()}
              </p>
            </div>
          </div>

          <p className="text-xs text-[#9CA3AF] text-center mt-5">
            Estimate only, based on published monthly per-seat pricing. For larger teams,
            perpetual licensing, or a custom deployment, we&apos;ll put together exact
            numbers for your setup.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
