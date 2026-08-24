# MPP BI — Home page

Next.js (App Router) rebuild of the MPP BI home page — hero, stat cards, data-connector
logos, industries, and the WISE/UNDP case study — built to deploy on Vercel.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

`npm install` should report **0 vulnerabilities**. If you ever see high-severity findings
from `npm audit` again, it's almost always a transitive `next`/`sharp`/`postcss` version —
check `npm audit` for which package, then bump `next` in `package.json` rather than running
`--force` (that can silently jump a major version and break the build).

### If `npm run dev` gives `ERR_CONNECTION_REFUSED` in the browser

That means the dev server process crashed or never started — the browser error itself
won't say why, so check the terminal output where you ran `npm run dev`:

- **Most likely cause: Node.js version.** Next.js 16 requires **Node ≥20.9.0**. Run `node -v`
  to check. `package.json` now declares this in `engines`, and `.npmrc` sets `engine-strict=true`,
  so `npm install` will refuse to proceed on an incompatible Node version instead of installing
  fine and failing silently later at `next dev`. If you're on an old Node, install 20+ (nvm:
  `nvm install 20 && nvm use 20`) and reinstall.
- **Port already in use.** If something else is already on 3000, Next either fails to bind or
  picks a different port and prints it in the terminal — check the actual "Local:" URL it logs.
- **Stale install.** `rm -rf node_modules .next package-lock.json && npm install` and try again.

If none of that explains it, share the terminal output (not just the browser error) — the
fix depends on what the process actually logged when it exited.

## Deploying to Vercel

This project targets **Vercel**. It's not statically exported — the "Book a Demo" form
needs a real server to send email (`app/api/contact/route.ts`, calling Resend), and only a
host that runs Next.js natively — Vercel, in this case — can run that.

### One-time setup

1. Push this repo to GitHub (it's already a git repo with commits — just add a remote):
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git branch -M main
   git push -u origin main
   ```
2. On [vercel.com](https://vercel.com) → **New Project** → import the repo. Framework
   preset auto-detects as Next.js — no config needed.
3. **Before your first real deploy, add the environment variable the contact form needs:**
   Project → **Settings → Environment Variables** → add `RESEND_API_KEY` with your Resend
   API key (from [resend.com](https://resend.com)). Without this, the form's requests will
   reach the server fine but fail to actually send — I tested this locally and confirmed
   the route returns a clean error in that case rather than crashing silently, but you'll
   want the key set before sharing the live link.
4. **Currently a temporary workaround, not the final state:** the route sends from
   `onboarding@resend.dev` — Resend's sandbox sender, which can *only* deliver to the email
   address your Resend account signed up with. Since that account signed up as
   `gmargaryan@mpplabs.io`, `to:` is currently set to that address as a stop-gap so the form
   works today. **To send to `welcome@mpp-insights.com` instead** (the intended long-term
   recipient): go to **resend.com/domains → Add Domain**, verify `mpp-insights.com` via the
   DNS records Resend gives you, then update `app/api/contact/route.ts` — change `to:` back
   to `welcome@mpp-insights.com` and `from:` to an address on the now-verified domain (e.g.
   `'MPP BI <noreply@mpp-insights.com>'`). Sending to any address other than the account's
   signup email from `onboarding@resend.dev` returns a 403 — check **Vercel → your project →
   Logs** if a submission fails and you'll see this exact error from Resend.
5. Deploy. Every push to `main` redeploys automatically from then on.

The form currently emails **gmargaryan@mpplabs.io** (temporary — see step 4 above for how
to switch it to `welcome@mpp-insights.com` once the domain is verified).

### If you need GitHub Pages again later

Static hosting and a working inline-send form are mutually exclusive — GitHub Pages can't
run the API route at all (I tested this: the build "succeeds" but the route silently drops
out of the static export, so the form would always fail with no visible reason why). If you
ever need to go back to GitHub Pages, the form would need to fall back to a `mailto:` link
instead of a real send — a previous version of this project did exactly that, so it's a
known, reversible trade-off, not a rebuild.

## What's in here

```
app/
  layout.tsx             → metadata (no external font — see note below)
  globals.css             → Tailwind import + dot-grid / card-hover / gradient-text utilities
  page.tsx                 → Home page, assembles all sections
  architecture/page.tsx    → Architecture page
  features/page.tsx        → Features page
  agentic-bi/page.tsx      → Agentic BI page
  pricing/page.tsx          → Pricing page
  why-mpp-bi/page.tsx      → Why MPP BI page
  about-us/page.tsx        → About Us page
  benefits/page.tsx        → Benefits page
components/
  Navigation.tsx            → nav matching the new site map (Architecture, Features, Agentic BI,
                             Why MPP BI, Pricing, Resources dropdown, Book a Demo), white background
  HeroSection.tsx
  StatsSection.tsx          → the 5 "features at a glance" cards — content corrected to
                              match the approved version (2B+ records / No Extraction /
                              Always Live, not the earlier mismatched copy)
  ConnectsWithDataSection.tsx  → real vendor logos (Postgres, Oracle, Kafka, S3, etc.)
  UseCasesSection.tsx        → industries served
  CaseStudySection.tsx      → WISE × UNDP × Ministry of Labour & Social Affairs. Shared
                             across Home and Why MPP BI again — the page-specific
                             WhyCaseStudySection.tsx variant from before was consolidated
                             back into this one (see "Case study consolidation" below).
  CTASection.tsx
  Footer.tsx                → dark navy, MPP Insights logo
  ContactFormModal.tsx      → shared "Book a Demo" form, opened from every CTA on the site
                             via a window event (see lib/openDemoModal.ts). Ported from the
                             one-pager's modal; submits to app/api/contact for a real send.
  ArchitectureHero.tsx      → Architecture page hero + 3 stat cards (2x–12x / 2-Tier / 100%)
  LegacyProblemSection.tsx  → "Why Legacy BI Tools Slow You Down" (calc-engine problem)
  ArchitectureDiagramSection.tsx → the exact animated SVG diagram from the one-pager's
                                   HeroSection.tsx (ArchDiagram — pure SVG with native
                                   SMIL animateMotion for the flowing connector dots),
                                   ported verbatim, with the same header/stat-cards
                                   framing as before around it
  BuiltDifferentlySection.tsx    → the 3 design-choice explanations
  CalcLanguageSection.tsx   → DAX vs. MPP BI's calculation language comparison table
  TalkToEngineerSection.tsx → Architecture page's technical-demo CTA
  FeaturesHero.tsx
  FeaturesStatsSection.tsx  → "at a glance" stat cards (Connect/Visualize/AI-Powered/
                             Secure/Scalable), sits right after the hero
  DataSourcesSection.tsx    → categorized connector logos (relational, warehouses, big data,
                             streaming, files, APIs)
  VisualizationSection.tsx  → 12-item visualization capability grid
  AIMLFeaturesSection.tsx    → AI/ML features incl. link to Agentic BI page
  MPPETLSection.tsx          → MPP ETL data-prep engine feature list
  SecuritySection.tsx        → enterprise security, grouped (sign-in, data safety, access
                             control, audit log)
  CustomizationSection.tsx  → "Built to Be Customized" 5-item grid
  DeploymentOptionsSection.tsx → on-prem/cloud/containers/VMs with logos + hardware table
  AgenticBIHero.tsx
  AgenticBIStatsSection.tsx  → "at a glance" stat cards (Ask/Infrastructure/Integration),
                              sits right after the hero
  TraditionalVsAgenticSection.tsx → traditional vs. agentic BI comparison table
  WhatAgenticBIDoesSection.tsx     → 5-feature grid + grounded-in-your-data callout
  EnterpriseAndIntegrationSection.tsx → "designed for enterprise" + integration points
  PricingHero.tsx
  PricingStatsSection.tsx    → "at a glance" stat cards (Pricing/Seats From/Enterprise),
                              sits right after the hero
  PricingTableSection.tsx    → $10/$18 seat pricing with categorized feature checklist
  PerpetualLicenseSection.tsx
  PricingCalculatorSection.tsx → real interactive cost calculator (built from scratch —
                                see gaps below)
  WhyMPPBIHero.tsx
  WhyMPPBIStatsSection.tsx  → "at a glance" stat cards (Performance/Scalable/Proven/
                             Customizable), sits right after the hero
  BigComparisonSection.tsx  → MPP BI vs. Tableau vs. Power BI, full table
  DeploymentSection.tsx      → on-prem vs. cloud + Power BI on-prem limitations + who-it's-for
  ScaleAndPerformanceSection.tsx → enterprise-scale + speed stats
  AICapabilitiesSection.tsx  → ask/build/forecast AI capabilities
  BrandAndSupportSection.tsx → white-labeling + direct support
  FAQSection.tsx             → 5-question accordion
  AboutUsHero.tsx
  CompanyTimelineSection.tsx → 2001 / 2022 / 2025 company timeline
  TeamSection.tsx             → Sergei Shestakov + Peter Bilzerian bios, industries served
  MissionSection.tsx          → mission statement + pull quote
  BenefitsHero.tsx             → Benefits page hero + its own 5 stat cards (2x–12x /
                                2B+ records / No Extraction / Always Live / $10)
  BenefitsListSection.tsx      → the 8 benefit blocks (each with a pull-quote + checklist),
                                including a nested hardware-requirements table and a
                                two-column self-service/AI-assistant block
lib/
  basePath.ts                → asset() helper — prefixes every public/ asset src with
                               basePath, since next/image's unoptimized mode (required for
                               static export) doesn't do this automatically
public/
  .nojekyll                  → disables Jekyll processing (see above)
  mppbi-logo.svg              → real MPP BI logo (vector, provided source file) — for light
                               backgrounds
  mppbi-logo-dark-bg.svg      → same logo with the #343E3D charcoal fill swapped to white,
                               for use on dark navy backgrounds (kept in case any section
                               still needs it — nav and footer no longer do)
  mpp-insights-logo.svg       → MPP Insights logo (white-only fill, dark-background asset,
                               as provided) — used in the footer, which stays dark navy
  logos/*.png                → vendor/data-source logos, pulled from your source folder
  case-study/*.png           → WISE dashboard screenshot + partner logos (cropped from source)
.github/workflows/deploy.yml → builds + deploys to GitHub Pages on every push to main
```

## Known gaps (flagged, not invented)

- No "Trusted by" client-logo strip or customer quotes were in the source content for Home —
  left out rather than filled with placeholders.
- No custom display font is wired up — `next/font/google` requires network access at build
  time, which breaks in some CI/sandboxed environments, so this ships with a safe system-font
  stack. Add a real font back via `next/font/google` (or self-hosted files) once you've
  confirmed your build environment reaches Google Fonts.
- Source images are PNG; your team's note says all site images should ship as WebP —
  convert before production.
- All 8 nav routes are now built: Home, Architecture, Features, Agentic BI, Why MPP BI,
  Pricing, About Us. The `/resources/*` links (Case Studies, Demos, Blog, Research,
  Documentation) in the nav are still stubs — that content wasn't in the source package,
  so those routes 404 until they're built.
- The Pricing page's "online license calculator" isn't the third-party link referenced in
  your source doc (`mppbicalculator.netlify.app`) — I couldn't verify that site, so instead
  built a real, working calculator from scratch using your published $10/$18 per-seat rates.
- Team member cards on About Us use initials avatars, not photos — no headshots were in the
  source package.
- The "Book a Demo" form POSTs to `app/api/contact`, which calls Resend server-side —
  working now with `RESEND_API_KEY` set in Vercel. It currently emails
  `gmargaryan@mpplabs.io` as a temporary workaround (Resend's sandbox sender can only
  deliver to the account's signup email); see step 4 of the deploy section above for how
  to switch it to `welcome@mpp-insights.com` once `mpp-insights.com` is verified in Resend.
- Header logo scrolls to top on the home page and navigates to `/` from any other page.
  Footer logo is a plain external link to `https://mpp-insights.com/`, not a route on this
  site.
- The Architecture page's comparison diagram is the exact SVG from the one-pager's
  `HeroSection.tsx` (a component called `ArchDiagram` there — it's used as the hero's
  visual centerpiece in the one-pager, not from `ArchitectureSection.tsx`, which is a
  different, separate diagram built with framer-motion instead of raw SVG). Ported
  verbatim, including the native SMIL `animateMotion` dots. The header and three
  stat-comparison cards around it are carried over from this page's earlier version and
  aren't part of the one-pager's diagram itself.

## Mobile responsiveness

Audited by actually screenshotting every page at mobile (375px), tablet (768px), and
desktop (1440px) widths with a real headless Chromium, rather than just inspecting Tailwind
classes — this caught real bugs that code review alone would likely have missed:

- **Pricing table** — the two seat-type columns were hard-coded to `w-36` regardless of
  screen size, squeezing feature text into an unreadably narrow column. Fixed with
  responsive widths and shortened mobile labels ("Read-Only" instead of "Read-Only User").
- **Hardware requirements table** (Features page) — had no scroll wrapper, so the third
  column ("For 500 users at once") was being silently clipped off-screen rather than
  reachable at all. Fixed with a proper `overflow-x-auto` wrapper.
- **Comparison table** (Why MPP BI) — was already correctly scrollable, but had no visual
  hint that it scrolled. Added a "swipe to see all columns" hint, mobile-only.
- **Architecture diagram SVG** — technically had no overflow (it shrank to fit its
  container), but at ~325px wide every internal label became illegibly small. Fixed by
  giving it a 720px minimum width inside a horizontal-scroll wrapper, so it renders at a
  legible size and requires a swipe rather than shrinking into mush — same pattern as the
  two tables above.

Verified after fixing: zero horizontal overflow across all 7 pages × 3 breakpoints (21
combinations), confirmed via direct `scrollWidth`/`clientWidth` measurement, not visual
inspection alone.

### Update: BenefitsSection card style now matches the Benefits page

Content was already correct (ported verbatim from the one-pager and unchanged), but the
card design was the one-pager's own heavier style (large uppercase title, hover glow, top
accent line). Replaced the card markup with the exact style already used on the Benefits
page hero (`BenefitsHero.tsx`) — same icon-chip size, same typography hierarchy, same
spacing — so the two pages present the same 5 stats consistently instead of two different
visual treatments. Confirmed via side-by-side screenshots that the card designs now match
exactly. Section header/copy (eyebrow, H2, intro paragraph) is unchanged, since that's
Home-specific and wasn't part of the request.

## Home page rebuilt from the one-pager (almost exactly as it was)

The Home page (`app/page.tsx`) is now assembled from the original one-pager project's
sections, in their original order, ported directly from the source rather than
reconstructed from memory:

```
HeroSection → BenefitsSection → TrustedGloballySection → ProblemSection →
ArchitectureSection → EliminatedSection → LPEvsDaxSection → ComparisonTable →
UseCasesSection → FeaturesGrid → DashboardShowcase → StatsBar → PricingSection →
CTASection
```

Per the request, **Navigation and Footer were left untouched** — they're the multi-page
site's nav/footer, not the one-pager's originals, since the one-pager's `Navigation.tsx`/
`Footer.tsx` files were never copied in. Every other page on the site is unaffected; only
`app/page.tsx` and the components it imports changed. Confirmed with a full regression
sweep after the rebuild (8 pages × 4 breakpoints, 32 combinations) — zero overflow, zero
console/page errors anywhere, including on the other 7 pages.

Real assets ported over, not placeholders: actual client logos (`public/logos/`, from the
one-pager's own `public/` folder) for the trusted-by marquee, and 5 real dashboard
screenshots (`public/dashboards/`) for the interactive showcase tabs.

### Three real bugs found and fixed during the port (not silently kept)

- **`UseCasesSection.tsx`**: a literal typo in the source — a button read "ok a demo for
  your industry" instead of "Book a demo for your industry" (the "Bo" had been dropped).
  Fixed.
- **`DashboardShowcase.tsx`**: the image container forced a fixed `aspect-[16/9]` on all 5
  dashboard screenshots, but none of them are actually 16:9 — their real ratios range from
  1.50 to 2.02 (measured directly, not assumed). Every single one would have displayed
  cropped. Fixed the same way we fixed this exact class of bug on the Home page's case
  study earlier: lock the container's aspect ratio to each image's real dimensions instead
  of a fixed value, so `object-cover` has nothing left to crop.
- **`CTASection.tsx`**: used a raster `/mppbi-logo.png` that was never actually included in
  the one-pager's `public/` folder (would have 404'd), plus unused `Link`/`Download`
  imports pointing at a dead, commented-out block. Swapped in our existing high-quality
  vector logo (`mppbi-logo-dark-bg.svg`, already used elsewhere on the site) instead of
  chasing down or recreating a missing raster asset, and removed the dead code.

### Also fixed (unrelated to the port itself)

- `PricingSection.tsx` had an unused `Link` import (never referenced in JSX) — removed to
  avoid any lint-triggered build issues.
- Added `@radix-ui/react-tabs` as a new dependency — `UseCasesSection.tsx`'s industry tabs
  need it and it wasn't in the project before. Actually clicked through a tab (Government)
  after building and confirmed the content genuinely swaps, not just that it renders once.
- Added the `animate-marquee` keyframe animation to `globals.css` for the logo marquee —
  wasn't present before since nothing on the old Home page needed it.

### One likely content bug left as-is (not mine to silently fix)

`TrustedGloballySection.tsx`'s data array labels the William & Mary logo with the subtitle
"Washington & Madison" — almost certainly should read "William & Mary" to match the `alt`
text right next to it in the same object. Ported faithfully rather than guessed at, since
this is their content, not a code bug — flagging it here so it doesn't slip through
unnoticed.

### Everything else ported as a faithful, direct copy

Including keeping "OctoLang" as literal text in `ArchitectureSection.tsx` and
`LPEvsDaxSection.tsx` — this is real source content, not something I'd invented or
generalized away this time (a previous, unrelated port of a different diagram component
had generalized this term out; this rebuild uses the actual source verbatim). Also kept the
one-pager's own pricing figures (SaaS + perpetual card details) on this Home preview
section exactly as written, even though they present slightly different numbers/framing
than the dedicated `/pricing` page — that's how the original one-pager was built, and nothing
in the request asked to reconcile the two.

## Copy + nav fixes (latest round)

- Pricing calculator heading changed from "Online License Calculator" to "MPP BI Pricing
  Calculator."
- Features page: the eyebrow above "Runs Where You Want" changed from "Deployment" to
  "Flexible Deployment."
- **Features nav dropdown** — "Features" is now a hover dropdown (same pattern as
  Resources), listing all 7 sections on that page as anchor links: Data Sources,
  Visualization, AI & Machine Learning, MPP ETL, Security, Customization, Deployment. Each
  links to `/features#<section-id>`. The "Features" label itself is still a real link to
  `/features` (not just a dropdown trigger), so clicking it without hovering still works
  normally. Verified this isn't just a URL change — actually clicked a sub-item and
  confirmed the page scrolls to the right section (`scrollY` changed accordingly), not just
  that the URL updated. Mobile menu shows the same 7 sub-items indented with a left border
  under "Features" so they read as sub-items rather than top-level pages.

## Home page fix

- Corrected Home's "features at a glance" stat cards (`StatsSection.tsx`) — the content
  had drifted from the approved version (previously: Faster/Scalable/Secure/Flexible/
  Affordable with "500 users," "Full control," "4 ways" framing). Now matches the correct
  content exactly: Faster (2x–12x), Scalable (2B+ records, on a single node), Secure (No
  Extraction), Always Live (or Scheduled), Affordable ($10) — same content already used on
  the Benefits page hero, so both are now consistent.
- Note on the source file: the uploaded docx was named `About_Us.docx`, but its own content
  was headed "Home page:" and referenced the actual `StatsSection.tsx` component — About Us
  has no matching stat-card section at all. Confirmed with the user this was a mislabeled
  upload before proceeding.

## Pricing page fixes

- Added the missing "at a glance" stat-card row (Pricing/Transparent, Seats From/$10 per
  User, Enterprise/Custom Pricing) right after the hero.
- Fixed H2 semantics in both the Monthly Subscription and Perpetual License sections, same
  pattern as the Agentic BI / Why MPP BI fixes: "Monthly subscription" and "Perpetual
  license" are now the real `<h2>`s; the larger display headings below them ("Two Seat
  Types...", "Buy Your Seats Instead of Renting Them") are non-heading text with the same
  visual styling as before.
- Made the Perpetual License CTA button more visually outstanding — switched it from a
  plain dark navy pill to the section's orange accent color with a glow shadow, so it
  actually draws the eye against the white card instead of blending in.
- Calculator heading changed to "Online License Calculator" (kept "Online" as requested).
- Fixed the read-only-seats slider's granularity: it stepped in increments of 5, so an
  exact count like 8 wasn't selectable — changed the step to 1, matching the admin-seats
  slider (which already stepped by 1).
- Made "For larger teams or more complex deployments, we'll prepare a package and pricing
  based on your requirements" visually distinct instead of buried in the closing CTA's body
  paragraph — added an optional `note` prop to the shared `SimpleCTASection` component
  (backward compatible; every other page using it is unaffected) that renders as a
  highlighted callout box between the body text and the button.

## Why MPP BI page fixes

- Added the missing "at a glance" stat-card row (Performance/Scalable/Proven/Customizable)
  right after the hero — matches the reference image.
- Split the comparison table's single merged footnote into two separate notes ("Pricing as
  of Q2 2026." / the Power BI Pro requirement note), as two distinct points instead of one
  run-on sentence.
- Added two H3 headings that existed in the approved content but were missing on the live
  page: "On-premise vs. cloud deployment" (right before that table) and "Who is it for"
  (right before the on-premise/cloud fit cards).
- Fixed an alignment inconsistency: the "Either way, you control who can see your data..."
  paragraph was center-aligned while the equivalent paragraph in the section above it was
  left-aligned — now both left-aligned.
- **Restructured the case study section**, since client-logo placement wasn't getting
  enough attention. New order, per the request: heading → logos (now in their own visually
  distinct strip, sized up) + client description → project summary → results checklist →
  a bordered CTA callout box → the dashboard screenshot last. Previously the dashboard
  image led, with logos small and inline further down.
  **Scoping note (superseded):** this was originally built as a separate
  `WhyCaseStudySection.tsx` scoped to just this page. It's since been consolidated back
  into the shared `CaseStudySection.tsx` — see "Case study consolidation" below.

## Case study consolidation (applied everywhere)

The restructured case study layout built for Why MPP BI (logo strip up front, dashboard
image last) is now the only version — merged back into `CaseStudySection.tsx`, which both
Home and Why MPP BI import. `WhyCaseStudySection.tsx` no longer exists as a separate file.

Also removed the case study card's white background per request — the outer container no
longer has `bg-white` or a drop shadow, so it sits flush with the section's light gray
background instead of floating as a distinct white card. The logo strip inside kept a white
panel of its own, so the logos still have a clean, contained frame rather than sitting
directly on the gray section background.

Verified both pages render identically from the same component (screenshots matched
side-by-side) and re-ran the full breakpoint regression sweep (8 pages × 4 widths) after
the consolidation — still zero horizontal overflow anywhere.

## Agentic BI page fixes

- Added the missing "at a glance" stat-card row (Ask/Plain Language, Infrastructure/Your
  Choice, Integration/No Migration) right after the hero — matches the reference image
  from the source doc exactly.
- Fixed heading structure in `EnterpriseAndIntegrationSection.tsx` to match the approved
  content exactly, not just the tag swap from my first attempt. The approved doc shows
  exactly one heading per block ("Designed for Enterprise BI", "Integration &
  Compatibility") with no secondary heading beneath it, and the card items ("You choose
  the model," etc.) as bold inline lead-ins within plain text, not as separate `<h3>`
  headings. My first pass had swapped which element got the `<h2>` tag but left the old
  "Not a Chatbot Bolted On Top" / "Nothing to Migrate, Nothing to Rebuild" subheadings and
  the four `<h3>` card titles in place — that wasn't what was being asked. Now confirmed
  via direct DOM query: exactly two `<h2>`s in this section, zero `<h3>`s. Visual card
  styling (icons, borders) kept intact — only the underlying tags and the removed
  subheading text changed.
- **This same eyebrow/heading pattern is used across every other page on the site** — I
  only touched Agentic BI here since that's what was asked. If the same fix should apply
  site-wide, let me know and I'll sweep the rest.

## Site structure update (Benefits page + nav reorder)

- Added `/benefits`, built from `MPP BI benefits - Page content.docx`. Content, pull-quotes,
  and the hardware table are copied faithfully; the hero's 5 stat cards match the source
  doc's embedded reference image exactly (2x–12x / 2B+ records / No Extraction / Always
  Live-or-Scheduled / $10).
- Nav reordered to: Features, Benefits, Pricing, Why MPP BI, New Agentic BI, About Us,
  Resources (Architecture, Case Studies, Demos, Research, Documentation, Blog), Book a Demo.
  **Architecture moved from a top-level item into the Resources dropdown** — same page,
  same content, just relocated in the nav per the requested structure. Footer's Product/
  Resources columns updated to match. Verified the now-more-crowded desktop nav (6 primary
  items + dropdown + CTA) doesn't wrap or overflow even at the `lg:` breakpoint's narrowest
  width (1024px) — checked directly, not assumed.
- The nav label reads "New Agentic BI" per the requested structure; I left the page's own
  content (H1, copy) as "Agentic BI" throughout, since only the nav label was specified.
- The request's numbered list ended at "3." with no content — I built out steps 1 and 2 in
  full. Let me know what step 3 was meant to be.

## Desktop container width

Widened the structural section containers (nav, footer, grids of cards/logos/stats) from
`max-w-7xl` (1280px) to `max-w-[1440px]`, and `max-w-6xl` (1152px) to `max-w-[1280px]`,
across 12 components. Text-heavy containers (`max-w-2xl` through `max-w-5xl`, used for
paragraphs and headings) were left untouched — widening those would hurt readability by
stretching line lengths too far.

Measured directly rather than assumed: at a 1440px viewport (a common laptop width), the
side gutter went from 80px to 0 per side; at 1920px (a common external-monitor width), from
320px to 240px per side. Re-ran the full overflow check afterward (7 pages × 4 breakpoints,
adding a 1920px pass) — still zero overflow anywhere.
