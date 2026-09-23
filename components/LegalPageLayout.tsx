import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { PageHeader } from '@/components/ui'

export default function LegalPageLayout({
  title,
  effectiveDate,
  children,
}: {
  title: string
  effectiveDate: string
  children: React.ReactNode
}) {
  return (
    <>
      <Navigation />
      <main>
        <PageHeader title={title} lede={`Effective ${effectiveDate}`} />
        <div className="legal-content mx-auto max-w-3xl px-4 py-16 sm:px-6">{children}</div>
      </main>
      <Footer />
    </>
  )
}
