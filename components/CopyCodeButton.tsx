'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — fail silently, no UI to fix.
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-[11px] font-mono text-white/40 hover:text-white/80 transition-colors"
      aria-label="Copy code"
    >
      {copied ? (
        <>
          <Check size={12} />
          Copied
        </>
      ) : (
        <>
          <Copy size={12} />
          Copy
        </>
      )}
    </button>
  )
}
