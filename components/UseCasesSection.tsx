'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Tabs from '@radix-ui/react-tabs'
import { TrendingUp, Flame, Shield, Building2, BookOpen, Landmark } from 'lucide-react'
import { openDemoModal } from '@/lib/openDemoModal'

const industries = [
  {
    id: 'financial',
    label: 'Financial Services',
    icon: TrendingUp,
    color: '#00C2FF',
    headline: 'Real-Time Risk at Scale',
    subheadline: 'When milliseconds determine margin, you can\'t afford a three-tier BI pipeline.',
    pains: [
      'Real-time risk dashboards require sub-second query response',
      'Regulatory data cannot leave on-premises infrastructure',
      'Complex financial models choke traditional BI servers',
      'Audit trails demand data lineage without extraction gaps',
    ],
    result: {
      metric: '2x–12x',
      description: 'Faster risk calculations vs. traditional BI platforms, with zero data extraction from compliant databases.',
    },
    bullets: [
      'Business logic runs inside your compliant database — data never leaves',
      'Hot/Warm/Cold tiers handle real-time feeds through historical archives',
      'Perpetual license available for regulatory and air-gapped environments',
      'AI/ML risk scoring natively integrated via stored procedures',
    ],
  },
  {
    id: 'oilgas',
    label: 'Oil & Gas',
    icon: Flame,
    color: '#F59E0B',
    headline: 'Operational Intelligence at the Wellhead',
    subheadline: 'Remote operations demand analytics that work without reliable connectivity — or third-party cloud dependence.',
    pains: [
      'SCADA and IoT data volumes overwhelm traditional BI ingestion',
      'Remote sites with limited connectivity need on-premises deployment',
      'Real-time production monitoring cannot tolerate ETL lag',
      'High-cost cloud BI bills grow with every sensor added',
    ],
    result: {
      metric: 'On-Premises',
      description: 'Full deployment in air-gapped, remote, or sovereign environments with zero cloud dependency.',
    },
    bullets: [
      'Deploy fully on-premises — no cloud connectivity required',
      'Kafka and streaming data sources supported natively',
      'Scales to billions of sensor records without performance degradation',
      'Open SOA: integrate with existing SCADA, ERP, and DCS systems',
    ],
  },
  {
    id: 'insurance',
    label: 'Insurance',
    icon: Shield,
    color: '#8B5CF6',
    headline: '2 Billion Records. Under 5 Minutes.',
    subheadline: 'Proven at scale: MPP BI processed 2B+ insurance records and helped reduce payment defaults by 51%.',
    pains: [
      '2B+ policy and claims records that break standard BI tools',
      'Payment default prediction requires ML across entire book of business',
      'Actuarial models need raw database access without extraction',
      'Regulatory reporting demands complete audit trails',
    ],
    result: {
      metric: '51% reduction',
      description: 'In payment defaults after deploying MPP BI predictive analytics — documented case study.',
    },
    bullets: [
      'Proven on 2B+ record datasets with <5 minute query time',
      'Native ML/AI via stored procedures — no Python server required',
      'Cold layer (Hadoop/S3) for historical claims, hot layer for active policies',
      'Source code available for regulatory audit requirements',
    ],
  },
  {
    id: 'construction',
    label: 'Construction',
    icon: Building2,
    color: '#00E5A0',
    headline: '$1M+ Saved. One Deployment.',
    subheadline: 'Real-time procurement analytics eliminate cost overruns when every stakeholder has live financial visibility.',
    pains: [
      'Project cost data locked in ERP systems, inaccessible to field teams',
      'Budget variance discovered weeks after overspend occurs',
      'Multiple data silos: procurement, labor, equipment, subcontractors',
      'Executive dashboards disconnected from operational reality',
    ],
    result: {
      metric: '$1M+',
      description: 'Annual savings from analytics alone — steel and rebar procurement analysis across 500+ entities, with real-time budget KPIs.',
    },
    bullets: [
      'Connects to SAP, Oracle, Excel, and custom ERP systems simultaneously',
      'Real-time project dashboards from stored procedures — no lag',
      'Mobile-ready HTML5 client for field supervisors',
      'Embedded analytics in existing project management portals',
    ],
  },
  {
    id: 'publishing',
    label: 'Publishing',
    icon: BookOpen,
    color: '#EC4899',
    headline: 'Reader Intelligence. Without the Data Tax.',
    subheadline: 'Digital publishing generates enormous behavioral data. Most BI tools require exporting it all before analysis.',
    pains: [
      'Article performance, reader behavior, and subscription data in separate systems',
      'Content recommendation ML requires real-time reader data',
      'A/B testing results need same-day analytics to be actionable',
      'Ad revenue and subscription metrics demand unified dashboards',
    ],
    result: {
      metric: 'Real-Time',
      description: 'Content performance analytics with zero data movement — all analysis happens inside the database.',
    },
    bullets: [
      'Unify CMS, CRM, subscription, and ad data without ETL',
      'Native AI/ML for content recommendation and churn prediction',
      'Embedded analytics in CMS dashboards via thin HTML5 client',
      'Hot layer (ClickHouse) for real-time reader behavior streams',
    ],
  },
  {
    id: 'government',
    label: 'Government',
    icon: Landmark,
    color: '#6B7280',
    headline: 'Sovereign Analytics. Certified Delivery.',
    subheadline: 'UN Supplier status. 20 years of delivery. For organizations where data sovereignty is non-negotiable.',
    pains: [
      'Data sovereignty laws prohibit cloud BI for sensitive datasets',
      'Long procurement cycles demand proven, stable platforms',
      'Legacy system integration (mainframe, Oracle, SAP) is unavoidable',
      'Public audit requirements need complete data lineage',
    ],
    result: {
      metric: 'UN Supplier',
      description: 'Certified UN Supplier with 20 years of public sector delivery history and full on-premises deployment capability.',
    },
    bullets: [
      'Full on-premises deployment — data never leaves sovereign infrastructure',
      'Perpetual license for multi-year government procurement cycles',
      'Connects to legacy Oracle, SAP, and mainframe systems',
      'Source code available per license for security audit requirements',
    ],
  },
]

export default function UseCasesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 relative bg-white" id="use-cases">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#0AAEDB] text-sm font-semibold tracking-widest uppercase mb-4">Use Cases</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-6">
            Built for the Industries That{' '}
            <span className="gradient-text">Can&apos;t Afford Slow</span>
          </h2>
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
            Real deployments. Real results. Industries where data sovereignty, performance, and cost all matter.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Tabs.Root defaultValue="financial" className="w-full">
            {/* Tab list */}
            <Tabs.List className="flex flex-wrap gap-2 mb-8 border-b border-[#E2E8F0] pb-0">
              {industries.map((ind) => {
                const Icon = ind.icon
                return (
                  <Tabs.Trigger
                    key={ind.id}
                    value={ind.id}
                    className="group flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#6B7280] hover:text-[#0D1B2A] border-b-2 border-transparent data-[state=active]:border-[#0AAEDB] data-[state=active]:text-[#0AAEDB] transition-all duration-200 -mb-px cursor-pointer"
                  >
                    <Icon size={14} />
                    {ind.label}
                  </Tabs.Trigger>
                )
              })}
            </Tabs.List>

            {/* Tab content */}
            {industries.map((ind) => {
              const Icon = ind.icon
              return (
                <Tabs.Content key={ind.id} value={ind.id}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                    >
                      {/* Main content */}
                      <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-[#E2E8F0]">
                        <div className="flex items-center gap-4 mb-6">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: `${ind.color}15`, border: `1px solid ${ind.color}30` }}
                          >
                            <Icon size={22} color={ind.color} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-[#0D1B2A]">{ind.headline}</h3>
                            <p className="text-[#6B7280] text-sm mt-1">{ind.subheadline}</p>
                          </div>
                        </div>

                        <div className="mb-8">
                          <p className="text-xs text-[#6B7280] font-semibold uppercase tracking-widest mb-4">Pain Points</p>
                          <ul className="space-y-3">
                            {ind.pains.map((pain) => (
                              <li key={pain} className="flex items-start gap-3 text-sm text-[#374151]">
                                <span className="text-[#E05A2B] mt-0.5 flex-shrink-0">✗</span>
                                {pain}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="text-xs text-[#6B7280] font-semibold uppercase tracking-widest mb-4">Why MPP BI</p>
                          <ul className="space-y-3">
                            {ind.bullets.map((bullet) => (
                              <li key={bullet} className="flex items-start gap-3 text-sm text-[#374151]">
                                <span className="text-[#0AAEDB] mt-0.5 flex-shrink-0">✓</span>
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Result card */}
                      <div className="flex flex-col gap-4">
                        <div
                          className="bg-white rounded-2xl p-8 border flex flex-col items-center text-center flex-1"
                          style={{ borderColor: `${ind.color}30` }}
                        >
                          <p className="text-xs text-[#6B7280] font-semibold uppercase tracking-widest mb-4">Key Result</p>
                          <div
                            className="text-5xl font-black mb-4 leading-none"
                            style={{ color: ind.color }}
                          >
                            {ind.result.metric}
                          </div>
                          <p className="text-[#6B7280] text-sm leading-relaxed">
                            {ind.result.description}
                          </p>
                        </div>

                        <div className="bg-[#F5F7FA] rounded-2xl p-6 border border-[#E2E8F0]">
                          <p className="text-xs text-[#4B5563] font-semibold uppercase tracking-widest mb-3">
                            Pricing for this sector
                          </p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-[#6B7280]">Read-Only</span>
                              <span className="text-[#0AAEDB] font-bold">$10/seat/mo</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-[#6B7280]">Creator/Admin</span>
                              <span className="text-[#0AAEDB] font-bold">$18/seat/mo</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-[#6B7280]">Perpetual</span>
                              <span className="text-[#10B981] font-bold">Available</span>
                            </div>
                          </div>
                          <button onClick={openDemoModal} className="mt-4 block text-center text-xs text-[#0AAEDB] hover:underline underline-offset-2">Book a demo for your industry</button>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </Tabs.Content>
              )
            })}
          </Tabs.Root>
        </motion.div>
      </div>
    </section>
  )
}
