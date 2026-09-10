import { createClient } from '@sanity/client'
import imageUrlBuilder, { type SanityImageSource } from '@sanity/image-url'

// TODO: fill in once the Studio project is uploaded — these two values aren't secret,
// they're safe to hardcode here or set as NEXT_PUBLIC_ env vars in Vercel.
// Find them in sanity.config.ts / sanity.cli.ts in the Studio folder.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
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

const builder = imageUrlBuilder(sanityClient)

export function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}
