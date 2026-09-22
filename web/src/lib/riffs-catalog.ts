export type RiffPackage = {
  name: string
  version: string
  description: string
  author: string
  licence: string
  repo: string
  needs: string
  tags: string[]
  seedDownloads: number
}

export const RIFF_CATALOG: RiffPackage[] = [
  {
    name: 'supabase',
    version: '0.1.0',
    description: 'PostgREST client over Vaab’s http.send builtin. Connect, fetch, insert, patch, and delete rows.',
    author: 'vaab',
    licence: 'MIT',
    repo: 'https://github.com/vaab-lang/vaab-riffs/tree/main/supabase',
    needs: 'vaab at 0.1',
    tags: ['database', 'api', 'supabase'],
    seedDownloads: 1842,
  },
  {
    name: 'tape',
    version: '0.1.0',
    description: 'Static file helpers for Vaab HTTP servers. Serve dist folders without a reverse proxy.',
    author: 'vaab-lang',
    licence: 'MIT',
    repo: 'https://github.com/vaab-lang/tape',
    needs: 'vaab at 0.1',
    tags: ['http', 'static', 'server'],
    seedDownloads: 956,
  },
  {
    name: 'json',
    version: '0.1.0',
    description: 'JSON encode and decode helpers with typed results and plain-English error messages.',
    author: 'vaab',
    licence: 'MIT',
    repo: 'https://github.com/vaab-lang/vaab-riffs',
    needs: 'vaab at 0.1',
    tags: ['json', 'serialization'],
    seedDownloads: 621,
  },
  {
    name: 'sqlite',
    version: '0.1.0',
    description: 'SQLite bindings with fluent query chains. Same from().where().all() shape as the built-in Store.',
    author: 'vaab',
    licence: 'MIT',
    repo: 'https://github.com/vaab-lang/vaab-riffs',
    needs: 'vaab at 0.1',
    tags: ['database', 'sqlite'],
    seedDownloads: 488,
  },
  {
    name: 'jwt',
    version: '0.1.0',
    description: 'Sign and verify JSON Web Tokens for route auth without leaving Vaab.',
    author: 'vaab',
    licence: 'MIT',
    repo: 'https://github.com/vaab-lang/vaab-riffs',
    needs: 'vaab at 0.1',
    tags: ['auth', 'security'],
    seedDownloads: 312,
  },
  {
    name: 'redis',
    version: '0.1.0',
    description: 'Redis client for cache layers and pub/sub. Typed get/set with connection pooling.',
    author: 'vaab',
    licence: 'MIT',
    repo: 'https://github.com/vaab-lang/vaab-riffs',
    needs: 'vaab at 0.1',
    tags: ['cache', 'redis'],
    seedDownloads: 204,
  },
]

export function getRiff(name: string): RiffPackage | undefined {
  return RIFF_CATALOG.find((pkg) => pkg.name === name)
}
