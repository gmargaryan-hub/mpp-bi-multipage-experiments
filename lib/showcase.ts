// What the agent built in MPP BI: the home goal tabs and /showcase.
//
// The copy sells the story in the reader's words: the question, what the agent did for them,
// what they see. No internal or implementation terms in anything a visitor reads (no product
// internals, tool names, code names or chart-package jargon); product nouns a buyer knows
// (dashboard, chart, filter, data source, permissions, report) are fine. Numbers appear only
// where the number is the story. The exoplanet galaxy is left out on purpose: its render
// doesn't hold up.
//
// The Edge lab projects use public data; the report and the reference samples use our sample
// hotel dataset (600 bookings, 2024–2025). Europe in charts rebuilds a published data report; the
// site never shows or names the report's owner, and its screenshots show only our dashboard.
// Each ask is the real brief, condensed; each step comes from the run's own report (web-res
// docs/viz/WORKLOG.md, the notes' Edge lab page and bi-mcp/run-edge-*.jsonl).

export type Shot = { src: string; width: number; height: number; alt: string }

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
  /** What you see in the picture, in a sentence. */
  see: string
  asked: string
  did: string[]
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
  /** Where the card leads: a use case on /showcase or another page. */
  href?: string
  /** Which model built it, when it isn't Claude Opus. */
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
    hook: 'A whole country in 3,823 glowing 3D hexagons, Yerevan block by block, and the numbers behind its rise.',
    question: 'Where do Armenia’s people live, down to a city block, and how fast is the country rising?',
    shot: {
      src: '/showcase/hero-armenia.webp',
      ...armeniaHero,
      alt: 'Armenia in hexagons: the country as 3D hexagon towers in basalt and apricot tuff, Mount Ararat across the border, under the headline “Half of Armenia lives on 1.0% of its land”',
    },
    see: 'The country as 3D towers of people under its finding, “Half of Armenia lives on 1.0% of its land”, with Mount Ararat across the border.',
    asked:
      'Build the most beautiful, genuinely insightful project on Armenia: the whole country in hexagons, Yerevan up close, and the numbers behind its rise.',
    did: [
      'Brought together where people live, buildings and places from OpenStreetMap, province and district borders, and World Bank figures.',
      'Combined them into one model of the country, down to hexagons 175 m across in Yerevan, with the map’s shapes built in, so no map service is needed.',
      'Drew the country in 3D, each hexagon as tall as its population, with a fly-in to every province, and Yerevan as a map of homes, cafés, culture and everyday errands.',
      'Wrote three linked pages, the last a report on the country’s rise.',
      'Then read our design guidance and reworked the look: colours from Armenian stone and apricot, findings worked out for every hexagon (seven in ten Armenians live within 100 km of Mount Ararat), and a wave of light that rises from Ararat.',
      'Opened every page in a real browser, on two screen sizes and a high-resolution screen, hovering and clicking, before calling it done.',
    ],
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
    see: 'Quakes ringing the Pacific as beams of light, a month you can replay day by day, and the busiest regions and strongest quakes beside the globe.',
    asked: 'Put every earthquake of the last 30 days on a 3D globe, sized by magnitude and colored by depth, with a stats page next to it.',
    did: [
      'Brought in every quake of the last 30 days and worked out each one’s region, day, hour, depth and strength.',
      'Built a globe you can spin, with the continents drawn from scratch: every quake a beam of light, its height the magnitude, its colour the depth, rings around the strongest.',
      'Added a timeline you can replay day by day, and made a click on a quake filter the whole page to its region.',
      'Wrote a second page whose sentences come straight from the data, such as “one every 4.0 minutes”, with a heatmap of quakes by day and hour.',
      'Opened it in a browser, saw what slowed it down, and moved the heavy sorting into the database.',
    ],
  },
  {
    slug: 'market',
    title: 'Market track',
    kicker: 'NASDAQ screener snapshot, Sep 24, 2026',
    hook: 'The whole NASDAQ on one lap: every sector an arc, every arc a mosaic of its companies.',
    question: 'How is the market doing today, and which giants move it?',
    shot: {
      src: '/showcase/hero-market.webp',
      ...hero,
      alt: 'Market track: a ring of sectors, each a treemap of companies sized by market cap and colored by the day’s change, with the NASDAQ total in the centre and a table of the largest companies',
    },
    see: 'The whole market on one lap, largest sector first, each company sized by its value and coloured by the day’s move, with the total in the centre.',
    asked:
      'Show the whole NASDAQ as a circular track, with each sector’s arc a treemap of its companies sized by market cap and colored by today’s change.',
    did: [
      'Brought in the day’s snapshot of 3,500 companies and worked out each one’s change in value, whether it rose or fell, and its size band.',
      'Invented a chart for the question: sectors laid around a ring, each a mosaic of its companies, every tile exactly as large as the company’s market value.',
      'Made the ring answer a click: zoom a sector around the ring, or filter the table beside it.',
      'Built a second page on the day’s moves: a scoreboard, how few giants carry the index, and the biggest winners and losers.',
      'Checked it in a browser on two screen sizes and zoomed in, then moved the heavy totals into the database.',
    ],
  },
  {
    slug: 'oval',
    title: 'The oval',
    kicker: 'nascaR.data, Cup Series results 1949–2026',
    hook: 'A speedway whose racing surface is a mosaic of the season’s field, with 78 seasons to replay.',
    question: 'Who is winning this season, and how does it compare with every season since 1949?',
    shot: {
      src: '/showcase/hero-oval.webp',
      ...hero,
      alt: 'The oval: a speedway whose racing surface is a treemap of the season’s drivers, with the season leader and standings in the infield and one pit stall per race',
    },
    see: 'The 2026 season so far: Toyota, Ford and Chevrolet each holding their stretch of track, the leader in the infield, and every race winner on pit road.',
    asked: 'Draw a NASCAR oval whose track surface is itself a treemap of the current season’s field, with a season picker to replay history.',
    did: [
      'Brought in 101,230 race results and kept car numbers such as “07” exactly as written, after the first try turned them into 7.',
      'Worked out each driver’s season rank, main manufacturer and career wins once, so every chart can use them.',
      'Drew a speedway whose racing surface is a mosaic of the field, by manufacturer, team and driver, with the standings in the infield and a pit stall for every race in the winner’s colours.',
      'Wrote one page for three dashboards, the oval, season stats and Legends, with a season picker that replays history back to 1949.',
      'Kept it quick by computing rankings and career totals once, instead of adding up 78 seasons on every visit.',
    ],
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
    see: '38.6 billion tonnes of CO₂ in 2024 over a moving aurora, four more figures over their trend lines, and a clock counting since you arrived.',
    asked:
      'Make a full-screen stats wall of a few huge numbers about global CO₂ over an animated background, every number from the data, and a page on who emits it.',
    did: [
      'Told countries apart from regional and world totals, so no tonne is counted twice, and grouped the countries by continent.',
      'Took the latest year from the data itself, so nothing needs updating by hand when a new year arrives.',
      'Built a full-screen page: an aurora in motion behind five figures that count up over their own trend lines, and a clock of the tonnes emitted since you arrived.',
      'Built a second page, “Who emits”: countries by continent you can replay from 1950 to 2024, emissions per person against the total, and the fuel mix, all filtered with a click.',
      'Made every chart resize cleanly when the window or the side panel changes.',
    ],
  },
]

export const cases: Case[] = [
  {
    slug: 'armenia',
    title: 'Armenia',
    data: 'Kontur Population, OpenStreetMap, geoBoundaries, World Bank',
    thumb: { src: '/showcase/hero-armenia.webp', ...armeniaHero, alt: '' },
    question: 'How do I map where people live, down to a city block, with no map service?',
    how: 'The country in 3D hexagons, Yerevan block by block with four layers, and a report on the country’s rise.',
    href: '#armenia',
  },
  {
    slug: 'globe',
    title: 'Shaking Earth',
    data: 'USGS, 10,718 earthquakes in 30 days',
    thumb: { src: '/showcase/globe.webp', ...wide, alt: '' },
    question: 'How do I show thousands of events in space and in time?',
    how: 'A globe with every quake as a beam of light, a month you can replay, and a click that filters the charts beside it.',
    href: '#globe',
  },
  {
    slug: 'quake-stats',
    title: 'The last 30 days',
    data: 'USGS, the same earthquakes',
    thumb: { src: '/showcase/quake-stats.webp', width: 1000, height: 625, alt: '' },
    question: 'Can the headline be worked out from the data instead of typed?',
    how: 'A page where every sentence comes from the data, such as “one every 4.0 minutes” and “240 were not earthquakes”, with a heatmap by day and hour.',
  },
  {
    slug: 'market',
    title: 'Market track',
    data: 'NASDAQ screener, 3,500 companies',
    thumb: { src: '/showcase/nasdaq-track.webp', ...wide, alt: '' },
    question: 'How do I show a whole market, its sectors and its giants on one screen?',
    how: 'A chart invented for the question: a ring of sectors, each a mosaic of its companies sized by value. A click zooms a sector or filters the table.',
    href: '#market',
  },
  {
    slug: 'sector-stats',
    title: 'Sector stats',
    data: 'NASDAQ screener, the same snapshot',
    thumb: { src: '/showcase/nasdaq-stats.webp', width: 1000, height: 625, alt: '' },
    question: 'How concentrated is the market, and who moved today?',
    how: 'A scoreboard, a curve of how few giants carry the index, and the day’s biggest winners and losers, all following the filters.',
  },
  {
    slug: 'oval',
    title: 'The oval',
    data: 'nascaR.data, Cup Series results 1949–2026',
    thumb: { src: '/showcase/nascar-oval.webp', ...wide, alt: '' },
    question: 'How do I show this season’s standings and 78 seasons of history in one view?',
    how: 'The racing surface is a mosaic of the field, with the standings in the infield, a pit stall for every race and a replay back to 1949.',
    href: '#oval',
  },
  {
    slug: 'legends',
    title: 'Legends',
    data: 'nascaR.data, every Cup season since 1949',
    thumb: { src: '/showcase/nascar-legends.webp', ...half, alt: '' },
    question: 'Who are the greatest drivers, and when did they win?',
    how: 'A headline worked out from the data, “Richard Petty’s 200 wins still top the list — 95 more than David Pearson”, with career wins and every 50-win career on one timeline.',
  },
  {
    slug: 'climate',
    title: 'Climate pulse',
    data: 'Our World in Data, CO₂ 1950–2024',
    thumb: { src: '/showcase/pulse.webp', ...wide, alt: '' },
    question: 'What is the one number about CO₂ everyone should see?',
    how: 'A full-screen wall of figures over a moving aurora, each counting up over its trend, with a live carbon clock. Every number comes from the data.',
    href: '#climate',
  },
  {
    slug: 'who-emits',
    title: 'Who emits',
    data: 'Our World in Data, 218 countries',
    thumb: { src: '/showcase/who-emits.webp', width: 1200, height: 806, alt: '' },
    question: 'Who emits the most, and how has that changed since 1950?',
    how: 'Countries by continent you can replay from 1950 to 2024, emissions per person against the total, and the fuel mix. A click on a continent or a country filters the page.',
  },
  {
    slug: 'europe',
    title: 'Europe in charts',
    data: 'World Bank, 26 economies, 1960–2025',
    thumb: { src: '/showcase/europe.webp', ...wide, alt: '' },
    question: 'Can the agent rebuild a published report we like, inside our BI?',
    how: 'Card for card, in the report’s own style, with Armenia added to every card, and every card still an editable part of the dashboard.',
  },
  {
    slug: 'raw',
    title: 'From a raw feed to a dashboard',
    data: 'USGS raw feed, quakes of magnitude 2.5 and up, 30 days',
    thumb: { src: '/showcase/raw-feed.webp', width: 1200, height: 818, alt: '' },
    question: 'Can a small model go from a raw feed to a dashboard on its own?',
    how: 'In the product’s chat, the model downloaded the feed, cleaned it, brought it in, modeled it and built an eight-chart dashboard.',
    by: 'DeepSeek V4 Flash',
  },
  {
    slug: 'report',
    title: 'A report, no code',
    data: 'Sample hotel dataset, 600 bookings',
    thumb: { src: '/showcase/report-opus.webp', width: 1200, height: 582, alt: '' },
    focus: '14% 0%',
    question: 'Can a small model produce a polished report without writing code?',
    how: 'A ready-made report page filled in by settings alone: hover any number to see where it comes from, and edit every sentence in the product. Claude Opus and a small model both filled it without writing code.',
  },
  {
    slug: 'samples',
    title: 'Every way to customize',
    data: 'Sample hotel dataset, 600 bookings',
    thumb: { src: '/showcase/samples.webp', width: 1000, height: 624, alt: '' },
    question: 'Which way of shaping MPP BI fits my case?',
    how: 'Our reference set: one dashboard for each way to shape MPP BI, from chart settings and click actions to themes, stories, custom pages and custom charts.',
  },
]

/** Data of any complexity: the data, the problem it posed, how it was handled. */
export const dataCases: { data: string; problem: string; handled: string; project: string }[] = [
  {
    data: 'A raw feed of earthquakes from USGS',
    problem: 'Not a table: nested records, with the region buried in a free-text place name.',
    handled:
      'In the product’s chat the agent downloaded it, wrote a small cleaning program in its own workspace that made one tidy row per quake and pulled out the region, checked the result and brought it in.',
    project: 'From a raw feed to a dashboard',
  },
  {
    data: 'Car numbers such as “07” and “00” in 101,230 race results',
    problem: 'They are codes, not numbers, and the first import turned “07” into 7.',
    handled: 'The agent brought the column back in as text. MPP BI now spots leading zeros by itself and keeps such codes exactly as written.',
    project: 'The oval',
  },
  {
    data: 'World population: 8,045,311,447',
    problem: 'Too large for the number type the first import picked, so 8 billion came back empty.',
    handled: 'MPP BI now checks the end of a file too and stores numbers this large in full.',
    project: 'Climate pulse',
  },
  {
    data: 'CO₂ for 218 countries, mixed in one column with “World” and other totals',
    problem: 'Add it up naively and the same tonnes are counted more than once.',
    handled:
      'The agent tagged each row as a country or a total and grouped countries by continent. World figures come from the World row; rankings use countries only.',
    project: 'Climate pulse, Who emits',
  },
  {
    data: 'Population in hexagon cells, with OpenStreetMap buildings and places',
    problem: 'Separate files at different scales: people per cell, places as points, districts as outlines.',
    handled: 'The agent joined the files in the data model: places land on Yerevan’s 175 m grid, and population is spread down to those cells.',
    project: 'Armenia',
  },
  {
    data: 'Map shapes: hexagons, province and district outlines',
    problem: 'No map service on the installation, and a page can’t fetch one from the internet.',
    handled: 'The shapes live in the data model: one hexagon’s outline reused for every cell, borders from geoBoundaries, drawn right in the page.',
    project: 'Armenia',
  },
  {
    data: 'World Bank figures in long format: 26 economies, 13 indicators',
    problem: 'One row per economy, indicator and year, while the charts need growth since 1992, moving averages and the latest values.',
    handled: 'The data model works out growth, the moving average and the latest year once. The page only draws the lines.',
    project: 'Europe in charts',
  },
  {
    data: 'Ranks, shares and running totals',
    problem: 'Worked out in the browser they pull every raw row, and a total over all the data ignored the season filter: one season showed all-time winners.',
    handled: 'The agent moved them into the data model: a rank and a main manufacturer per season, career wins, and shares of what the filter shows. Any chart can use them.',
    project: 'The oval',
  },
  {
    data: 'Seventy-eight seasons of history behind one page',
    problem: 'Adding up rankings and career totals from raw results on every visit made the page slow.',
    handled: 'Small summary tables, by driver and season, career and race, hold the heavy work, computed once and read quickly.',
    project: 'The oval',
  },
]
