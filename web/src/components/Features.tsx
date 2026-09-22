import { Blocks, Languages, Shield, Zap } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const FEATURES = [
  {
    icon: Languages,
    title: 'Plain English syntax',
    description:
      'Functions are `to`, booleans are `yes`/`no`, and text always interpolates. Readable code is the default, not a refactor goal.',
    tag: 'Readable',
  },
  {
    icon: Shield,
    title: 'Strict types, friendly errors',
    description:
      'Every function signature is annotated. Mistakes surface with snippets, carets, and explanations — before anything runs.',
    tag: 'Safe',
  },
  {
    icon: Zap,
    title: 'Safe concurrency built in',
    description:
      'Channels, tasks, `select`, and `shared` values with sendability checking. Data races are compile errors.',
    tag: 'Concurrent',
  },
  {
    icon: Blocks,
    title: 'First-class app I/O',
    description:
      'HTTP servers, SQLite, JSON, env vars, and outbound HTTP — in the language, not bolted on as packages.',
    tag: 'Backend-ready',
  },
] as const

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <Badge variant="default" className="mb-4">
            Why Vaab
          </Badge>
          <h2 className="font-serif text-4xl tracking-tight sm:text-5xl">
            A language for backends you can{' '}
            <em className="text-gradient not-italic">actually read</em>.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Vaab targets the space between scripting comfort and systems-level
            safety — vibe-coded APIs with compile-time guarantees.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <Card
              key={feature.title}
              className="group border-border/80 bg-card/60 transition-colors hover:border-primary/30 hover:bg-card"
            >
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <feature.icon className="h-5 w-5 text-primary" />
                  <Badge variant="outline">{feature.tag}</Badge>
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
