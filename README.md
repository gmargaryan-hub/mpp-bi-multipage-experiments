# MPP BI website

Marketing site for MPP BI. Next.js App Router with Tailwind CSS 4, deployed on Vercel.

```sh
npm ci
npm run dev     # http://localhost:3000
npm run build
```

## Layout

- `app/` — one folder per page. Page copy lives in the page file.
- `components/ui.tsx` — layout primitives (`Container`, `Section`, `SectionHeader`, `PageHeader`, `Screenshot`, `RuleList`, button styles).
- `components/` — blocks shared between pages: navigation, footer, demo modal, architecture diagram, comparison table, case study, call-to-action band.
- `app/globals.css` — brand tokens. The colors come from the MPP ETL branding (`etl/scripts/branding/assets/mpp_etl/additional_styles/custom.css`): navy `#192f50`, slate `#52647a`, mist `#b9c3ce`, and light grays for backgrounds and lines. Type is IBM Plex Sans and Plex Mono.
- `public/` — logos, team photos, the case-study assets and product screenshots.

## Services

- **Demo requests** go through `app/api/contact` to Resend. Set `RESEND_API_KEY` in Vercel. The route sends to a temporary address until `mpp-insights.com` is verified in Resend; see the comment in the route.
- **Blog** reads posts from Sanity (`lib/sanity.ts`, project `cpyjkfcl`, dataset `production`) and revalidates every 60 seconds.
- **Canonical URLs** use `NEXT_PUBLIC_SITE_URL`.
- `/benefits` redirects permanently to `/why-mpp-bi`.
