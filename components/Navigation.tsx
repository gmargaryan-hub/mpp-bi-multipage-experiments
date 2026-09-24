'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { asset } from '@/lib/basePath'
import DemoButton from '@/components/DemoButton'

const links = [
  { label: 'Features', href: '/features' },
  { label: 'Showcase', href: '/showcase' },
  { label: 'Architecture', href: '/architecture' },
  { label: 'Why MPP BI', href: '/why-mpp-bi' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about-us' },
  { label: 'Blog', href: '/blog' },
]

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Image src={asset('/brand/thumbnail.svg')} alt="MPP BI" width={88} height={22} className="h-7 w-auto" priority unoptimized />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + '/')
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-md px-3 py-2 text-sm transition-colors ${
                  active ? 'text-ink font-medium' : 'text-slate hover:text-ink'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden lg:block">
          <DemoButton className="!py-2.5" />
        </div>

        <button className="lg:hidden text-ink" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-line bg-white">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2.5 text-base text-ink">
                {l.label}
              </Link>
            ))}
            <DemoButton className="mt-3 w-full" />
          </nav>
        </div>
      )}
    </header>
  )
}
