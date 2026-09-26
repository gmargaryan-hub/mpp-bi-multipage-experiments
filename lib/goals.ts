// The home page's examples: our top showcase projects as goals handed to the agent, what it
// did with them and what came out, in the same order as the showcase's five use cases. Each
// goal is the real brief, shortened; each step is taken from the run's own report and tool
// trace (notes: bi-mcp/run-edge-*.jsonl and the Edge lab page).

import type { Shot } from '@/lib/showcase'

export type GoalStep = { text: string; tag: string }

export type Goal = {
  slug: string
  tab: string
  goal: string
  data: string
  steps: GoalStep[]
  shot: Shot
}

const hero = { width: 2304, height: 1333 }

export const goals: Goal[] = [
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
    shot: {
      src: '/showcase/hero-armenia.webp',
      width: 2304,
      height: 1280,
      alt: 'Armenia in hexagons: the country as 3D hexagon towers in basalt and apricot tuff, Mount Ararat across the border',
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
    shot: {
      src: '/showcase/hero-oval.webp',
      ...hero,
      alt: 'The oval: a speedway whose racing surface is a treemap of the season’s drivers, with the season leader and standings in the infield',
    },
  },
  {
    slug: 'climate',
    tab: 'Climate pulse',
    goal: 'Make a full-screen stats wall of a few huge numbers about global CO₂ over an animated background, every number from the data, and a page on who emits it.',
    data: 'Our World in Data, CO₂ from fossil fuels and industry, 1950–2024',
    steps: [
      { text: 'Imported the data; the cube’s SQL marks each row as a country or an aggregate, maps countries to continents and computes the latest year and 1990 values, so no year is typed in.', tag: 'Import · cube SQL' },
      { text: 'Took world totals only from the World row and ranked the 218 countries alone, so no tonne is counted twice.', tag: 'Data check' },
      { text: 'Wrote the stats wall as a page: an aurora drawn on the GPU with three.js, five figures that count up over sparklines, and a live carbon clock.', tag: 'Custom page · three.js' },
      { text: 'Built “Who emits”: a continent → country treemap that replays 1950–2024, bubbles, a dumbbell and the fuel mix, all filtered by pills and clicks.', tag: 'Custom visuals · spec chart · clicks' },
      { text: 'Checked both pages at 1920 and 1366 px; in the performance round a pre-aggregated cube took Who emits from 17,982 rows to 974.', tag: 'Checked · performance' },
    ],
    shot: {
      src: '/showcase/hero-pulse.webp',
      ...hero,
      alt: 'Climate pulse: 38.6 Gt of CO₂ in 2024 in large type over an aurora, with four more figures over sparklines and a live carbon clock',
    },
  },
]
