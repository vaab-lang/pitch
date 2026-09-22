import { ArrowRight, Check, Terminal } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const STEPS = [
  'curl -fsSL https://raw.githubusercontent.com/vaab-lang/vaab/master/install.sh | sh',
  'vaab new my-app',
  'vaab run my-app/main.vaab',
]

const COMMANDS = [
  { cmd: 'vaab run', desc: 'Parse, check, and execute' },
  { cmd: 'vaab check', desc: 'Type-check without running' },
  { cmd: 'vaab repl', desc: 'Interactive session' },
  { cmd: 'vaab serve', desc: 'Start an HTTP server' },
]

export function Install() {
  return (
    <section id="install" className="border-t border-slate-800 bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <Badge variant="accent" className="mb-6">
              Get started
            </Badge>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-50 sm:text-5xl">
              Install in one line.
            </h2>
            <p className="mt-4 text-lg font-medium text-slate-400">
              Vaab ships as a single binary. Put it on your PATH and start
              building readable backends today.
            </p>

            <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-700 bg-slate-900 shadow-sm">
              <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-950/80 px-5 py-3">
                <Terminal className="h-4 w-4 text-emerald-400" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                  terminal
                </span>
              </div>
              <div className="space-y-3 p-5 font-mono text-sm">
                {STEPS.map((step, i) => (
                  <div key={step} className="flex gap-3">
                    <span className="select-none font-bold text-slate-600">{i + 1}.</span>
                    <code className="break-all text-slate-300">{step}</code>
                  </div>
                ))}
              </div>
            </div>

            <Button variant="outline" className="mt-6" asChild>
              <a
                href="https://github.com/vaab-lang/vaab/blob/master/docs/LANGUAGE.md"
                target="_blank"
                rel="noreferrer"
                className="group"
              >
                Read the language spec
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>

          <div className="space-y-6">
            <Card className="hover:border-slate-700 hover:shadow-lg hover:shadow-emerald-500/5">
              <CardHeader>
                <CardTitle>CLI commands</CardTitle>
                <CardDescription>
                  Everything you need from the terminal.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {COMMANDS.map(({ cmd, desc }) => (
                  <div
                    key={cmd}
                    className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <div>
                      <code className="font-mono text-sm font-semibold text-emerald-400">
                        {cmd}
                      </code>
                      <p className="mt-0.5 text-sm text-slate-400">{desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-emerald-500/20 bg-emerald-500/5">
              <CardHeader>
                <CardTitle>Vaab as your backend</CardTitle>
                <CardDescription>
                  This site is served entirely by Vaab — static files, health
                  checks, and the playground API all run from{' '}
                  <code className="font-mono text-xs font-semibold text-emerald-400">
                    main.vaab
                  </code>
                  .
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
