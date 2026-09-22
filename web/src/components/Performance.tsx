import { ClipboardList, Gauge, GitCompare, Layers, TrendingUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Reveal } from '@/components/Reveal'
import { VaabCode } from '@/components/VaabCode'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BACKEND_BENCHMARKS, BENCHMARK_FOOTNOTE } from '@/lib/benchmarks'
import { cn } from '@/lib/utils'

const TAKEAWAYS: { icon: LucideIcon; text: string; highlight?: boolean }[] = [
  {
    icon: TrendingUp,
    highlight: true,
    text: 'Vaab leads on JSON, database queries, outbound HTTP, and cache store sessions in these runs.',
  },
  {
    icon: GitCompare,
    text: 'Handler pipelines favor Vaab here too. Both spend most of their time on storage I/O.',
  },
  {
    icon: Layers,
    text: 'Store keeps hot keys in memory and commits durable writes in batches of 32.',
  },
]

function BenchmarkChart({
  title,
  description,
  workload,
  unit,
  rows,
}: {
  title: string
  description: string
  workload: string
  unit: string
  rows: { language: string; ms: number; color: string }[]
}) {
  const sorted = [...rows].sort((a, b) => b.ms - a.ms)
  const max = Math.max(...rows.map((row) => row.ms))

  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-100">{title}</h3>
          <p className="mt-2 text-sm text-slate-400">{description}</p>
        </div>
        <span className="shrink-0 rounded-full border border-slate-700 bg-slate-950 px-3 py-1 font-mono text-xs text-slate-400">
          {workload}
        </span>
      </div>

      <div className="mt-8 space-y-5">
        {sorted.map((row) => {
          const width = Math.max((row.ms / max) * 100, 4)
          return (
            <div key={row.language}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-300">{row.language}</span>
                <span className="font-mono text-slate-400">
                  {row.ms.toFixed(1)}
                  {unit}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-700',
                    row.language === 'Vaab' && 'shadow-[0_0_20px_rgba(16,185,129,0.35)]',
                  )}
                  style={{ width: `${width}%`, backgroundColor: row.color }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function Performance() {
  const defaultTab = BACKEND_BENCHMARKS[0]?.id ?? 'json'

  return (
    <section id="performance" className="border-t border-slate-800 bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="default" className="mb-6">
            <Gauge className="h-3 w-3" />
            Performance
          </Badge>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-50 sm:text-5xl">
            Readable first.{' '}
            <span className="text-gradient">Fast enough</span> for real backends.
          </h2>
          <p className="mt-6 text-lg font-medium text-slate-400">
            Five workloads you actually run in production — JSON responses, cache
            store sessions, database queries, outbound HTTP, and full handler pipelines.
            Same tasks, Vaab vs TypeScript on Node, measured locally.
          </p>
        </div>

        <Tabs defaultValue={defaultTab} className="mt-16">
          <TabsList className="mx-auto flex h-auto w-full max-w-3xl flex-wrap justify-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 p-2">
            {BACKEND_BENCHMARKS.map((benchmark) => (
              <TabsTrigger
                key={benchmark.id}
                value={benchmark.id}
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-400 data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950 data-[state=active]:shadow-[0_0_20px_rgba(16,185,129,0.25)]"
              >
                {benchmark.tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {BACKEND_BENCHMARKS.map((benchmark) => (
            <TabsContent key={benchmark.id} value={benchmark.id} className="mt-10 space-y-8">
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-emerald-500">
                    Vaab
                  </p>
                  <VaabCode
                    code={benchmark.vaabCode}
                    filename={benchmark.vaabFilename}
                    minHeight="320px"
                  />
                </div>
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                    TypeScript equivalent
                  </p>
                  <VaabCode
                    code={benchmark.nodeCode}
                    filename={benchmark.nodeFilename}
                    language="typescript"
                    minHeight="320px"
                  />
                </div>
              </div>

              <BenchmarkChart
                title={benchmark.title}
                description={benchmark.description}
                workload={benchmark.workload}
                unit={benchmark.unit}
                rows={benchmark.rows}
              />
            </TabsContent>
          ))}
        </Tabs>

        <Reveal delay={80}>
          <div className="mt-16 border-t border-slate-800 pt-12">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900">
                    <Gauge className="h-4 w-4 text-emerald-400" strokeWidth={1.75} />
                  </div>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                    Methodology
                  </p>
                </div>
                <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-100">
                  What the numbers mean
                </h3>
                <ul className="mt-6 space-y-4">
                  {TAKEAWAYS.map((item, index) => (
                    <Reveal key={item.text} delay={140 + index * 80}>
                      <li className="group flex gap-4 rounded-xl border border-transparent p-3 motion-safe:transition-all motion-safe:duration-300 hover:border-slate-800 hover:bg-slate-900/30">
                        <div
                          className={cn(
                            'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-slate-900 motion-safe:transition-all motion-safe:duration-300',
                            item.highlight
                              ? 'border-emerald-500/30 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.12)]'
                              : 'border-slate-800',
                            'motion-safe:group-hover:scale-105',
                          )}
                        >
                          <item.icon
                            className={cn(
                              'h-4 w-4 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-110',
                              item.highlight ? 'text-emerald-400' : 'text-slate-400',
                            )}
                            strokeWidth={1.75}
                          />
                        </div>
                        <p className="pt-1.5 text-sm leading-relaxed text-slate-400">{item.text}</p>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
              <Reveal delay={200} className="lg:col-span-5 lg:border-l lg:border-slate-800 lg:pl-10">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900">
                    <ClipboardList className="h-4 w-4 text-slate-400" strokeWidth={1.75} />
                  </div>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                    Run details
                  </p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-500">{BENCHMARK_FOOTNOTE}</p>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
