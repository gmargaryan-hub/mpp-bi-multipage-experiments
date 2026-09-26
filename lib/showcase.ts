// What the agent built in MPP BI: the home teaser and /showcase.
//
// /showcase has three parts: five hero use cases with the most striking custom plots, every
// case with the problem it answers, how it was solved and what it measured, and the data they
// ran on. The Edge lab projects use public data; the report kit and the reference samples use
// our sample hotel dataset (600 bookings, 2024–2025). Europe in charts rebuilds a published
// data report; the site never shows or names the report's owner, and its screenshots are
// cropped to our dashboard only.
//
// Each ask is the real brief, condensed. Every number was measured on the build; before → after
// is the agent's performance round (it renders the page, reads requests, rows, main-thread time
// and memory, and fixes what they show). Sources: web-res docs/viz/WORKLOG.md and the notes'
// Edge lab page and run reports.

export type Shot = { src: string; width: number; height: number; alt: string }

export type Stat = { value: string; label: string }

export type Hero = {
  slug: string
  title: string
  /** Where the data came from. */
  kicker: string
  /** One line that sells it. */
  hook: string
  /** The question it answers for someone looking at it. */
  question: string
  numbers: Stat[]
  /** The big picture: a fresh dpr-2 shot from the showcase stand. */
  shot: Shot
  /** The home teaser's picture. */
  thumb: Shot
  asked: string
  did: string[]
  /** Before → after rounds on the same dashboards. */
  rounds?: { intro: string; items: { title: string; before: Shot; after: Shot; text: string }[] }
}

export type Mechanism =
  | 'custom-visual'
  | 'custom-page'
  | 'config-page'
  | 'spec-chart'
  | 'built-in'
  | 'window'
  | 'pre-aggregated'
  | 'clicks'
  | 'chat'
  | 'preview'

export const mechanisms: Record<Mechanism, { label: string; text: string }> = {
  'custom-visual': { label: 'Custom visual', text: 'A chart the agent writes in React (SVG, canvas or WebGL) and publishes as a package.' },
  'custom-page': { label: 'Custom page', text: 'A page layout that replaces a dashboard’s body and holds real dashboard items in slots.' },
  'config-page': { label: 'Config-only page', text: 'A reviewed page, a kit, filled by settings alone. No code.' },
  'spec-chart': { label: 'Spec chart', text: 'A chart declared as a JSON spec for our chart package, edited in the chart editor.' },
  'built-in': { label: 'Built-in charts', text: 'The product’s own charts, set up by the agent.' },
  window: { label: 'Window functions', text: 'Ranks, shares, indexes and running totals computed in the cube’s SQL.' },
  'pre-aggregated': { label: 'Pre-aggregated cube', text: 'Heavy derived data computed once into a small cube and queried cheaply.' },
  clicks: { label: 'Click filters', text: 'A click on a mark filters the rest of the page.' },
  chat: { label: 'Product chat', text: 'Built in MPP BI’s own chat, with its sandbox, by a small model.' },
  preview: { label: 'In the lab', text: 'A preview that is not in the released product yet.' },
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
  result: string[]
  /** Where the card leads: a hero on /showcase or another page. */
  href?: string
  /** Which model built it, when it isn't Claude Opus over the MCP server. */
  by?: string
}

const wide = { width: 1600, height: 925 }
const half = { width: 1200, height: 694 }
const hero = { width: 2304, height: 1333 }
const armenia = { width: 1200, height: 749 }

export const heroes: Hero[] = [
  {
    slug: 'galaxy',
    title: 'Galaxy of worlds',
    kicker: 'NASA Exoplanet Archive',
    hook: 'All 6,366 known exoplanets as a spiral galaxy you can fly into.',
    question: 'How were the worlds beyond our solar system found, and by which telescopes?',
    numbers: [
      { value: '6,366', label: 'confirmed planets' },
      { value: '1.46 MB → 63 KB', label: 'loaded per view, before and after the performance round' },
      { value: '17.0 min · $13.48', label: 'the first build' },
    ],
    shot: {
      src: '/showcase/hero-galaxy.webp',
      ...hero,
      alt: 'Galaxy of worlds: a sunburst of 6,366 exoplanets shaped like a spiral galaxy, by discovery method, facility and system, next to panels for discoveries per year, planet sizes and temperatures',
    },
    thumb: { src: '/showcase/galaxy.webp', ...wide, alt: '' },
    asked:
      'Make a sunburst of every known exoplanet shaped like a spiral galaxy, with a stats page and a scroll-driven story of how they were found.',
    did: [
      'Drew a sunburst shaped like a galaxy: discovery method at the core, then the facility, then its systems.',
      'Made each facility something you fly into, to see every system and planet it found.',
      'Added a filter mode, in which a click on the galaxy filters the other panels instead.',
      'Wrote a stats page and a scroll-driven story, “How we found them”.',
    ],
  },
  {
    slug: 'globe',
    title: 'Shaking Earth',
    kicker: 'USGS Earthquake Hazards Program',
    hook: 'Every earthquake of the last 30 days, 10,718 of them, as beams of light on a 3D globe.',
    question: 'Where did the Earth shake this month, how hard and how deep?',
    numbers: [
      { value: '10,718', label: 'earthquakes of every magnitude' },
      { value: '2.3 s → 0.17 s', label: 'the page blocked the browser while loading' },
      { value: '3.5 MB → 0.8 MB', label: 'loaded, before and after the performance round' },
    ],
    shot: {
      src: '/showcase/hero-globe.webp',
      ...hero,
      alt: 'Shaking Earth: a 3D globe with earthquakes as glowing beams and a daily timeline, next to the most active regions and the strongest quakes',
    },
    thumb: { src: '/showcase/globe.webp', ...wide, alt: '' },
    asked: 'Put every earthquake of the last 30 days on a 3D globe, sized by magnitude and colored by depth, with a stats page next to it.',
    did: [
      'Drew a 3D globe in the browser with every quake as a glowing beam: height is magnitude, color is depth.',
      'Drew the continents in code, since a component loads no images from the internet.',
      'Added a daily timeline you can replay, and made a click on a region or a quake filter the page.',
      'Wrote a stats page whose sentences are computed from the data, such as “one every 4.0 minutes”.',
    ],
  },
  {
    slug: 'market',
    title: 'Market track',
    kicker: 'NASDAQ screener snapshot, Sep 24, 2026',
    hook: 'The whole NASDAQ on one lap: every sector an arc, every arc a treemap of its companies.',
    question: 'How is the market doing today, and which giants move it?',
    numbers: [
      { value: '3,500', label: 'listed companies, area true to market cap' },
      { value: '744 KB → 413 KB', label: 'loaded by the track, before and after the performance round' },
      { value: '17.6 min · $5.90', label: 'the first build' },
    ],
    shot: {
      src: '/showcase/hero-market.webp',
      ...hero,
      alt: 'Market track: a ring of sectors, each a treemap of companies sized by market cap and colored by the day’s change, with $58.22T in the centre and a table of the largest companies',
    },
    thumb: { src: '/showcase/nasdaq-track.webp', ...wide, alt: '' },
    asked:
      'Show the whole NASDAQ as a circular track, with each sector’s arc a treemap of its companies sized by market cap and colored by today’s change.',
    did: [
      'Laid the market out as a circular track: each sector is an arc, and each arc is a treemap of its companies.',
      'Kept the geometry honest: tile area is proportional to market cap, and the smallest companies merge into “+N others”.',
      'Sized companies by market cap and colored them by the day’s change.',
      'Made a click on a sector zoom it around the ring; in filter mode, a click filters the table beside it instead.',
    ],
  },
  {
    slug: 'oval',
    title: 'The oval',
    kicker: 'nascaR.data, Cup Series results 1949–2026',
    hook: 'A speedway whose racing surface is a treemap of the season’s field.',
    question: 'Who is winning this season, and how does it compare with 78 seasons of history?',
    numbers: [
      { value: '101,230', label: 'rows of race results' },
      { value: '55,732 → 2,251', label: 'rows loaded, before and after the performance round' },
      { value: '3.2 s → 0.21 s', label: 'slowest query' },
    ],
    shot: {
      src: '/showcase/hero-oval.webp',
      ...hero,
      alt: 'The oval: a speedway whose racing surface is a treemap of the season’s drivers, with the season leader and standings in the infield and one pit stall per race',
    },
    thumb: { src: '/showcase/nascar-oval.webp', ...wide, alt: '' },
    asked: 'Draw a NASCAR oval whose track surface is itself a treemap of the current season’s field, with a season picker to replay history.',
    did: [
      'Made the racing surface a treemap of the season’s field: manufacturer, team, driver, with area by points.',
      'Put the standings in the infield and one pit stall per race on pit road, in the winner’s colors.',
      'Added a season picker that replays history back to 1949, and a Legends page.',
      'Moved rankings and career totals into small pre-aggregated tables in the database.',
    ],
  },
  {
    slug: 'armenia',
    title: 'Armenia',
    kicker: 'Kontur Population, OpenStreetMap, geoBoundaries, World Bank',
    hook: 'A country in 3D hexagons, then redesigned from its own stone and light.',
    question: 'Where do Armenia’s people live, down to a city block, and how fast is the country rising?',
    numbers: [
      { value: '12,708', label: 'inhabited hexagons; Yerevan in 175 m cells' },
      { value: '31 min + 47 min', label: 'first pass, then the design round' },
      { value: 'Unchanged', label: 'requests and data loaded after the design round; idle CPU 0' },
    ],
    shot: {
      src: '/showcase/hero-armenia.webp',
      width: 2304,
      height: 1234,
      alt: 'Armenia in hexagons: the country as 3D hexagon towers in basalt and apricot tuff, Mount Ararat across the border, under the headline “Half of Armenia lives on 1.0% of its land”',
    },
    thumb: { src: '/showcase/armenia-17-after.webp', ...armenia, alt: '' },
    asked:
      'Build the most beautiful, genuinely insightful project on Armenia: the whole country in hexagons, Yerevan up close, and the numbers behind its rise. Then read our new design guidance and refactor it into the design only Armenia could have.',
    did: [
      'First pass: the country as 3D hexagons in three.js with a fly-in to each province, Yerevan in 2,167 hexagons of 175 m, and a report on the rise. Correct and cheap, but generic: a dark dashboard with a neon colour ramp.',
      'Refactored with the guidance, keeping the cubes, the dashboard items and the settings.',
      'Took the palette from the place: basalt, pink and apricot tuff, pomegranate, the blue of Lake Sevan. It stays a setting.',
      'Led with findings computed from the data: seven in ten Armenians live within 100 km of Mount Ararat; half of Yerevan’s cafés, restaurants and bars are within 1.2 km of Republic Square.',
      'Made the motion explain: the country rises in a wave spreading from Ararat, and the report replays 1995–2025 and marks the years that bent the line.',
    ],
    rounds: {
      intro:
        'The same agent and the same data. On the left the first pass; on the right the refactor after it read our design guidance.',
      items: [
        {
          title: 'Armenia in hexagons',
          before: { src: '/showcase/armenia-17-before.webp', ...armenia, alt: 'First pass: a purple night map of Armenia in hexagons with a side rail of province bars' },
          after: {
            src: '/showcase/armenia-17-after.webp',
            ...armenia,
            alt: 'After the guidance: Armenia as hexagon towers in basalt and apricot tuff, Mount Ararat standing across the border',
          },
          text: 'A generic purple night map became basalt and tuff that warms to apricot, with Ararat standing across the border. The new finding is computed per hexagon: seven in ten Armenians, 1,991,468 people, live within 100 km of the mountain.',
        },
        {
          title: 'Yerevan, up close',
          before: { src: '/showcase/armenia-18-before.webp', ...armenia, alt: 'First pass: Yerevan in 175 m hexagons in pink, with a district scoreboard' },
          after: {
            src: '/showcase/armenia-18-after.webp',
            ...armenia,
            alt: 'After the guidance: Yerevan in tuff-coloured hexagons with rings around Republic Square and a bearing to Mount Ararat',
          },
          text: 'The headline became a finding about distance: half of Yerevan’s cafés, restaurants and bars are within 1.2 km of Republic Square, while half its people live more than 4.9 km out. The layers follow the day, from morning errands to night.',
        },
        {
          title: 'Armenia rising',
          before: { src: '/showcase/armenia-19-before.webp', ...armenia, alt: 'First pass: a dark report on Armenia’s growth with four headline figures and a line chart' },
          after: {
            src: '/showcase/armenia-19-after.webp',
            ...armenia,
            alt: 'After the guidance: a daylight report in limestone and apricot with a replayable line of GDP per person and the years that bent it marked',
          },
          text: 'A dark report became a daylight document in limestone and apricot. The hero chart replays 1995–2025 and marks the years that bent the line: 2009, 2020 and 2022.',
        },
      ],
    },
  },
]

export const cases: Case[] = [
  {
    slug: 'galaxy',
    title: 'Galaxy of worlds',
    data: 'NASA Exoplanet Archive, 6,366 planets',
    thumb: { src: '/showcase/galaxy.webp', ...wide, alt: '' },
    question: 'How do I let people explore a big hierarchy, from the whole down to one item?',
    how: 'A sunburst shaped like a galaxy, drawn on canvas: method, facility, system, planet. Fly into a facility, or switch to a mode where a click filters the other panels. A stats page and a scroll-driven story sit beside it.',
    uses: ['custom-visual', 'custom-page', 'clicks'],
    result: ['Built in 17.0 min · $13.48', '1.46 MB → 63 KB per view: planets load only for the facility you fly into'],
    href: '#galaxy',
  },
  {
    slug: 'globe',
    title: 'Shaking Earth',
    data: 'USGS, 10,718 earthquakes in 30 days',
    thumb: { src: '/showcase/globe.webp', ...wide, alt: '' },
    question: 'How do I show thousands of events in space and in time?',
    how: 'A WebGL globe in three.js with every quake as a beam (height is magnitude, colour is depth), a daily timeline you can replay, and clicks that filter the built-in charts beside it.',
    uses: ['custom-visual', 'built-in', 'clicks'],
    result: ['Built in 26.8 min · $8.42', '3.5 MB → 0.8 MB loaded; the browser blocked 2.3 s → 0.17 s'],
    href: '#globe',
  },
  {
    slug: 'quake-stats',
    title: 'The last 30 days',
    data: 'USGS, the same 10,718 earthquakes',
    thumb: { src: '/showcase/quake-stats.webp', width: 1000, height: 625, alt: '' },
    question: 'Can the headline be computed from the data instead of typed?',
    how: 'A report page where every sentence is a query result, such as “one every 4.0 minutes” and “240 were not earthquakes”, with a day × hour heatmap and the M6+ events marked.',
    uses: ['custom-page', 'spec-chart'],
    result: ['13,213 → 2,336 rows and 1.65 MB → 94 KB after the performance round', 'The strongest-quakes list: 1.5 MB sorted in the browser → 1.2 KB from the database'],
  },
  {
    slug: 'market',
    title: 'Market track',
    data: 'NASDAQ screener, 3,500 companies',
    thumb: { src: '/showcase/nasdaq-track.webp', ...wide, alt: '' },
    question: 'How do I show a whole market, its sectors and its giants on one screen?',
    how: 'An invented chart form in SVG and React: a ring of sectors, each a treemap of its companies with area true to market cap. A click zooms a sector around the ring, or in filter mode filters the table beside it.',
    uses: ['custom-visual', 'clicks'],
    result: ['Built in 17.6 min · $5.90', '744 KB → 413 KB loaded after the performance round'],
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
    result: ['10,491 → 3,880 rows and 718 KB → 184 KB after the performance round', 'The scoreboard reads 24 rows instead of 3,500'],
  },
  {
    slug: 'oval',
    title: 'The oval',
    data: 'nascaR.data, 101,230 race results, 1949–2026',
    thumb: { src: '/showcase/nascar-oval.webp', ...wide, alt: '' },
    question: 'How do I show this season’s standings and 78 seasons of history in one view?',
    how: 'The racing surface is a treemap of the field (manufacturer, team, driver), with the standings in the infield, a pit stall per race and a season replay back to 1949. Season ranks are window functions in the cube.',
    uses: ['custom-visual', 'window', 'pre-aggregated'],
    result: ['Built in 39.3 min · $12.18', '55,732 → 2,251 rows, 3.37 MB → 129 KB; slowest query 3.2 s → 0.21 s'],
    href: '#oval',
  },
  {
    slug: 'legends',
    title: 'Legends',
    data: 'nascaR.data, every Cup season since 1949',
    thumb: { src: '/showcase/nascar-legends.webp', ...half, alt: '' },
    question: 'Who are the greatest drivers, and when did they win?',
    how: 'A page with a headline computed from the data, “Richard Petty’s 200 wins still top the list — 95 more than David Pearson”, career wins and every 50-win career on one timeline. Career totals come from small pre-aggregated cubes.',
    uses: ['custom-page', 'pre-aggregated'],
    result: ['Slowest query 2.7 s → 0.26 s after the performance round'],
  },
  {
    slug: 'armenia',
    title: 'Armenia',
    data: 'Kontur Population, OpenStreetMap, geoBoundaries, World Bank',
    thumb: { src: '/showcase/armenia-17-after.webp', ...armenia, alt: '' },
    question: 'How do I map where people live, down to a city block, with no map tiles?',
    how: 'Three dashboards: the country as 3D hexagons in three.js, Yerevan in 175 m hexagons with four layers, and a report on the rise. Joins and geometry live in the cube. A second round with our design guidance reworked the look.',
    uses: ['custom-visual', 'custom-page', 'spec-chart'],
    result: ['31 min, then 47 min for the design round', 'The design round added no requests and no data; idle CPU stayed 0'],
    href: '#armenia',
  },
  {
    slug: 'europe',
    title: 'Europe in charts',
    data: 'World Bank WDI, 26 economies, 1960–2025',
    thumb: { src: '/showcase/europe.webp', ...wide, alt: '' },
    question: 'Can the agent rebuild a published report we like, inside our BI?',
    how: 'A published data report rebuilt card for card, with Armenia added: 15 cards drawn by one custom visual with seven chart types, in a page whose cards are real, editable dashboard items. Indexes and moving averages are window functions in the cube.',
    uses: ['custom-visual', 'custom-page', 'window', 'pre-aggregated'],
    result: ['Built in 16.0 min · $5.12', '93 KB in 15 requests per load; 0 ms of CPU while idle'],
  },
  {
    slug: 'climate',
    title: 'Climate pulse',
    data: 'Our World in Data, CO₂ 1950–2024',
    thumb: { src: '/showcase/pulse.webp', ...wide, alt: '' },
    question: 'What is the one number about CO₂ everyone should see?',
    how: 'A full-screen stats wall over an aurora drawn by shaders, with figures that count up, a sparkline under each and a live carbon clock: 38.6 Gt in 2024, 1,223 tonnes every second. Every number comes from the data.',
    uses: ['custom-page'],
    result: ['Built with Who emits in 19.1 min · $5.87', 'Blocking while loading 178 → 76 ms after the performance round'],
  },
  {
    slug: 'who-emits',
    title: 'Who emits',
    data: 'Our World in Data, 218 countries',
    thumb: { src: '/showcase/who-emits.webp', ...half, alt: '' },
    question: 'Who emits the most, and how has that changed since 1950?',
    how: 'A continent → country treemap you can replay from 1950 to 2024, bubbles for emissions per person against the total, a dumbbell and the fuel mix. Pills and clicks filter everything.',
    uses: ['custom-page', 'custom-visual', 'pre-aggregated', 'clicks'],
    result: ['11 → 6 requests, 17,982 → 974 rows, 1.27 MB → 99 KB after the performance round'],
  },
  {
    slug: 'raw',
    title: 'From a raw feed to a dashboard',
    data: 'USGS raw GeoJSON feed, M2.5+, 30 days',
    thumb: { src: '/showcase/raw-feed.webp', ...wide, alt: '' },
    question: 'Can a small model go from a raw feed to a dashboard on its own?',
    how: 'In the product’s chat, the model downloaded the feed, cleaned it with a Python script in its sandbox, imported it, modeled it and built an 8-panel dashboard.',
    uses: ['chat', 'built-in'],
    result: ['24.1 min, 114 tool calls; 16 failed on arguments and all recovered', 'Correct data, plain charts'],
    by: 'DeepSeek V4 Flash',
  },
  {
    slug: 'report',
    title: 'Report kit',
    data: 'Sample hotel dataset, 600 bookings',
    thumb: { src: '/showcase/report-opus.webp', width: 1200, height: 582, alt: '' },
    focus: '14% 0%',
    question: 'Can a small model produce a polished report without writing code?',
    how: 'A reviewed report page filled by configuration only: every number a declared query you can hover to see, charts in slots, every text editable in the product’s layout settings.',
    uses: ['config-page', 'spec-chart'],
    result: [
      'Claude Opus: 10.7 min · $4.11, against 26 min · $8.14 when it wrote a report page as code',
      'DeepSeek V4 Flash in the product’s chat: 5.8 min',
    ],
  },
  {
    slug: 'samples',
    title: 'Hotel samples',
    data: 'Sample hotel dataset, 600 bookings',
    thumb: { src: '/showcase/samples.webp', width: 1000, height: 624, alt: '' },
    question: 'Which way of customizing MPP BI fits my case?',
    how: 'Our reference atlas: one dashboard per mechanism, each pushed to its maximum. Chart settings, click actions, a theme, a chart package, a markdown story, a page with slots, an LPE layout, a shell override and spec charts.',
    uses: ['built-in', 'spec-chart', 'custom-page', 'clicks'],
    result: ['Nine dashboards, one per mechanism, on the same data'],
  },
  {
    slug: 'values',
    title: 'Every number explains itself',
    data: 'All of the above, in our lab',
    thumb: { src: '/values-graph/pulse-edit.webp', width: 905, height: 944, alt: '' },
    focus: '0% 100%',
    question: 'Where does this number come from, and what moved it?',
    how: 'In edit mode every number shows the cube aggregates it is made of, its formula and what moved it between two periods, with no change to the code the agent wrote. Agents read the same graph.',
    uses: ['preview'],
    result: ['288 of 288 values equal the database’s own answer', '535 hovers on two atlases, 0 mismatches'],
    href: '/values-graph',
  },
]

/** Data of any complexity: the data, the problem it posed, how the platform handled it. */
export const dataCases: { data: string; problem: string; handled: string; project: string }[] = [
  {
    data: 'A raw GeoJSON feed from USGS: 2,020 quakes of M2.5+ over 30 days',
    problem: 'Not a table: nested features, with the region buried in a free-text place name.',
    handled:
      'In the product’s chat the model downloaded it into its sandbox, wrote a Python script that made one clean row per quake and parsed the region, checked the result and imported the file.',
    project: 'From a raw feed to a dashboard',
  },
  {
    data: '101,230 rows of NASCAR results, 1949–2026',
    problem: 'Car numbers such as “07” are codes, not numbers, and the first import turned them into 7.',
    handled:
      'The agent re-imported the column as text and typed the rest in the cube’s SQL. The import now spots leading zeros by itself and keeps such codes as text: “07” and “00” stay as they are.',
    project: 'The oval',
  },
  {
    data: 'World population: 8,045,311,447',
    problem: 'Past the 32-bit range. The first import stored the column as a 32-bit integer and 8 billion came back empty.',
    handled: 'The import now samples the tail rows and stores such columns as 64-bit numbers; 8,045,311,447 comes back intact.',
    project: 'Climate pulse',
  },
  {
    data: 'CO₂ for 218 countries, mixed in one column with “World” and other aggregate rows',
    problem: 'Add it up naively and the same tonnes are counted more than once.',
    handled:
      'The cube’s SQL tags each row as a country or an aggregate and adds continents by ISO code. World totals come from the World row; rankings use countries only.',
    project: 'Climate pulse, Who emits',
  },
  {
    data: 'Kontur Population H3 cells, 12,708 for Armenia, with OpenStreetMap buildings and places',
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
    data: 'World Bank series in long format: 26 economies, 13 indicators, 1960–2025',
    problem: 'One row per economy, indicator and year, while the charts need an index to 1992, moving averages and the latest values.',
    handled: 'Window functions in the cube compute the index, a 3-year moving average and the latest year. The browser only groups rows into lines.',
    project: 'Europe in charts',
  },
  {
    data: 'Ranks, shares and running totals',
    problem: 'Computed in the browser they pull every raw row, and a total over the whole cube ignored the season filter: one season showed all-time winners.',
    handled: 'Window functions in the cube: a rank and a main manufacturer per season, career wins, and shares of the filtered total. They become ordinary fields.',
    project: 'The oval',
  },
  {
    data: '55,732 rows the oval pulled on every load',
    problem: 'Rankings and career totals computed from raw results: 3.37 MB per load, and a slowest query of 3.2 s.',
    handled: 'Four small pre-aggregated cubes (driver by season, career, career seasons, race finishes): 2,251 rows, 129 KB, 0.21 s.',
    project: 'The oval',
  },
]

/** The home teaser: the five heroes. */
export const gallery = heroes

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
