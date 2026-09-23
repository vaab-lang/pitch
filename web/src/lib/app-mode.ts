export type AppMode = 'site' | 'todo' | 'riff'

export function getAppMode(): AppMode {
  const override = import.meta.env.VITE_APP_MODE
  if (override === 'todo' || override === 'riff' || override === 'site') {
    return override
  }

  const host = window.location.hostname
  if (host.startsWith('riff.')) return 'riff'
  // Legacy subdomain, kept working after the todo demo moved to vaab.dev/tasks.
  if (host.startsWith('todo.')) return 'todo'
  if (
    window.location.pathname === TODO_PATH ||
    window.location.pathname.startsWith(`${TODO_PATH}/`)
  ) {
    return 'todo'
  }
  return 'site'
}

export const TODO_PATH = '/tasks'
export const RIFF_ORIGIN = 'https://riff.vaab.dev'
export const SITE_ORIGIN = 'https://vaab.dev'
