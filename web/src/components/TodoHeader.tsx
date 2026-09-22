import { ExternalLink, Zap } from 'lucide-react'

import { SITE_ORIGIN } from '@/lib/app-mode'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function TodoHeader() {
  return (
    <nav className="fixed top-0 z-40 w-full border-b border-slate-800/70 bg-slate-950/90 py-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <a
          href={SITE_ORIGIN}
          className="flex min-w-0 items-center gap-2.5 font-bold tracking-tight text-slate-100"
        >
          <div className="shrink-0 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 p-2 text-slate-950 shadow-lg shadow-emerald-500/20">
            <Zap size={18} strokeWidth={2.5} />
          </div>
          <span className="truncate text-xl leading-none">Todo</span>
          <Badge variant="accent" className="hidden normal-case sm:inline-flex">
            Store demo
          </Badge>
        </a>

        <div className="hidden items-center gap-6 text-sm font-semibold md:flex">
          <span className="text-emerald-400">KV-backed list</span>
          <a
            href={`${SITE_ORIGIN}/#built-in`}
            className="text-slate-400 transition-colors hover:text-slate-100"
          >
            Built-in I/O
          </a>
        </div>

        <Button variant="ghost" size="sm" asChild>
          <a href={SITE_ORIGIN}>
            <ExternalLink className="h-4 w-4" />
            <span className="hidden sm:inline">vaab.dev</span>
          </a>
        </Button>
      </div>
    </nav>
  )
}
