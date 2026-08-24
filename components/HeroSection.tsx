'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Globe, Zap } from 'lucide-react'
import { openDemoModal } from '@/lib/openDemoModal'

function ArchDiagram() {
  return (
    <svg viewBox="0 0 960 520" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">

      {/* ── PANELS ── */}
      <rect x="8" y="8" width="440" height="504" rx="16" fill="#FAFAF8" stroke="#E5DDD4" strokeWidth="1.5" />
      <rect x="512" y="8" width="440" height="504" rx="16" fill="#0D1B2A" stroke="#1A3A5C" strokeWidth="1.5" />

      {/* ── PANEL LABELS ── */}
      <circle cx="26" cy="30" r="5" fill="#E05A2B" />
      <text x="38" y="35" fill="#E05A2B" fontSize="10" fontWeight="800" fontFamily="system-ui" letterSpacing="2">TRADITIONAL BI</text>
      <text x="38" y="50" fill="#E05A2B" fontSize="9" fontFamily="monospace" fillOpacity="0.55">Tableau · Power BI · Looker</text>

      <circle cx="530" cy="30" r="5" fill="#0AAEDB" />
      <text x="542" y="35" fill="#0AAEDB" fontSize="10" fontWeight="800" fontFamily="system-ui" letterSpacing="2">MPP BI</text>
      <text x="542" y="50" fill="#10B981" fontSize="9" fontFamily="monospace" fillOpacity="0.75">2-tier · No calc engine · Always live</text>

      {/* ══════════ LEFT STACK ══════════ */}

      {/* Left gutter: App Server ↔ CE/IS — drawn BEFORE boxes */}
      <polyline points="50,168 34,168 34,320 50,320" fill="none" stroke="#E05A2B" strokeWidth="2" strokeOpacity="0.7" strokeLinejoin="round" />
      <polygon points="50,320 38,314 38,326" fill="#E05A2B" fillOpacity="0.7" />
      <polygon points="50,168 38,162 38,174" fill="#E05A2B" fillOpacity="0.7" />

      {/* Right gutter: App Server → E.S. — drawn BEFORE boxes */}
      <polyline points="406,168 422,168 422,452 406,452" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeOpacity="0.5" strokeLinejoin="round" />
      <polygon points="406,452 418,446 418,458" fill="#9CA3AF" fillOpacity="0.5" />

      {/* 1. Browser Client */}
      <rect x="50" y="62" width="356" height="44" rx="8" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
      <text x="228" y="79" textAnchor="middle" fill="#111827" fontSize="13" fontWeight="700" fontFamily="system-ui">Browser Client</text>
      <text x="228" y="96" textAnchor="middle" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">Dashboard your team sees</text>

      {/* Browser ↔ App Server double-headed */}
      <line x1="228" y1="106" x2="228" y2="140" stroke="#9CA3AF" strokeWidth="2" strokeOpacity="0.6" />
      <polygon points="228,106 224,114 232,114" fill="#9CA3AF" fillOpacity="0.6" />
      <polygon points="228,140 224,132 232,132" fill="#9CA3AF" fillOpacity="0.6" />

      {/* 2. App Server */}
      <rect x="50" y="140" width="356" height="44" rx="8" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
      <text x="228" y="157" textAnchor="middle" fill="#111827" fontSize="13" fontWeight="700" fontFamily="system-ui">App Server</text>
      <text x="228" y="174" textAnchor="middle" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">Sessions, routing, query prep</text>

      {/* Right gutter label inside panel */}
      <text x="418" y="316" textAnchor="middle" fill="#9CA3AF" fontSize="9" fontFamily="monospace" fillOpacity="0.6" transform="rotate(90,418,316)">Direct / Live SQL</text>

      {/* App Server → Metadata */}
      <line x1="228" y1="184" x2="228" y2="214" stroke="#9CA3AF" strokeWidth="2" strokeOpacity="0.6" />
      <polygon points="228,214 224,206 232,206" fill="#9CA3AF" fillOpacity="0.6" />

      {/* 3. Metadata Storage — drawn AFTER gutter so white covers crossing */}
      <rect x="50" y="214" width="356" height="44" rx="8" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
      <text x="228" y="231" textAnchor="middle" fill="#111827" fontSize="13" fontWeight="700" fontFamily="system-ui">Metadata Storage</text>
      <text x="228" y="248" textAnchor="middle" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">Dashboards, users, settings</text>

      {/* Left gutter label — inside panel, rotated */}
      <text x="34" y="252" textAnchor="middle" fill="#E05A2B" fontSize="8" fontFamily="monospace" fillOpacity="0.7" transform="rotate(-90,34,252)">data travels ↕</text>

      {/* 4. CE + IS side by side */}
      <rect x="50" y="296" width="168" height="56" rx="8" fill="#FEF2EE" stroke="#E05A2B" strokeWidth="1.5" />
      <text x="134" y="317" textAnchor="middle" fill="#E05A2B" fontSize="12" fontWeight="700" fontFamily="system-ui">Calc Engine</text>
      <text x="134" y="333" textAnchor="middle" fill="#E05A2B" fontSize="9" fontFamily="system-ui" fillOpacity="0.7">Hyper / VertiPaq</text>
      <text x="134" y="345" textAnchor="middle" fill="#E05A2B" fontSize="8" fontFamily="system-ui" fillOpacity="0.6">eats RAM · breaks live mode</text>

      {/* CE ↔ IS double-headed */}
      <line x1="218" y1="324" x2="238" y2="324" stroke="#E05A2B" strokeWidth="2" strokeOpacity="0.6" />
      <polygon points="218,324 226,320 226,328" fill="#E05A2B" fillOpacity="0.6" />
      <polygon points="238,324 230,320 230,328" fill="#E05A2B" fillOpacity="0.6" />

      <rect x="238" y="296" width="168" height="56" rx="8" fill="#FEF2EE" stroke="#E05A2B" strokeWidth="1.5" />
      <text x="322" y="317" textAnchor="middle" fill="#E05A2B" fontSize="12" fontWeight="700" fontFamily="system-ui">Internal Storage</text>
      <text x="322" y="333" textAnchor="middle" fill="#E05A2B" fontSize="9" fontFamily="system-ui" fillOpacity="0.7">imported · stale</text>
      <text x="322" y="345" textAnchor="middle" fill="#E05A2B" fontSize="8" fontFamily="system-ui" fillOpacity="0.6">RAM ceiling applies</text>

      {/* E.S. → IS Import (upward, dashed) */}
      <line x1="322" y1="452" x2="322" y2="352" stroke="#E05A2B" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="5 4" />
      <polygon points="322,352 318,360 326,360" fill="#E05A2B" fillOpacity="0.6" />
      <text x="332" y="406" fill="#E05A2B" fontSize="9" fontFamily="monospace" fillOpacity="0.7">Import</text>

      {/* 5. E.S. Legacy */}
      <rect x="50" y="428" width="356" height="48" rx="8" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
      <text x="228" y="449" textAnchor="middle" fill="#374151" fontSize="13" fontWeight="700" fontFamily="system-ui">E.S.</text>
      <text x="228" y="466" textAnchor="middle" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">Externally connected. Data extracted.</text>

      {/* ── ANIMATED DOTS (Legacy) ── */}
      <circle r="5" fill="#E05A2B" fillOpacity="0.9">
        <animateMotion dur="1.6s" begin="0s" repeatCount="indefinite" path="M 228 106 L 228 140" />
      </circle>
      <circle r="5" fill="#9CA3AF" fillOpacity="0.9">
        <animateMotion dur="1.6s" begin="0.5s" repeatCount="indefinite" path="M 228 184 L 228 214" />
      </circle>
      <circle r="5" fill="#E05A2B" fillOpacity="0.9">
        <animateMotion dur="1.6s" begin="1.0s" repeatCount="indefinite" path="M 322 452 L 322 352" />
      </circle>

      {/* ── VS — centered between panels (gap x=448..512, midpoint=480) ── */}
      <circle cx="480" cy="260" r="20" fill="#111827" stroke="#1E3A5F" strokeWidth="1.5" />
      <text x="480" y="264" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontWeight="800" fontFamily="system-ui">VS</text>

      {/* ══════════ RIGHT STACK ══════════ */}

      {/* Left gutter: Browser ↔ App Server — drawn BEFORE boxes */}
      <polyline points="554,86 538,86 538,228 554,228" fill="none" stroke="#0AAEDB" strokeWidth="2" strokeOpacity="0.7" strokeLinejoin="round" />
      <polygon points="554,86 542,80 542,92" fill="#0AAEDB" fillOpacity="0.7" />
      <polygon points="554,228 542,222 542,234" fill="#0AAEDB" fillOpacity="0.7" />

      {/* Right gutter: App Server → E.S. — drawn BEFORE boxes */}
      <polyline points="910,228 926,228 926,452 910,452" fill="none" stroke="#0AAEDB" strokeWidth="2" strokeOpacity="0.7" strokeLinejoin="round" />
      <polygon points="910,452 922,446 922,458" fill="#0AAEDB" fillOpacity="0.7" />
      <text x="926" y="346" textAnchor="middle" fill="#0AAEDB" fontSize="9" fontFamily="monospace" fillOpacity="0.6" transform="rotate(90,926,346)">Direct push</text>

      {/* Metadata Storage dashed container */}
      <rect x="538" y="116" width="368" height="202" rx="10" fill="#0AAEDB" fillOpacity="0.03" stroke="#0AAEDB" strokeWidth="1" strokeDasharray="5 3" strokeOpacity="0.4" />
      <text x="722" y="133" textAnchor="middle" fill="#0AAEDB" fontSize="9" fontFamily="monospace" fillOpacity="0.5" letterSpacing="1">METADATA STORAGE</text>

      {/* 1. Browser Client */}
      <rect x="554" y="62" width="356" height="44" rx="8" fill="#0D2137" stroke="#334155" strokeWidth="1.5" />
      <text x="732" y="79" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="13" fontWeight="700" fontFamily="system-ui">Browser Client</text>
      <text x="732" y="96" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="system-ui">Same lightweight client. No plugins.</text>

      {/* 2. App Server inside Metadata Storage */}
      <rect x="554" y="144" width="356" height="148" rx="8" fill="#0D2137" stroke="#0AAEDB" strokeWidth="2"
        style={{ filter: 'drop-shadow(0 0 14px rgba(10,174,219,0.18))' }} />
      <text x="732" y="200" textAnchor="middle" fill="#0AAEDB" fontSize="15" fontWeight="800" fontFamily="system-ui">App Server</text>
      <text x="732" y="218" textAnchor="middle" fill="#0AAEDB" fontSize="10" fontFamily="system-ui" fillOpacity="0.6">App Server + Metadata — unified inside PostgreSQL</text>
      <rect x="566" y="232" width="152" height="26" rx="6" fill="#10B981" fillOpacity="0.09" stroke="#10B981" strokeWidth="1" strokeOpacity="0.3" />
      <text x="642" y="249" textAnchor="middle" fill="#10B981" fontSize="10" fontFamily="system-ui" fontWeight="600">No Calc Engine</text>
      <rect x="730" y="232" width="152" height="26" rx="6" fill="#10B981" fillOpacity="0.09" stroke="#10B981" strokeWidth="1" strokeOpacity="0.3" />
      <text x="806" y="249" textAnchor="middle" fill="#10B981" fontSize="10" fontFamily="system-ui" fontWeight="600">No Data Copy</text>

      {/* 3. E.S. MPP BI */}
      <rect x="554" y="428" width="356" height="58" rx="10" fill="#0D2137" stroke="#0AAEDB" strokeWidth="2"
        style={{ filter: 'drop-shadow(0 0 14px rgba(10,174,219,0.18))' }} />
      <text x="732" y="452" textAnchor="middle" fill="#0AAEDB" fontSize="14" fontWeight="800" fontFamily="system-ui">E.S.</text>
      <text x="732" y="470" textAnchor="middle" fill="#0AAEDB" fontSize="10" fontFamily="system-ui" fillOpacity="0.6">Query runs here. Data never moves. Always live.</text>

      {/* ── ANIMATED DOTS (MPP BI) ── */}
      <circle r="5" fill="#0AAEDB" style={{ filter: 'drop-shadow(0 0 6px rgba(10,174,219,0.85))' }}>
        <animateMotion dur="1.1s" begin="0s" repeatCount="indefinite" path="M 554 86 L 538 86 L 538 228 L 554 228" />
      </circle>
      <circle r="5" fill="#0AAEDB" style={{ filter: 'drop-shadow(0 0 6px rgba(10,174,219,0.85))' }}>
        <animateMotion dur="1.1s" begin="0.55s" repeatCount="indefinite" path="M 910 228 L 926 228 L 926 452 L 910 452" />
      </circle>

    </svg>
  )
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden bg-white">
      <div className="absolute inset-0 dot-grid opacity-25" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(10,174,219,0.07) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(0,116,166,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col items-center text-center gap-8">

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#0AAEDB] text-xs font-semibold uppercase tracking-[0.15em]"
          >
            Next-Generation Business Intelligence
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-[#0D1B2A]">
              Built Inside Your Data.
              <br />
              <span className="gradient-text">The New Age of BI.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="max-w-2xl text-lg md:text-xl text-[#374151] leading-relaxed"
          >
            MPP BI is built for the next generation of business intelligence and analytics. The business logic runs directly inside the database — not on top of it. We don&apos;t need the calculation engine or BI servers. 2×–12× faster than traditional BI, increasing with query complexity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <button onClick={openDemoModal} className="bg-[#0AAEDB] hover:bg-[#0074A6] text-white font-semibold text-base px-7 py-3.5 rounded-lg transition-colors duration-200 min-w-[180px] text-center">Book a Demo</button>
            <Link
              href="#architecture"
              className="text-[#0D1B2A] font-medium text-base hover:text-[#0AAEDB] transition-colors underline-offset-4 hover:underline"
            >
              Explore the Architecture →
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#6B7280]"
          >
            <span className="flex items-center gap-1.5">
              <Globe size={12} className="text-[#0AAEDB]" />
              UN Supplier
            </span>
            <span className="text-[#D1D5DB]">·</span>
            <span className="flex items-center gap-1.5">
              <Zap size={12} className="text-[#0AAEDB]" />
              20+ Years Delivery
            </span>
            <span className="text-[#D1D5DB]">·</span>
            <span>Banking · Oil &amp; Gas · Insurance · Construction</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="w-full mt-4 rounded-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.18)]"
          >
            <ArchDiagram />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
