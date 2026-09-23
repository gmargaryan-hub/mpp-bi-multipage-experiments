import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { PageHeader } from '@/components/ui'
import { getAllPosts, getPostsByCategory, getAllCategories } from '@/lib/sanity-queries'
import { urlForImage } from '@/lib/sanity'

// Revalidate periodically so newly published posts show up without a full
// redeploy — this page doesn't need to be rebuilt every time an editor hits
// "Publish" in the Studio.
export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog | MPP BI',
  description: 'Product updates, engineering deep dives, and news from the MPP BI team.',
}

function formatDate(dateStr?: string) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

type Props = { searchParams: Promise<{ category?: string }> }

export default async function BlogIndexPage({ searchParams }: Props) {
  const { category: selectedCategory } = await searchParams

  let posts: Awaited<ReturnType<typeof getAllPosts>> = []
  let categories: Awaited<ReturnType<typeof getAllCategories>> = []
  let fetchFailed = false
  try {
    ;[posts, categories] = await Promise.all([
      selectedCategory ? getPostsByCategory(selectedCategory) : getAllPosts(),
      getAllCategories(),
    ])
  } catch {
    // Sanity read likely failed (unset project/dataset, restricted read access, or a
    // network issue) — degrade to an empty-state message instead of crashing the page.
    fetchFailed = true
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <PageHeader title="Blog" lede="Product updates, engineering notes and news from the MPP BI team." />

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            {fetchFailed && (
              <div className="rounded-lg border border-line bg-paper p-6 text-center mb-12">
                <p className="text-sm text-ink font-semibold mb-1">Couldn&apos;t load posts right now</p>
                <p className="text-xs text-slate">
                  The blog couldn&apos;t reach Sanity. If this persists, check that the project ID/dataset in
                  lib/sanity.ts are correct and that the dataset allows public read access.
                </p>
              </div>
            )}

            {/* Category filter — "All" + each category. Real navigation (?category=slug),
                so this re-renders server-side, same pattern as the post page's topic tags. */}
            {!fetchFailed && categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-14">
                <Link
                  href="/blog"
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    !selectedCategory
                      ? 'bg-ink text-white'
                      : 'bg-white border border-line text-body hover:border-navy/40'
                  }`}
                >
                  All
                </Link>
                {categories.map((cat) => {
                  const active = cat.slug === selectedCategory
                  return (
                    <Link
                      key={cat.slug}
                      href={`/blog?category=${cat.slug}`}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                        active
                          ? 'bg-ink text-white'
                          : 'bg-white border border-line text-body hover:border-navy/40'
                      }`}
                    >
                      {cat.title}
                    </Link>
                  )
                })}
              </div>
            )}

            {!fetchFailed && posts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-body text-lg font-semibold mb-2">
                  {selectedCategory ? 'No posts in this category yet' : 'No posts published yet'}
                </p>
                <p className="text-slate text-sm">Once something is published in the Studio, it&apos;ll show up here.</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="group rounded-lg border border-line overflow-hidden hover:border-navy/40 transition-colors"
                >
                  <div className="relative w-full bg-paper" style={{ aspectRatio: '1.3 / 1' }}>
                    {post.mainImage ? (
                      <Image
                        src={urlForImage(post.mainImage).width(800).height(615).fit('crop').auto('format').url()}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-mist text-xs">No image</div>
                    )}
                    {post.category && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-semibold text-white bg-ink/80 backdrop-blur-sm">
                        {post.category.title}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h2 className="text-lg font-semibold text-ink leading-snug mb-2 group-hover:text-navy transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-slate leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    )}
                    {formatDate(post.publishedAt) && (
                      <p className="text-xs text-slate">{formatDate(post.publishedAt)}</p>
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
