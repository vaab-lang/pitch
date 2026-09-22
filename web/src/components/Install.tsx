import { Check, Terminal } from 'lucide-react'

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
    <section id="install" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Badge variant="default" className="mb-4">
              Get started
            </Badge>
            <h2 className="font-serif text-4xl tracking-tight sm:text-5xl">
              Install in one line.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Vaab ships as a single binary. Put it on your PATH and start
              building readable backends today.
            </p>

            <div className="blueprint-corner mt-8 overflow-hidden rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2">
                <Terminal className="h-4 w-4 text-primary" />
                <span className="font-mono text-xs text-muted-foreground">
                  terminal
                </span>
              </div>
              <div className="space-y-3 p-4 font-mono text-sm">
                {STEPS.map((step, i) => (
                  <div key={step} className="flex gap-3">
                    <span className="select-none text-muted-foreground">
                      {i + 1}.
                    </span>
                    <code className="break-all text-foreground/90">{step}</code>
                  </div>
                ))}
              </div>
            </div>

            <Button variant="outline" className="mt-6" asChild>
              <a
                href="https://github.com/vaab-lang/vaab/blob/master/docs/LANGUAGE.md"
                target="_blank"
                rel="noreferrer"
              >
                Read the language spec
              </a>
            </Button>
          </div>

          <div className="space-y-4">
            <Card className="border-border/80 bg-card/60">
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
                    className="flex items-start gap-3 rounded-md border border-border/60 bg-background/50 px-3 py-2.5"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <code className="font-mono text-sm text-primary">{cmd}</code>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle>Vaab as your backend</CardTitle>
                <CardDescription>
                  This site runs user code through the embedded Vaab VM. The
                  example API in{' '}
                  <code className="font-mono text-xs">server/main.vaab</code>{' '}
                  shows HTTP routes written entirely in Vaab.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
