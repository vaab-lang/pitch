import { cn } from '@/lib/utils'

type IllustrationProps = {
  className?: string
}

/** Fluent chain: from → filter → sort → terminal, with a dot traveling the path. */
export function QueryChainIllustration({ className }: IllustrationProps) {
  const nodes = [
    { x: 40, label: 'from' },
    { x: 108, label: 'where' },
    { x: 176, label: 'order' },
    { x: 244, label: 'all' },
  ]

  return (
    <svg
      viewBox="0 0 320 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-auto w-full', className)}
      aria-hidden
    >
      <rect x="1" y="1" width="318" height="198" rx="16" className="fill-slate-900 stroke-slate-800" strokeWidth="1" />
      <rect x="1" y="1" width="318" height="36" rx="16" className="fill-slate-950/90" />
      <rect x="1" y="21" width="318" height="16" className="fill-slate-950/90" />
      <circle cx="22" cy="19" r="4" className="fill-slate-700" />
      <circle cx="36" cy="19" r="4" className="fill-slate-700" />
      <circle cx="50" cy="19" r="4" className="fill-slate-700" />

      <text x="160" y="19" textAnchor="middle" className="fill-slate-500 text-[10px] font-mono uppercase tracking-widest">
        query chain
      </text>

      <path
        d="M 40 120 L 108 120 L 176 120 L 244 120"
        className="stroke-slate-700 fill-none readable-draw"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {nodes.map((node, index) => (
        <g
          key={node.label}
          className={cn(
            'readable-fade-up',
            index === 0 && 'readable-delay-1',
            index === 1 && 'readable-delay-2',
            index === 2 && 'readable-delay-3',
            index === 3 && 'readable-delay-3',
          )}
        >
          <rect
            x={node.x - 28}
            y="96"
            width="56"
            height="48"
            rx="10"
            className={
              index === nodes.length - 1
                ? 'fill-emerald-500/15 stroke-emerald-500/50 readable-glow'
                : 'fill-slate-950 stroke-slate-700'
            }
            strokeWidth="1"
          />
          <text
            x={node.x}
            y="124"
            textAnchor="middle"
            className={index === nodes.length - 1 ? 'fill-emerald-400 text-[11px] font-mono' : 'fill-slate-400 text-[11px] font-mono'}
          >
            {node.label}
          </text>
        </g>
      ))}

      <circle r="5" className="fill-emerald-400">
        <animateMotion dur="3.2s" repeatCount="indefinite" path="M 40 120 L 108 120 L 176 120 L 244 120" />
      </circle>

      <g className="readable-fade-up readable-delay-2">
        <rect x="24" y="156" width="130" height="28" rx="8" className="fill-slate-950 stroke-slate-800" strokeWidth="1" />
        <text x="89" y="174" textAnchor="middle" className="fill-slate-500 text-[10px] font-mono">
          db · cache
        </text>
      </g>
      <g className="readable-fade-up readable-delay-3">
        <rect x="166" y="156" width="130" height="28" rx="8" className="fill-emerald-500/10 stroke-emerald-500/30" strokeWidth="1" />
        <text x="231" y="174" textAnchor="middle" className="fill-emerald-400/90 text-[10px] font-mono">
          same methods
        </text>
      </g>
    </svg>
  )
}
