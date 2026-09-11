import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

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
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <section className="relative pt-40 pb-16 overflow-hidden bg-[#0D1B2A]">
          <div className="absolute inset-0 dot-grid opacity-20" />
          <div className="relative z-10 max-w-3xl mx-auto px-6">
            <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
              {title}
            </h1>
            <p className="text-sm text-[#94A3B8]">Effective Date: {effectiveDate}</p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-6 py-16 legal-content">{children}</div>
      </main>
      <Footer />
    </div>
  )
}
