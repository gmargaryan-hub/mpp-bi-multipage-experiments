'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, KeyRound, Lock, Eye, ScrollText } from 'lucide-react'

const groups = [
  {
    icon: KeyRound,
    title: 'Safe sign-in',
    items: [
      'Staff sign in with their existing company account \u2014 Active Directory, Kerberos, or any LDAP system',
      'Fits your existing security setup \u2014 OAuth 2.0, OpenID Connect, and tools like KeyCloak',
      'Multi-factor authentication (MFA)',
      'Secure access for connected software via signed JWTs',
    ],
  },
  {
    icon: Lock,
    title: 'Data kept safe',
    items: [
      'Passwords are encrypted before storage \u2014 the real password is never kept anywhere',
      'Everything travels encrypted in transit, the same protection trusted by online banking',
    ],
  },
  {
    icon: Eye,
    title: 'You decide who sees what',
    items: [
      'Granular access control \u2014 set permissions separately for data sources, cubes, atlases, dashboards, and individual charts',
      'Row-level security \u2014 two people can open the same dashboard and each see only the records they\u2019re allowed to',
    ],
  },
  {
    icon: ScrollText,
    title: 'A full record of activity',
    items: [
      'SIEM-based logs \u2014 every action recorded in a format that plugs into standard security monitoring tools, exportable anytime',
    ],
  },
]

export default function SecuritySection() {
  return (
    <section className="relative py-24 bg-[#F5F7FA]" id="security">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-6"
        >
          <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Security
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-5">
            Enterprise Security
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed">
            For industries that want more security, an on-premise deployment is recommended.
            MPP BI runs on your own servers rather than in the cloud, so your data is fully
            under your control.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {groups.map((g, i) => {
            const Icon = g.icon
            return (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-[#E2E8F0] bg-white p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: '#0AAEDB15', border: '1px solid #0AAEDB30' }}
                  >
                    <Icon size={16} style={{ color: '#0AAEDB' }} />
                  </div>
                  <h3 className="text-sm font-bold text-[#0D1B2A]">{g.title}</h3>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {g.items.map((item) => (
                    <li key={item} className="text-xs text-[#6B7280] leading-relaxed flex gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#0AAEDB] mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-3 mt-6 px-5 py-4 rounded-xl bg-white border border-[#E2E8F0] max-w-2xl mx-auto"
        >
          <ShieldCheck size={18} className="text-[#0AAEDB] flex-shrink-0" />
          <p className="text-xs text-[#374151]">
            On-premise deployment keeps your data fully under your own control, from
            sign-in through storage to the audit trail.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
