import { toPlainText } from '@portabletext/react'
import { slugify } from '@/lib/slugify'
import type { PortableTextBlockContent } from '@/lib/sanity-queries'

type RawBlock = { _type: 'block'; _key: string; style?: string; [key: string]: unknown }

export default function TableOfContents({ content }: { content?: PortableTextBlockContent[] | null }) {
  if (!content) return null

  const headings = content
    .filter((block): block is RawBlock => block._type === 'block' && (block as RawBlock).style === 'h2')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((block) => toPlainText(block as any))
    .filter((text) => text.trim().length > 0)
    .map((text) => ({ text, slug: slugify(text) }))

  // A table of contents isn't useful for one heading (or zero) — only render when
  // there's actually something to navigate between.
  if (headings.length < 2) return null

  return (
    <nav aria-label="Table of contents" className="rounded-xl border border-[#E2E8F0] p-5 mb-10 not-prose">
      <p className="text-sm font-bold text-[#0D1B2A] mb-3">Contents</p>
      <ul className="flex flex-col gap-2">
        {headings.map((h) => (
          <li key={h.slug}>
            <a href={`#${h.slug}`} className="text-sm text-[#0AAEDB] hover:underline underline-offset-2">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
