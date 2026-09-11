import Image from 'next/image'
import Link from 'next/link'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { Highlight, themes } from 'prism-react-renderer'
import { ArrowRight } from 'lucide-react'
import { urlForImage } from '@/lib/sanity'
import CopyCodeButton from '@/components/CopyCodeButton'
import type {
  PortableTextBlockContent,
  ArticleImageBlock,
  StatisticsBlock,
  ComparisonTableBlock,
  CodeBlock,
  CtaBlock,
} from '@/lib/sanity-queries'

function ArticleImage({ value }: { value: ArticleImageBlock }) {
  if (!value?.asset) return null
  const imgUrl = urlForImage(value).width(1400).fit('max').auto('format').url()
  return (
    <figure className="my-8">
      <div className="relative w-full rounded-xl overflow-hidden bg-[#F5F7FA]" style={{ aspectRatio: '16 / 9' }}>
        <Image src={imgUrl} alt={value.alt || ''} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
      </div>
      {value.caption && (
        <figcaption className="text-center text-xs text-[#9CA3AF] mt-2.5">{value.caption}</figcaption>
      )}
    </figure>
  )
}

function StatisticsBlockRenderer({ value }: { value: StatisticsBlock }) {
  if (!value?.items?.length) return null
  return (
    <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {value.items.map((item, i) => (
        <div key={i} className="rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] p-5">
          <p className="text-2xl font-black font-display text-[#0AAEDB] leading-tight">{item.value}</p>
          <p className="text-xs font-bold uppercase tracking-wide text-[#0D1B2A] mt-1.5">{item.label}</p>
          {item.description && <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed">{item.description}</p>}
        </div>
      ))}
    </div>
  )
}

function ComparisonTableRenderer({ value }: { value: ComparisonTableBlock }) {
  if (!value?.rows?.length) return null
  return (
    <div className="my-8 rounded-xl border border-[#E2E8F0] overflow-hidden not-prose">
      {(value.title || value.description) && (
        <div className="px-5 py-4 border-b border-[#E2E8F0] bg-[#F5F7FA]">
          {value.title && <p className="text-sm font-bold text-[#0D1B2A]">{value.title}</p>}
          {value.description && <p className="text-xs text-[#6B7280] mt-1">{value.description}</p>}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[480px]">
          <thead>
            <tr className="border-b border-[#E2E8F0]">
              <th className="text-left px-4 sm:px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-[#9CA3AF]">Feature</th>
              <th className="text-left px-4 sm:px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-[#0AAEDB]">MPP BI</th>
              <th className="text-left px-4 sm:px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-[#9CA3AF]">Power BI</th>
            </tr>
          </thead>
          <tbody>
            {value.rows.map((row, i) => (
              <tr key={i} className="border-b border-[#F1F5F9] last:border-0">
                <td className="px-4 sm:px-5 py-3 font-semibold text-[#0D1B2A]">{row.feature}</td>
                <td className="px-4 sm:px-5 py-3 text-[#374151]">{row.mppBi}</td>
                <td className="px-4 sm:px-5 py-3 text-[#6B7280]">{row.powerBi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const languageLabels: Record<CodeBlock['language'], string> = {
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  python: 'Python',
  sql: 'SQL',
  json: 'JSON',
  html: 'HTML',
  css: 'CSS',
  bash: 'Bash',
}

function HtmlEmbed({ code }: { code: string }) {
  return (
    <div className="my-8 rounded-xl overflow-hidden not-prose border border-[#E2E8F0]">
      <iframe
        srcDoc={code}
        sandbox="allow-scripts"
        title="Embedded HTML"
        className="w-full bg-white"
        style={{ height: '500px', border: 'none' }}
      />
    </div>
  )
}

function CodeBlockRenderer({ value }: { value: CodeBlock }) {
  if (!value?.code) return null

  // HTML blocks render live — the actual markup/CSS/script runs in a sandboxed
  // iframe, not shown as highlighted source text like the other languages.
  if (value.language === 'html') {
    return <HtmlEmbed code={value.code} />
  }

  return (
    <div className="my-8 rounded-xl overflow-hidden not-prose bg-[#0D1B2A] border border-white/10">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
        <span className="text-[11px] font-mono text-[#0AAEDB] tracking-widest uppercase">
          {languageLabels[value.language] || value.language}
        </span>
        <CopyCodeButton code={value.code} />
      </div>
      <Highlight theme={themes.vsDark} code={value.code.trim()} language={value.language}>
        {({ className, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} p-4 text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre bg-transparent`}>
            {tokens.map((line, i) => {
              const { className: lineClassName, ...lineProps } = getLineProps({ line })
              return (
                <div key={i} className={lineClassName} {...lineProps}>
                  {line.map((token, key) => {
                    const { className: tokenClassName, ...tokenProps } = getTokenProps({ token })
                    return <span key={key} className={tokenClassName} {...tokenProps} />
                  })}
                </div>
              )
            })}
          </pre>
        )}
      </Highlight>
    </div>
  )
}

function CtaBlockRenderer({ value }: { value: CtaBlock }) {
  if (!value) return null
  return (
    <div className="my-8 rounded-2xl border border-[#0AAEDB]/25 bg-[#0AAEDB]/5 p-6 sm:p-8 text-center not-prose">
      {value.title && <p className="font-display text-xl sm:text-2xl font-bold text-[#0D1B2A] mb-2">{value.title}</p>}
      {value.text && <p className="text-[#374151] text-sm leading-relaxed max-w-xl mx-auto mb-5">{value.text}</p>}
      {value.buttonText && value.buttonUrl && (
        <Link
          href={value.buttonUrl}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-[#0A0E1A] transition-all hover:opacity-90"
          style={{ background: '#0AAEDB' }}
        >
          {value.buttonText}
          <ArrowRight size={15} />
        </Link>
      )}
    </div>
  )
}

const components: PortableTextComponents = {
  types: {
    articleImage: ArticleImage,
    statisticsBlock: StatisticsBlockRenderer,
    comparisonTable: ComparisonTableRenderer,
    codeBlock: CodeBlockRenderer,
    ctaBlock: CtaBlockRenderer,
  },
  block: {
    normal: ({ children }) => <p className="text-[#374151] text-base leading-relaxed mb-5">{children}</p>,
    h2: ({ children }) => <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0D1B2A] mt-10 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0D1B2A] mt-8 mb-3">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-bold text-[#0D1B2A] mt-6 mb-2">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-[#0AAEDB] pl-5 my-6 text-[#0D1B2A] text-lg italic leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 mb-5 space-y-1.5 text-[#374151]">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 mb-5 space-y-1.5 text-[#374151]">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-base leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="text-base leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-[#0D1B2A]">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    link: ({ value, children }) => {
      const href = value?.href || '#'
      const isExternal = /^https?:\/\//.test(href)
      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-[#0AAEDB] underline underline-offset-2 hover:text-[#0074A6]"
        >
          {children}
        </a>
      )
    },
  },
}

export default function PortableTextRenderer({ value }: { value: PortableTextBlockContent[] }) {
  if (!value?.length) return null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PortableText value={value as any} components={components} />
}
