import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import TableOfContents from '@/components/TableOfContents'
import {
  getPostBySlug,
  getAllPostSlugs,
  getAllCategories,
  getRecentPostsByCategory,
} from '@/lib/sanity-queries'
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

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ topic?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug).catch(() => null)
  if (!post) return { title: 'Blog | MPP BI' }
  return {
    title: post.seoTitle || `${post.title} | MPP BI Blog`,
    description: post.seoDescription || post.excerpt,
    alternates: { canonical: post.canonicalUrl || `/blog/${post.slug}` },
  }
}

function formatDate(dateStr?: string) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPostPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { topic } = await searchParams

  const post = await getPostBySlug(slug).catch(() => null)
  if (!post) notFound()

  // "Other Articles" section: which category's recent posts to show. Defaults to
  // this post's own category; a tag click sets ?topic=<slug> which re-renders this
  // Server Component with a different selection — no client-side state at all.
  const categories = await getAllCategories().catch(() => [])
  const selectedCategorySlug = topic || post.category?.slug || categories[0]?.slug

  const otherArticles = selectedCategorySlug
    ? await getRecentPostsByCategory(selectedCategorySlug, post.slug, 3).catch(() => [])
    : []

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <article>
          <section className="bg-paper border-b border-line pt-32 pb-20 md:pt-40">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-slate hover:text-ink transition-colors mb-8">
                <ArrowLeft size={14} />
                Back to Blog
              </Link>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
                {post.title}
              </h1>
            </div>
          </section>

          {post.mainImage && (
            <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-10">
              <div className="relative w-full rounded-lg overflow-hidden bg-paper border border-line" style={{ aspectRatio: '16 / 9' }}>
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

          {/* Author, category, date — right after the hero image, per request */}
          <div className="max-w-3xl mx-auto px-6 pt-8">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pb-8 border-b border-line">
              {post.author?.name && (
                <div className="flex items-center gap-2.5">
                  {post.author.photo ? (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={urlForImage(post.author.photo).width(64).height(64).fit('crop').auto('format').url()}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-brand/10 border border-brand/25 flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-semibold text-brand">
                        {post.author.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                      </span>
                    </div>
                  )}
                  <span className="text-sm font-semibold text-ink">{post.author.name}</span>
                </div>
              )}
              {post.category && (
                <Link
                  href={`/blog?category=${post.category.slug}`}
                  className="px-2.5 py-1 rounded-md text-xs font-medium text-brand bg-brand/8 hover:bg-brand/15 transition-colors"
                >
                  {post.category.title}
                </Link>
              )}
              {formatDate(post.publishedAt) && (
                <span className="text-sm text-slate">{formatDate(post.publishedAt)}</span>
              )}
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-6 py-16">
            {post.content && <TableOfContents content={post.content} />}
            {post.content && <PortableTextRenderer value={post.content} />}

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-line">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-md text-xs font-medium bg-paper border border-line text-body">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {post.author?.name && (post.author.bio || post.author.position) && (
              <div className="flex items-center gap-4 mt-10 pt-8 border-t border-line">
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
                  <div className="w-12 h-12 rounded-full bg-brand/10 border border-brand/25 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-brand">
                      {post.author.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-ink">{post.author.name}</p>
                  {post.author.position && <p className="text-xs text-slate">{post.author.position}</p>}
                  {post.author.bio && <p className="text-xs text-slate mt-1 max-w-md leading-relaxed">{post.author.bio}</p>}
                </div>
              </div>
            )}
          </div>

          {/* Other Articles — category tags (active = current topic) + 3 most recent
              in that category. Switching tags is a real navigation (?topic=slug),
              so this whole section re-renders server-side, not client JS state. */}
          {categories.length > 0 && (
            <section id="other-articles" className="py-16 bg-paper scroll-mt-24">
              <div className="max-w-5xl mx-auto px-6">
                <p className="text-xs font-medium text-slate mb-5">Other Articles</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {categories.map((cat) => {
                    const active = cat.slug === selectedCategorySlug
                    return (
                      <Link
                        key={cat.slug}
                        href={`/blog/${post.slug}?topic=${cat.slug}#other-articles`}
                        scroll={false}
                        className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-colors ${
                          active
                            ? 'bg-ink text-white'
                            : 'bg-white border border-line text-body hover:border-brand/40'
                        }`}
                      >
                        {cat.title}
                      </Link>
                    )
                  })}
                </div>

                {otherArticles.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {otherArticles.map((rp) => (
                      <Link
                        key={rp._id}
                        href={`/blog/${rp.slug}`}
                        className="rounded-lg border border-line bg-white overflow-hidden hover:border-brand/40 transition-colors"
                      >
                        {rp.mainImage && (
                          <div className="relative w-full bg-paper" style={{ aspectRatio: '16 / 9' }}>
                            <Image
                              src={urlForImage(rp.mainImage).width(500).height(281).fit('crop').auto('format').url()}
                              alt={rp.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 320px"
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="p-5">
                          <h3 className="text-base font-semibold text-ink leading-snug">{rp.title}</h3>
                          {rp.excerpt && <p className="text-xs text-slate mt-2 leading-relaxed line-clamp-2">{rp.excerpt}</p>}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate">No other articles in this topic yet.</p>
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
