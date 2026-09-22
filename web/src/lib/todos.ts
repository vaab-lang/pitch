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

const DEFAULT_TIMEOUT_MS = 12_000

async function timedFetch<T>(
  input: string,
  init?: RequestInit,
  timeoutMs = DEFAULT_TIMEOUT_MS,
): Promise<Timed<T>> {
  const started = performance.now()
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(input, {
      ...init,
      signal: controller.signal,
    })
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
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('request timed out — the server may be stuck; try again')
    }
    throw error
  } finally {
    window.clearTimeout(timer)
  }
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
