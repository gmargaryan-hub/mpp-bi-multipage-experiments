'use client'

import Link from 'next/link'
import Image from 'next/image'
import { asset } from '@/lib/basePath'
import { openDemoModal } from '@/lib/openDemoModal'

const MAIN_SITE_URL = 'https://mpp-insights.com/'

const columns = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Benefits', href: '/benefits' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Why MPP BI', href: '/why-mpp-bi' },
      { label: 'New Agentic BI', href: '/agentic-bi' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Architecture', href: '/architecture' },
      { label: 'Case Studies', href: '/resources/case-studies' },
      { label: 'Demos', href: '/resources/demos' },
      { label: 'Research', href: '/resources/research' },
      { label: 'Documentation', href: '/resources/documentation' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about-us' },
      { label: 'Book a Demo', href: '#booking', isModal: true },
      { label: 'Contact Support', href: 'mailto:welcome@mpp-insights.com' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#0D1B2A] border-t border-white/8">
      <div className="max-w-[1440px] mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 flex flex-col gap-4">
            {/* Footer logo redirects to the main MPP Insights website, not a page on this site */}
            <a href={MAIN_SITE_URL} className="flex items-center gap-2 w-fit">
              <Image
                src={asset('/mpp-insights-logo.svg')}
                alt="MPP Insights"
                width={121}
                height={40}
                className="object-contain h-8 w-auto"
                unoptimized
              />
            </a>
            <p className="text-xs text-white/40 leading-relaxed max-w-xs">
              MPP Insights builds MPP BI and MPP ETL. Business intelligence that runs inside
              your data — no data extraction, no calculation engine, always live.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-4">
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {'isModal' in link && link.isModal ? (
                      <button
                        onClick={openDemoModal}
                        className="text-xs text-white/50 hover:text-white transition-colors"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link href={link.href} className="text-xs text-white/50 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/25">
            © {new Date().getFullYear()} MPP Insights LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-[11px] text-white/25">
            <Link href="/privacy" className="hover:text-white/50 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/50 transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white/50 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
