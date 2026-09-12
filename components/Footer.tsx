'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Linkedin } from 'lucide-react'
import { asset } from '@/lib/basePath'
import { openDemoModal } from '@/lib/openDemoModal'

const MAIN_SITE_URL = 'https://mpp-insights.com/'

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/mppinsights/', icon: Instagram },
  { label: 'LinkedIn', href: 'https://am.linkedin.com/company/mpp-insights', icon: Linkedin },
]

const columns = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Benefits', href: '/benefits' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Why MPP BI', href: '/why-mpp-bi' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Architecture', href: '/architecture' },
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
              your data, with no data extraction, no calculation engine, always live.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-colors"
                  >
                    <Icon size={15} />
                  </a>
                )
              })}
            </div>
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
            <Link href="/privacy-policy" className="hover:text-white/50 transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-use" className="hover:text-white/50 transition-colors">Terms of Use</Link>
            <Link href="/cookie-policy" className="hover:text-white/50 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
