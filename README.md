# MPP BI — Home page

Next.js (App Router) rebuild of the MPP BI home page — hero, stat cards, data-connector
logos, industries, and the WISE/UNDP case study — built to deploy on Vercel.

## Agentic BI page — full content rebuild from the September update

Near-total content replacement, not a copy edit — new hero copy, a rewritten comparison
section, and four entirely new sections that didn't exist before, matching the updated doc
section by section:

- **Hero** — new H1 ("Agentic BI. Delegate the Work, Not Just the Question") and subtitle.
- **`TraditionalVsAgenticSection.tsx`** rewritten: new H2 ("From Asking Questions to
  Delegating the Work"), new Traditional BI / Agentic BI intro paragraphs, a new
  Goal→Plan→Retrieve→Analyze→Verify→Answer flow row, and the comparison table's 6 rows
  replaced with the new content (the H3 "Traditional BI vs. Agentic BI" now sits as a
  sub-heading directly above the table, not as the section's main H2 like before).
- **Two new diagrams**, real design assets rather than hand-recreated SVG — the doc
  explicitly said to use these specific files, so they're used as-is: a governance/agent/
  harness structure diagram (`AgenticStructureSection.tsx`) and a user-question-flow
  architecture diagram (`GovernanceSection.tsx`). Both initially shrank to fit on mobile via
  `object-contain`, which made the dense text illegible — caught this and switched both to
  the same horizontal-scroll-with-swipe-hint pattern already used for the Architecture
  page's diagram, confirmed legible afterward.
- **`AgenticStructureSection.tsx`** (new) — "What Makes MPP BI Agentic": intro, the
  governance diagram, 6 cards (Model/Tools/Memory/Skills/Harness/Governance), closing bold
  line.
- **`GovernanceSection.tsx`** (new) — the flow diagram, then "Governance Is Part of How the
  Agent Works" with the "Schema tells the agent what the data looks like / Governance tells
  the agent what the data means" pull-quote.
- **`WhatAgenticBIDoesSection.tsx`** rewritten — "What You Can Delegate to Agentic BI", 5
  cards (Ask questions about your data / Investigate what changed / Explain the answer /
  Build what you need / Get help with MPP BI).
- **`EnterpriseAndIntegrationSection.tsx` removed entirely**, replaced by
  **`BuiltIntoMPPBISection.tsx`** (new) — "Built Into MPP BI", 4 cards (Same data
  environment / Same business definitions / No separate chatbot / Your choice of AI model).
  Confirmed this old component wasn't used anywhere else before deleting it.
- **`DataToActionSection.tsx`** (new) — "From Data to Action, In One Environment", with its
  own flow row (A question → the right data → analysis → an explanation → the next step).
- Closing CTA copy updated to "See Agentic BI in Action."
- SEO title/description updated to the doc's exact values, confirmed against the actual
  rendered `<title>` and `<meta name="description">` tags.

## Full mobile audit (not just incremental overflow checks)

Every mobile check up to this point was incremental — verified the specific thing just
built, not a fresh look at the whole site. This round was a genuine site-wide pass: 13
pages × 9 widths (320–1920px, covering small phones through wide desktop) for hard overflow,
plus actually reading through captured screenshots of every page rather than just checking
numbers. Found and fixed four real issues, none of which were hard overflow (the incremental
checks had already caught those) — these were things overflow checks can't catch:

- **Missing swipe-hint pattern in 3 more places.** `ComparisonTable.tsx` (Home page's main
  MPP BI vs. Tableau vs. Power BI table) and the dynamic comparison-table renderer used in
  blog/case-study article content (`PortableTextRenderer.tsx`) both had genuinely scrollable
  tables with no indication they were scrollable — same class of bug fixed on other tables
  much earlier, just hadn't reached these two yet. Found by searching every component with
  `overflow-x-auto` for the hint text (case-insensitively — an earlier case-sensitive grep
  had produced a false "missing" reading on two tables that actually already had it).
- **A real icon-collapse bug**: the arrow icon on the Pricing page's "Talk to Sales About
  Perpetual Licensing" button had computed `width: 0` on mobile — the flex layout was
  squeezing it to nothing because it lacked `flex-shrink-0`. Confirmed via
  `getBoundingClientRect()`, not just a visual guess. Checked every other `ArrowRight` icon
  on the site for the same missing property (15 files) and fixed all of them, not just the
  one that happened to be visibly broken.
- **A follow-up bug the icon fix revealed**: once the icon could no longer shrink, it started
  rendering outside the button's visible box, because the button's actual content (long
  nowrap text + icon + gap) no longer fit the fixed-width grid cell it lived in. Root-caused
  with `getBoundingClientRect()` comparisons (confirmed `svgOutsideBtn: true`), then fixed
  properly — the button now wraps its text and goes full-width on mobile instead of forcing
  a single line into too little space — rather than papering over it with a narrower icon or
  smaller font.
- **A cramped headline**: the Case Studies page's H1 ("Real Results From Real Deployments")
  wrapped to 4 tight lines at the same `text-5xl` mobile size that works fine for every other
  page's shorter headline. Not a hard bug (confirmed no actual overflow), but genuinely
  looked bad — reduced the mobile base size one step, no change to tablet/desktop.
- Also nudged one link's icon alignment (`items-center` → `items-start` on the Benefits
  page's "Want the technical breakdown?" link) so the arrow doesn't float next to the middle
  line when the text wraps to three lines on mobile — invisible on desktop, where that text
  never wraps.

One methodology note: several early screenshots in this pass showed sections with large
empty gaps or faded-out content. Investigated one specifically with a much longer wait time
before re-screenshotting and confirmed it was a `whileInView` animation simply not having
triggered yet when the screenshot was taken — not a real layout bug. Worth remembering next
time a screenshot looks broken: rule out animation timing before concluding it's a genuine
issue.

Final verification after all fixes: 13 pages × 9 widths (320/360/375/390/414/428/768/
1440/1920) = 117 combinations, zero overflow, zero console errors. Also actually clicked
through the fixed elements rather than trusting the screenshots alone — the mobile nav's
Features sub-items, the "Talk to Sales" button, and the "technical breakdown" link all
genuinely navigate where they should.

## About Us page rewritten with new approved content

Full content replacement per the new doc, not just a tweak:

- **Hero** — completely new copy: H1 is now the literal "About Us" (previously "Where MPP BI
  Comes From"), with a new tagline and a longer product-description paragraph that wasn't
  there before.
- **Team section** — stripped down to match the new content exactly: removed the industries
  chips and intro paragraph that used to sit above the two bios (not in the new content, so
  not kept). Added the missing "earned a PhD in Artificial Intelligence in 2001" detail to
  Sergei's bio.
- **Two new sections added**: "What Does MPP BI Do?" (3 cards — Dashboards and Reporting, A
  Data-Centric Tool, Build Your Own Data Products) and "Why Does Your Team Need MPP BI?"
  (Visibility for Leadership, plus a "Data Infrastructure and Agentic Workflows" block with
  its own two-part breakdown).

- **Mission section rewritten** — the old version had a long two-paragraph narrative and a
  pull-quote; the new content is one short paragraph, so replaced it entirely rather than
  trying to preserve the old framing.
- **Company timeline section removed from this page** — the new content doesn't include a
  timeline at all, and the one specific fact from it (2001) is now folded into Sergei's bio
  instead. `CompanyTimelineSection.tsx` is left on disk unused rather than deleted, in case
  it's wanted elsewhere.
- Final CTA ("Ready to See It for Yourself?") is unchanged — the new content's wording for
  it matched what was already there exactly.
- **Not implemented**: the doc's note to Gevorg about all images being WebP (not JPG/PNG)
  and adding `<link rel="preload">` for hero images. This page has no raster hero image to
  preload — its hero is text-only — so there's nothing here to act on. Flagging this note
  in case it's meant to apply to other pages with actual hero images.

### Also fixed: a real security issue unrelated to this content change

Running a fresh `npm install` this session surfaced 3 new vulnerabilities that didn't exist
at the last build — including a **critical** Next.js unauthenticated RCE
([GHSA-p293-qw3h-jr36](https://github.com/advisories/GHSA-p293-qw3h-jr36), affecting
16.0.0–16.3.2) disclosed since then. The installed version (16.3.0) was in the affected
range. Bumped to `^16.3.4` in `package.json`, reinstalled clean, and confirmed `npm audit`
now reports 0 vulnerabilities before rebuilding. Rebuilt and reran the full regression sweep
afterward to confirm the version bump didn't break anything — same result, all clean.

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
  MissionSection.tsx          → mission statement (short version — no longer has a pull quote)
  WhatMPPBIDoesSection.tsx     → "What Does MPP BI Do?" — 3 cards
  WhyNeedMPPBISection.tsx      → "Why Does Your Team Need MPP BI?" — leadership visibility +
                                data infrastructure/agentic workflows breakdown
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

## Blog / Sanity CMS integration

### codeBlock fix (crash fix, latest round)

A new `codeBlock` object type was added to the Studio schema (for code snippets inside
articles), but nothing on the frontend knew about it yet — any post using it crashed with
`[@portabletext/react] Unknown block type "codeBlock"`. Fixed:

- Added the `CodeBlock` type to `lib/sanity-queries.ts`.
- Added a renderer in `components/PortableTextRenderer.tsx` — dark code card, language
  label, and a working copy-to-clipboard button (`components/CopyCodeButton.tsx`, a tiny
  `'use client'` island — the only client-side piece on an otherwise fully server-rendered
  page, same approach as the topic-switching tags).
- Verified past just compiling: rendered a real code block, clicked Copy with clipboard
  permissions explicitly granted in the test, and confirmed the exact code text actually
  landed in the clipboard, not just that the button showed a "Copied" state.
- Also noticed and removed a stale comment: `postType.ts`'s `content` field now references
  registered object types directly (`{type: 'statisticsBlock'}` etc.) instead of re-inlining
  them, so the `comparisonTable`/`columns` ambiguity flagged in an earlier round is
  resolved on the Studio side — no longer needs to be handled defensively on the frontend.

**Follow-up: real syntax highlighting.** The initial fix rendered code as plain monospace
text with no coloring — functional, but not what "rendered" turned out to mean. Added
`prism-react-renderer` (2 small dependencies, no DOM requirement, confirmed 0 new
vulnerabilities) and rewrote `CodeBlockRenderer` to use it. Chose this over heavier options
like `next-sanity`-style bundles specifically because it tokenizes in plain JS with no
browser APIs, so it runs directly in the Server Component — confirmed the page that uses it
still builds as a static page, not a client component, so this stays consistent with the
"needs to be server-rendered" requirement from earlier. Verified all 8 supported languages
(TypeScript, JavaScript, Python, SQL, JSON, HTML, CSS, Bash) render with real token
coloring, not just checked that the build passes — a temporary test route with one real
snippet per language, screenshotted, then deleted before committing.

**Follow-up #2: HTML needed to actually *run*, not just display as colored text.**
Clarified requirement: for `codeBlock` entries where `language === 'html'`, the markup
needs to render and execute live on the page — not source code on display. First pass used
a sandboxed `<iframe srcDoc={code}>` — safe, but visually reads as a boxed-off "embed"
(fixed height, its own scroll area, doesn't inherit the page's fonts). The other 7
languages still get the syntax-highlighted source display from the fix above — this only
ever changes behavior for HTML specifically.

**Follow-up #3: wanted it to appear natively on the page, not boxed off.** Replaced the
iframe with direct DOM injection instead (`components/HtmlEmbed.tsx`, a small `'use client'`
component using `dangerouslySetInnerHTML`). This makes the content flow naturally with the
rest of the article — no fixed height, no border, no scrollbar — but gives up the iframe's
isolation as a deliberate trade, made explicit to the user before building it: browsers
don't execute `<script>` tags added via `innerHTML` by default, so this manually replaces
each one with a freshly created `<script>` element (the standard workaround, and the reason
this needs to be a client component — the swap has to happen after the DOM node exists in
the browser). Any CSS in the block now also applies page-wide rather than staying scoped to
the block, since it's no longer isolated in its own document — acceptable here since this
content comes from trusted Studio editors, not public input, but worth knowing.

Verified concretely, not assumed: rebuilt the same interactive test embed (styled card, a
button wired to an `onclick` handler that both updates its own text and sets a `window`
property) and confirmed three separate things — zero `<iframe>` elements exist in the page
(genuinely inline now), clicking the button actually changed the DOM text (the script
workaround really executes), and the block's `<style>` rule's computed background color
matched exactly what was authored (CSS genuinely applies, not just visually eyeballed).

### Table of Contents (built from article data, not a DOM-scraping script)

The request came with a working Tilda snippet (`document.querySelectorAll("h2")` +
`DOMContentLoaded`), but recommended against using it as-is: that query scans the *entire
page*, not just the article body, so on a page with any other H2 elsewhere it would pick up
headings that have nothing to do with the article. It also only runs client-side, after the
page has already loaded.

Built as a real feature instead, using data we already have server-side before the page
even renders:

- **`lib/slugify.ts`** — one shared slug function, used both to set each `<h2>`'s real
  `id` (in `PortableTextRenderer.tsx`) and to generate the Table of Contents' links (in
  `components/TableOfContents.tsx`). Same source of truth for both, so they can't drift out
  of sync with each other.
- **`components/TableOfContents.tsx`** — a plain Server Component (no `'use client'`, no
  DOM access at all). Takes the article's own `content` array as a prop, filters for `h2`
  blocks, and renders links — correctly scoped to just that article by construction, not by
  hoping a DOM query doesn't accidentally match something else. Only renders when there are
  2+ headings (a contents list for one heading isn't useful).
- Wired into both `/blog/[slug]` and `/case-studies/[slug]`, right before the article body.
- `scroll-mt-24` added to `h2` so jumping to a heading doesn't tuck it behind the fixed nav.

Verified concretely: built a 3-heading test article (one title with `&` and `!` in it, to
stress-test the slugifier), and directly compared the TOC's generated `href`s against the
actual rendered heading `id`s in the DOM — exact match, not just visually similar. Then
clicked a link and confirmed a genuine scroll happened (checked `window.scrollY` before and
after, with a viewport small enough to force real scrolling, since an earlier check with a
tall viewport showed `scrollY: 0` simply because that whole short test page already fit on
screen — worth ruling out before treating a zero as a bug).

### Team photos + policy pages

- **`TeamSection.tsx`** now shows real photos (`public/team/sergei-shestakov.webp`,
  `public/team/peter-bilzerian.webp`) instead of the colored-initials placeholders, in the
  order given (Sergei first, Peter second). Both source images were already square
  (240×240), so they crop cleanly into the existing circular frame with no distortion.
- **Three new legal pages**, each `noindex, nofollow` (confirmed by checking the actual
  rendered `<meta name="robots">` tag, not just setting the field and assuming it worked):
  `/cookie-policy`, `/privacy-policy`, `/terms-of-use`. Share one layout
  (`components/LegalPageLayout.tsx`) and a `.legal-content` CSS block in `globals.css` for
  consistent heading/list/link styling without hand-repeating Tailwind classes on every
  paragraph. Effective date set to today (09/11/2026) per the source docs' own instruction
  to fill it in "when published."
- **Footer fixed**: the Privacy Policy / Terms / Cookie Policy links already existed in the
  bottom bar, but pointed at placeholder paths (`/privacy`, `/terms`, `/cookies`) that never
  had real pages behind them — same dead-link pattern as Blog and Case Studies before their
  own rounds. Updated to the real paths, and corrected the "Terms of Service" label to
  "Terms of Use" to match the actual page title.
- **Not silently fixed:** the Terms of Use source document's own section numbering skips
  from "5. Limitation of Liability" straight to "7. Changes to These Terms" — there's no
  section 6 anywhere in the source. Preserved the numbering exactly as given rather than
  renumbering it myself, since silently changing numbering in a legal document is a content
  decision, not a formatting one — flagging it instead so it can be fixed at the source if
  it's actually a drafting error.

### Canonical URL fix

Checked whether canonical links actually work for external URLs — they did, confirmed by
building a test route with `alternates.canonical` set to a different domain entirely and
inspecting the actual rendered `<link rel="canonical">` tag in the HTML output, not just
reading the code and assuming Next.js handles it correctly.

While checking that, found a real bug in the empty case: the schema's own field
description promises *"leave empty to use the [post's] URL as the canonical URL,"* but the
code was `post.canonicalUrl ? {canonical: ...} : undefined` — meaning an empty field
produced **no canonical tag at all**, not a self-referencing one as documented. Fixed:

- Added `metadataBase` to `app/layout.tsx` (was entirely missing before) — required for a
  relative canonical path to resolve into a real absolute URL rather than Next.js silently
  defaulting to `localhost`. Reads `NEXT_PUBLIC_SITE_URL` if set, otherwise falls back to
  the Vercel URL this project has been using — **set the env var once a final production
  domain exists**, since the fallback is a placeholder, not guaranteed to be the real one.
- Both `/blog/[slug]` and `/case-studies/[slug]` now do
  `post.canonicalUrl || \`/blog/${post.slug}\`` — external URL if set, otherwise a real
  self-referencing canonical, matching what the schema field already told editors would
  happen.

Verified both branches concretely, not just one: built two test routes, one with an
external `canonicalUrl` (confirmed the tag renders that exact external URL unchanged) and
one with an empty `canonicalUrl` (confirmed it now renders
`https://<site>/blog/<slug>` instead of omitting the tag).


### Case Studies — new content type, built from scratch (latest round)

No case study schema existed in Sanity at all before this round — unlike the blog, where
the schema came first and the frontend was built to match it, this one only had a content
example from the main company site to work from. So this round included **designing and
writing the Studio schema itself**, not just the frontend:

- **`sanity-schema-additions/`** (delivered as a separate zip, not part of this repo — it
  belongs in `studio-mpp-website`, a different project): two new schema files
  (`caseStudyType.ts`, `industryType.ts`) plus an updated `index.ts` registering them.
  `industryType.ts` mirrors `categoryType.ts` exactly, so case studies can be filtered by
  industry the same way blog posts are filtered by category. `caseStudyType.ts`'s fields
  map directly to the reference content's structure: `description` and `challenges` are
  each an array of short text blocks (matching the reference's plain bullet-point
  sections), `solutions` is an array of `{title, description}` objects (matching the
  reference's titled solution cards), plus an optional rich-content field for anything
  beyond those three fixed sections, reusing the same block types as blog posts (including
  the new `codeBlock`). See `sanity-schema-additions/README.md` for exactly where each file
  goes and how to apply it.
- **`app/case-studies/page.tsx`** and **`app/case-studies/[slug]/page.tsx`** — deliberately
  structured the same way as the blog (industry filter tabs via search params, meta row
  placed right after the hero image, "Other Case Studies" section with the same
  tag-switching pattern as "Other Articles"), per the request to keep the structure
  consistent between the two. Same server-rendering approach throughout — no client
  component except the copy button mentioned above.
- **Nav fixed**: "Case Studies" was pointing at `/resources/case-studies`, a placeholder
  that was never actually built — same dead-link situation the blog was in before. Updated
  to `/case-studies` in both `Navigation.tsx` and `Footer.tsx`.
- **Verified with the user's actual reference content**, not generic placeholder text:
  built a temporary test route using the real "Text Analytics: Natural Language Processing"
  example from the request (bank, sentiment analysis, all four solution points) to confirm
  the layout handles real content correctly, not just short lorem-ipsum-style test strings.
  Deleted before committing, same as every other test route in this project.

### Nav trim + blog index restructuring (latest round)

- **Resources dropdown trimmed**, in both `Navigation.tsx` and `Footer.tsx`: removed
  "Demos" and "Documentation" (dead links, no pages behind them yet), and merged
  "Research" into "Blog" rather than keeping it separate — Resources is now just
  Architecture, Case Studies, Blog.
- **Blog listing page restructured** to match the pattern from the main company site
  (mpp-insights.com/blog, provided as a reference): added a category filter row ("All" +
  each category from Sanity) above the post grid, and moved each card's category label
  from plain text above the title to a badge overlaid on the image itself (top-left,
  translucent dark pill), matching the reference's visual style. Card aspect ratio changed
  to 1.3:1 to match the reference too (was 16:9).
- **Filtering is a real navigation**, same pattern as the post page's topic tags:
  clicking a category link goes to `/blog?category=<slug>`, which re-renders the page
  server-side with `getPostsByCategory` instead of `getAllPosts`. No client component, no
  local state — consistent with the "must be server-rendered" requirement from earlier.
- **Verified without live Sanity access** (same limitation as before — this sandbox can't
  reach `api.sanity.io`): built a temporary route with fabricated categories and posts,
  clicked a category tag, confirmed the URL changed to `?category=data-engineering` and
  the grid genuinely filtered down to the one matching post — not just checked that it
  compiled. Deleted before committing; never shipped.

### Post page layout + "Other Articles" (latest round)

- **Author, category, and date moved** to a single row directly below the hero image
  (previously they sat inside the dark hero, above the image). The hero itself now only
  has the back-link and the title.
- **New "Other Articles" section**, replacing the old curated `relatedPosts` section:
  category tags across the top (the current post's own category is active by default,
  styled dark/filled vs. the others' outline style), and the 3 most recent posts in
  whichever category is selected underneath. Clicking a tag is a real link to
  `/blog/[slug]?topic=<category-slug>#other-articles` — the whole section re-renders
  server-side with the new selection. No client component, no `useState`, no
  client-side fetch for the switching itself.
- **On the "is this server-rendered?" question**: yes, and it was already server-rendered
  before this round too — `/blog` and `/blog/[slug]` are async Server Components
  (`generateStaticParams` + `revalidate = 60`, i.e. SSG with ISR), not client components
  fetching via `useEffect`. The new tag-switching interaction was deliberately built the
  same way (URL search param + Server Component re-render) rather than reaching for a
  client component with local state, specifically to keep the whole feature server-rendered
  end to end, not just the initial page load.
- **Verified without live Sanity access**: since this sandbox can't reach `api.sanity.io`
  at all (see below), the new layout and the tag-switching were verified against a
  temporary route with fabricated data — actually clicked a different topic tag and
  confirmed the URL changed to `?topic=product-updates#other-articles` and the active tag
  visually updated, proving it's a real navigation/re-render rather than assumed to work.
  That temporary route was deleted before committing; it never shipped.

`/blog` was a dead link since the site was built; it's now wired to a real Sanity Studio
(`studio-mpp-website`, project ID `cpyjkfcl`, dataset `production`, both hardcoded as
defaults in `lib/sanity.ts` since they're not secrets — still overridable via
`NEXT_PUBLIC_SANITY_PROJECT_ID`/`NEXT_PUBLIC_SANITY_DATASET` env vars if that ever changes).

**What's built:**

- `lib/sanity.ts` — the client (`@sanity/client` + `@sanity/image-url`, not `next-sanity` —
  see the dependency note below).
- `lib/sanity-queries.ts` — GROQ queries and types for posts, authors, categories: full post
  list, featured posts, posts by category, all slugs (for static generation), single post by
  slug with related posts expanded.
- `components/PortableTextRenderer.tsx` — renders the `content` field's Portable Text array,
  styled to match the rest of the site, with custom renderers for all 4 of the schema's
  custom block types (`articleImage`, `statisticsBlock`, `comparisonTable`, `ctaBlock`), not
  just plain paragraphs/headings.
- `app/blog/page.tsx` — listing page, card grid, `revalidate = 60` (ISR — new posts show up
  within a minute of publishing, no redeploy needed).
- `app/blog/[slug]/page.tsx` — post page with `generateStaticParams` for known slugs at
  build time, still revalidates, real `generateMetadata` (SEO title/description/canonical
  pulled from the post's own SEO fields when set).
- `next.config.ts` — added `cdn.sanity.io` to `images.remotePatterns`, required for
  `next/image` to serve Sanity-hosted images at all.
- Both pages fail **gracefully**, not silently or with a crash, if Sanity can't be reached:
  wrapped in try/catch, `/blog` shows an explicit "couldn't load posts" message rather than
  a blank page or a 500, and `generateStaticParams` falls back to an empty array (fully
  dynamic rendering) rather than failing the whole site's build.

**A schema inconsistency worth fixing on the Studio side, not something I changed
unilaterally:** `postType.ts`'s `content` field inlines its own copies of 4 block-type
definitions, but they don't match the separately-registered versions in
`schemaTypes/objects/*.ts` that `schemaTypes/index.ts` also registers. Most notably, the
inline `comparisonTable` has a `columns` field that the standalone `objects/comparisonTable.ts`
doesn't define at all — so depending on which definition Sanity actually uses for that
field (this is a genuine ambiguity in how the schema is wired, not something I should
guess at and "fix" by editing your Studio config), documents may or may not have a `columns`
value. The frontend types and renderer here handle `columns` as optional so nothing breaks
either way, but the Studio schema itself would benefit from consolidating to one definition
(ideally `postType.ts` referencing `{type: 'articleImage'}` etc. instead of re-inlining).

**Dependency choice matters here:** the natural first choice, `next-sanity`, pulls in the
*entire Sanity Studio CLI toolchain* as a transitive dependency (for its Visual Editing /
Presentation features) — this alone added 14 vulnerabilities (2 high) via `adm-zip`,
`js-yaml`, and `smol-toml` deep in that chain, none of which we need for just reading
published content. Used `@sanity/client` + `@sanity/image-url` + `@portabletext/react`
directly instead: 399 packages instead of 1,246, confirmed 0 vulnerabilities on a clean
install. If Visual Editing/draft previews are wanted later, that's a deliberate
reintroduction of that dependency weight, not a default.

**A real limitation of this sandbox, not the code:** this environment's network egress
blocks `api.sanity.io` entirely (confirmed directly — a raw `curl` to it gets rejected at
the proxy level), so I could not verify live data actually renders correctly end-to-end.
What I *did* verify here: the build succeeds and handles that exact network failure
gracefully (tested by literally hitting this from inside the sandbox — `/blog` returns 200
with a clear "couldn't load posts" message, not a crash or a hang; `/blog/[nonexistent-slug]`
correctly 404s), and the full 9-page × 4-breakpoint regression sweep is clean. The actual
live rendering — real posts, real images from `cdn.sanity.io`, the custom Portable Text
blocks — needs to be checked once this is deployed on Vercel (or run locally on a machine
with normal internet access), since that's the first environment in this whole process with
real access to the Sanity API.

Still needed before the actual blog pages can be built: the Studio folder (zipped, for the
schema field names) and the project ID + dataset name.

## Em-dashes removed site-wide

Every em-dash (—) across the codebase replaced with natural phrasing (periods, commas,
colons, "and"/"so", or restructured clauses) rather than a mechanical find-replace — each
one was rewritten by hand to read naturally in context, not just stripped out.

Two things worth knowing about how this was actually verified:

- A source-text grep alone wasn't sufficient — three files (`SecuritySection.tsx`,
  `LegacyProblemSection.tsx`, `BigComparisonSection.tsx`) used the JavaScript unicode escape
  `\u2014` directly in string literals rather than the literal `—` character, so they didn't
  show up in a plain text search but still rendered as real em-dashes in the browser. Found
  by checking actual rendered page text (`document.body.innerText`) in a real browser across
  every page, not just grepping the source.
- Final verification counted em-dash occurrences in the live rendered DOM on all 8 pages —
  zero everywhere, confirmed twice (once before finding the `\u2014` escapes, once after
  fixing them, to make sure the fix actually worked rather than assuming it did).

Left untouched: en-dashes (–) used for numeric ranges like "2x–12x" — those are a different
character and a different, legitimate typographic convention, not what was asked to be
removed. Also left untouched: the `─` box-drawing characters used for decorative separators
in a couple of code comments — visually similar but a completely different Unicode
character, unrelated to em-dashes.

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
