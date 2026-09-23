import { Container } from '@/components/ui'
import DemoButton from '@/components/DemoButton'

export default function CTABand({
  title = 'See MPP BI on your own data',
  body = 'Tell us which databases you use and what you report on today. We will show you the same dashboards running live against them.',
  label = 'Book a demo',
}: {
  title?: string
  body?: string
  label?: string
}) {
  return (
    <section className="bg-navy py-16 md:py-20" id="booking">
      <Container className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-mist">{body}</p>
        </div>
        <DemoButton label={label} variant="inverted" className="shrink-0" />
      </Container>
    </section>
  )
}
