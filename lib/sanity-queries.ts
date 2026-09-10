import { sanityClient } from './sanity'

// ─── Types ──────────────────────────────────────────────────────────────────
// Matches studio-mpp-website/schemaTypes exactly. Note: postType.ts's inline
// `content` block definitions for statisticsBlock/comparisonTable/ctaBlock/
// articleImage don't quite match the separately-registered versions in
// schemaTypes/objects/*.ts (most notably: the inline comparisonTable has a
// `columns` field that the standalone one doesn't). Typed as optional/loose
// here so rendering doesn't break regardless of which definition produced a
// given document — but this mismatch is worth fixing on the Studio side.

export type SanityImage = {
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
}

export type AuthorSummary = {
  name: string
  slug: string
  photo?: SanityImage
  position?: string
  bio?: string
  linkedin?: string
}

export type CategorySummary = {
  title: string
  slug: string
  description?: string
}

export type PostSummary = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  mainImage?: SanityImage
  author?: AuthorSummary
  category?: CategorySummary
  tags?: string[]
  publishedAt?: string
  featured?: boolean
}

export type ArticleImageBlock = {
  _type: 'articleImage'
  _key: string
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  alt?: string
  caption?: string
}

export type StatisticsBlock = {
  _type: 'statisticsBlock'
  _key: string
  items: { label: string; value: string; description?: string }[]
}

export type ComparisonTableBlock = {
  _type: 'comparisonTable'
  _key: string
  title?: string
  description?: string
  columns?: string[] // only present on documents authored against postType.ts's inline shape
  rows: { feature: string; mppBi?: string; powerBi?: string }[]
}

export type CtaBlock = {
  _type: 'ctaBlock'
  _key: string
  title?: string
  text?: string
  buttonText?: string
  buttonUrl?: string
}

export type PortableTextBlockContent =
  | { _type: 'block'; _key: string; [key: string]: unknown }
  | ArticleImageBlock
  | StatisticsBlock
  | ComparisonTableBlock
  | CtaBlock

export type PostDetail = PostSummary & {
  content?: PortableTextBlockContent[]
  seoTitle?: string
  seoDescription?: string
  canonicalUrl?: string
  socialImage?: SanityImage
  relatedPosts?: PostSummary[]
}

// ─── Shared projections ─────────────────────────────────────────────────────
const authorProjection = `author->{ name, "slug": slug.current, photo, position, bio, linkedin }`
const categoryProjection = `category->{ title, "slug": slug.current, description }`

const postSummaryProjection = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  ${authorProjection},
  ${categoryProjection},
  tags,
  publishedAt,
  featured,
}`

// ─── Queries ────────────────────────────────────────────────────────────────

export async function getAllPosts(): Promise<PostSummary[]> {
  return sanityClient.fetch(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) ${postSummaryProjection}`
  )
}

export async function getFeaturedPosts(): Promise<PostSummary[]> {
  return sanityClient.fetch(
    `*[_type == "post" && featured == true && defined(slug.current)] | order(publishedAt desc) ${postSummaryProjection}`
  )
}

export async function getPostsByCategory(categorySlug: string): Promise<PostSummary[]> {
  return sanityClient.fetch(
    `*[_type == "post" && category->slug.current == $categorySlug && defined(slug.current)] | order(publishedAt desc) ${postSummaryProjection}`,
    { categorySlug }
  )
}

export async function getAllPostSlugs(): Promise<string[]> {
  const slugs: { slug: string }[] = await sanityClient.fetch(
    `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`
  )
  return slugs.map((s) => s.slug)
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      mainImage,
      ${authorProjection},
      ${categoryProjection},
      tags,
      publishedAt,
      featured,
      content[]{
        ...,
        _type == "image" => { ... },
        markDefs[]{ ..., _type == "link" => { href } },
      },
      seoTitle,
      seoDescription,
      canonicalUrl,
      socialImage,
      "relatedPosts": relatedPosts[]->${postSummaryProjection},
    }`,
    { slug }
  )
}

export async function getAllCategories(): Promise<CategorySummary[]> {
  return sanityClient.fetch(
    `*[_type == "category" && defined(slug.current)] | order(title asc){ title, "slug": slug.current, description }`
  )
}

/**
 * Most recent posts in a category, excluding one post (typically the one currently
 * being viewed, so "other articles on this topic" doesn't just show itself back).
 * Fetches one extra so that after excluding the current post there are still
 * `limit` results whenever possible, then trims to `limit` in JS.
 */
export async function getRecentPostsByCategory(
  categorySlug: string,
  excludeSlug?: string,
  limit = 3
): Promise<PostSummary[]> {
  const raw: PostSummary[] = await sanityClient.fetch(
    `*[_type == "post" && category->slug.current == $categorySlug && defined(slug.current)] | order(publishedAt desc) [0...${limit + 1}] ${postSummaryProjection}`,
    { categorySlug }
  )
  return raw.filter((p) => p.slug !== excludeSlug).slice(0, limit)
}
