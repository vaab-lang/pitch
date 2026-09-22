import { getVisitorId } from '@/lib/visitor'

export type Todo = {
  key: string
  id: string
  title: string
  done: string
  created: string
}

export type Timed<T> = {
  data: T
  ms: number
}

async function timedFetch<T>(input: string, init?: RequestInit): Promise<Timed<T>> {
  const started = performance.now()
  const response = await fetch(input, init)
  const ms = performance.now() - started
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `request failed (${response.status})`)
  }
  if (response.status === 204) {
    return { data: undefined as T, ms }
  }
  const data = (await response.json()) as T
  return { data, ms }
}

function base(): string {
  return `/api/todos/${encodeURIComponent(getVisitorId())}`
}

export function listTodos(): Promise<Timed<Todo[]>> {
  return timedFetch<Todo[]>(base())
}

export function createTodo(title: string): Promise<Timed<Todo>> {
  return timedFetch<Todo>(base(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  })
}

export function toggleTodo(id: string): Promise<Timed<Todo>> {
  return timedFetch<Todo>(`${base()}/${encodeURIComponent(id)}/toggle`, {
    method: 'POST',
  })
}

export function deleteTodo(id: string): Promise<Timed<{ ok: boolean; count: number }>> {
  return timedFetch(`${base()}/${encodeURIComponent(id)}/delete`, {
    method: 'POST',
  })
}

export function clearTodos(): Promise<Timed<{ ok: boolean }>> {
  return timedFetch(`${base()}/clear`, { method: 'POST' })
}
