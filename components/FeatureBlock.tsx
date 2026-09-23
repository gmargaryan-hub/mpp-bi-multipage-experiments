import { Container } from '@/components/ui'

export type FeatureItem = { term: string; body: React.ReactNode }

/** Heading and intro on the left, a definition list on the right. Used for each feature area. */
export default function FeatureBlock({
  id,
  title,
  intro,
  items,
  children,
  tone = 'white',
}: {
  id: string
  title: string
  intro: React.ReactNode
  items?: FeatureItem[]
  children?: React.ReactNode
  tone?: 'white' | 'paper'
}) {
  return (
    <section id={id} className={`py-16 md:py-20 ${tone === 'paper' ? 'bg-paper border-y border-line' : ''}`}>
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">{title}</h2>
            <div className="mt-4 space-y-3 leading-relaxed">{intro}</div>
          </div>
          {items && (
            <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {items.map((it) => (
                <div key={it.term} className="border-t border-line pt-4">
                  <dt className="font-medium text-ink">{it.term}</dt>
                  <dd className="mt-1 text-[0.95rem] leading-relaxed">{it.body}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        {children && <div className="mt-12">{children}</div>}
      </Container>
    </section>
  )
}
