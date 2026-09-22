import { ExternalLink } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2.5">
          <img src="/vaab-mark.svg" alt="" className="h-7 w-7" />
          <span className="font-serif text-lg tracking-tight">Vaab</span>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            v0.1
          </Badge>
        </a>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#playground" className="transition-colors hover:text-foreground">
            Try it
          </a>
          <a href="#install" className="transition-colors hover:text-foreground">
            Install
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <a
              href="https://github.com/vaab-lang/vaab"
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </Button>
          <Button size="sm" asChild>
            <a href="#playground">Try Vaab</a>
          </Button>
        </div>
      </div>
    </header>
  )
}
