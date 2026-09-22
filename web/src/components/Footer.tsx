import { Code2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-black px-6 py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 text-sm text-slate-500 md:flex-row">
        <Link to="/" className="flex items-center gap-2 font-bold text-slate-200">
          <div className="rounded-lg border border-emerald-800 bg-emerald-950 p-1.5 text-emerald-400">
            <Code2 size={16} />
          </div>
          Vaab
        </Link>

        <nav className="flex flex-wrap justify-center gap-8 font-medium">
          <a
            href="https://github.com/vaab-lang/vaab"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-white"
          >
            GitHub
          </a>
          <Link to="/spec" className="transition-colors hover:text-white">
            Language spec
          </Link>
          <Link to="/decisions" className="transition-colors hover:text-white">
            Design decisions
          </Link>
        </nav>

        <p className="text-xs text-slate-600">
          MIT licensed · Plain English, strict types
        </p>
      </div>
    </footer>
  )
}
