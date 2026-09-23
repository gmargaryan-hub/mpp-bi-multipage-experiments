import Image from 'next/image'
import { asset } from '@/lib/basePath'
import { RuleList, Screenshot } from '@/components/ui'

const results = [
  'Sensitive social-services data stays on WISE’s own infrastructure',
  'Reporting pulls several systems into one consistent view',
  'Far less dependence on the Microsoft ecosystem',
  'New data sources and users are added without re-licensing',
]

export default function CaseStudy() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
      <div>
        <p className="text-sm font-medium text-slate">Case study</p>
        <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
          WISE moved its social-services reporting off Power BI
        </h2>
        <p className="mt-5 text-lg leading-relaxed">
          WISE runs the digital social-services systems of Armenia’s Ministry of Labour and Social Affairs, in partnership
          with UNDP. It needed BI that ran entirely on its own servers and could grow without new licensing rounds. Power BI
          could not do that; MPP BI does.
        </p>
        <RuleList className="mt-6" items={results} />
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Image src={asset('/case-study/wise.png')} alt="WISE" width={320} height={90} className="h-8 w-auto" />
          <Image src={asset('/case-study/undp.png')} alt="UNDP" width={300} height={130} className="h-10 w-auto" />
          <Image
            src={asset('/case-study/ministry-of-labor-armenia.png')}
            alt="Ministry of Labour and Social Affairs of the Republic of Armenia"
            width={370}
            height={240}
            className="h-12 w-auto"
          />
        </div>
        <a
          href="https://mpp-insights.com/blog/social-services-analytics"
          className="mt-8 inline-block text-sm font-medium text-brand underline underline-offset-4 decoration-mist hover:decoration-brand"
        >
          Read the full case study
        </a>
      </div>
      <Screenshot
        src="/case-study/wise-dashboard.png"
        alt="Social-services dashboard built on MPP BI for WISE"
        width={1280}
        height={600}
        caption="The WISE social-services dashboard."
      />
    </div>
  )
}
