export type AppMode = 'site' | 'todo' | 'riff'

export function getAppMode(): AppMode {
  const override = import.meta.env.VITE_APP_MODE
  if (override === 'todo' || override === 'riff' || override === 'site') {
    return override
  }

  const host = window.location.hostname
  if (host.startsWith('todo.')) return 'todo'
  if (host.startsWith('riff.')) return 'riff'
  return 'site'
}

export const TODO_ORIGIN = 'https://todo.vaab.dev'
export const RIFF_ORIGIN = 'https://riff.vaab.dev'
export const SITE_ORIGIN = 'https://vaab.dev'
