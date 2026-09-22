import { Check, Loader2, Plus, Trash2, Zap } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  clearTodos,
  createTodo,
  deleteTodo,
  listTodos,
  toggleTodo,
  type Todo,
} from '@/lib/todos'
import { cn } from '@/lib/utils'
import { getVisitorId } from '@/lib/visitor'

function formatMs(ms: number): string {
  if (ms < 1) return '<1 ms'
  if (ms < 10) return `${ms.toFixed(1)} ms`
  return `${Math.round(ms)} ms`
}

export function TasksPage() {
  const visitor = useMemo(() => getVisitorId(), [])
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastMs, setLastMs] = useState<number | null>(null)
  const [flashId, setFlashId] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setError(null)
    const { data, ms } = await listTodos()
    setTodos(data)
    setLastMs(ms)
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        await refresh()
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'could not load todos')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [refresh])

  async function onAdd(event: FormEvent) {
    event.preventDefault()
    const next = title.trim()
    if (!next || busy) return
    setBusy(true)
    setError(null)
    try {
      const { data, ms } = await createTodo(next)
      setTodos((current) => [data, ...current])
      setTitle('')
      setLastMs(ms)
      setFlashId(data.id)
      window.setTimeout(() => setFlashId(null), 600)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'could not add todo')
    } finally {
      setBusy(false)
    }
  }

  async function onToggle(todo: Todo) {
    if (busy) return
    setBusy(true)
    setError(null)
    try {
      const { data, ms } = await toggleTodo(todo.id)
      setTodos((current) => current.map((item) => (item.id === data.id ? data : item)))
      setLastMs(ms)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'could not update todo')
    } finally {
      setBusy(false)
    }
  }

  async function onDelete(todo: Todo) {
    if (busy) return
    setBusy(true)
    setError(null)
    try {
      const { ms } = await deleteTodo(todo.id)
      setTodos((current) => current.filter((item) => item.id !== todo.id))
      setLastMs(ms)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'could not delete todo')
    } finally {
      setBusy(false)
    }
  }

  async function onClear() {
    if (busy || todos.length === 0) return
    setBusy(true)
    setError(null)
    try {
      const { ms } = await clearTodos()
      setTodos([])
      setLastMs(ms)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'could not clear todos')
    } finally {
      setBusy(false)
    }
  }

  const remaining = todos.filter((todo) => todo.done !== 'yes').length

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(16,185,129,0.07),transparent)]" />
      <Header />

      <main className="relative mx-auto max-w-2xl px-4 pb-24 pt-28 sm:px-6 md:pt-32">
        <div className="mb-10">
          <Badge variant="accent" className="mb-5">
            <Zap className="h-3 w-3" />
            Store demo
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
            Todos on the <span className="text-gradient">built-in KV store</span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-400">
            A plain todo list backed by{' '}
            <code className="font-mono text-sm text-emerald-400">Store.open</code> and{' '}
            <code className="font-mono text-sm text-emerald-400">store.from</code>. Your
            browser gets a visitor cookie; every row is keyed under that id so lists stay
            private without accounts.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Visitor{' '}
            <code className="font-mono text-slate-400">{visitor.slice(0, 8)}…</code>
            {lastMs !== null && (
              <>
                {' '}
                · last round-trip{' '}
                <span className="font-mono text-emerald-400">{formatMs(lastMs)}</span>
              </>
            )}
          </p>
        </div>

        <form
          onSubmit={onAdd}
          className="flex flex-col gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/50 p-3 shadow-xl shadow-emerald-950/20 sm:flex-row sm:items-center"
        >
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Add a todo…"
            maxLength={200}
            className="min-w-0 flex-1 rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-base text-slate-100 outline-none ring-emerald-500/40 placeholder:text-slate-600 focus:ring-2"
            disabled={busy}
            autoFocus
          />
          <Button type="submit" disabled={busy || !title.trim()} className="shrink-0">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Add
          </Button>
        </form>

        {error && (
          <p className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
            {error}
          </p>
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-400">
            {loading ? 'Loading…' : `${remaining} left · ${todos.length} total`}
          </p>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => void refresh()}
              disabled={busy || loading}
            >
              Refresh
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => void onClear()}
              disabled={busy || todos.length === 0}
            >
              Clear
            </Button>
          </div>
        </div>

        <ul className="mt-4 space-y-2">
          {loading && (
            <li className="rounded-2xl border border-dashed border-slate-800 px-4 py-10 text-center text-slate-500">
              <Loader2 className="mx-auto mb-3 h-5 w-5 animate-spin text-emerald-400" />
              Opening your store…
            </li>
          )}

          {!loading && todos.length === 0 && (
            <li className="rounded-2xl border border-dashed border-slate-800 px-4 py-12 text-center text-slate-500">
              Nothing here yet. Add a todo — it lands in{' '}
              <code className="font-mono text-emerald-400/80">pitch-todos.vaab.kv</code>.
            </li>
          )}

          {todos.map((todo) => {
            const done = todo.done === 'yes'
            return (
              <li
                key={todo.id}
                className={cn(
                  'group flex items-center gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/40 px-3 py-3 transition-colors sm:px-4',
                  flashId === todo.id && 'border-emerald-500/50 bg-emerald-500/10',
                  done && 'opacity-70',
                )}
              >
                <button
                  type="button"
                  onClick={() => void onToggle(todo)}
                  disabled={busy}
                  aria-label={done ? 'Mark incomplete' : 'Mark complete'}
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors',
                    done
                      ? 'border-emerald-500/60 bg-emerald-500 text-slate-950'
                      : 'border-slate-700 bg-slate-950/60 text-transparent hover:border-emerald-500/50',
                  )}
                >
                  <Check className="h-4 w-4" strokeWidth={3} />
                </button>
                <span
                  className={cn(
                    'min-w-0 flex-1 text-base leading-snug',
                    done ? 'text-slate-500 line-through' : 'text-slate-100',
                  )}
                >
                  {todo.title}
                </span>
                <button
                  type="button"
                  onClick={() => void onDelete(todo)}
                  disabled={busy}
                  aria-label="Delete todo"
                  className="rounded-lg p-2 text-slate-600 opacity-100 transition-colors hover:bg-slate-800 hover:text-rose-300 sm:opacity-0 sm:group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            )
          })}
        </ul>

        <div className="mt-12 rounded-2xl border border-slate-800/80 bg-slate-900/30 p-5 font-mono text-sm leading-relaxed text-slate-400">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400/90">
            main.vaab
          </p>
          <pre className="overflow-x-auto whitespace-pre text-[13px] text-slate-300">{`let store = try Store.open("pitch-todos.vaab.kv")
let rows = try store
    .from("todo:{visitor}:")
    .order_desc("created")
    .all()`}</pre>
          <p className="mt-4 text-sm font-sans text-slate-500">
            Same fluent chain as the homepage performance section — just pointed at your
            visitor prefix.{' '}
            <Link to="/#built-in" className="font-semibold text-emerald-400 hover:text-emerald-300">
              See built-in I/O
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
