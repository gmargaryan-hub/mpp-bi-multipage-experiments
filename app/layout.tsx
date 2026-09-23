import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { IBM_Plex_Mono } from 'next/font/google'
import ContactFormModal from '@/components/ContactFormModal'
import './globals.css'

// Golos UI (ParaType), the typeface of the MPP BI product.
const golos = localFont({
  src: [
    { path: './fonts/GolosUI_Regular.woff2', weight: '400' },
    { path: './fonts/GolosUI_Medium.woff2', weight: '500' },
    { path: './fonts/GolosUI_Bold.woff2', weight: '600' },
  ],
  variable: '--font-golos',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
})

export const metadata: Metadata = {
  // Canonical URLs resolve against this; set NEXT_PUBLIC_SITE_URL to the production domain.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mpp-bi-multipage-experiments.vercel.app'),
  title: 'MPP BI: Business Intelligence That Runs Inside Your Data',
  description:
    'MPP BI connects straight to your databases and runs calculations where your data already lives, with no data copies and no separate calculation engine.',
  // Google Search Console ownership verification, rendered on every page.
  verification: {
    google: 'yAJLpxaiU7bqxfZN5BDFMC73jftkxkyR6KrTYtWifrw',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${golos.variable} ${plexMono.variable}`}>
      <body>
        {children}
        <ContactFormModal />
      </body>
    </html>
  )
}
