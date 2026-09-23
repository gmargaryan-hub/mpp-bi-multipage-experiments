'use client'

import Link from 'next/link'
import Image from 'next/image'
import { asset } from '@/lib/basePath'
import { openDemoModal } from '@/lib/openDemoModal'

const columns = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Architecture', href: '/architecture' },
      { label: 'Why MPP BI', href: '/why-mpp-bi' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about-us' },
      { label: 'Blog', href: '/blog' },
      { label: 'Support', href: 'mailto:welcome@mpp-insights.com' },
    ],
  },
  {
    heading: 'Follow',
    links: [
      { label: 'LinkedIn', href: 'https://am.linkedin.com/company/mpp-insights' },
      { label: 'Instagram', href: 'https://www.instagram.com/mppinsights/' },
    ],
  },
]

const linkClass = 'text-sm text-mist hover:text-white transition-colors'

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-mist">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-4 py-14 sm:px-6 md:grid-cols-5">
        <div className="col-span-2 space-y-4">
          <a href="https://mpp-insights.com/" className="inline-block">
            <Image src={asset('/mpp-insights-logo.svg')} alt="MPP Insights" width={121} height={40} className="h-8 w-auto" unoptimized />
          </a>
          <p className="max-w-xs text-sm leading-relaxed">
            MPP Insights builds MPP BI and MPP ETL. Headquartered in Richmond, Virginia, with an R&amp;D center in Yerevan, Armenia.
          </p>
          <button onClick={openDemoModal} className="text-sm font-medium text-white underline underline-offset-4 decoration-slate hover:decoration-white">
            Book a demo
          </button>
        </div>

        {columns.map((col) => (
          <div key={col.heading}>
            <p className="mb-4 text-sm font-medium text-white">{col.heading}</p>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  {l.href.startsWith('/') ? (
                    <Link href={l.href} className={linkClass}>{l.label}</Link>
                  ) : (
                    <a href={l.href} className={linkClass} {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} MPP Insights LLC</p>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-white">Privacy</Link>
            <Link href="/terms-of-use" className="hover:text-white">Terms</Link>
            <Link href="/cookie-policy" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
