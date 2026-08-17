'use client'

import { motion } from 'framer-motion'
import {
  Gauge, Map, Radio, LayoutGrid, TrafficCone, LineChart,
  ListOrdered, Layers, Target, FileText, Download, Code2,
} from 'lucide-react'

const items = [
  { icon: Gauge, title: 'KPIs', body: 'Trend graphs, KPI cards, and metric displays that put your key numbers in one view.' },
  { icon: Map, title: 'Maps', body: 'Plot data by location, built on standard services like Google Maps, OpenStreetMap, and ArcGIS.' },
  { icon: Radio, title: 'Live schematics', body: 'Interactive diagrams of equipment or facilities. Each part responds to clicks and changes color to show its current status.' },
  { icon: LayoutGrid, title: 'Heat maps and layouts', body: 'Floor plans, shop layouts, and blueprints, with your data laid over the actual space.' },
  { icon: TrafficCone, title: 'Status indicators', body: 'Red, yellow, and green signals that show how far each value sits from its target.' },
  { icon: LineChart, title: 'Two-axis charts', body: 'Compare two metrics with different units on one chart, like sales against temperature.' },
  { icon: ListOrdered, title: 'Rankings and breakdowns', body: 'Sort and break down data to surface top and bottom performers.' },
  { icon: Layers, title: 'Drill-down', body: 'Move from a high-level number down to the individual transactions behind it.' },
  { icon: Target, title: 'Target monitoring', body: 'Track performance against targets at every level, from executives to daily operations.' },
  { icon: FileText, title: 'Presentations and reports', body: 'Turn your dashboards and charts into presentations and reports.' },
  { icon: Download, title: 'Export', body: 'Save charts as images (PNG) and tables as Excel files (XLSX).' },
  { icon: Code2, title: 'Embedding', body: 'Embed MPP BI dashboards into any other system or a public website.' },
]

export default function VisualizationSection() {
  return (
    <section className="relative py-24 bg-white" id="visualization">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Visualization
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-5">
            30+ Visualization Types, Ready to Use
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed">
            MPP BI includes more than 30 visualization types, ready to use out of the box.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => {
            const Icon = it.icon
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (i % 6) * 0.05 }}
                className="rounded-2xl border border-[#E2E8F0] p-6"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: '#0AAEDB15', border: '1px solid #0AAEDB30' }}
                >
                  <Icon size={18} style={{ color: '#0AAEDB' }} />
                </div>
                <h3 className="text-sm font-bold text-[#0D1B2A] mb-2">{it.title}</h3>
                <p className="text-[#6B7280] text-xs leading-relaxed">{it.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
