import { BookOpen, Brain, Wand2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { READABLE_ILLUSTRATIONS } from '@/components/ReadableIllustrations'
import { Reveal } from '@/components/Reveal'
import { cn } from '@/lib/utils'

const POINTS: {
  id: keyof typeof READABLE_ILLUSTRATIONS
  icon: LucideIcon
  label: string
  title: string
  description: ReactNode
}[] = [
  {
    id: 'syntax',
    icon: Brain,
    label: 'Syntax',
    title: 'Read it like prose',
    description: (
      <>
        Functions start with <code className="rounded border border-slate-800 bg-slate-900 px-1 py-0.5 font-mono text-sm text-emerald-400">to</code>.
        Booleans are <code className="rounded border border-slate-800 bg-slate-900 px-1 py-0.5 font-mono text-sm text-emerald-400">yes</code> and{' '}
        <code className="rounded border border-slate-800 bg-slate-900 px-1 py-0.5 font-mono text-sm text-emerald-400">no</code>.
        Errors say <code className="rounded border border-slate-800 bg-slate-900 px-1 py-0.5 font-mono text-sm text-emerald-400">success</code> or{' '}
        <code className="rounded border border-slate-800 bg-slate-900 px-1 py-0.5 font-mono text-sm text-emerald-400">failure</code>.
      </>
    ),
  },
  {
    id: 'checking',
    icon: Wand2,
    label: 'Checking',
    title: 'Write it, then check it',
    description:
      'Handlers read like English. The checker validates every signature before the VM runs.',
  },
  {
    id: 'onboarding',
    icon: BookOpen,
    label: 'Onboarding',
    title: 'Onboard in minutes',
    description:
      'A PM can read a route handler. An engineer still gets types, pattern matching, and sendability checks.',
  },
]

export function ReadableBackends() {
  return (
    <section
      id="readable"
      className="relative overflow-hidden border-t border-slate-800 bg-slate-950 py-28 md:py-40"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(16,185,129,0.08),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <h2 className="max-w-5xl text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-50 sm:text-5xl md:text-6xl lg:text-7xl">
            A language for backends you can{' '}
            <span className="text-gradient">actually read</span>.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
            Vaab reads like English on the page. The checker still catches bad
            signatures, bad matches, and unsafe concurrency before you ship.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {POINTS.map((point, index) => {
            const Illustration = READABLE_ILLUSTRATIONS[point.id]

            return (
              <Reveal key={point.id} delay={100 + index * 80}>
                <article
                  className={cn(
                    'group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/30',
                    'transition-colors hover:border-slate-700 hover:bg-slate-900/50',
                  )}
                >
                  <div className="border-b border-slate-800/80 bg-slate-950/40 px-4 py-5 sm:px-5">
                    <Illustration className="mx-auto max-w-[320px]" />
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900',
                          'motion-safe:transition-colors group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10',
                        )}
                      >
                        <point.icon className="h-5 w-5 text-emerald-400" strokeWidth={1.75} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm tabular-nums text-slate-600">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-500/80">
                          {point.label}
                        </span>
                      </div>
                    </div>

                    <h3 className="mt-5 text-xl font-bold leading-snug tracking-tight text-slate-100 sm:text-2xl">
                      {point.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
                      {point.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
