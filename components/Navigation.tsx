'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { asset } from '@/lib/basePath'
import { openDemoModal } from '@/lib/openDemoModal'

const primaryNav = [
  { label: 'Features', href: '/features' },
  { label: 'Benefits', href: '/benefits' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Why MPP BI', href: '/why-mpp-bi' },
  { label: 'New Agentic BI', href: '/agentic-bi' },
  { label: 'About Us', href: '/about-us' },
]

const resourcesNav = [
  { label: 'Architecture', href: '/architecture', description: 'How MPP BI is built' },
  { label: 'Case Studies', href: '/resources/case-studies', description: 'Filterable by industry' },
  { label: 'Demos', href: '/resources/demos', description: 'A series of walkthrough videos' },
  { label: 'Research', href: '/resources/research', description: 'Whitepapers and benchmarks' },
  { label: 'Documentation', href: '/resources/documentation', description: 'Setup and reference guides' },
  { label: 'Blog', href: '/blog', description: 'Product updates and news' },
]

export default function Navigation() {
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  const handleLogoClick = (e: React.MouseEvent) => {
    // Logo always goes to the top of the home page. If we're already there,
    // navigating to "/" wouldn't scroll anywhere, so scroll manually instead.
    if (isHome) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0]">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo — always returns to the top of the home page */}
          <Link href="/" onClick={handleLogoClick} className="flex items-center shrink-0">
            <Image
              src={asset('/mppbi-logo.svg')}
              alt="MPP BI"
              width={135}
              height={40}
              className="object-contain h-8 w-auto"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {primaryNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-3.5 py-2 text-sm font-medium text-[#374151] hover:text-[#0D1B2A] transition-colors rounded-lg hover:bg-[#F5F7FA]"
              >
                {item.label}
              </Link>
            ))}

            {/* Resources dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-[#374151] hover:text-[#0D1B2A] transition-colors rounded-lg hover:bg-[#F5F7FA]">
                Resources
                <ChevronDown size={14} className={`transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 pt-2 w-64"
                  >
                    <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.12)] p-2">
                      {resourcesNav.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block px-3 py-2.5 rounded-lg hover:bg-[#F5F7FA] transition-colors"
                        >
                          <p className="text-sm font-medium text-[#0D1B2A]">{item.label}</p>
                          <p className="text-xs text-[#6B7280] mt-0.5">{item.description}</p>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={openDemoModal}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold text-[#0A0E1A] transition-all duration-200 hover:opacity-90"
              style={{ background: '#0AAEDB' }}
            >
              Book a Demo
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-[#374151]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-[#E2E8F0] bg-white"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {[...primaryNav, ...resourcesNav].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2.5 text-sm font-medium text-[#374151] hover:text-[#0D1B2A] rounded-lg hover:bg-[#F5F7FA]"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => { setMobileOpen(false); openDemoModal() }}
                className="mt-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-[#0A0E1A] text-center"
                style={{ background: '#0AAEDB' }}
              >
                Book a Demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
