import { ArrowRight, Sparkles } from 'lucide-react'

import { VaabCode } from '@/components/VaabCode'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const SAMPLE_CODE = `cast Account {
    changing owner: Text
    changing balance: Int = 0

    to deposit(amount: Int) returns Account or fails AccountError {
        if amount <= 0 { return failure AccountError.InvalidAmount(amount) }
        self.balance = self.balance + amount
        return success self
    }
}

choice AccountError { InvalidAmount(amount: Int) }

match Account.new(owner: "Ada").deposit(25) {
    when success a then print("{a.owner} has {a.balance}")
    when failure _   then print("that did not work")
}`

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-36 sm:px-6 md:pb-40 md:pt-48">
      <div className="pointer-events-none absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/3 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute left-0 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-indigo-500/10 blur-[100px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <Badge variant="default" className="mb-8">
            <Sparkles className="h-3 w-3" fill="currentColor" />
            Strictly typed · Plain English
          </Badge>

          <h1 className="mb-8 text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-50 sm:text-5xl md:text-7xl">
            Code that reads like you{' '}
            <span className="text-gradient">meant it</span>.
          </h1>

          <p className="mb-10 max-w-lg text-lg font-medium leading-relaxed text-slate-400 md:text-xl">
            Vaab is a programming language that prefers words to symbols, checks
            every signature at compile time, and makes data races a type error,
            not a Friday-night surprise.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Button size="lg" asChild>
              <a href="#playground" className="group">
                Try Vaab in the browser
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#install">Install locally</a>
            </Button>
          </div>

          <p className="mt-8 text-sm font-medium text-slate-500">
            Open source · MIT licensed · Built for readable backends
          </p>
        </div>

        <div className="relative flex items-center lg:h-[520px]">
          <div className="relative z-10 w-full rotate-1 transition-transform duration-700 ease-out hover:rotate-0">
            <VaabCode code={SAMPLE_CODE} filename="account.vaab" minHeight="320px" />
          </div>
          <div className="absolute -right-10 -top-10 -z-10 h-full w-full -rotate-3 rounded-[3rem] border border-emerald-500/20 bg-gradient-to-br from-emerald-950/80 to-teal-950/80" />
        </div>
      </div>
    </section>
  )
}
