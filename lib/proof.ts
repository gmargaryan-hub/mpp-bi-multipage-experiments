// Evidence behind the Power BI migration story, taken from the recorded eval run
// "trial 24" (codification-pbi/eval-state/trial-24): 35 synthetic Power BI projects,
// each migrated by the MPP BI agent through the real chat panel and graded by
// reloading the saved atlas and comparing every graded chart with numbers computed
// from the source workbook. Model: DeepSeek V4 Flash. Three agents ran in parallel.

export type Episode = {
  task: string
  attempt: number
  pass: boolean
  minutes: number
  calls: number
  name: string
  format: 'PBIP' | 'PBIX' | 'PBIT'
  lang: 'EN' | 'RU'
}

const e = (task: string, attempt: number, pass: boolean, minutes: number, calls: number, name: string, format: Episode['format'], lang: Episode['lang'] = 'EN'): Episode =>
  ({ task, attempt, pass, minutes, calls, name, format, lang })

export const trial24: Episode[] = [
  e('001', 1, true, 6.5, 47, 'Sales Demo', 'PBIP'),
  e('002', 1, true, 6.6, 46, 'Sales Demo', 'PBIP'),
  e('003', 1, true, 11.9, 71, 'Sales Demo', 'PBIX'),
  e('004', 1, true, 10.3, 56, 'Sales Demo', 'PBIP', 'RU'),
  e('005', 1, true, 6.1, 44, 'HR Demo', 'PBIP'),
  e('006', 1, true, 11.9, 76, 'Retail Stores', 'PBIP'),
  e('007', 1, true, 6.7, 41, 'SaaS Subscriptions', 'PBIP'),
  e('008', 1, true, 6.8, 36, 'Support Tickets', 'PBIP'),
  e('009', 1, true, 10.1, 49, 'Logistics Shipments', 'PBIX'),
  e('010', 1, true, 5.9, 57, 'Marketing Campaigns', 'PBIP', 'RU'),
  e('011', 1, true, 6.5, 38, 'Web Analytics', 'PBIP'),
  e('012', 1, true, 5.0, 37, 'Manufacturing Quality', 'PBIP'),
  e('013', 1, true, 6.5, 46, 'Energy Consumption', 'PBIP'),
  e('014', 1, true, 5.5, 33, 'Education Enrollment', 'PBIP'),
  e('015', 1, true, 5.4, 46, 'Healthcare Appointments', 'PBIX'),
  e('016', 1, false, 4.7, 26, 'Hotel Bookings', 'PBIP', 'RU'),
  e('016', 2, true, 5.2, 49, 'Hotel Bookings', 'PBIP', 'RU'),
  e('017', 1, true, 7.7, 51, 'Real Estate Listings', 'PBIP'),
  e('018', 1, true, 6.6, 48, 'Fleet Vehicles', 'PBIP'),
  e('019', 1, true, 5.5, 35, 'Restaurant Orders', 'PBIP'),
  e('020', 1, true, 8.0, 43, 'Procurement', 'PBIP'),
  e('021', 1, true, 6.7, 45, 'Timesheets', 'PBIX'),
  e('022', 1, true, 5.9, 50, 'Insurance Claims', 'PBIP'),
  e('023', 1, true, 7.6, 62, 'Telecom Usage', 'PBIP', 'RU'),
  e('024', 1, true, 5.4, 38, 'Agriculture Yields', 'PBIP'),
  e('025', 1, true, 6.2, 50, 'Events Ticketing', 'PBIP'),
  e('026', 1, true, 6.2, 58, 'Library Loans', 'PBIP'),
  e('027', 1, true, 6.9, 40, 'Airline Flights', 'PBIX'),
  e('028', 1, true, 5.8, 41, 'Finance P&L', 'PBIP'),
  e('029', 1, true, 5.7, 49, 'Warehouse Inventory', 'PBIP'),
  e('030', 1, true, 5.3, 53, 'Retail Stores', 'PBIT'),
  e('031', 1, true, 5.5, 41, 'Support Tickets', 'PBIX'),
  e('032', 1, true, 6.6, 48, 'Web Analytics', 'PBIT'),
  e('033', 1, true, 5.7, 52, 'Hotel Bookings', 'PBIX', 'RU'),
  e('034', 1, true, 5.0, 37, 'Insurance Claims', 'PBIT'),
  e('035', 1, true, 7.6, 60, 'Finance P&L', 'PBIX'),
]

export const trial24Summary = {
  projects: 35,
  migrated: 35,
  firstAttempt: 34,
  medianMinutes: 6.5,
  wallMinutes: 89,
  agents: 3,
  model: 'DeepSeek V4 Flash',
}

// Retail Stores (task 006): the agent's real steps, seconds from its first tool call
// (turns.json). Dashboard captures are the harness's own screenshots after reload.
export const retailRun = {
  minutes: 10.4,
  steps: [
    { at: 0, text: 'Opens the attached project with the Power BI migration skill' },
    { at: 31, text: 'Reads the model: 3 tables, 6 measures, 3 pages, 16 visuals' },
    { at: 77, text: 'Creates the atlas Retail Stores' },
    { at: 94, text: 'Adds retail-sales.xlsx as its data source' },
    { at: 160, text: 'Builds 5 cubes with the model’s field names' },
    { at: 204, text: 'Creates one dashboard per report page' },
    { at: 228, text: 'Runs 9 preview queries against the new cubes' },
    { at: 297, text: 'Builds the Overview page: 8 visuals' },
    { at: 375, text: 'Builds Stores and Products: 8 more' },
    { at: 433, text: 'Reviews the result and edits 15 charts' },
    { at: 465, text: 'Takes a picture of each dashboard to check the layout' },
    { at: 622, text: 'Writes the report: 10 mapped exactly, 6 approximated, 0 skipped' },
  ],
}

export const notYetMigrated = [
  'Row-level security roles',
  'DirectQuery and live connections',
  'Bookmarks and drill-through',
  'Custom visuals, themes and calculation groups',
  'DAX period shifts such as DATEADD',
  'Compressed models inside a .pbix without the source workbook',
  'Sources other than Excel and CSV',
]
