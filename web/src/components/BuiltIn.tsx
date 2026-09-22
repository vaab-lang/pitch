import { Database, Filter, Layers, PenLine } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { QueryChainIllustration } from '@/components/BuiltInIllustrations'
import { Reveal } from '@/components/Reveal'
import { VaabCode } from '@/components/VaabCode'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

function VaabToken({ children }: { children: ReactNode }) {
  return (
    <code className="rounded border border-slate-800 bg-slate-900 px-1 py-0.5 font-mono text-sm text-emerald-400">
      {children}
    </code>
  )
}

const DB_QUERY = `let rows = try db
    .from("tasks")
    .where_eq("owner", user.id)
    .order_desc("id")
    .limit(20)
    .all()

try db.from("tasks").insert({
    "id": id,
    "title": title,
    "owner": user.id,
})

match db.from("tasks").where_eq("id", id).first() {
    when found row then print(row.get("title") otherwise "?")
    when nothing then print("missing row")
}`

const STORE_QUERY = `let sessions = try store
    .from("session:")
    .where_eq("value", "signed-in")
    .all()

try store.from("session:").insert({
    "key": "session:ada",
    "value": "signed-in",
})`

const NICEITIES: {
  id: string
  icon: LucideIcon
  label: string
  title: ReactNode
  detail: ReactNode
}[] = [
  {
    id: 'chain',
    icon: Filter,
    label: 'Filters',
    title: 'Chain filters and sort',
    detail: (
      <>
        <VaabToken>.where_eq</VaabToken>, <VaabToken>.where_like</VaabToken>,{' '}
        <VaabToken>.order_desc</VaabToken>, <VaabToken>.limit</VaabToken>, and{' '}
        <VaabToken>.offset</VaabToken> stack on one relation. Terminals are{' '}
        <VaabToken>.all()</VaabToken>, <VaabToken>.first()</VaabToken>, and{' '}
        <VaabToken>.count()</VaabToken>.
      </>
    ),
  },
  {
    id: 'backends',
    icon: Layers,
    label: 'Two backends',
    title: 'Database and cache store share one API',
    detail: (
      <>
        SQL runs through sea-query with bound parameters. The fast cache store scans
        keys under a prefix and promotes JSON object fields onto each row.
      </>
    ),
  },
  {
    id: 'writes',
    icon: PenLine,
    label: 'Writes',
    title: 'Insert without string SQL',
    detail: (
      <>
        <VaabToken>.insert</VaabToken>, <VaabToken>.update</VaabToken>, and{' '}
        <VaabToken>.delete</VaabToken> live on the same chain. Raw{' '}
        <VaabToken>db.execute</VaabToken> stays for SQL the fluent surface cannot
        express yet.
      </>
    ),
  },
  {
    id: 'optional',
    icon: Database,
    label: 'Optionals',
    title: (
      <>
        <VaabToken>.first()</VaabToken> matches like a choice
      </>
    ),
    detail: (
      <>
        A missing row is <VaabToken>nothing</VaabToken>, not an exception. Use{' '}
        <VaabToken>when found row</VaabToken> and <VaabToken>when nothing</VaabToken>{' '}
        in the same <VaabToken>match</VaabToken> you use everywhere else.
      </>
    ),
  },
]

export function BuiltIn() {
  return (
    <section
      id="built-in"
      className="relative overflow-hidden border-t border-slate-800 bg-slate-950 py-28 md:py-40"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_20%_0%,rgba(45,212,191,0.07),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/25 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="max-w-4xl">
            <Badge variant="default" className="mb-6">
              Built in
            </Badge>
            <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-50 sm:text-5xl md:text-6xl lg:text-7xl">
              Query your database and cache store with the{' '}
              <span className="text-gradient">same chain</span>.
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
              Start with <VaabToken>db.from</VaabToken> or <VaabToken>store.from</VaabToken>.
              Add filters and sort, then finish with <VaabToken>.all()</VaabToken>,{' '}
              <VaabToken>.first()</VaabToken>, or <VaabToken>.insert()</VaabToken>. SQL
              compiles to parameterized queries. The cache store scans keys under a prefix.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-8">
          <Reveal delay={80} className="lg:col-span-4">
            <QueryChainIllustration className="mx-auto max-w-sm lg:sticky lg:top-28" />
          </Reveal>

          <div className="space-y-8 lg:col-span-8">
            <Reveal delay={120}>
              <div>
                <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-widest text-emerald-500/90">
                  Database tasks
                </p>
                <VaabCode code={DB_QUERY} filename="tasks.vaab" minHeight="320px" />
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div>
                <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                  Cache store sessions
                </p>
                <VaabCode code={STORE_QUERY} filename="sessions.vaab" minHeight="200px" />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {NICEITIES.map((item, index) => (
            <Reveal key={item.id} delay={100 + index * 60}>
              <article
                className={cn(
                  'group h-full rounded-2xl border border-slate-800/80 bg-slate-900/30 p-6 sm:p-7',
                  'transition-colors hover:border-slate-700 hover:bg-slate-900/50',
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900',
                      'motion-safe:transition-colors group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10',
                    )}
                  >
                    <item.icon className="h-5 w-5 text-emerald-400" strokeWidth={1.75} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm tabular-nums text-slate-600">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-500/80">
                      {item.label}
                    </span>
                  </div>
                </div>
                <h3 className="mt-5 text-xl font-bold leading-snug tracking-tight text-slate-100">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
                  {item.detail}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
