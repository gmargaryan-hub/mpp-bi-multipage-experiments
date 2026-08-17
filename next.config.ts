import type { NextConfig } from 'next'

// Deploying to Vercel, which runs Next.js natively — no static export needed,
// and the API route in app/api/contact requires a real server to run at all.
// (If you ever move to GitHub Pages or another static host again, note that
// static export silently drops API routes from the build output — the form
// would need to fall back to a mailto: link instead, as it did previously.)
const nextConfig: NextConfig = {
  images: {
    // Next only serves quality=75 by default and returns a 400 for anything
    // else unless it's explicitly allow-listed here. The case study screenshot
    // requests quality=100 to avoid extra compression softness on top of its
    // already-limited source resolution.
    qualities: [75, 100],
  },
}

export default nextConfig
