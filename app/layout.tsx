import type { Metadata } from 'next'
import ContactFormModal from '@/components/ContactFormModal'
import './globals.css'

export const metadata: Metadata = {
  title: 'MPP BI — Business Intelligence That Runs Inside Your Data',
  description:
    'MPP BI connects straight to your databases and runs calculations where your data already lives — no data copies, no calculation engine, no compromise.',
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
