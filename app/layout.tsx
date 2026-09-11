import type { Metadata } from 'next'
import ContactFormModal from '@/components/ContactFormModal'
import './globals.css'

export const metadata: Metadata = {
  // Needed so relative canonical URLs (used when a post/case study doesn't set its own)
  // resolve to a real absolute URL instead of Next.js falling back to localhost. Set
  // NEXT_PUBLIC_SITE_URL in Vercel to the actual production domain once one is final —
  // the fallback below is a placeholder, not necessarily the real domain.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mpp-bi-multipage-experiments.vercel.app'),
  title: 'MPP BI: Business Intelligence That Runs Inside Your Data',
  description:
    'MPP BI connects straight to your databases and runs calculations where your data already lives, with no data copies, no calculation engine, and no compromise.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <ContactFormModal />
      </body>
    </html>
  )
}
