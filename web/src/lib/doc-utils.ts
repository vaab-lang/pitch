export type DocHeading = {
  id: string
  title: string
  level: 2 | 3
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function extractHeadings(markdown: string): DocHeading[] {
  const headings: DocHeading[] = []
  for (const line of markdown.split('\n')) {
    if (line.startsWith('## ')) {
      const title = line.slice(3).trim()
      if (title.toLowerCase() === 'contents') continue
      headings.push({ id: slugify(title), title, level: 2 })
    }
    if (line.startsWith('### ')) {
      const title = line.slice(4).trim()
      headings.push({ id: slugify(title), title, level: 3 })
    }
  }
  return headings
}

export function rewriteDocLink(href: string | undefined): string | undefined {
  if (!href) return href
  if (href === 'DECISIONS.md' || href.endsWith('/DECISIONS.md')) return '/decisions'
  if (href === 'LANGUAGE.md' || href.endsWith('/LANGUAGE.md')) return '/spec'
  return href
}
