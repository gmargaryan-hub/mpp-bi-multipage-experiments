'use client'

import { useEffect, useRef } from 'react'

export default function HtmlEmbed({ code }: { code: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    // Browsers don't execute <script> tags set via innerHTML (a deliberate security
    // behavior), so this swaps each one for a freshly created, real <script> element,
    // which does execute — same technique used by every "inline HTML embed" pattern.
    const scripts = Array.from(container.querySelectorAll('script'))
    scripts.forEach((oldScript) => {
      const newScript = document.createElement('script')
      Array.from(oldScript.attributes).forEach((attr) => newScript.setAttribute(attr.name, attr.value))
      newScript.textContent = oldScript.textContent
      oldScript.parentNode?.replaceChild(newScript, oldScript)
    })
  }, [code])

  return <div ref={containerRef} className="my-8 not-prose" dangerouslySetInnerHTML={{ __html: code }} />
}
