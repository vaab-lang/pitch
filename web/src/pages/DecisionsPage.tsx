import decisionsContent from '@/content/DECISIONS.md?raw'

import { DocLayout } from '@/components/DocLayout'
import { extractHeadings } from '@/lib/doc-utils'

const headings = extractHeadings(decisionsContent)

export function DecisionsPage() {
  return (
    <DocLayout
      badge="Design decisions"
      badgeIcon="decisions"
      description="Choices the specification did not make — what was decided, why, and what it costs. Recorded so the language stays honest as it grows."
      content={decisionsContent}
      headings={headings}
      decisionEntries
      sibling={{ href: '/spec', label: 'Read the language spec' }}
    />
  )
}
