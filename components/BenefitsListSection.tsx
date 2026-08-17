'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Zap, Layers, ShieldCheck, RefreshCw, DollarSign, TrendingUp, Users, Eye,
  ArrowRight, Check,
} from 'lucide-react'

const COLORS = {
  cyan: '#0AAEDB',
  green: '#10B981',
  indigo: '#6366F1',
  orange: '#F97316',
  purple: '#7C7AED',
}

function Quote({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <p
      className="text-sm font-medium italic px-4 py-3 rounded-lg border mb-5"
      style={{ background: `${color}0D`, borderColor: `${color}30`, color }}
    >
      &ldquo;{children}&rdquo;
    </p>
  )
}

function Bullets({ items, color }: { items: string[]; color: string }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <Check size={16} className="mt-0.5 flex-shrink-0" style={{ color }} />
          <span className="text-sm text-[#374151] leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}

function BlockShell({
  icon: Icon,
  color,
  title,
  index,
  children,
}: {
  icon: React.ElementType
  color: string
  title: string
  index: number
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.06 }}
      className="rounded-2xl border border-[#E2E8F0] bg-white p-7 md:p-8"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
      >
        <Icon size={20} style={{ color }} />
      </div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0D1B2A] mb-4">{title}</h2>
      {children}
    </motion.div>
  )
}

export default function BenefitsListSection() {
  return (
    <section className="relative py-24 bg-[#F5F7FA]" id="benefits">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col gap-6">

        {/* 1. Faster */}
        <BlockShell icon={Zap} color={COLORS.cyan} title="2x–12x Faster Than Traditional BI" index={0}>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-2">
            Most BI tools copy your data into a separate engine before they can calculate
            anything. That copy takes time to build, and it slows every report down.
          </p>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-5">
            MPP BI runs calculations directly where the data already lives, so there&apos;s
            nothing to copy and nothing extra standing between you and your answer.
          </p>
          <Quote color={COLORS.cyan}>Fewer steps between you and your data means faster answers.</Quote>
          <Bullets
            color={COLORS.cyan}
            items={[
              'Processes over 2 billion records in under 5 seconds',
              'Speed holds up even as your reports and calculations get more complex',
            ]}
          />
          <Link
            href="/architecture"
            className="inline-flex items-center gap-1.5 text-sm font-semibold mt-5"
            style={{ color: COLORS.cyan }}
          >
            Want the technical breakdown? See how our architecture works
            <ArrowRight size={14} />
          </Link>
        </BlockShell>

        {/* 2. Scalable */}
        <BlockShell icon={Layers} color={COLORS.green} title="Scalable Without the Complexity" index={1}>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-5">
            Most BI tools need bigger and more expensive hardware every time you add users.
            MPP BI keeps hardware needs low, even as more people use it.
          </p>
          <Quote color={COLORS.green}>More users, same small setup</Quote>
          <Bullets
            color={COLORS.green}
            items={[
              "Runs on a single node for standard use, so you don't need to buy or manage extra hardware",
              'Supports 500 people working at once with just two nodes',
              "Add capacity by adding nodes, not by rebuilding your whole setup",
              "Hundreds of people can work at once, without one person's report slowing down another's",
            ]}
          />

          <div className="mt-6 rounded-xl border border-[#E2E8F0] overflow-hidden">
            <div className="px-5 py-3 border-b border-[#E2E8F0] bg-[#F5F7FA] flex items-center justify-between gap-3">
              <h3 className="text-xs font-bold uppercase tracking-wide text-[#0D1B2A]">
                What You&apos;ll Need to Run It
              </h3>
              <span className="sm:hidden text-[10px] text-[#9CA3AF] whitespace-nowrap">← swipe →</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[420px]">
                <thead>
                  <tr className="border-b border-[#E2E8F0]">
                    <th className="text-left px-4 sm:px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-[#9CA3AF]"></th>
                    <th className="text-left px-4 sm:px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-[#9CA3AF]">Minimum</th>
                    <th className="text-left px-4 sm:px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-[#9CA3AF]">500 users at once</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#F1F5F9]">
                    <td className="px-4 sm:px-5 py-3 font-semibold text-[#0D1B2A]">Node(s)</td>
                    <td className="px-4 sm:px-5 py-3 text-[#374151]">1</td>
                    <td className="px-4 sm:px-5 py-3 text-[#374151]">2</td>
                  </tr>
                  <tr className="border-b border-[#F1F5F9]">
                    <td className="px-4 sm:px-5 py-3 font-semibold text-[#0D1B2A]">Processor</td>
                    <td className="px-4 sm:px-5 py-3 text-[#374151]">8 cores</td>
                    <td className="px-4 sm:px-5 py-3 text-[#374151]">16 cores / each</td>
                  </tr>
                  <tr>
                    <td className="px-4 sm:px-5 py-3 font-semibold text-[#0D1B2A]">Memory (RAM)</td>
                    <td className="px-4 sm:px-5 py-3 text-[#374151]">24 GB</td>
                    <td className="px-4 sm:px-5 py-3 text-[#374151]">32 GB / each</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </BlockShell>

        {/* 3. Secure */}
        <BlockShell icon={ShieldCheck} color={COLORS.indigo} title="Secure Enough for Sensitive Data" index={2}>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-5">
            Your data never has to leave your own systems. MPP BI runs fully on your own
            servers if you need that, with no cloud connection required at all.
          </p>
          <Quote color={COLORS.indigo}>Your data stays where it is. You control who sees it.</Quote>
          <Bullets
            color={COLORS.indigo}
            items={[
              'Runs fully on-premise, with no need for an internet connection or outside servers',
              'Checks what someone can see before any data is pulled',
              'Sign in with your existing company accounts, plus multi-factor authentication',
              'Every action is logged, so you always know who did what and when',
            ]}
          />
        </BlockShell>

        {/* 4. Always Live */}
        <BlockShell icon={RefreshCw} color={COLORS.cyan} title="Data Can Always Be Live, But It Doesn't Have To Be" index={3}>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-2">
            Different teams need data in different ways. Some rely on scheduled updates,
            some need changes as they happen, and others work with historical data that
            doesn&apos;t need refreshing.
          </p>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-5">
            MPP BI supports all of these scenarios, so each dashboard can follow the update
            pattern that fits its use case.
          </p>
          <Quote color={COLORS.cyan}>Built for every reporting need</Quote>
          <Bullets
            color={COLORS.cyan}
            items={[
              'Scheduled updates for regular reporting needs like daily or weekly dashboards',
              'Trigger-based updates when something changes',
              'Near real-time or real-time updates for time-sensitive decisions',
              "Historical datasets for analysis that doesn't require refreshes",
            ]}
          />
        </BlockShell>

        {/* 5. Affordable */}
        <BlockShell icon={DollarSign} color={COLORS.orange} title="Affordable Pricing" index={4}>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-5">
            MPP BI starts at $10 per user each month, less than Tableau or Power BI. The
            price is public from day one.
          </p>
          <Quote color={COLORS.orange}>Starting at $10 per user</Quote>
          <Bullets
            color={COLORS.orange}
            items={[
              'Starts at $10/user per month, versus $15 (Tableau) and $14 (Power BI)',
              'Admin seats cost less too: $18, versus $115 (Tableau) and $24 (Power BI)',
              'Choose a monthly subscription or a one-time license — most tools only offer subscriptions',
              "Data prep (ETL) is built in, so there's no separate tool to buy and license",
            ]}
          />
        </BlockShell>

        {/* 6. Foresight */}
        <BlockShell icon={TrendingUp} color={COLORS.green} title="Plan Ahead With Your Own Data" index={5}>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-5">
            Most reports only tell you what already happened. MPP BI shows you what&apos;s
            likely to happen next, using your own data, so you can act before a problem or
            opportunity arrives.
          </p>
          <Quote color={COLORS.green}>Turn insight into foresight</Quote>
          <Bullets
            color={COLORS.green}
            items={[
              'Spot trends before they affect your business',
              'Plan ahead instead of reacting after the fact',
              'Back up your decisions with real numbers, not guesses',
            ]}
          />
        </BlockShell>

        {/* 7. Self-service + AI (two-part) */}
        <BlockShell icon={Users} color={COLORS.purple} title="Self-Service Analytics with AI Assistance" index={6}>
          <Quote color={COLORS.purple}>Self-service, accelerated with AI</Quote>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-bold text-[#0D1B2A] mb-2.5">Self-service analytics</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-4">
                Users can connect directly to data sources and build reports on their own,
                without depending on analysts or a BI team.
              </p>
              <Bullets
                color={COLORS.purple}
                items={[
                  'Build reports directly from connected data sources',
                  'Explore and analyze data independently',
                  'Reduce dependency on BI or data teams',
                ]}
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0D1B2A] mb-2.5">AI assistant</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-4">
                A built-in AI assistant helps users inside the self-service experience by
                letting them ask questions in plain English and get answers or dashboards
                faster.
              </p>
              <Bullets
                color={COLORS.purple}
                items={[
                  'Ask questions in plain English',
                  'Get answers or dashboards',
                  'No formulas or SQL required',
                ]}
              />
            </div>
          </div>
        </BlockShell>

        {/* 8. Security & Visibility */}
        <BlockShell icon={Eye} color={COLORS.indigo} title="Security and Visibility in One Place" index={7}>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-5">
            MPP BI has strict access controls and user grouping. Give people access to
            exactly what they need, nothing more. Every action is tracked, so nothing
            happens without a record of who did it and when — with documentation trails
            that make audits easier.
          </p>
          <Quote color={COLORS.indigo}>Controlled access, without slowing down access</Quote>
          <Bullets
            color={COLORS.indigo}
            items={[
              'Access can be set down to individual records, not just whole dashboards',
              'A full activity log is ready any time compliance or security needs to check it',
              'Sensitive data stays protected without slowing down the people who need to use it',
            ]}
          />
        </BlockShell>

      </div>
    </section>
  )
}
