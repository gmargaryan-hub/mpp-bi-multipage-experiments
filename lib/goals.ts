// The home page's examples: our top showcase projects as goals handed to the agent, what it
// did with them and what came out. Each goal is the real brief, shortened; each step is taken
// from the run's own report and tool trace (notes: bi-mcp/run-edge-*.jsonl and the Edge lab
// page); each number was measured on the build or in the agent's performance round.

import type { Shot, Stat } from '@/lib/showcase'

export type GoalStep = { text: string; tag: string }

export type Goal = {
  slug: string
  tab: string
  goal: string
  data: string
  steps: GoalStep[]
  facts: Stat[]
  /** Time and cost of the first build. */
  built: string
  shot: Shot
}

const hero = { width: 2304, height: 1333 }

export const goals: Goal[] = [
  {
    slug: 'galaxy',
    tab: 'Galaxy of worlds',
    goal: 'Make a sunburst of every known exoplanet shaped like a spiral galaxy, with a stats page and a scroll-driven story of how they were found.',
    data: 'NASA Exoplanet Archive, 6,366 planets',
    steps: [
      { text: 'Imported the archive and built a cube with derived fields: size class, temperature class, decade and a grouped discovery method.', tag: 'Import · cube SQL' },
      { text: 'Drew the galaxy on canvas: discovery method at the core, then the facility, then one spike per system. Fly into a facility to see its planets.', tag: 'Custom visual' },
      { text: 'Added a filter mode: a click on the galaxy filters the four panels docked beside it.', tag: 'Click filters' },
      { text: 'Built a stats page of records and charts, and a scroll-driven story, “How we found them”.', tag: 'Pages · spec charts' },
      { text: 'When the first version proved too heavy for real browsers, rewrote it to a budget: one 30 fps loop, at most 1,500 segments.', tag: 'Checked and fixed' },
      { text: 'In the performance round, loaded planets only for the facility you fly into.', tag: 'Performance' },
    ],
    facts: [
      { value: '6,366', label: 'planets, from the core to a single world' },
      { value: '1.46 MB → 63 KB', label: 'loaded per view after the performance round' },
      { value: '3 dashboards', label: 'the galaxy, a stats page and a scroll-driven story' },
    ],
    built: '17.0 min · $13.48',
    shot: {
      src: '/showcase/hero-galaxy.webp',
      ...hero,
      alt: 'Galaxy of worlds: a sunburst of 6,366 exoplanets shaped like a spiral galaxy, next to panels for discoveries per year, planet sizes and temperatures',
    },
  },
  {
    slug: 'globe',
    tab: 'Shaking Earth',
    goal: 'Put every earthquake of the last 30 days on a 3D globe, sized by magnitude and colored by depth, with a stats page next to it.',
    data: 'USGS Earthquake Hazards Program, 10,718 events',
    steps: [
      { text: 'Imported the events; the cube’s SQL parses the region out of the place name and adds day, hour, depth and magnitude bands.', tag: 'Import · cube SQL' },
      { text: 'Wrote a three.js globe with the continents drawn in code: every quake a beam, height for magnitude, colour for depth, rings for M6+.', tag: 'Custom visual' },
      { text: 'Made a click on a quake set the page’s region filter; the globe flies there and the charts beside it follow.', tag: 'Click filters' },
      { text: 'Wrote a stats page whose sentences are query results, such as “one every 4.0 minutes”, with a day × hour heatmap.', tag: 'Page · spec charts' },
      { text: 'In the performance round, moved the strongest-quakes list into the database and removed a texture blur that blocked loading.', tag: 'Performance' },
    ],
    facts: [
      { value: '10,718', label: 'earthquakes of every magnitude' },
      { value: '2.3 s → 0.17 s', label: 'the page blocked the browser while loading' },
      { value: '30 days', label: 'replayable day by day, the five M6+ quakes ringed' },
    ],
    built: '26.8 min · $8.42',
    shot: {
      src: '/showcase/hero-globe.webp',
      ...hero,
      alt: 'Shaking Earth: a 3D globe with earthquakes as glowing beams and a daily timeline, next to the most active regions and the strongest quakes',
    },
  },
  {
    slug: 'market',
    tab: 'Market track',
    goal: 'Show the whole NASDAQ as a circular track, each sector’s arc a treemap of its companies sized by market cap and colored by today’s change.',
    data: 'NASDAQ screener snapshot, Sep 24, 2026, 3,500 companies',
    steps: [
      { text: 'Imported the snapshot; the cube’s SQL adds each company’s cap change, advancer and decliner flags, cap tiers and move bands.', tag: 'Import · cube SQL' },
      { text: 'Invented the chart in SVG and React: sectors as arcs, each a treemap with area exactly proportional to market cap.', tag: 'Custom visual' },
      { text: 'Gave it click modes: zoom a sector around the ring, or filter the rest of the page.', tag: 'Click filters' },
      { text: 'Built a sector stats page: a scoreboard and a concentration curve, with spec charts for movers and size against move.', tag: 'Custom visuals · spec charts' },
      { text: 'Checked it at 1920 and 1366 px and zoomed; the performance round cut the scoreboard’s query from 3,500 rows to 24.', tag: 'Checked · performance' },
    ],
    facts: [
      { value: '3,500', label: 'companies on one lap, $58.22T in all' },
      { value: '744 KB → 413 KB', label: 'loaded by the track after the performance round' },
      { value: '13 sectors', label: 'around the ring, largest first' },
    ],
    built: '17.6 min · $5.90',
    shot: {
      src: '/showcase/hero-market.webp',
      ...hero,
      alt: 'Market track: a ring of sectors, each a treemap of companies sized by market cap and colored by the day’s change, next to a table of the largest companies',
    },
  },
  {
    slug: 'oval',
    tab: 'The oval',
    goal: 'Draw a NASCAR oval whose racing surface is a treemap of the season’s field, with a season picker to replay history.',
    data: 'nascaR.data, 101,230 Cup Series results, 1949–2026',
    steps: [
      { text: 'Imported the results. When the first import turned car “07” into 7, it re-imported them as text and typed the columns in the cube’s SQL.', tag: 'Import · cube SQL' },
      { text: 'Turned season rank, main manufacturer and career wins into fields with window functions in the cube.', tag: 'Window functions' },
      { text: 'Drew the speedway in SVG: the racing surface a treemap of make, team and driver, standings in the infield, a pit stall per race.', tag: 'Custom visual' },
      { text: 'Wrote one page for three dashboards, the oval, season stats and Legends, with a season picker that replays history to 1949.', tag: 'Page · spec charts' },
      { text: 'In the performance round, moved rankings and career totals into four small pre-aggregated cubes.', tag: 'Performance' },
    ],
    facts: [
      { value: '101,230', label: 'race results in one cube' },
      { value: '78 seasons', label: 'replayable on the oval, 1949 to 2026' },
      { value: '3 dashboards', label: 'the oval, season stats and Legends, from one page' },
    ],
    built: '39.3 min · $12.18',
    shot: {
      src: '/showcase/hero-oval.webp',
      ...hero,
      alt: 'The oval: a speedway whose racing surface is a treemap of the season’s drivers, with the season leader and standings in the infield',
    },
  },
  {
    slug: 'armenia',
    tab: 'Armenia',
    goal: 'Build the most beautiful, genuinely insightful project on Armenia: the country in hexagons, Yerevan up close and the numbers behind its rise. Then refactor it with our design guidance.',
    data: 'Kontur Population, OpenStreetMap, geoBoundaries, World Bank',
    steps: [
      { text: 'Imported population cells, OpenStreetMap buildings and places, province and district outlines, and World Bank series.', tag: 'Import' },
      { text: 'Built eight cubes, some joining the files: places onto Yerevan’s 175 m grid, population spread down to those cells, hexagon geometry.', tag: 'Cube SQL' },
      { text: 'Drew the country as 3D hexagon towers in three.js with a fly-in to each province, and Yerevan as a hexagon map with four layers.', tag: 'Custom visuals' },
      { text: 'Built three pages, the last a report on the rise with a heatmap spec chart.', tag: 'Pages · spec chart' },
      { text: 'Re-read our design guidance and refactored: a palette from tuff and apricot, findings computed per hexagon, a wave rising from Ararat, the pages linked as one journey.', tag: 'Design round' },
      { text: 'Checked each page at 1920 and 1366 px, tall and at double density, with hovers and clicks.', tag: 'Checked' },
    ],
    facts: [
      { value: '7 in 10', label: 'Armenians live within 100 km of Mount Ararat, computed per hexagon' },
      { value: '31 + 47 min', label: 'first pass, then the design round' },
      { value: 'Unchanged', label: 'requests and data after the design round; idle CPU 0' },
    ],
    built: '31.1 min, then 47.4 min for the design round',
    shot: {
      src: '/showcase/hero-armenia.webp',
      width: 2304,
      height: 1234,
      alt: 'Armenia in hexagons: the country as 3D hexagon towers in basalt and apricot tuff, Mount Ararat across the border',
    },
  },
  {
    slug: 'europe',
    tab: 'Europe in charts',
    goal: 'Rebuild a published data report on entrepreneurship and industry in Europe card for card, on World Bank data, with Armenia added to every card.',
    data: 'World Bank World Development Indicators, 26 economies, 1960–2025',
    steps: [
      { text: 'Imported the series; the cube’s SQL computes the 1992 index, a 3-year moving average and the latest year with window functions.', tag: 'Import · window functions' },
      { text: 'Added a pre-aggregated cube that compares Armenia with the EU on ten indicators.', tag: 'Pre-aggregated cube' },
      { text: 'Wrote one component that draws all 15 cards in seven chart types, placing line-end labels itself so they don’t collide.', tag: 'Custom visual' },
      { text: 'Laid the cards out in a page whose rounded cards hold real, editable dashboard items.', tag: 'Page' },
      { text: 'Checked at 1920, 1366 and double density with a hover; widened the page when the check flagged empty space at 1920.', tag: 'Checked and fixed' },
    ],
    facts: [
      { value: '15 cards', label: 'in the report’s order and style' },
      { value: '26 economies', label: 'with Armenia added to every card' },
      { value: '93 KB', label: 'loaded per view, in 15 requests' },
    ],
    built: '16.0 min · $5.12',
    shot: {
      src: '/showcase/hero-europe.webp',
      ...hero,
      alt: 'Europe in charts: rounded grey cards with cumulative GDP growth since 1992 and household consumption per head, each line labelled at its end, Armenia in green',
    },
  },
]
