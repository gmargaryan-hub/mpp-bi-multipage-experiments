'use client'

import { openDemoModal } from '@/lib/openDemoModal'
import { buttonClass } from '@/components/ui'

export default function DemoButton({
  label = 'Book a demo',
  variant = 'primary',
  className = '',
}: {
  label?: string
  variant?: keyof typeof buttonClass
  className?: string
}) {
  return (
    <button type="button" onClick={openDemoModal} className={`${buttonClass[variant]} ${className}`}>
      {label}
    </button>
  )
}
