import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import { getPostBySlug, getAllPostSlugs } from '@/lib/sanity-queries'
import { urlForImage } from '@/lib/sanity'

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch {
    // If Sanity can't be reached at build time, fall back to fully dynamic
    // rendering for this route rather than failing the whole build.
    return []
  }
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug).catch(() => null)
  if (!post) return { title: 'Blog | MPP BI' }
  return {
    title: post.seoTitle || `${post.title} | MPP BI Blog`,
    description: post.seoDescription || post.excerpt,
    alternates: post.canonicalUrl ? { canonical: post.canonicalUrl } : undefined,
  }
}

function formatDate(dateStr?: string) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug).catch(() => null)

  if (!post) notFound()

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <article>
          <section className="relative pt-40 pb-16 overflow-hidden bg-[#0D1B2A]">
            <div className="absolute inset-0 dot-grid opacity-20" />
            <div className="relative z-10 max-w-3xl mx-auto px-6">
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-[#94A3B8] hover:text-white transition-colors mb-8">
                <ArrowLeft size={14} />
                Back to Blog
              </Link>
              {post.category && (
                <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.18em] uppercase mb-4">{post.category.title}</p>
              )}
              <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-3 text-sm text-[#94A3B8]">
                {post.author?.name && <span>{post.author.name}</span>}
                {post.author?.name && post.publishedAt && <span>&middot;</span>}
                {formatDate(post.publishedAt) && <span>{formatDate(post.publishedAt)}</span>}
              </div>
            </div>
          </section>

          {post.mainImage && (
            <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-10">
              <div className="relative w-full rounded-2xl overflow-hidden bg-[#F5F7FA] border border-[#E2E8F0]" style={{ aspectRatio: '16 / 9' }}>
                <Image
                  src={urlForImage(post.mainImage).width(1400).height(788).fit('crop').auto('format').url()}
                  alt={post.title}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          )}

          <div className="max-w-3xl mx-auto px-6 py-16">
            {post.content && <PortableTextRenderer value={post.content} />}

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-[#E2E8F0]">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#F5F7FA] border border-[#E2E8F0] text-[#374151]">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {post.author?.name && (
              <div className="flex items-center gap-4 mt-10 pt-8 border-t border-[#E2E8F0]">
                {post.author.photo ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={urlForImage(post.author.photo).width(96).height(96).fit('crop').auto('format').url()}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#0AAEDB]/10 border border-[#0AAEDB]/25 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-[#0AAEDB]">
                      {post.author.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-sm font-bold text-[#0D1B2A]">{post.author.name}</p>
                  {post.author.position && <p className="text-xs text-[#6B7280]">{post.author.position}</p>}
                </div>
              </div>
            )}
          </div>

          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <section className="py-16 bg-[#F5F7FA]">
              <div className="max-w-5xl mx-auto px-6">
                <p className="text-xs font-bold uppercase tracking-wide text-[#6B7280] mb-6">Related Articles</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {post.relatedPosts.map((rp) => (
                    <Link
                      key={rp._id}
                      href={`/blog/${rp.slug}`}
                      className="rounded-xl border border-[#E2E8F0] bg-white p-5 hover:border-[#0AAEDB]/40 transition-colors"
                    >
                      <h3 className="font-display text-base font-bold text-[#0D1B2A] leading-snug">{rp.title}</h3>
                      {rp.excerpt && <p className="text-xs text-[#6B7280] mt-2 leading-relaxed line-clamp-2">{rp.excerpt}</p>}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </div>
  )
}
