'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Server, Cloud, Container, HardDrive } from 'lucide-react'
import { asset } from '@/lib/basePath'

const deployments = [
  {
    icon: Server,
    title: 'On-premise',
    body: 'Runs natively on Rocky Linux 8 and 9, Red Hat Linux, and works with UNIX-compatible systems.',
    logos: [{ name: 'Rocky Linux', src: '/logos/rocky-linux.png' }, { name: 'Red Hat', src: '/logos/red-hat.png' }],
  },
  {
    icon: Cloud,
    title: 'In the cloud',
    body: 'Deploy on AWS, Azure, or Google Cloud.',
    logos: [{ name: 'AWS', src: '/logos/aws.png' }, { name: 'Azure', src: '/logos/azure.png' }, { name: 'Google Cloud', src: '/logos/gcp.png' }],
  },
  {
    icon: Container,
    title: 'In containers',
    body: 'Ships as Docker containers, one per component, so you can run them together or split them across setups.',
    logos: [{ name: 'Docker', src: '/logos/docker.png' }],
  },
  {
    icon: HardDrive,
    title: 'In virtual machines',
    body: 'Comes as a ready-to-use image (OVA) for Hyper-V, VirtualBox, and KVM.',
    logos: [{ name: 'Hyper-V', src: '/logos/hyper-v.png' }, { name: 'VirtualBox', src: '/logos/virtualbox.webp' }, { name: 'KVM', src: '/logos/kvm.png' }, { name: 'VMware', src: '/logos/vmware.png' }],
  },
]

export default function DeploymentOptionsSection() {
  return (
    <section className="relative py-24 bg-[#F5F7FA]" id="deployment-options">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <p className="text-[#0AAEDB] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Flexible Deployment
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-5">
            Runs Where You Want
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed">
            Use your own infrastructure, set up the way you prefer. Whether you keep
            everything in-house, run it in the cloud, or mix both, it fits how you already
            work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
          {deployments.map((d, i) => {
            const Icon = d.icon
            return (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-[#E2E8F0] bg-white p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: '#0AAEDB15', border: '1px solid #0AAEDB30' }}
                  >
                    <Icon size={16} style={{ color: '#0AAEDB' }} />
                  </div>
                  <h3 className="text-sm font-bold text-[#0D1B2A]">{d.title}</h3>
                </div>
                <p className="text-xs text-[#6B7280] leading-relaxed mb-4">{d.body}</p>
                <div className="flex flex-wrap gap-2">
                  {d.logos.map((l) => (
                    <div key={l.name} className="h-9 w-20 relative bg-[#F5F7FA] rounded-md border border-[#E2E8F0] p-1.5" title={l.name}>
                      <Image src={asset(l.src)} alt={l.name} fill sizes="80px" className="object-contain p-0.5" unoptimized />
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-base font-bold text-[#0D1B2A] mb-3">Start Small or Run a Full Cluster</h3>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Run it on a single machine, or across many. Both single-node and multi-node
              setups are supported, so you can match the size of your deployment to your
              needs.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <h3 className="text-base font-bold text-[#0D1B2A] mb-3">Grow as Your Needs Grow</h3>
            <p className="text-sm text-[#6B7280] leading-relaxed mb-2">
              <strong className="text-[#0D1B2A]">Horizontal scaling</strong> &mdash; spread
              the load across extra nodes using the built-in load balancer (Nginx), or split
              services across separate machines.
            </p>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              <strong className="text-[#0D1B2A]">Vertical scaling</strong> &mdash; add more
              memory and processing power to the machines you already have.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-[#E2E8F0]">
            <h3 className="text-sm font-bold text-[#0D1B2A]">What You&apos;ll Need to Run It</h3>
          </div>
          <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                <th className="text-left px-3 sm:px-6 py-3 text-xs font-bold uppercase tracking-wide text-[#9CA3AF]"></th>
                <th className="text-left px-3 sm:px-6 py-3 text-xs font-bold uppercase tracking-wide text-[#9CA3AF]">Minimum requirement</th>
                <th className="text-left px-3 sm:px-6 py-3 text-xs font-bold uppercase tracking-wide text-[#9CA3AF]">
                  <span className="sm:hidden">500 users</span>
                  <span className="hidden sm:inline">For 500 users at once</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#F1F5F9]">
                <td className="px-3 sm:px-6 py-3.5 font-semibold text-[#0D1B2A]">Node(s)</td>
                <td className="px-3 sm:px-6 py-3.5 text-[#374151]">1</td>
                <td className="px-3 sm:px-6 py-3.5 text-[#374151]">2</td>
              </tr>
              <tr className="border-b border-[#F1F5F9]">
                <td className="px-3 sm:px-6 py-3.5 font-semibold text-[#0D1B2A]">Processor</td>
                <td className="px-3 sm:px-6 py-3.5 text-[#374151]">8 cores</td>
                <td className="px-3 sm:px-6 py-3.5 text-[#374151]">16 cores / each</td>
              </tr>
              <tr>
                <td className="px-3 sm:px-6 py-3.5 font-semibold text-[#0D1B2A]">Memory (RAM)</td>
                <td className="px-3 sm:px-6 py-3.5 text-[#374151]">24 GB</td>
                <td className="px-3 sm:px-6 py-3.5 text-[#374151]">32 GB / each</td>
              </tr>
            </tbody>
          </table>
          </div>
        </motion.div>

        <div className="flex items-center gap-6 mt-8 text-xs text-[#6B7280]">
          <p><strong className="text-[#0D1B2A]">High availability</strong> &mdash; database clustering (Patroni), hot and cold backup options.</p>
        </div>
        <p className="text-xs text-[#6B7280] mt-2">
          <strong className="text-[#0D1B2A]">Automatic backups</strong> &mdash; set backups to run on a schedule, so your data is always protected.
        </p>
      </div>
    </section>
  )
}
