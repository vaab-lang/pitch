import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  children: ReactNode
}

type State = {
  message: string | null
}

/** Keeps a route failure from blanking the whole site. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { message: null }

  static getDerivedStateFromError(error: unknown): State {
    const message = error instanceof Error ? error.message : 'something went wrong'
    return { message }
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error('site route error', error, info.componentStack)
  }

  render() {
    if (this.state.message) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-slate-100">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
            Recovered
          </p>
          <h1 className="mt-3 text-2xl font-bold tracking-tight">This page hit a snag</h1>
          <p className="mt-3 max-w-md text-slate-400">{this.state.message}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950"
              onClick={() => this.setState({ message: null })}
            >
              Try again
            </button>
            <Link
              to="/"
              className="rounded-full border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200"
            >
              Back home
            </Link>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
