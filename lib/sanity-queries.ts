import { sanityClient } from './sanity'

// ─── Types ──────────────────────────────────────────────────────────────────
// Matches studio-mpp-website/schemaTypes exactly. postType.ts's `content` field now
// references the registered object types directly ({type: 'statisticsBlock'} etc.)
// rather than re-inlining separate definitions, so there's a single source of truth
// for each block's shape.

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
  rows: { feature: string; mppBi?: string; powerBi?: string }[]
}

export type CodeBlock = {
  _type: 'codeBlock'
  _key: string
  language: 'typescript' | 'javascript' | 'python' | 'sql' | 'json' | 'html' | 'css' | 'bash'
  code: string
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
  | CodeBlock
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

// ─── Case Studies ───────────────────────────────────────────────────────────
// Mirrors the blog's structure (see README for the schema, added in
// sanity-schema-additions/ alongside this project — no case study schema existed
// before this round).

export type IndustrySummary = {
  title: string
  slug: string
  description?: string
}

export type SolutionItem = {
  title: string
  description?: string
}

export type CaseStudySummary = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  mainImage?: SanityImage
  industry?: IndustrySummary
  clientName?: string
  publishedAt?: string
  featured?: boolean
}

export type CaseStudyDetail = CaseStudySummary & {
  description?: string[]
  challenges?: string[]
  solutions?: SolutionItem[]
  content?: PortableTextBlockContent[]
  seoTitle?: string
  seoDescription?: string
  canonicalUrl?: string
  socialImage?: SanityImage
}

const industryProjection = `industry->{ title, "slug": slug.current, description }`

const caseStudySummaryProjection = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  ${industryProjection},
  clientName,
  publishedAt,
  featured,
}`

export async function getAllCaseStudies(): Promise<CaseStudySummary[]> {
  return sanityClient.fetch(
    `*[_type == "caseStudy" && defined(slug.current)] | order(publishedAt desc) ${caseStudySummaryProjection}`
  )
}

export async function getCaseStudiesByIndustry(industrySlug: string): Promise<CaseStudySummary[]> {
  return sanityClient.fetch(
    `*[_type == "caseStudy" && industry->slug.current == $industrySlug && defined(slug.current)] | order(publishedAt desc) ${caseStudySummaryProjection}`,
    { industrySlug }
  )
}

export async function getAllCaseStudySlugs(): Promise<string[]> {
  const slugs: { slug: string }[] = await sanityClient.fetch(
    `*[_type == "caseStudy" && defined(slug.current)]{ "slug": slug.current }`
  )
  return slugs.map((s) => s.slug)
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyDetail | null> {
  return sanityClient.fetch(
    `*[_type == "caseStudy" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      mainImage,
      ${industryProjection},
      clientName,
      publishedAt,
      featured,
      description,
      challenges,
      solutions,
      content[]{
        ...,
        _type == "image" => { ... },
        markDefs[]{ ..., _type == "link" => { href } },
      },
      seoTitle,
      seoDescription,
      canonicalUrl,
      socialImage,
    }`,
    { slug }
  )
}

export async function getAllIndustries(): Promise<IndustrySummary[]> {
  return sanityClient.fetch(
    `*[_type == "industry" && defined(slug.current)] | order(title asc){ title, "slug": slug.current, description }`
  )
}

export async function getRecentCaseStudiesByIndustry(
  industrySlug: string,
  excludeSlug?: string,
  limit = 3
): Promise<CaseStudySummary[]> {
  const raw: CaseStudySummary[] = await sanityClient.fetch(
    `*[_type == "caseStudy" && industry->slug.current == $industrySlug && defined(slug.current)] | order(publishedAt desc) [0...${limit + 1}] ${caseStudySummaryProjection}`,
    { industrySlug }
  )
  return raw.filter((cs) => cs.slug !== excludeSlug).slice(0, limit)
}
