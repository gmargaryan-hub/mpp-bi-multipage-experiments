import { createClient } from '@sanity/client'
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

// From studio-mpp-website/sanity.config.ts — not secret, safe to hardcode. Still
// overridable via env vars if the project/dataset ever changes without a redeploy.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'cpyjkfcl'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-01-01'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  // useCdn: true is fine (and faster) for published, public content. Switch to false
  // if the blog needs to reflect draft/unpublished edits immediately.
  useCdn: true,
  // Only needed if the dataset's read access is restricted. If so, add
  // SANITY_API_READ_TOKEN as a server-only env var in Vercel (never commit it,
  // never prefix it with NEXT_PUBLIC_) and uncomment the line below.
  // token: process.env.SANITY_API_READ_TOKEN,
})

const builder = createImageUrlBuilder(sanityClient)

export function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}
