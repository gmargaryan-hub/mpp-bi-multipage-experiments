import type { NextConfig } from 'next'

// Deploying to Vercel, which runs Next.js natively — no static export needed,
// and the API route in app/api/contact requires a real server to run at all.
// (If you ever move to GitHub Pages or another static host again, note that
// static export silently drops API routes from the build output — the form
// would need to fall back to a mailto: link instead, as it did previously.)
const nextConfig: NextConfig = {
  // Dev only: Next 16 blocks its dev scripts for any origin but localhost, so a page
  // opened by this machine's address renders but never becomes interactive.
  allowedDevOrigins: ['100.64.0.3', '192.168.0.106', 'theia', '*.local'],
  // The Benefits page was folded into Why MPP BI.
  async redirects() {
    return [{ source: '/benefits', destination: '/why-mpp-bi', permanent: true }]
  },
  images: {
    // Next only serves quality=75 by default and returns a 400 for anything
    // else unless it's explicitly allow-listed here. The case study screenshot
    // requests quality=100 to avoid extra compression softness on top of its
    // already-limited source resolution.
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig
