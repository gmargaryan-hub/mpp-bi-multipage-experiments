'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { asset } from '@/lib/basePath'

const relational = [
  { name: 'PostgreSQL', src: '/logos/postgresql.png' },
  { name: 'Oracle', src: '/logos/oracle.png' },
  { name: 'Microsoft SQL Server', src: '/logos/mssql.png' },
  { name: 'MySQL', src: '/logos/mysql.png' },
  { name: 'IBM DB2', src: '/logos/db2.png' },
  { name: 'SAP HANA', src: '/logos/sap-hana.png' },
  { name: 'ClickHouse', src: '/logos/clickhouse.png' },
  { name: 'Greenplum', src: '/logos/greenplum.png' },
]

const warehouses = ['Teradata DWH', 'SQL Server Analysis Services', 'MDX-based analytical stores']

const bigData = [
  { name: 'Hadoop', src: '/logos/hadoop.png' },
  { name: 'Apache HBase', src: '/logos/hbase.png' },
  { name: 'Apache Hive', src: '/logos/hive.svg' },
  { name: 'Amazon S3', src: '/logos/amazon-s3.png' },
]

const streaming: { name: string; src?: string; text?: boolean }[] = [
  { name: 'Apache Kafka', src: '/logos/kafka.png' },
  { name: 'NATS', src: '/logos/nats.png' },
  { name: 'MQTT', src: '/logos/mqtt.png' },
  { name: 'RabbitMQ', src: '/logos/rabbitmq.png' },
  { name: 'Redis', src: '/logos/redis.png' },
  { name: 'SYSLOG', text: true },
  { name: 'SNMP', text: true },
]

const files = ['Excel (manual and automatic upload)', 'CSV', 'ODS', 'Parquet and Avro', 'DBF', 'QVD']

const apis: { name: string; src?: string; text?: boolean }[] = [
  { name: 'SAP RFC', src: '/logos/sap.png' },
  { name: 'REST', text: true },
  { name: 'JDBC', text: true },
  { name: 'CUSTOM CONNECTORS', text: true },
]

function LogoTile({ name, src, text }: { name: string; src?: string; text?: boolean }) {
  if (text || !src) {
    return (
      <div className="flex items-center justify-center h-20 bg-white border border-[#E2E8F0] rounded-xl px-3">
        <span className="text-xs font-bold uppercase tracking-wide text-[#374151] text-center">{name}</span>
      </div>
    )
  }
  return (
    <div
      className="card-hover flex items-center justify-center h-20 bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 grayscale hover:grayscale-0 transition-all duration-300"
      title={name}
    >
      <div className="relative w-full h-full">
        <Image src={asset(src)} alt={name} fill sizes="140px" className="object-contain" unoptimized />
      </div>
    </div>
  )
}

function TextList({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2.5 text-sm text-[#374151] bg-white border border-[#E2E8F0] rounded-lg px-4 py-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0AAEDB] flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function DataSourcesSection() {
  return (
    <section className="relative py-24 bg-[#F5F7FA]" id="data-sources">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Connectivity
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-5">
            Connect to Your Data Wherever It Lives
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed">
            MPP BI connects to almost any data source &mdash; old databases, cloud
            warehouses, spreadsheets, and APIs.
          </p>
        </motion.div>

        <div className="flex flex-col gap-12">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-[#0D1B2A] mb-1.5">Relational databases</h3>
            <p className="text-xs text-[#9CA3AF] mb-4">The everyday databases that run most business applications.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {relational.map((l) => <LogoTile key={l.name} {...l} />)}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-[#0D1B2A] mb-1.5">Data warehouses</h3>
            <p className="text-xs text-[#9CA3AF] mb-4">Large central systems that pull data together for reporting and analytics.</p>
            <TextList items={warehouses} />
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-[#0D1B2A] mb-1.5">Big data</h3>
            <p className="text-xs text-[#9CA3AF] mb-4">Systems built to handle very large volumes of data.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {bigData.map((l) => <LogoTile key={l.name} {...l} />)}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-[#0D1B2A] mb-1.5">Streaming</h3>
            <p className="text-xs text-[#9CA3AF] mb-4">Live data that arrives continuously, such as sensor readings or event feeds.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {streaming.map((l) => <LogoTile key={l.name} {...l} />)}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-[#0D1B2A] mb-1.5">Files</h3>
            <p className="text-xs text-[#9CA3AF] mb-4">Upload spreadsheets and flat files directly, by hand or on a schedule.</p>
            <TextList items={files} />
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-[#0D1B2A] mb-1.5">APIs</h3>
            <p className="text-xs text-[#9CA3AF] mb-4">Connect using the standard methods other software already provides for sharing data.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
              {apis.map((l) => <LogoTile key={l.name} {...l} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
