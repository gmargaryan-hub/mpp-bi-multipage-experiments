// next/image's `unoptimized` mode (required for static export, see next.config.ts)
// renders a plain <img src>, and Next only auto-prefixes basePath onto its own
// build chunks — not onto public/ asset paths you reference as strings. So every
// local asset src has to go through this helper or it 404s on GitHub Pages
// (which serves the site from /<repo>/, not /).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export function asset(path: string): string {
  return `${basePath}${path}`
}
