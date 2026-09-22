import languageContent from '@/content/LANGUAGE.md?raw'

import { DocLayout } from '@/components/DocLayout'
import { extractHeadings } from '@/lib/doc-utils'

const headings = extractHeadings(languageContent)

export function SpecPage() {
  return (
    <DocLayout
      badge="Language spec"
      badgeIcon="spec"
      description="The living specification for Vaab — syntax, types, concurrency, and the standard library. Everything marked (phase N) is designed but not yet built."
      content={languageContent}
      headings={headings}
      sibling={{ href: '/decisions', label: 'Read design decisions' }}
    />
  )
}
