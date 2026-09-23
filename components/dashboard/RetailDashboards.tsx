import { retail } from '@/lib/retailData'
import { Bars, Card, Columns, Donut, Line, Scatter, Slicer, Stacked, Table, Treemap } from '@/components/dashboard/Charts'

export type Dashlet = { title: string; span?: 1 | 2 | 4; tall?: boolean; body: React.ReactNode }
export type DashboardDef = { title: string; dashlets: Dashlet[] }

const money = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const t = retail.totals

// The three pages of the Retail Stores report, drawn from the workbook's real numbers.
export const retailDashboards: DashboardDef[] = [
  {
    title: 'Overview',
    dashlets: [
      { title: 'Total revenue', body: <Card value={money(t.revenue)} /> },
      { title: 'Transactions', body: <Card value={t.transactions.toLocaleString('en-US')} /> },
      { title: 'Average ticket', body: <Card value={money(t.averageTicket)} /> },
      { title: 'Channel', body: <Slicer options={['All', 'In-store', 'Online']} /> },
      { title: 'Revenue by store', span: 2, tall: true, body: <Columns data={retail.revenueByStore} /> },
      { title: 'Revenue share by channel', span: 2, tall: true, body: <Donut data={retail.revenueByChannel} center={`${Math.round(t.revenue / 1000)}k`} /> },
      { title: 'Monthly revenue', span: 4, tall: true, body: <Line data={retail.monthlyRevenue} /> },
    ],
  },
  {
    title: 'Stores',
    dashlets: [
      { title: 'Revenue by region', span: 2, tall: true, body: <Bars data={retail.revenueByRegion} /> },
      { title: 'Ticket vs units by store', span: 2, tall: true, body: <Scatter data={retail.ticketVsUnits} /> },
      { title: 'Units by month and channel', span: 2, tall: true, body: <Stacked data={retail.unitsByMonthChannel} /> },
      {
        title: 'Store performance', span: 2, tall: true,
        body: <Table head={['Store', 'Revenue', 'Units', 'Sales']} rows={retail.storePerformance.map(([s, r, u, x]) => [s, Math.round(r), u, x])} />,
      },
    ],
  },
  {
    title: 'Products',
    dashlets: [
      { title: 'Revenue by category', span: 2, tall: true, body: <Treemap data={retail.revenueByCategory} /> },
      { title: 'Units by product', span: 2, tall: true, body: <Bars data={retail.unitsByProduct} /> },
      { title: 'Online revenue by category', span: 2, tall: true, body: <Columns data={retail.onlineRevenueByCategory} color="#e85498" /> },
      { title: 'Product prices', span: 2, tall: true, body: <Table head={['Product', 'Avg price']} rows={retail.productPrices.map(([p, v]) => [p, v.toFixed(2)])} /> },
    ],
  },
]
