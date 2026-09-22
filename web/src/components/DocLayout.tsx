import { BookOpen, ChevronRight, Scale } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

import { MarkdownDoc } from '@/components/MarkdownDoc'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Badge } from '@/components/ui/badge'
import type { DocHeading } from '@/lib/doc-utils'
import { cn } from '@/lib/utils'

type DocLayoutProps = {
  badge: string
  badgeIcon: 'spec' | 'decisions'
  description: string
  content: string
  headings: DocHeading[]
  decisionEntries?: boolean
  sibling?: { href: string; label: string }
}

export function DocLayout({
  badge,
  badgeIcon,
  description,
  content,
  headings,
  decisionEntries = false,
  sibling,
}: DocLayoutProps) {
  const location = useLocation()
  const Icon = badgeIcon === 'decisions' ? Scale : BookOpen

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(16,185,129,0.07),transparent)]" />
      <Header />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 md:pt-32">
        <div className="mb-10 max-w-3xl">
          <Badge variant="accent" className="mb-5">
            <Icon className="h-3 w-3" />
            {badge}
          </Badge>
          <p className="text-lg leading-relaxed text-slate-400">{description}</p>
          {sibling && (
            <Link
              to={sibling.href}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
            >
              {sibling.label}
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        {/* Mobile TOC */}
        <nav className="mb-10 flex gap-2 overflow-x-auto pb-2 lg:hidden">
          {headings
            .filter((heading) => heading.level === 2)
            .slice(0, 12)
            .map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className="shrink-0 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-400 hover:border-slate-700 hover:text-slate-200"
              >
                {heading.title.replace(/\(phase \d+\)/i, '').trim()}
              </a>
            ))}
        </nav>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <nav className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
              <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                On this page
              </p>
              <ul className="space-y-1 border-l border-slate-800">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className={cn(
                        'block border-l-2 py-1.5 text-sm transition-colors hover:text-slate-100',
                        heading.level === 2
                          ? '-ml-px pl-4 font-medium text-slate-300'
                          : 'pl-7 text-slate-500 hover:text-slate-300',
                        location.hash === `#${heading.id}` && 'border-emerald-500 text-emerald-400',
                      )}
                    >
                      {heading.level === 3 && decisionEntries
                        ? heading.title.replace(/^D\d+\.\s*/, '')
                        : heading.title.replace(/\(phase \d+\)/i, '').trim()}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="lg:col-span-9">
            <div className="rounded-[2rem] border border-slate-800/80 bg-slate-900/30 p-6 sm:p-10">
              <MarkdownDoc content={content} decisionEntries={decisionEntries} />
            </div>
          </article>
        </div>
      </div>

      <Footer />
    </div>
  )
}
