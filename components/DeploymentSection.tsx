'use client'

import { motion } from 'framer-motion'
import { X } from 'lucide-react'

const deploymentRows = [
  { onprem: 'Runs fully inside your own infrastructure', cloud: 'Runs in your chosen cloud environment' },
  { onprem: 'Data stays within your systems', cloud: 'Data is processed in cloud infrastructure' },
  { onprem: 'Uses existing servers and databases', cloud: 'Uses cloud-provided compute resources' },
  { onprem: 'No external service dependency', cloud: 'Managed infrastructure layer' },
  { onprem: 'Works with your current security model', cloud: 'Cloud-based security configuration' },
]

const powerBILimits = [
  'On-premise setups require Windows-based servers',
  'Power BI Report Server runs only in a Microsoft-controlled stack',
  'Power BI Desktop is Windows-only',
  'Full usage typically depends on additional Microsoft ecosystem services',
]

const whoFor = [
  {
    label: 'On-premise',
    body: "The right fit if your organization needs full control over where data lives, or works under strict security and compliance rules.",
    tags: ['Government', 'Healthcare', 'Financial services', 'Manufacturing', 'Internal security or compliance requirements'],
  },
  {
    label: 'Cloud',
    body: "A good fit if your team doesn't have strict data residency requirements and wants to skip managing infrastructure. Same product, same features. Nothing to install or maintain on your own servers.",
    tags: [],
  },
]

export default function DeploymentSection() {
  return (
    <section className="relative py-24 bg-[#F5F7FA]" id="deployment">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Deployment
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-5">
            On-Premise Without Operational Complexity
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed">
            MPP BI can run fully on-premise or in your cloud environment. Both options use
            the same product and architecture &mdash; the difference is only where it runs.
          </p>
        </motion.div>

        {/* on-prem vs cloud table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden mb-14"
        >
          <div className="grid grid-cols-2">
            <div className="px-5 py-4 border-b border-r border-[#E2E8F0]" style={{ background: '#0AAEDB12' }}>
              <p className="text-xs font-bold uppercase tracking-wide text-[#0774A0]">On-Premise</p>
            </div>
            <div className="px-5 py-4 border-b border-[#E2E8F0] bg-[#F5F7FA]">
              <p className="text-xs font-bold uppercase tracking-wide text-[#6B7280]">Cloud Deployment</p>
            </div>
          </div>
          {deploymentRows.map((r, i) => (
            <div key={i} className={`grid grid-cols-2 ${i !== deploymentRows.length - 1 ? 'border-b border-[#E2E8F0]' : ''}`}>
              <div className="px-5 py-4 border-r border-[#E2E8F0]">
                <p className="text-sm text-[#374151]">{r.onprem}</p>
              </div>
              <div className="px-5 py-4">
                <p className="text-sm text-[#6B7280]">{r.cloud}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Power BI limits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h3 className="text-lg font-bold text-[#0D1B2A] mb-3">
            How Other BI Tools Approach On-Premise Setups
          </h3>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-5 max-w-2xl">
            Some BI platforms introduce additional structure even in on-premise
            environments, which can add setup and operational complexity. For example,
            Power BI:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
            {powerBILimits.map((item) => (
              <div key={item} className="flex items-start gap-2.5 rounded-lg bg-white border border-[#E2E8F0] px-4 py-3">
                <X size={14} className="text-[#E05A2B] mt-0.5 flex-shrink-0" />
                <p className="text-xs text-[#374151] leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-[#6B7280] text-sm leading-relaxed mt-5 max-w-2xl">
            This means even when deployed locally, the system is still connected to a
            specific vendor environment and its tooling.
          </p>
        </motion.div>

        {/* who is it for */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whoFor.map((w, i) => (
            <motion.div
              key={w.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-[#E2E8F0] bg-white p-7"
            >
              <h4 className="text-base font-bold text-[#0D1B2A] mb-3">{w.label}</h4>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-4">{w.body}</p>
              {w.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {w.tags.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#F5F7FA] border border-[#E2E8F0] text-[#374151]">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[#6B7280] text-sm mt-10 max-w-2xl mx-auto">
          Either way, you control who can see your data: row and chart-level access,
          multi-factor authentication, and a full audit log.
        </p>
      </div>
    </section>
  )
}
