import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getAllCaseStudies, getCaseStudiesByIndustry, getAllIndustries } from '@/lib/sanity-queries'
import { urlForImage } from '@/lib/sanity'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Case Studies | MPP BI',
  description: 'Real deployments, real results — see how organizations use MPP BI to solve real problems.',
}

function formatDate(dateStr?: string) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

type Props = { searchParams: Promise<{ industry?: string }> }

export default async function CaseStudiesIndexPage({ searchParams }: Props) {
  const { industry: selectedIndustry } = await searchParams

  let caseStudies: Awaited<ReturnType<typeof getAllCaseStudies>> = []
  let industries: Awaited<ReturnType<typeof getAllIndustries>> = []
  let fetchFailed = false
  try {
    ;[caseStudies, industries] = await Promise.all([
      selectedIndustry ? getCaseStudiesByIndustry(selectedIndustry) : getAllCaseStudies(),
      getAllIndustries(),
    ])
  } catch {
    fetchFailed = true
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <section className="relative pt-40 pb-20 overflow-hidden bg-[#0D1B2A]">
          <div className="absolute inset-0 dot-grid opacity-20" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.18em] uppercase mb-5">Case Studies</p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
              Real Results From Real Deployments
            </h1>
            <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto leading-relaxed">
              See how organizations across industries use MPP BI to solve real problems, not hypotheticals.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            {fetchFailed && (
              <div className="rounded-xl border border-[#F97316]/30 bg-[#F97316]/5 p-6 text-center mb-12">
                <p className="text-sm text-[#0D1B2A] font-semibold mb-1">Couldn&apos;t load case studies right now</p>
                <p className="text-xs text-[#6B7280]">
                  The page couldn&apos;t reach Sanity. If this persists, check that the project ID/dataset in
                  lib/sanity.ts are correct and that the dataset allows public read access.
                </p>
              </div>
            )}

            {!fetchFailed && industries.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-14">
                <Link
                  href="/case-studies"
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    !selectedIndustry
                      ? 'bg-[#0D1B2A] text-white'
                      : 'bg-white border border-[#E2E8F0] text-[#374151] hover:border-[#0AAEDB]/40'
                  }`}
                >
                  All
                </Link>
                {industries.map((ind) => {
                  const active = ind.slug === selectedIndustry
                  return (
                    <Link
                      key={ind.slug}
                      href={`/case-studies?industry=${ind.slug}`}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                        active
                          ? 'bg-[#0D1B2A] text-white'
                          : 'bg-white border border-[#E2E8F0] text-[#374151] hover:border-[#0AAEDB]/40'
                      }`}
                    >
                      {ind.title}
                    </Link>
                  )
                })}
              </div>
            )}

            {!fetchFailed && caseStudies.length === 0 && (
              <div className="text-center py-20">
                <p className="text-[#374151] text-lg font-semibold mb-2">
                  {selectedIndustry ? 'No case studies in this industry yet' : 'No case studies published yet'}
                </p>
                <p className="text-[#6B7280] text-sm">Once something is published in the Studio, it&apos;ll show up here.</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((cs) => (
                <Link
                  key={cs._id}
                  href={`/case-studies/${cs.slug}`}
                  className="group rounded-2xl border border-[#E2E8F0] overflow-hidden hover:border-[#0AAEDB]/40 transition-colors"
                >
                  <div className="relative w-full bg-[#F5F7FA]" style={{ aspectRatio: '1.3 / 1' }}>
                    {cs.mainImage ? (
                      <Image
                        src={urlForImage(cs.mainImage).width(800).height(615).fit('crop').auto('format').url()}
                        alt={cs.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#CBD5E1] text-xs">No image</div>
                    )}
                    {cs.industry && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide text-white bg-[#0D1B2A]/80 backdrop-blur-sm">
                        {cs.industry.title}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h2 className="font-display text-lg font-bold text-[#0D1B2A] leading-snug mb-2 group-hover:text-[#0AAEDB] transition-colors">
                      {cs.title}
                    </h2>
                    {cs.excerpt && (
                      <p className="text-sm text-[#6B7280] leading-relaxed mb-4 line-clamp-2">{cs.excerpt}</p>
                    )}
                    {formatDate(cs.publishedAt) && (
                      <p className="text-xs text-[#9CA3AF]">{formatDate(cs.publishedAt)}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
