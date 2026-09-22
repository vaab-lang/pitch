import { ArrowDown, Sparkles } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="hero-glow relative overflow-hidden pb-16 pt-20 sm:pb-24 sm:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <Badge variant="accent" className="mb-6">
            <Sparkles className="h-3 w-3" />
            Strictly typed · Plain English
          </Badge>

          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Code that reads like you{' '}
            <em className="text-gradient not-italic">meant it</em>.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Vaab is a programming language that prefers words to symbols, checks
            every signature at compile time, and makes data races a type error —
            not a Friday-night surprise.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button size="lg" asChild>
              <a href="#playground">Try Vaab in the browser</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#install">Install locally</a>
            </Button>
          </div>
        </div>

        <div className="blueprint-corner mt-16 max-w-2xl rounded-lg border border-border bg-card/80 p-6 backdrop-blur-sm">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
            A taste of Vaab
          </p>
          <pre className="overflow-x-auto font-mono text-sm leading-relaxed text-foreground/90">
            <code>{`type Account {
    owner: Text
    balance: Int = 0
}

match account.deposit(25) {
    when success a then print("{a.owner} has {a.balance}")
    when failure _   then print("that did not work")
}`}</code>
          </pre>
        </div>

        <a
          href="#features"
          className="mt-16 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          aria-label="Scroll to features"
        >
          <ArrowDown className="h-4 w-4 animate-bounce" />
          See what makes Vaab different
        </a>
      </div>
    </section>
  )
}
