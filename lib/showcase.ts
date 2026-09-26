// What the agent built in MPP BI: the home teaser and /showcase.
//
// /showcase tells what the agents did and what the platform made possible, not how fast or
// cheap each build was: five use cases with the most striking custom work, every case with the
// question it answers and how it was solved, the mechanisms behind them, the data they ran on,
// and what grounds the work (the model, checks, traceability, permissions). Numbers appear only
// where the number is the story. The exoplanet galaxy is left out on purpose: its render doesn't
// hold up.
//
// The Edge lab projects use public data; the report kit and the reference samples use our sample
// hotel dataset (600 bookings, 2024–2025). Europe in charts rebuilds a published data report; the
// site never shows or names the report's owner, and its screenshots show only our dashboard.
// Each ask is the real brief, condensed; each step comes from the run's own report (web-res
// docs/viz/WORKLOG.md, the notes' Edge lab page and bi-mcp/run-edge-*.jsonl).

export type Shot = { src: string; width: number; height: number; alt: string }

export type Mechanism =
  | 'custom-visual'
  | 'custom-page'
  | 'config-page'
  | 'spec-chart'
  | 'built-in'
  | 'clicks'
  | 'cube'
  | 'chat'
  | 'preview'

export const mechanisms: Record<Mechanism, { label: string; text: string }> = {
  'custom-visual': {
    label: 'Custom visual',
    text: 'A chart no menu has, written by the agent in React with SVG, canvas or three.js, published into the atlas and used like any other chart.',
  },
  'custom-page': {
    label: 'Page with slots',
    text: 'A page layout that replaces a dashboard’s body and holds real dashboard items, which stay editable in the product.',
  },
  'spec-chart': {
    label: 'Spec chart',
    text: 'Heatmaps, dumbbells, annotated trends and more, declared as a JSON spec for our chart package and edited in the chart editor.',
  },
  clicks: { label: 'Click actions', text: 'A click on a mark filters the page, zooms in or opens more.' },
  cube: {
    label: 'Cube logic',
    text: 'Derived fields, window functions for ranks, indexes and running totals, and small pre-aggregated cubes for heavy history.',
  },
  'config-page': { label: 'Config-only kit', text: 'A reviewed page filled by settings alone. No code to review.' },
  'built-in': { label: 'Built-in charts', text: 'The product’s own charts, set up by the agent.' },
  chat: { label: 'Product chat', text: 'Built in MPP BI’s own chat, with its sandbox, by a small model.' },
  preview: { label: 'In the lab', text: 'A preview that is not in the released product yet.' },
}


export type Hero = {
  slug: string
  title: string
  /** Where the data came from. */
  kicker: string
  /** One line that sells it. */
  hook: string
  /** The question it answers for someone looking at it. */
  question: string
  /** The big picture: a fresh dpr-2 shot from the showcase stand. */
  shot: Shot
  asked: string
  did: string[]
  uses: Mechanism[]
}

export type Case = {
  slug: string
  title: string
  data: string
  thumb: Shot
  /** CSS object-position for the thumbnail. */
  focus?: string
  question: string
  how: string
  uses: Mechanism[]
  /** Where the card leads: a use case on /showcase or another page. */
  href?: string
  /** Which model built it, when it isn't Claude Opus over the MCP server. */
  by?: string
}

const wide = { width: 1600, height: 925 }
const half = { width: 1200, height: 694 }
const hero = { width: 2304, height: 1333 }
const armeniaHero = { width: 2304, height: 1280 }

export const heroes: Hero[] = [
  {
    slug: 'armenia',
    title: 'Armenia',
    kicker: 'Kontur Population, OpenStreetMap, geoBoundaries, World Bank',
    hook: 'A whole country in 3,823 glowing 3D hexagons, Yerevan in 175 m cells, and the numbers behind its rise.',
    question: 'Where do Armenia’s people live, down to a city block, and how fast is the country rising?',
    shot: {
      src: '/showcase/hero-armenia.webp',
      ...armeniaHero,
      alt: 'Armenia in hexagons: the country as 3D hexagon towers in basalt and apricot tuff, Mount Ararat across the border, under the headline “Half of Armenia lives on 1.0% of its land”',
    },
    asked:
      'Build the most beautiful, genuinely insightful project on Armenia: the whole country in hexagons, Yerevan up close, and the numbers behind its rise.',
    did: [
      'Took on population cells, OpenStreetMap buildings and places, province and district outlines, and World Bank series, each its own file.',
      'Built cubes that join them: places land on Yerevan’s 175 m grid, population is spread down to those cells, and the hexagon geometry lives in the cube, so no map tiles are needed.',
      'Drew the country as 3D hexagon towers in three.js with a fly-in to each province, and Yerevan as a hexagon map with four layers and a district scoreboard.',
      'Wrote three linked pages, the last a report on the rise with a heatmap spec chart.',
      'Then read our design guidance and reworked the look: a palette from basalt, tuff and apricot, findings computed per hexagon (seven in ten Armenians live within 100 km of Mount Ararat), and a wave that rises from Ararat.',
      'Checked every page in a browser at two widths and at double density, with hovers and clicks.',
    ],
    uses: ['custom-visual', 'custom-page', 'spec-chart', 'cube'],
  },
  {
    slug: 'globe',
    title: 'Shaking Earth',
    kicker: 'USGS Earthquake Hazards Program',
    hook: 'Every earthquake of the last 30 days, 10,718 of them, as beams of light on a 3D globe.',
    question: 'Where did the Earth shake this month, how hard and how deep?',
    shot: {
      src: '/showcase/hero-globe.webp',
      ...hero,
      alt: 'Shaking Earth: a 3D globe with earthquakes as glowing beams and a daily timeline, next to the most active regions and the strongest quakes',
    },
    asked: 'Put every earthquake of the last 30 days on a 3D globe, sized by magnitude and colored by depth, with a stats page next to it.',
    did: [
      'Imported the events and built a cube that parses the region out of each place name and adds day, hour, depth and magnitude bands.',
      'Wrote a three.js globe with the continents drawn in code: every quake a beam, height for magnitude, colour for depth, rings for the M6+ events.',
      'Added a daily timeline you can replay, and made a click on a quake filter the page to its region.',
      'Wrote a stats page whose sentences are query results, such as “one every 4.0 minutes”, with a day × hour heatmap.',
      'Looked at the result, then moved the strongest-quakes list into the database and removed a texture blur that held the page up while loading.',
    ],
    uses: ['custom-visual', 'custom-page', 'spec-chart', 'clicks'],
  },
  {
    slug: 'market',
    title: 'Market track',
    kicker: 'NASDAQ screener snapshot, Sep 24, 2026',
    hook: 'The whole NASDAQ on one lap: every sector an arc, every arc a treemap of its companies.',
    question: 'How is the market doing today, and which giants move it?',
    shot: {
      src: '/showcase/hero-market.webp',
      ...hero,
      alt: 'Market track: a ring of sectors, each a treemap of companies sized by market cap and colored by the day’s change, with the NASDAQ total in the centre and a table of the largest companies',
    },
    asked:
      'Show the whole NASDAQ as a circular track, with each sector’s arc a treemap of its companies sized by market cap and colored by today’s change.',
    did: [
      'Imported the snapshot and built a cube that adds each company’s cap change, advancer and decliner flags, cap tiers and move bands.',
      'Invented the chart in SVG and React: sectors as arcs, each a treemap whose tile area is exactly proportional to market cap, with the smallest companies merged into “+N others”.',
      'Gave it click modes: zoom a sector around the ring, or filter the table beside it.',
      'Built a sector stats page: a scoreboard and a concentration curve, with spec charts for sector moves, gainers, losers and size against move.',
      'Checked it in a browser at two widths and in its zoomed state, then moved the scoreboard’s sums into the database.',
    ],
    uses: ['custom-visual', 'spec-chart', 'clicks', 'cube'],
  },
  {
    slug: 'oval',
    title: 'The oval',
    kicker: 'nascaR.data, Cup Series results 1949–2026',
    hook: 'A speedway whose racing surface is a treemap of the season’s field, with 78 seasons to replay.',
    question: 'Who is winning this season, and how does it compare with every season since 1949?',
    shot: {
      src: '/showcase/hero-oval.webp',
      ...hero,
      alt: 'The oval: a speedway whose racing surface is a treemap of the season’s drivers, with the season leader and standings in the infield and one pit stall per race',
    },
    asked: 'Draw a NASCAR oval whose track surface is itself a treemap of the current season’s field, with a season picker to replay history.',
    did: [
      'Imported 101,230 race results. When the first import turned car “07” into 7, it re-imported them as text and typed the columns in the cube.',
      'Turned season rank, main manufacturer and career wins into ordinary fields with window functions in the cube.',
      'Drew the speedway in SVG: the racing surface a treemap of make, team and driver, the standings in the infield, a pit stall per race in the winner’s colours.',
      'Wrote one page for three dashboards, the oval, season stats and Legends, with a season picker that replays history back to 1949.',
      'Moved rankings and career totals into small pre-aggregated cubes, so the page reads a few thousand rows instead of tens of thousands.',
    ],
    uses: ['custom-visual', 'custom-page', 'spec-chart', 'cube'],
  },
  {
    slug: 'climate',
    title: 'Climate pulse',
    kicker: 'Our World in Data, CO₂ 1950–2024',
    hook: 'The world’s CO₂ as a wall of numbers over a live aurora, with a clock that counts from the moment you arrive.',
    question: 'How much CO₂ does the world emit, and who emits it?',
    shot: {
      src: '/showcase/hero-pulse.webp',
      ...hero,
      alt: 'Climate pulse: 38.6 Gt of CO₂ in 2024 in large type over an aurora, with per-person, change-since-1990, top-emitter and cumulative figures, each over a sparkline, and a live carbon clock',
    },
    asked:
      'Make a full-screen stats wall of a few huge numbers about global CO₂ over an animated background, every number from the data, and a page on who emits it.',
    did: [
      'Built a cube that marks each row as a country or an aggregate, maps countries to continents and computes the latest year and 1990 values, so no year is typed in.',
      'Took world totals only from the World row and ranked the 218 countries alone, so no tonne is counted twice.',
      'Wrote the stats wall as a page: an aurora drawn on the GPU with three.js, five figures that count up over sparklines, and a live carbon clock.',
      'Built a second page, “Who emits”: a treemap of continents and countries that replays 1950–2024, bubbles, a dumbbell and the fuel mix, all filtered by pills and clicks.',
      'Made the charts follow their box when the page or the side panel changes width.',
    ],
    uses: ['custom-page', 'custom-visual', 'spec-chart', 'clicks', 'cube'],
  },
]

export const cases: Case[] = [
  {
    slug: 'armenia',
    title: 'Armenia',
    data: 'Kontur Population, OpenStreetMap, geoBoundaries, World Bank',
    thumb: { src: '/showcase/hero-armenia.webp', ...armeniaHero, alt: '' },
    question: 'How do I map where people live, down to a city block, with no map tiles?',
    how: 'The country as 3D hexagons in three.js, Yerevan in 175 m hexagons with four layers, and a report on the rise. The joins and the geometry live in the cube.',
    uses: ['custom-visual', 'custom-page', 'cube'],
    href: '#armenia',
  },
  {
    slug: 'globe',
    title: 'Shaking Earth',
    data: 'USGS, 10,718 earthquakes in 30 days',
    thumb: { src: '/showcase/globe.webp', ...wide, alt: '' },
    question: 'How do I show thousands of events in space and in time?',
    how: 'A WebGL globe with every quake as a beam, a daily timeline you can replay, and clicks that filter the charts beside it.',
    uses: ['custom-visual', 'built-in', 'clicks'],
    href: '#globe',
  },
  {
    slug: 'quake-stats',
    title: 'The last 30 days',
    data: 'USGS, the same earthquakes',
    thumb: { src: '/showcase/quake-stats.webp', width: 1000, height: 625, alt: '' },
    question: 'Can the headline be computed from the data instead of typed?',
    how: 'A report page where every sentence is a query result, such as “one every 4.0 minutes” and “240 were not earthquakes”, with a day × hour heatmap and the M6+ events marked.',
    uses: ['custom-page', 'spec-chart'],
  },
  {
    slug: 'market',
    title: 'Market track',
    data: 'NASDAQ screener, 3,500 companies',
    thumb: { src: '/showcase/nasdaq-track.webp', ...wide, alt: '' },
    question: 'How do I show a whole market, its sectors and its giants on one screen?',
    how: 'An invented chart form: a ring of sectors, each a treemap of its companies with area true to market cap. A click zooms a sector around the ring or filters the table beside it.',
    uses: ['custom-visual', 'clicks'],
    href: '#market',
  },
  {
    slug: 'sector-stats',
    title: 'Sector stats',
    data: 'NASDAQ screener, the same snapshot',
    thumb: { src: '/showcase/nasdaq-stats.webp', width: 1000, height: 625, alt: '' },
    question: 'How concentrated is the market, and who moved today?',
    how: 'A scoreboard and a concentration curve as custom visuals, with spec charts for sector moves, the biggest gainers and losers, and size against move. Everything follows the filters.',
    uses: ['custom-visual', 'spec-chart', 'clicks'],
  },
  {
    slug: 'oval',
    title: 'The oval',
    data: 'nascaR.data, Cup Series results 1949–2026',
    thumb: { src: '/showcase/nascar-oval.webp', ...wide, alt: '' },
    question: 'How do I show this season’s standings and 78 seasons of history in one view?',
    how: 'The racing surface is a treemap of the field, with the standings in the infield, a pit stall per race and a season replay back to 1949. Season ranks are window functions in the cube.',
    uses: ['custom-visual', 'cube'],
    href: '#oval',
  },
  {
    slug: 'legends',
    title: 'Legends',
    data: 'nascaR.data, every Cup season since 1949',
    thumb: { src: '/showcase/nascar-legends.webp', ...half, alt: '' },
    question: 'Who are the greatest drivers, and when did they win?',
    how: 'A page with a headline computed from the data, “Richard Petty’s 200 wins still top the list — 95 more than David Pearson”, career wins and every 50-win career on one timeline.',
    uses: ['custom-page', 'cube'],
  },
  {
    slug: 'climate',
    title: 'Climate pulse',
    data: 'Our World in Data, CO₂ 1950–2024',
    thumb: { src: '/showcase/pulse.webp', ...wide, alt: '' },
    question: 'What is the one number about CO₂ everyone should see?',
    how: 'A full-screen wall of figures over an aurora drawn by shaders, each counting up over a sparkline, with a live carbon clock. Every number comes from the data.',
    uses: ['custom-page'],
    href: '#climate',
  },
  {
    slug: 'who-emits',
    title: 'Who emits',
    data: 'Our World in Data, 218 countries',
    thumb: { src: '/showcase/who-emits.webp', width: 1200, height: 806, alt: '' },
    question: 'Who emits the most, and how has that changed since 1950?',
    how: 'A continent → country treemap you can replay from 1950 to 2024, bubbles for emissions per person against the total, a dumbbell and the fuel mix. Pills and clicks filter everything.',
    uses: ['custom-page', 'custom-visual', 'clicks'],
  },
  {
    slug: 'europe',
    title: 'Europe in charts',
    data: 'World Bank WDI, 26 economies, 1960–2025',
    thumb: { src: '/showcase/europe.webp', ...wide, alt: '' },
    question: 'Can the agent rebuild a published report we like, inside our BI?',
    how: 'Card for card, with Armenia added: one custom visual draws all 15 cards in a page whose cards are real, editable dashboard items. Indexes and moving averages are window functions in the cube.',
    uses: ['custom-visual', 'custom-page', 'cube'],
  },
  {
    slug: 'raw',
    title: 'From a raw feed to a dashboard',
    data: 'USGS raw GeoJSON feed, M2.5+, 30 days',
    thumb: { src: '/showcase/raw-feed.webp', width: 1200, height: 818, alt: '' },
    question: 'Can a small model go from a raw feed to a dashboard on its own?',
    how: 'In the product’s chat, the model downloaded the feed, cleaned it with a Python script in its sandbox, imported it, modeled it and built an 8-panel dashboard.',
    uses: ['chat', 'built-in'],
    by: 'DeepSeek V4 Flash',
  },
  {
    slug: 'report',
    title: 'Report kit',
    data: 'Sample hotel dataset, 600 bookings',
    thumb: { src: '/showcase/report-opus.webp', width: 1200, height: 582, alt: '' },
    focus: '14% 0%',
    question: 'Can a small model produce a polished report without writing code?',
    how: 'A reviewed report page filled by configuration only: every number a declared query you can hover to trace, charts in slots, every text editable in the layout settings. Claude Opus and DeepSeek V4 Flash both filled it without writing code.',
    uses: ['config-page', 'spec-chart'],
  },
  {
    slug: 'samples',
    title: 'Hotel samples',
    data: 'Sample hotel dataset, 600 bookings',
    thumb: { src: '/showcase/samples.webp', width: 1000, height: 624, alt: '' },
    question: 'Which way of customizing MPP BI fits my case?',
    how: 'Our reference atlas: one dashboard per mechanism, each pushed to its maximum. Chart settings, click actions, a theme, a chart package, a markdown story, a page with slots, an LPE layout, a shell override and spec charts.',
    uses: ['built-in', 'spec-chart', 'custom-page', 'clicks'],
  },
]

/** Data of any complexity: the data, the problem it posed, how the platform handled it. */
export const dataCases: { data: string; problem: string; handled: string; project: string }[] = [
  {
    data: 'A raw GeoJSON feed from USGS',
    problem: 'Not a table: nested features, with the region buried in a free-text place name.',
    handled:
      'In the product’s chat the model downloaded it into its sandbox, wrote a Python script that made one clean row per quake and parsed the region, checked the result and imported the file.',
    project: 'From a raw feed to a dashboard',
  },
  {
    data: 'Car numbers such as “07” and “00” in 101,230 race results',
    problem: 'They are codes, not numbers, and the first import turned “07” into 7.',
    handled:
      'The agent re-imported the column as text and typed the rest in the cube. The import now spots leading zeros by itself and keeps such codes as text.',
    project: 'The oval',
  },
  {
    data: 'World population: 8,045,311,447',
    problem: 'Past the 32-bit range: the first import stored the column as a 32-bit integer and 8 billion came back empty.',
    handled: 'The import now samples the tail rows too and stores such columns as 64-bit numbers.',
    project: 'Climate pulse',
  },
  {
    data: 'CO₂ for 218 countries, mixed in one column with “World” and other aggregate rows',
    problem: 'Add it up naively and the same tonnes are counted more than once.',
    handled:
      'The cube tags each row as a country or an aggregate and adds continents by ISO code. World totals come from the World row; rankings use countries only.',
    project: 'Climate pulse, Who emits',
  },
  {
    data: 'Population in H3 cells, with OpenStreetMap buildings and places',
    problem: 'Separate files at different resolutions: people per cell, places as points, districts as polygons.',
    handled: 'Cubes join the uploaded files: places land on Yerevan’s 175 m grid, and population is spread down to those cells.',
    project: 'Armenia',
  },
  {
    data: 'Geometry: hexagon corners, province and district outlines',
    problem: 'No map tiles on the installation, and components can’t fetch them from the internet.',
    handled: 'The geometry lives in the cube: one cell’s corners reused for every hexagon, outlines from geoBoundaries, drawn in three.js and SVG.',
    project: 'Armenia',
  },
  {
    data: 'World Bank series in long format: 26 economies, 13 indicators',
    problem: 'One row per economy, indicator and year, while the charts need an index to 1992, moving averages and the latest values.',
    handled: 'Window functions in the cube compute the index, the moving average and the latest year. The browser only groups rows into lines.',
    project: 'Europe in charts',
  },
  {
    data: 'Ranks, shares and running totals',
    problem: 'Computed in the browser they pull every raw row, and a total over the whole cube ignored the season filter: one season showed all-time winners.',
    handled: 'Window functions in the cube: a rank and a main manufacturer per season, career wins, and shares of the filtered total. They become ordinary fields.',
    project: 'The oval',
  },
  {
    data: 'Seventy-eight seasons of history behind one page',
    problem: 'Rankings and career totals computed from raw results on every load made the page slow.',
    handled: 'Small pre-aggregated cubes (driver by season, career, career seasons, race finishes) hold the heavy work, computed once and queried cheaply.',
    project: 'The oval',
  },
]
