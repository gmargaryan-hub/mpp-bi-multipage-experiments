import Image from 'next/image'
import Link from 'next/link'
import { PortableText, toPlainText, type PortableTextComponents } from '@portabletext/react'
import { Highlight, themes } from 'prism-react-renderer'
import { ArrowRight } from 'lucide-react'
import { urlForImage } from '@/lib/sanity'
import { slugify } from '@/lib/slugify'
import CopyCodeButton from '@/components/CopyCodeButton'
import HtmlEmbed from '@/components/HtmlEmbed'
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
      <div className="relative w-full rounded-lg overflow-hidden bg-paper" style={{ aspectRatio: '16 / 9' }}>
        <Image src={imgUrl} alt={value.alt || ''} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
      </div>
      {value.caption && (
        <figcaption className="text-center text-xs text-slate mt-2.5">{value.caption}</figcaption>
      )}
    </figure>
  )
}

function StatisticsBlockRenderer({ value }: { value: StatisticsBlock }) {
  if (!value?.items?.length) return null
  return (
    <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {value.items.map((item, i) => (
        <div key={i} className="rounded-lg border border-line bg-paper p-5">
          <p className="text-2xl font-black text-navy leading-tight">{item.value}</p>
          <p className="text-xs font-medium text-ink mt-1.5">{item.label}</p>
          {item.description && <p className="text-xs text-slate mt-1.5 leading-relaxed">{item.description}</p>}
        </div>
      ))}
    </div>
  )
}

function ComparisonTableRenderer({ value }: { value: ComparisonTableBlock }) {
  if (!value?.rows?.length) return null
  return (
    <div className="my-8 rounded-lg border border-line overflow-hidden not-prose">
      {(value.title || value.description) && (
        <div className="px-5 py-4 border-b border-line bg-paper">
          {value.title && <p className="text-sm font-semibold text-ink">{value.title}</p>}
          {value.description && <p className="text-xs text-slate mt-1">{value.description}</p>}
        </div>
      )}
      <p className="sm:hidden text-center text-[10px] text-slate pt-3">← swipe →</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[480px]">
          <thead>
            <tr className="border-b border-line">
              <th className="text-left px-4 sm:px-5 py-2.5 text-xs font-medium text-slate">Feature</th>
              <th className="text-left px-4 sm:px-5 py-2.5 text-xs font-medium text-navy">MPP BI</th>
              <th className="text-left px-4 sm:px-5 py-2.5 text-xs font-medium text-slate">Power BI</th>
            </tr>
          </thead>
          <tbody>
            {value.rows.map((row, i) => (
              <tr key={i} className="border-b border-tint last:border-0">
                <td className="px-4 sm:px-5 py-3 font-semibold text-ink">{row.feature}</td>
                <td className="px-4 sm:px-5 py-3 text-body">{row.mppBi}</td>
                <td className="px-4 sm:px-5 py-3 text-slate">{row.powerBi}</td>
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
function CodeBlockRenderer({ value }: { value: CodeBlock }) {
  if (!value?.code) return null

  // HTML blocks are injected directly into the page (not shown as highlighted
  // source text like the other languages), so they render natively rather than
  // sitting in a boxed embed.
  if (value.language === 'html') {
    return <HtmlEmbed code={value.code} />
  }

  return (
    <div className="my-8 rounded-lg overflow-hidden not-prose bg-ink border border-white/10">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
        <span className="text-[11px] font-mono text-navy">
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
    <div className="my-8 rounded-lg border border-navy/25 bg-navy/5 p-6 sm:p-8 text-center not-prose">
      {value.title && <p className="text-xl sm:text-2xl font-semibold text-ink mb-2">{value.title}</p>}
      {value.text && <p className="text-body text-sm leading-relaxed max-w-xl mx-auto mb-5">{value.text}</p>}
      {value.buttonText && value.buttonUrl && (
        <Link
          href={value.buttonUrl}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-medium text-white bg-navy hover:bg-navy-strong transition-colors"
        >
          {value.buttonText}
          <ArrowRight size={15} className="flex-shrink-0" />
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
    normal: ({ children }) => <p className="text-body text-base leading-relaxed mb-5">{children}</p>,
    h2: ({ children, value }) => (
      <h2 id={slugify(toPlainText(value))} className="text-2xl sm:text-3xl font-semibold text-ink mt-10 mb-4 scroll-mt-24">
        {children}
      </h2>
    ),
    h3: ({ children }) => <h3 className="text-xl sm:text-2xl font-semibold text-ink mt-8 mb-3">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-semibold text-ink mt-6 mb-2">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-navy pl-5 my-6 text-ink text-lg italic leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 mb-5 space-y-1.5 text-body">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 mb-5 space-y-1.5 text-body">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-base leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="text-base leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
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
          className="text-navy underline underline-offset-2 hover:text-navy-strong"
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
