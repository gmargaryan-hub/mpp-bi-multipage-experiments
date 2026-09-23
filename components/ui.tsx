import Image from 'next/image'
import Link from 'next/link'
import { asset } from '@/lib/basePath'

export function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>
}

const tones = {
  white: 'bg-white',
  paper: 'bg-paper border-y border-line',
  brand: 'bg-brand text-mist',
}

export function Section({
  id,
  tone = 'white',
  className = '',
  children,
}: {
  id?: string
  tone?: keyof typeof tones
  className?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={`py-16 md:py-24 ${tones[tone]} ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}

export function SectionHeader({
  title,
  lede,
  className = '',
}: {
  title: React.ReactNode
  lede?: React.ReactNode
  className?: string
}) {
  return (
    <div className={`max-w-2xl mb-10 md:mb-12 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">{title}</h2>
      {lede && <p className="mt-4 text-lg leading-relaxed">{lede}</p>}
    </div>
  )
}

/** Title block at the top of every inner page. */
export function PageHeader({
  title,
  lede,
  children,
}: {
  title: React.ReactNode
  lede?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <section className="bg-paper border-b border-line pt-32 pb-14 md:pt-40 md:pb-20">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">{title}</h1>
          {lede && <p className="mt-5 text-lg md:text-xl leading-relaxed">{lede}</p>}
          {children && <div className="mt-8 flex flex-wrap items-center gap-4">{children}</div>}
        </div>
      </Container>
    </section>
  )
}

export const buttonClass = {
  primary:
    'inline-flex items-center justify-center rounded-md bg-brand px-5 py-3 text-sm font-medium text-white hover:bg-brand-strong transition-colors',
  secondary:
    'inline-flex items-center justify-center rounded-md border border-line bg-white px-5 py-3 text-sm font-medium text-ink hover:border-mist transition-colors',
  inverted:
    'inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-medium text-brand hover:bg-tint transition-colors',
  link: 'text-sm font-medium text-brand underline underline-offset-4 decoration-mist hover:decoration-brand',
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={buttonClass.link}>
      {children}
    </Link>
  )
}

/** A product screenshot in a thin frame, with an optional caption underneath. */
export function Screenshot({
  src,
  alt,
  width,
  height,
  caption,
  priority,
  className = '',
}: {
  src: string
  alt: string
  width: number
  height: number
  caption?: React.ReactNode
  priority?: boolean
  className?: string
}) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-lg border border-line bg-paper shadow-[0_1px_2px_rgba(16,34,58,0.06),0_8px_24px_rgba(16,34,58,0.06)]">
        <Image
          src={asset(src)}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(max-width: 1152px) 100vw, 1152px"
          className="block h-auto w-full"
        />
      </div>
      {caption && <figcaption className="mt-3 text-sm leading-relaxed text-slate">{caption}</figcaption>}
    </figure>
  )
}

/** Simple list with a short brand rule as the marker. */
export function RuleList({ items, className = '' }: { items: React.ReactNode[]; className?: string }) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="relative pl-5 leading-relaxed">
          <span className="absolute left-0 top-[0.7em] h-px w-2.5 bg-brand" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  )
}
