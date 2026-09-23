import type { Result, Step } from '@/components/Execution'

// Goals handed to the real MPP BI agent, with its real steps and screenshots of the real
// result. Source: mpp-bi-multipage-experiments-media/intents/manifest.json (runs on the
// MPP BI demo installation) and the Power BI migration eval (trial 24, task 006).

export type Intent = {
  slug: string
  kind: string
  intent: string
  sources: string
  seconds: number
  steps: Step[]
  results: Result[]
}

export const intents: Intent[] = []
