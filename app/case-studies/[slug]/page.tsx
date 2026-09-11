import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import SimpleCTASection from '@/components/SimpleCTASection'
import {
  getCaseStudyBySlug,
  getAllCaseStudySlugs,
  getAllIndustries,
  getRecentCaseStudiesByIndustry,
} from '@/lib/sanity-queries'
import { urlForImage } from '@/lib/sanity'

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const slugs = await getAllCaseStudySlugs()
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ topic?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cs = await getCaseStudyBySlug(slug).catch(() => null)
  if (!cs) return { title: 'Case Studies | MPP BI' }
  return {
    title: cs.seoTitle || `${cs.title} | MPP BI Case Studies`,
    description: cs.seoDescription || cs.excerpt,
    alternates: cs.canonicalUrl ? { canonical: cs.canonicalUrl } : undefined,
  }
}

function formatDate(dateStr?: string) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function CaseStudyPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { topic } = await searchParams

  const cs = await getCaseStudyBySlug(slug).catch(() => null)
  if (!cs) notFound()

  const industries = await getAllIndustries().catch(() => [])
  const selectedIndustrySlug = topic || cs.industry?.slug || industries[0]?.slug
  const otherCaseStudies = selectedIndustrySlug
    ? await getRecentCaseStudiesByIndustry(selectedIndustrySlug, cs.slug, 3).catch(() => [])
    : []

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <article>
          <section className="relative pt-40 pb-16 overflow-hidden bg-[#0D1B2A]">
            <div className="absolute inset-0 dot-grid opacity-20" />
            <div className="relative z-10 max-w-3xl mx-auto px-6">
              <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-sm text-[#94A3B8] hover:text-white transition-colors mb-8">
                <ArrowLeft size={14} />
                Back to Case Studies
              </Link>
              <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.18em] uppercase mb-4">Case Study</p>
              <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {cs.title}
              </h1>
            </div>
          </section>

          {cs.mainImage && (
            <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-10">
              <div className="relative w-full rounded-2xl overflow-hidden bg-[#F5F7FA] border border-[#E2E8F0]" style={{ aspectRatio: '16 / 9' }}>
                <Image
                  src={urlForImage(cs.mainImage).width(1400).height(788).fit('crop').auto('format').url()}
                  alt={cs.title}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Industry, client, date — right after the hero image, same placement as blog posts */}
          <div className="max-w-3xl mx-auto px-6 pt-8">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pb-8 border-b border-[#E2E8F0]">
              {cs.industry && (
                <Link
                  href={`/case-studies?industry=${cs.industry.slug}`}
                  className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide text-[#0AAEDB] bg-[#0AAEDB]/8 hover:bg-[#0AAEDB]/15 transition-colors"
                >
                  {cs.industry.title}
                </Link>
              )}
              {cs.clientName && <span className="text-sm font-semibold text-[#0D1B2A]">{cs.clientName}</span>}
              {formatDate(cs.publishedAt) && (
                <span className="text-sm text-[#9CA3AF]">{formatDate(cs.publishedAt)}</span>
              )}
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-6 py-16">
            {/* Description */}
            {cs.description && cs.description.length > 0 && (
              <div className="mb-12">
                <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-5">Description</h2>
                <ul className="flex flex-col gap-3">
                  {cs.description.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-[#0AAEDB] mt-0.5 flex-shrink-0" />
                      <span className="text-[#374151] text-base leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Challenges */}
            {cs.challenges && cs.challenges.length > 0 && (
              <div className="mb-12">
                <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-5">Challenges</h2>
                <ul className="flex flex-col gap-3">
                  {cs.challenges.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <AlertTriangle size={18} className="text-[#F97316] mt-0.5 flex-shrink-0" />
                      <span className="text-[#374151] text-base leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Solution */}
            {cs.solutions && cs.solutions.length > 0 && (
              <div className="mb-12">
                <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-5">Solution</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {cs.solutions.map((sol, i) => (
                    <div key={i} className="rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] p-5">
                      <div className="w-9 h-9 rounded-lg bg-[#0AAEDB]/10 border border-[#0AAEDB]/25 flex items-center justify-center mb-3">
                        <Lightbulb size={16} className="text-[#0AAEDB]" />
                      </div>
                      <p className="text-sm font-bold text-[#0D1B2A] mb-1.5">{sol.title}</p>
                      {sol.description && <p className="text-xs text-[#6B7280] leading-relaxed">{sol.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Optional additional Portable Text content */}
            {cs.content && cs.content.length > 0 && <PortableTextRenderer value={cs.content} />}
          </div>

          {/* Closing CTA */}
          <SimpleCTASection
            title="Ready to Transform Your Data Into Actionable Insights?"
            body="Tell us what you're working with, and we'll show you how MPP BI fits."
            ctaLabel="Book a Demo"
            accentColor="#0AAEDB"
          />

          {/* Other Case Studies — same pattern as the blog's Other Articles */}
          {industries.length > 0 && (
            <section id="other-case-studies" className="py-16 bg-[#F5F7FA] scroll-mt-24">
              <div className="max-w-5xl mx-auto px-6">
                <p className="text-xs font-bold uppercase tracking-wide text-[#6B7280] mb-5">Other Case Studies</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {industries.map((ind) => {
                    const active = ind.slug === selectedIndustrySlug
                    return (
                      <Link
                        key={ind.slug}
                        href={`/case-studies/${cs.slug}?topic=${ind.slug}#other-case-studies`}
                        scroll={false}
                        className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-colors ${
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

                {otherCaseStudies.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {otherCaseStudies.map((rc) => (
                      <Link
                        key={rc._id}
                        href={`/case-studies/${rc.slug}`}
                        className="rounded-xl border border-[#E2E8F0] bg-white overflow-hidden hover:border-[#0AAEDB]/40 transition-colors"
                      >
                        {rc.mainImage && (
                          <div className="relative w-full bg-[#F5F7FA]" style={{ aspectRatio: '16 / 9' }}>
                            <Image
                              src={urlForImage(rc.mainImage).width(500).height(281).fit('crop').auto('format').url()}
                              alt={rc.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 320px"
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="p-5">
                          <h3 className="font-display text-base font-bold text-[#0D1B2A] leading-snug">{rc.title}</h3>
                          {rc.excerpt && <p className="text-xs text-[#6B7280] mt-2 leading-relaxed line-clamp-2">{rc.excerpt}</p>}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#9CA3AF]">No other case studies in this industry yet.</p>
                )}
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </div>
  )
}
