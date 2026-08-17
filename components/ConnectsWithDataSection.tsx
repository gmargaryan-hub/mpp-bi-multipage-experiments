'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { asset } from '@/lib/basePath'

const logos = [
  { name: 'PostgreSQL', src: '/logos/postgresql.png' },
  { name: 'Oracle', src: '/logos/oracle.png' },
  { name: 'Microsoft SQL Server', src: '/logos/mssql.png' },
  { name: 'MySQL', src: '/logos/mysql.png' },
  { name: 'IBM DB2', src: '/logos/db2.png' },
  { name: 'SAP HANA', src: '/logos/sap-hana.png' },
  { name: 'ClickHouse', src: '/logos/clickhouse.png' },
  { name: 'Greenplum', src: '/logos/greenplum.png' },
  { name: 'Hadoop', src: '/logos/hadoop.png' },
  { name: 'Apache HBase', src: '/logos/hbase.png' },
  { name: 'Amazon S3', src: '/logos/amazon-s3.png' },
  { name: 'Apache Kafka', src: '/logos/kafka.png' },
  { name: 'NATS', src: '/logos/nats.png' },
  { name: 'MQTT', src: '/logos/mqtt.png' },
  { name: 'RabbitMQ', src: '/logos/rabbitmq.png' },
  { name: 'Redis', src: '/logos/redis.png' },
  { name: 'SAP', src: '/logos/sap.png' },
  { name: 'AWS', src: '/logos/aws.png' },
  { name: 'Google Cloud', src: '/logos/gcp.png' },
  { name: 'Azure', src: '/logos/azure.png' },
]

export default function ConnectsWithDataSection() {
  return (
    <section className="relative py-24 bg-[#F5F7FA]" id="connects">
      <div className="max-w-[1440px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Connects with your data
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-4">
            Wherever It Lives, MPP BI Connects to It
          </h2>
          <p className="text-[#374151] text-lg max-w-2xl mx-auto">
            Relational databases, warehouses, big data systems, streaming sources, files, and
            APIs — connect to almost any data source without moving it first.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="card-hover flex items-center justify-center h-20 bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 grayscale hover:grayscale-0 transition-all duration-300"
              title={logo.name}
            >
              <div className="relative w-full h-full">
                <Image
                  src={asset(logo.src)}
                  alt={logo.name}
                  fill
                  sizes="140px"
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </motion.div>

        <p className="text-center text-sm text-[#6B7280] mt-8">
          Plus Excel, CSV, Parquet, Avro, DBF, QVD files, REST, JDBC, and custom connectors.
        </p>
      </div>
    </section>
  )
}
