import changelogContent from '@/content/CHANGELOG.md?raw'

import { DocLayout } from '@/components/DocLayout'
import { extractHeadings } from '@/lib/doc-utils'

const headings = extractHeadings(changelogContent)

export function ChangelogPage() {
  return (
    <DocLayout
      badge="Changelog"
      badgeIcon="changelog"
      description="What shipped in each Vaab release — language, standard library, and tooling. Newest first."
      content={changelogContent}
      headings={headings}
      sibling={{ href: '/spec', label: 'Read the language spec' }}
    />
  )
}
