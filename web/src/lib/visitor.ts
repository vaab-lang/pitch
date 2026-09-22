const COOKIE = 'vaab_visitor'
const MAX_AGE = 60 * 60 * 24 * 365 // 1 year

function readCookie(name: string): string | null {
  const parts = document.cookie.split(';')
  for (const part of parts) {
    const [rawKey, ...rest] = part.trim().split('=')
    if (rawKey === name) {
      return decodeURIComponent(rest.join('='))
    }
  }
  return null
}

function isVisitorId(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  )
}

/** Stable per-browser id, kept in a first-party cookie and used as the KV prefix. */
export function getVisitorId(): string {
  const existing = readCookie(COOKIE)
  if (existing && isVisitorId(existing)) {
    return existing
  }
  const id = crypto.randomUUID()
  document.cookie = `${COOKIE}=${encodeURIComponent(id)}; path=/; max-age=${MAX_AGE}; SameSite=Lax`
  return id
}
