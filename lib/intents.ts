import type { Result, Step } from '@/components/Execution'

// Goals handed to the real MPP BI agent in its chat, with its real steps against its own
// clock (first pass, then the polishing you asked for) and screenshots of the real result.
// Generated from mpp-bi-multipage-experiments-media/intents-chat/manifest.json (MPP BI
// stand, chat branch, 23–24 Sep 2026); steps, timings and screenshots are the run's own,
// only the data-source line is rewritten for a public page.

export type Intent = {
  slug: string
  kind: string
  intent: string
  sources: string
  seconds: number
  steps: Step[]
  results: Result[]
}

export const intents: Intent[] = [
  {
    "slug": "hotel-management-summary",
    "kind": "Management dashboard",
    "intent": "In the Hotel Bookings atlas, build a new dashboard \"Hotel management summary\" from the existing Hotel bookings cube: a row of four KPI cards on top (total revenue, bookings, room nights, average revenue per night), the monthly revenue trend below them, and then revenue by property, bookings by sales channel and bookings by room type side by side. Use clear business titles, whole numbers with a space as the thousands separator (format \"# ##0\"), and no legend on single-series charts.",
    "sources": "A Hotel Bookings atlas the assistant built from a spreadsheet earlier in the same chat: 600 bookings across 5 properties, 3 sales channels and 3 room types, January 2024 – December 2025.",
    "seconds": 1600,
    "steps": [
      {
        "at": 0,
        "text": "Loads the visualization guide, explores the Hotel bookings cube and lists the atlas's dashboards"
      },
      {
        "at": 25,
        "text": "Looks up the settings of KPI cards, line charts and bar charts"
      },
      {
        "at": 36,
        "text": "Previews five queries: the KPI totals, revenue by month, revenue by property, bookings by sales channel and by room type"
      },
      {
        "at": 54,
        "text": "Creates the dashboard \"Hotel management summary\""
      },
      {
        "at": 63,
        "text": "Reads the number-format and legend settings of each chart type"
      },
      {
        "at": 759,
        "text": "Tries to add the four KPI cards; the tool rejects the request shape (eight rejected calls until 15:10)"
      },
      {
        "at": 981,
        "text": "Adds the Total revenue card"
      },
      {
        "at": 1097,
        "text": "Adds the Bookings, Room nights and Avg revenue / night cards, the monthly revenue trend and three bar charts"
      },
      {
        "at": 1169,
        "text": "Lists the saved dashlets to check them and opens the dashboard"
      },
      {
        "at": 1431,
        "text": "Sets the layout: KPI row on top, full-width trend, three charts side by side"
      },
      {
        "at": 1513,
        "text": "Reports what it built and which checks it ran"
      },
      {
        "at": 1598,
        "text": "Previews revenue by month with 2024-01 style month labels",
        "groom": true
      },
      {
        "at": 1641,
        "text": "Switches the trend's month axis to those labels",
        "groom": true
      }
    ],
    "results": [
      {
        "src": "/intents/hotel-management-summary/result-after.webp",
        "width": 1440,
        "height": 900,
        "caption": "A one-page management summary the MPP BI assistant built from an existing cube: four KPIs, the monthly trend and three breakdowns."
      },
      {
        "src": "/intents/hotel-management-summary/result-before.webp",
        "width": 1440,
        "height": 900,
        "caption": "The assistant's first pass, before the month labels were shortened."
      },
      {
        "src": "/intents/hotel-management-summary/chat.webp",
        "width": 1440,
        "height": 900,
        "caption": "The assistant's summary of the measures it used and the checks it ran."
      }
    ]
  },
  {
    "slug": "hotel-h2-vs-h1-question",
    "kind": "A question, answered",
    "intent": "Hotel revenue was almost flat between the first and the second half of 2025, but did every property follow that? In the Hotel Bookings atlas, add a dashboard \"2025: H2 vs H1\" with a column chart of revenue by property for H1 2025 (January–June) and H2 2025 (July–December) side by side, and a bar chart of the change per property (H2 minus H1). Show whole numbers with a space as the thousands separator. Then explain in three sentences which properties drove the change.",
    "sources": "The same Hotel Bookings atlas: revenue by property and month for 2025, straight from the bookings cube.",
    "seconds": 1606,
    "steps": [
      {
        "at": 0,
        "text": "Explores the Hotel bookings cube and lists the properties and months it covers"
      },
      {
        "at": 59,
        "text": "Looks up the column-chart settings and the LPE functions for conditional sums"
      },
      {
        "at": 119,
        "text": "Previews H1 2025 (January–June) and H2 2025 (July–December) revenue by property"
      },
      {
        "at": 129,
        "text": "Creates the dashboard \"2025: H2 vs H1\""
      },
      {
        "at": 148,
        "text": "Previews the H2 − H1 change per property"
      },
      {
        "at": 264,
        "text": "Searches the documentation for a space-separated thousands format"
      },
      {
        "at": 555,
        "text": "Adds the grouped column chart of H1 vs H2 revenue by property"
      },
      {
        "at": 684,
        "text": "Adds the bar chart of the change per property"
      },
      {
        "at": 748,
        "text": "Re-checks the half-year sums and lists the saved dashlets"
      },
      {
        "at": 924,
        "text": "Captures dashboard images and notes that the capture showed another dashboard"
      },
      {
        "at": 1011,
        "text": "Answers in three sentences: City Center, Lake Lodge, Mountain Chalet and Old Town Inn grew, Seaside Resort fell by 11 421"
      },
      {
        "at": 1198,
        "text": "Deletes a duplicate change chart",
        "groom": true
      },
      {
        "at": 1258,
        "text": "Previews the three half-year totals",
        "groom": true
      },
      {
        "at": 1382,
        "text": "Adds the KPI row: Revenue H1 2025, Revenue H2 2025 and Change (H2 − H1)",
        "groom": true
      },
      {
        "at": 1405,
        "text": "Lays out the KPI row above the two charts, side by side, and renames the series to H1 2025 and H2 2025",
        "groom": true
      },
      {
        "at": 1476,
        "text": "Restates the three sentences with the correct total (+3 828)",
        "groom": true
      },
      {
        "at": 1672,
        "text": "Hides the change chart's legend, then names its series \"Change\"",
        "groom": true
      },
      {
        "at": 2142,
        "text": "Restores whole-number formats and subtitles on the three KPI cards",
        "groom": true
      }
    ],
    "results": [
      {
        "src": "/intents/hotel-h2-vs-h1-question/result-after.webp",
        "width": 1440,
        "height": 900,
        "caption": "Asked why revenue barely moved, the assistant built this comparison and explained it: four properties grew while Seaside Resort fell."
      },
      {
        "src": "/intents/hotel-h2-vs-h1-question/result-before.webp",
        "width": 1440,
        "height": 900,
        "caption": "The assistant's first pass: the two charts (one duplicated), before KPIs and series names."
      },
      {
        "src": "/intents/hotel-h2-vs-h1-question/chat.webp",
        "width": 1440,
        "height": 900,
        "caption": "The three-sentence explanation next to the finished dashboard."
      }
    ]
  },
  {
    "slug": "support-desk-from-spreadsheet",
    "kind": "Spreadsheet → dashboard",
    "intent": "Create a new atlas \"Support Desk\" from the attached workbook and build a dashboard \"Support overview\" for our support manager. Put a row of four KPI cards on top: tickets, open tickets, average resolution hours and average satisfaction (1–5). Below them the monthly ticket volume, and then tickets by channel, by priority and by agent side by side. Use clear business titles, whole numbers with a space as the thousands separator (format \"# ##0\"; one decimal for the two averages), and no legend on single-series charts.",
    "sources": "A workbook attached to the chat: 700 support tickets from January 2024 to December 2025, 6 agents, 3 channels, 4 priorities. The assistant created the atlas, the data source and the cube itself.",
    "seconds": 2627,
    "steps": [
      {
        "at": 0,
        "text": "Lists the workspace and the existing data sources, reads the spreadsheet tool's help"
      },
      {
        "at": 12,
        "text": "Inspects the workbook: sheets Tickets and Agents, their headers and sample rows"
      },
      {
        "at": 30,
        "text": "Exports both sheets to CSV and computes reference totals from the export"
      },
      {
        "at": 101,
        "text": "Creates the atlas \"Support Desk\""
      },
      {
        "at": 170,
        "text": "Uploads the workbook as a file datasource; it lands as a global source with the header row left as data"
      },
      {
        "at": 215,
        "text": "Tries to re-upload it with header and type preparation; the platform reports the file as already loaded"
      },
      {
        "at": 258,
        "text": "Creates a tickets cube with typed columns over the raw sheet; its previews fail on the header row"
      },
      {
        "at": 552,
        "text": "Uploads the exported CSV as a clean datasource instead and builds the tickets cube on it"
      },
      {
        "at": 585,
        "text": "Previews ticket counts by status and by agent"
      },
      {
        "at": 609,
        "text": "Creates the dashboard \"Support overview\""
      },
      {
        "at": 723,
        "text": "Adds four KPI cards: tickets, open tickets, average resolution hours, average satisfaction"
      },
      {
        "at": 765,
        "text": "Adds the monthly ticket volume and charts by channel, priority and agent"
      },
      {
        "at": 1025,
        "text": "Tries to rearrange the layout; the edit tool rejects the id field name (16 calls)"
      },
      {
        "at": 1209,
        "text": "Reports the dashboard, with 499 tickets"
      },
      {
        "at": 1327,
        "text": "Inspects the original upload, which holds all 701 sheet rows",
        "groom": true
      },
      {
        "at": 1466,
        "text": "Rebuilds the tickets cube on the original upload, skipping the header row",
        "groom": true
      },
      {
        "at": 1778,
        "text": "Checks the counts: 700 tickets, 116 open",
        "groom": true
      },
      {
        "at": 2318,
        "text": "Removes the eight dashlets built on the truncated data",
        "groom": true
      },
      {
        "at": 2396,
        "text": "Adds the four KPI cards, the monthly volume with 2024-01 style labels and three bar charts on the full cube",
        "groom": true
      },
      {
        "at": 2567,
        "text": "Sets the layout: KPI row, full-width monthly volume, three charts side by side",
        "groom": true
      }
    ],
    "results": [
      {
        "src": "/intents/support-desk-from-spreadsheet/result-after.webp",
        "width": 1440,
        "height": 900,
        "caption": "A support manager's dashboard the MPP BI assistant built from an attached spreadsheet: KPIs, monthly volume and three breakdowns."
      },
      {
        "src": "/intents/support-desk-from-spreadsheet/result-before.webp",
        "width": 1440,
        "height": 900,
        "caption": "The assistant's first pass: numbers from a truncated export (499 tickets), pies without labels, mixed layout."
      },
      {
        "src": "/intents/support-desk-from-spreadsheet/chat.webp",
        "width": 1440,
        "height": 900,
        "caption": "The assistant's summary of the rebuilt dashboard next to the result."
      }
    ]
  },
  {
    "slug": "hotel-revenue-forecast",
    "kind": "Forecast next to actuals",
    "intent": "In the Hotel Bookings atlas, add a dashboard \"Revenue forecast 2026\". On top, two KPI cards: Revenue 2024 and Revenue 2025, as whole numbers with a space as the thousands separator. Below them, full width, a line chart \"Monthly revenue with 6-month forecast\": revenue by month for 2024–2025 with the months labelled like 2024-01, and the built-in Holt-Winters forecast for the next 6 months shown next to the actuals. Name the series \"Revenue\". Then tell me in two sentences how to read the chart.",
    "sources": "Monthly revenue from the Hotel Bookings atlas, 2024–2025. The forecast is the BI engine's built-in Holt-Winters method, drawn next to the actuals.",
    "seconds": 607,
    "steps": [
      {
        "at": 0,
        "text": "Explores the Hotel bookings cube and lists the atlas's dashboards"
      },
      {
        "at": 5,
        "text": "Previews revenue by month and looks up the line-chart and KPI settings, including the built-in forecast"
      },
      {
        "at": 91,
        "text": "Checks the 24 months of history (2024-01 to 2025-12)"
      },
      {
        "at": 99,
        "text": "Previews the 2024 and 2025 revenue totals and creates the dashboard \"Revenue forecast 2026\""
      },
      {
        "at": 119,
        "text": "Adds the Revenue 2024 and Revenue 2025 cards and the monthly revenue chart with a 6-month Holt-Winters forecast"
      },
      {
        "at": 170,
        "text": "Lays out the cards and the full-width chart"
      },
      {
        "at": 181,
        "text": "Explains in two sentences how to read the actuals and the forecast"
      },
      {
        "at": 256,
        "text": "Looks up the forecast settings",
        "groom": true
      },
      {
        "at": 421,
        "text": "Sets a 12-month season so the forecast follows the yearly pattern",
        "groom": true
      },
      {
        "at": 427,
        "text": "Stretches the two KPI cards across the top row",
        "groom": true
      },
      {
        "at": 486,
        "text": "Compares the chart with an earlier forecast chart in the atlas",
        "groom": true
      },
      {
        "at": 521,
        "text": "Rewrites the chart without the number format, sort and trend settings, so the confidence band shares the left axis",
        "groom": true
      }
    ],
    "results": [
      {
        "src": "/intents/hotel-revenue-forecast/result-after.webp",
        "width": 1440,
        "height": 900,
        "caption": "Monthly revenue with a six-month Holt-Winters forecast and its confidence band, built by the assistant from one request."
      },
      {
        "src": "/intents/hotel-revenue-forecast/result-before.webp",
        "width": 1440,
        "height": 900,
        "caption": "The assistant's first pass: a flat forecast with its band on a separate axis, fixed in two follow-ups."
      },
      {
        "src": "/intents/hotel-revenue-forecast/chat.webp",
        "width": 1440,
        "height": 900,
        "caption": "The assistant's two-sentence reading guide for the forecast."
      }
    ]
  }
]
