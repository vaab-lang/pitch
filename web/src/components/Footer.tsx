import { Separator } from '@/components/ui/separator'

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <img src="/vaab-mark.svg" alt="" className="h-6 w-6 opacity-80" />
            <span className="font-serif text-lg">Vaab</span>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <a
              href="https://github.com/vaab-lang/vaab"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href="https://github.com/vaab-lang/vaab/blob/master/docs/LANGUAGE.md"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              Language spec
            </a>
            <a
              href="https://github.com/vaab-lang/vaab/blob/master/docs/DECISIONS.md"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              Design decisions
            </a>
          </nav>
        </div>

        <Separator className="my-8" />

        <p className="text-sm text-muted-foreground">
          Vaab — a strictly typed, plain-English programming language. MIT
          licensed.
        </p>
      </div>
    </footer>
  )
}
