import type { DownloadPoint } from '@/lib/riffs'
import { cn } from '@/lib/utils'

type Props = {
  history: DownloadPoint[]
  className?: string
  height?: number
}

export function DownloadChart({ history, className, height = 160 }: Props) {
  if (history.length === 0) {
    return (
      <div
        className={cn(
          'flex items-center justify-center rounded-2xl border border-dashed border-slate-800 text-sm text-slate-500',
          className,
        )}
        style={{ height }}
      >
        No download data yet
      </div>
    )
  }

  const width = 640
  const padX = 8
  const padY = 12
  const innerW = width - padX * 2
  const innerH = height - padY * 2
  const max = Math.max(...history.map((point) => point.count), 1)

  const points = history.map((point, index) => {
    const x = padX + (index / Math.max(history.length - 1, 1)) * innerW
    const y = padY + innerH - (point.count / max) * innerH
    return { x, y, count: point.count, date: point.date }
  })

  const line = points.map((point) => `${point.x},${point.y}`).join(' ')
  const area = `${points[0]!.x},${padY + innerH} ${line} ${points[points.length - 1]!.x},${padY + innerH}`

  const total = history.reduce((sum, point) => sum + point.count, 0)

  return (
    <div className={cn('relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/60', className)}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(16,185,129,0.12),transparent)]" />
      <div className="relative flex items-end justify-between gap-4 px-5 pt-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400/90">
            Downloads
          </p>
          <p className="mt-1 font-mono text-3xl font-bold tabular-nums text-slate-50">
            {total.toLocaleString()}
          </p>
          <p className="mt-1 text-sm text-slate-500">last 30 days</p>
        </div>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="relative mt-2 w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label="Download trend over the last 30 days"
      >
        <defs>
          <linearGradient id="riff-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(16,185,129,0.35)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0)" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((ratio) => (
          <line
            key={ratio}
            x1={padX}
            x2={width - padX}
            y1={padY + innerH * ratio}
            y2={padY + innerH * ratio}
            stroke="rgba(148,163,184,0.08)"
            strokeWidth="1"
          />
        ))}
        <polygon points={area} fill="url(#riff-area)" />
        <polyline
          points={line}
          fill="none"
          stroke="#34d399"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
