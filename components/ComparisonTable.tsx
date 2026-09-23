const rows: [string, string, string, string][] = [
  ['Viewer seat, per month', '$10', '~$35', '$14*'],
  ['Creator or admin seat, per month', '$18', '~$115', '$24'],
  ['Perpetual license', 'Yes', 'No', 'No'],
  ['Calculations run in your database', 'Yes', 'No', 'No'],
  ['Separate calculation engine', 'None', 'Hyper', 'VertiPaq'],
  ['Copy of your data', 'Never', 'Extract, or live with limits', 'Import, or DirectQuery with limits'],
  ['Functions on live data', 'All', 'Limited', 'Limited'],
  ['Fully on-premises', 'Yes, Linux', 'Tableau Server', 'Report Server, Windows only'],
  ['AI assistant on-premises', 'Included', 'Add-on', 'Add-on'],
  ['ETL included', 'Yes', 'No', 'Limited'],
  ['Source code', 'Per license', 'No', 'No'],
]

export default function ComparisonTable() {
  return (
    <div>
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="bg-paper text-slate">
            <tr>
              <th className="px-5 py-3 font-medium"></th>
              <th className="px-5 py-3 font-medium text-ink">MPP BI</th>
              <th className="px-5 py-3 font-medium">Tableau</th>
              <th className="px-5 py-3 font-medium">Power BI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map(([feature, mpp, tableau, powerBi]) => (
              <tr key={feature} className="align-top">
                <th scope="row" className="px-5 py-3.5 font-normal text-ink">{feature}</th>
                <td className="bg-tint/50 px-5 py-3.5 font-medium text-ink">{mpp}</td>
                <td className="px-5 py-3.5">{tableau}</td>
                <td className="px-5 py-3.5">{powerBi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-slate">
        List prices as of Q2 2026: Tableau Enterprise Viewer and Creator; Power BI Pro and Premium Per User. *Power BI Pro
        requires a Microsoft 365 subscription, and full enterprise capability requires Power BI Premium.
      </p>
    </div>
  )
}
