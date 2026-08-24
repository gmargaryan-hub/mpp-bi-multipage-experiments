'use client'

import Image from 'next/image'

interface LogoItem {
  src: string
  alt: string
  width: number
  height: number
  subtitle?: string
}

const baseLogos: LogoItem[] = [
  { src: '/logos/wm-logo.png', alt: 'William & Mary', width: 280, height: 110, subtitle: 'Washington & Madison' },
  { src: '/logos/henrico-eda.webp', alt: 'Henrico EDA', width: 380, height: 130, subtitle: 'Global Business Gateway' },
  { src: '/logos/onepager-undp.png', alt: 'UNDP', width: 160, height: 100 },
  { src: '/logos/nork.png', alt: 'Nork Technology Center', width: 320, height: 110 },
  { src: '/logos/avromic.jpeg', alt: 'Avromic', width: 200, height: 80 },
  { src: '/logos/stantonlaw.png', alt: 'Stanton Law', width: 180, height: 110 },
  { src: '/logos/marmar.webp', alt: 'Mar Mar Richmond', width: 180, height: 90 },
]

// Triple for seamless marquee loop
const logos = [...baseLogos, ...baseLogos, ...baseLogos]

export default function TrustedGloballySection() {
  return (
    <section className="py-14 border-y border-[#E2E8F0] bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <p className="text-[#6B7280] text-sm font-semibold tracking-[0.15em] uppercase">
          Trusted Globally
        </p>
      </div>

      {/* Marquee track */}
      <div className="relative w-full overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, white, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, white, transparent)' }} />

        <div className="flex gap-20 items-center animate-marquee whitespace-nowrap">
          {logos.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col items-center justify-center opacity-60 hover:opacity-95 transition-opacity duration-300"
              style={{ minWidth: logo.width, gap: 2 }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="object-contain w-auto"
                style={{
                  height: logo.height,
                  filter: 'grayscale(100%)',
                }}
                unoptimized
              />
              {logo.subtitle && (
                <span className="text-[9px] text-[#9CA3AF] font-semibold tracking-[0.12em] uppercase whitespace-nowrap">
                  {logo.subtitle}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
