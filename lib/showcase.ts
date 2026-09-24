// What the agent built in MPP BI: the home gallery and /showcase. The Edge lab projects
// use public data; the report uses our sample hotel dataset (600 bookings, 2024–2025).
// Each ask is the real brief, condensed to one sentence.
// Every number here was measured on the build; before → after is the agent's
// performance round (it renders the page, reads requests, rows, main-thread time
// and memory, and fixes what they show).

export type Shot = { src: string; width: number; height: number; alt: string; caption?: string }

export type Example = {
  slug: string
  title: string
  /** The heading on /showcase when it differs from the title. */
  heading?: string
  /** Small label above the title: where the data came from. */
  kicker: string
  /** One line under the image in the home gallery. */
  caption: string
  /** Where the home gallery crops the image (CSS object-position). */
  focus?: string
  asked: string
  did: string[]
  numbers: { value: string; label: string }[]
  shot: Shot
  /** A second page the agent built, shown smaller with a line about it. */
  more?: { shot: Shot; text: string }
  /** Two results side by side instead of one large screenshot. */
  pair?: [Shot, Shot]
}

const wide = { width: 1600, height: 925 }
const half = { width: 1200, height: 694 }
const report = { width: 1200, height: 582 }

export const examples: Example[] = [
  {
    slug: 'galaxy',
    title: 'Galaxy of worlds',
    kicker: 'NASA Exoplanet Archive',
    caption: '6,366 exoplanets as a galaxy you can fly into.',
    asked: 'Make a sunburst of every known exoplanet shaped like a spiral galaxy, with a stats page and a scroll-driven story of how they were found.',
    did: [
      'Drew a sunburst shaped like a galaxy: discovery method at the core, then the facility, then its systems.',
      'Made each facility something you fly into, to see every system and planet it found.',
      'Added a filter mode, in which a click on the galaxy filters the other panels instead.',
      'Wrote a stats page and a scroll-driven story, “How we found them”.',
    ],
    numbers: [
      { value: '6,366', label: 'confirmed planets' },
      { value: '1.46 MB → 63 KB', label: 'loaded per view, before and after the performance round' },
    ],
    shot: {
      src: '/showcase/galaxy.webp',
      ...wide,
      alt: 'Galaxy of worlds: a sunburst of 6,366 exoplanets by discovery method, facility and system, next to panels for discoveries per year, planet sizes and temperatures',
    },
  },
  {
    slug: 'globe',
    title: 'Shaking Earth',
    kicker: 'USGS Earthquake Hazards Program',
    caption: '10,718 earthquakes in 30 days on a 3D globe.',
    asked: 'Put every earthquake of the last 30 days on a 3D globe, sized by magnitude and colored by depth, with a stats page next to it.',
    did: [
      'Drew a 3D globe in the browser with every quake as a glowing beam: height is magnitude, color is depth.',
      'Added a daily timeline you can replay.',
      'Made a click on a region or a quake filter the page to that region.',
      'Wrote a stats page whose sentences are computed from the data, such as “one every 4.0 minutes”.',
    ],
    numbers: [
      { value: '10,718', label: 'earthquakes of every magnitude' },
      { value: '3.5 MB → 0.8 MB', label: 'loaded, before and after the performance round' },
      { value: '2.3 s → 0.17 s', label: 'the page blocked the browser while loading' },
    ],
    shot: {
      src: '/showcase/globe.webp',
      ...wide,
      alt: 'Shaking Earth: a 3D globe with earthquakes as glowing beams and a daily timeline, next to the most active regions and the strongest quakes',
    },
  },
  {
    slug: 'climate',
    title: 'Climate pulse',
    kicker: 'Our World in Data',
    caption: 'CO₂ since 1950, with a live carbon clock.',
    asked: 'Make a full-screen stats wall of a few huge numbers about global CO₂ over an animated background, every number from the data, and a page on who emits it.',
    did: [
      'Built a dark stats wall with an animated aurora and numbers that count up: 38.6 Gt in 2024, 4.73 t per person, +69.8% since 1990.',
      'Added a carbon clock that counts the CO₂ emitted since you opened the page.',
      'Built a second page, “Who emits”, shown below.',
    ],
    numbers: [
      { value: '1950–2024', label: 'CO₂ from fossil fuels and industry' },
      { value: '17,982 → 974', label: 'rows loaded, before and after the performance round' },
      { value: '1.27 MB → 99 KB', label: 'data loaded' },
    ],
    shot: {
      src: '/showcase/pulse.webp',
      ...wide,
      alt: 'Climate pulse: 38.6 Gt of CO₂ in 2024 in large type over an aurora, with per-person, change-since-1990 and top-emitter figures',
    },
    more: {
      shot: {
        src: '/showcase/who-emits.webp',
        ...half,
        alt: 'Who emits: headline figures above a treemap of countries by 2024 CO₂ emissions, grouped by continent',
      },
      text: '“Who emits”: a treemap of countries you can replay from 1950 to 2024, bubbles for emissions per person against the total, and the fuel mix.',
    },
  },
  {
    slug: 'market',
    title: 'Market track',
    kicker: 'NASDAQ screener snapshot, Sep 24, 2026',
    caption: '3,500 listed companies on one circular track.',
    asked: 'Show the whole NASDAQ as a circular track, with each sector’s arc a treemap of its companies sized by market cap and colored by today’s change.',
    did: [
      'Laid the market out as a circular track: each sector is an arc, and each arc is a treemap of its companies.',
      'Sized companies by market cap and colored them by the day’s change.',
      'Made a click on a sector zoom it around the ring.',
    ],
    numbers: [
      { value: '3,500', label: 'listed companies' },
      { value: '718 KB → 184 KB', label: 'loaded by the sector stats, before and after the performance round' },
    ],
    shot: {
      src: '/showcase/nasdaq-track.webp',
      ...wide,
      alt: 'Market track: a ring of sectors, each a treemap of companies sized by market cap and colored by the day’s change, next to a table of the largest companies',
    },
  },
  {
    slug: 'oval',
    title: 'The oval',
    kicker: 'nascaR.data, Cup Series results 1949–2026',
    caption: 'Every Cup Series season since 1949 on a speedway.',
    asked: 'Draw a NASCAR oval whose track surface is itself a treemap of the current season’s field, with a season picker to replay history.',
    did: [
      'Made the racing surface a treemap of the season’s field: manufacturer, team, driver, with area by points.',
      'Put the standings in the infield and one pit stall per race on pit road, in the winner’s colors.',
      'Added a season picker that replays history back to 1949, and a Legends page.',
      'Moved rankings and career totals into small pre-aggregated tables in the database.',
    ],
    numbers: [
      { value: '101,230', label: 'rows of race results' },
      { value: '55,732 → 2,251', label: 'rows loaded, before and after the performance round' },
      { value: '3.37 MB → 129 KB', label: 'data loaded' },
      { value: '3.2 s → 0.21 s', label: 'slowest query' },
    ],
    shot: {
      src: '/showcase/nascar-oval.webp',
      ...wide,
      alt: 'The oval: a speedway whose racing surface is a treemap of the season’s drivers, with the standings in the infield and one pit stall per race',
    },
    more: {
      shot: {
        src: '/showcase/nascar-legends.webp',
        ...half,
        alt: 'Legends: career wins of the 25 winningest drivers since 1949, and every 50-win driver’s career on one timeline',
      },
      text: '“Legends”: career wins across every season since 1949, under the headline “Richard Petty’s 200 wins still top the list — 95 more than David Pearson.”',
    },
  },
  {
    slug: 'raw',
    title: 'From a raw feed to a dashboard',
    kicker: 'USGS feed of M2.5+ earthquakes · DeepSeek V4 Flash',
    caption: 'A small model took a raw feed to a dashboard.',
    asked: 'Download the raw USGS feed of M2.5+ earthquakes from the last 30 days, clean it with a script, import it and build a dashboard from it.',
    did: [
      'Downloaded the raw GeoJSON feed.',
      'Wrote a script in its sandbox to clean it, then imported the result.',
      'Built the data model and an 8-panel dashboard.',
    ],
    numbers: [
      { value: '24 min', label: 'for the whole pipeline' },
      { value: '8', label: 'panels' },
      { value: 'DeepSeek V4 Flash', label: 'in the product’s chat' },
    ],
    shot: {
      src: '/showcase/raw-feed.webp',
      ...wide,
      alt: 'An 8-panel earthquake dashboard: counts, activity by day, the most active regions, magnitude against depth and the strongest quakes',
    },
  },
  {
    slug: 'report',
    title: 'Report from a sentence',
    heading: 'Every number traceable',
    kicker: 'Sample hotel dataset, 600 bookings 2024–2025',
    caption: 'An annual report on a sample hotel dataset.',
    focus: '14% 0%',
    asked: 'Build a 2025 annual report page on the hotel data without writing any code, with every number a declared query.',
    did: [
      'Filled the report kit, a reviewed report page, by configuration only. Neither model wrote code.',
      'Declared every number as a query: hover a number to see the query behind it.',
      'Listed every query in a Sources section. The page gets all its numbers in one request.',
    ],
    numbers: [
      { value: '10.7 min', label: 'Claude Opus, through the MCP server' },
      { value: '5.8 min', label: 'DeepSeek V4 Flash, a small model, in the product’s chat' },
    ],
    shot: {
      src: '/showcase/report-opus.webp',
      ...report,
      alt: 'A hotel annual report filled by Claude Opus: a headline sentence, four key figures with the prior year, and section tabs',
    },
    pair: [
      {
        src: '/showcase/report-opus.webp',
        ...report,
        alt: 'A hotel annual report filled by Claude Opus: a headline sentence, four key figures with the prior year, and section tabs',
        caption: 'Claude Opus: 10.7 minutes.',
      },
      {
        src: '/showcase/report-deepseek.webp',
        ...report,
        alt: 'The same report filled by DeepSeek V4 Flash: a headline sentence, four key figures with the prior year, and section tabs',
        caption: 'DeepSeek V4 Flash: 5.8 minutes.',
      },
    ],
  },
]

/** The six shown on the home page. */
export const gallery = ['galaxy', 'globe', 'climate', 'market', 'oval', 'report'].map(
  (slug) => examples.find((e) => e.slug === slug)!,
)

/** The performance round, before → after. */
export const speedups = [
  { page: 'The oval', measure: 'Rows loaded', before: '55,732', after: '2,251' },
  { page: 'The oval', measure: 'Data loaded', before: '3.37 MB', after: '129 KB' },
  { page: 'The oval', measure: 'Slowest query', before: '3.2 s', after: '0.21 s' },
  { page: 'Climate pulse', measure: 'Rows loaded', before: '17,982', after: '974' },
  { page: 'Climate pulse', measure: 'Data loaded', before: '1.27 MB', after: '99 KB' },
  { page: 'Galaxy of worlds', measure: 'Data loaded per view', before: '1.46 MB', after: '63 KB' },
  { page: 'Shaking Earth', measure: 'Data loaded', before: '3.5 MB', after: '0.8 MB' },
  { page: 'Shaking Earth', measure: 'Browser blocked while loading', before: '2.3 s', after: '0.17 s' },
  { page: 'Market track', measure: 'Data for the sector stats', before: '718 KB', after: '184 KB' },
]
