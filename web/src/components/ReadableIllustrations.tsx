import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type IllustrationProps = {
  className?: string
}

function Frame({ children, className }: { children: ReactNode; className?: string }) {
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
      {children}
    </svg>
  )
}

/** Line bars stand in for code. Green segments mark Vaab keywords. */
export function SyntaxIllustration({ className }: IllustrationProps) {
  return (
    <Frame className={className}>
      <rect x="24" y="56" width="200" height="8" rx="4" className="fill-slate-800" />
      <rect x="24" y="76" width="56" height="8" rx="4" className="fill-emerald-500/80 readable-glow" />
      <rect x="84" y="76" width="160" height="8" rx="4" className="fill-slate-800" />
      <rect x="24" y="96" width="80" height="8" rx="4" className="fill-slate-800" />
      <rect x="108" y="96" width="40" height="8" rx="4" className="fill-emerald-500/80 readable-glow readable-delay-1" />
      <rect x="24" y="116" width="64" height="8" rx="4" className="fill-slate-800" />
      <rect x="92" y="116" width="48" height="8" rx="4" className="fill-emerald-500/80 readable-glow readable-delay-2" />
      <rect x="144" y="116" width="72" height="8" rx="4" className="fill-slate-800" />

      <g className="readable-fade-up readable-delay-1">
        <rect x="24" y="148" width="36" height="24" rx="8" className="fill-emerald-500/10 stroke-emerald-500/40" strokeWidth="1" />
        <text x="42" y="164" textAnchor="middle" className="fill-emerald-400 text-[11px] font-mono">to</text>
      </g>
      <g className="readable-fade-up readable-delay-2">
        <rect x="68" y="148" width="36" height="24" rx="8" className="fill-emerald-500/10 stroke-emerald-500/40" strokeWidth="1" />
        <text x="86" y="164" textAnchor="middle" className="fill-emerald-400 text-[11px] font-mono">yes</text>
      </g>
      <g className="readable-fade-up readable-delay-3">
        <rect x="112" y="148" width="52" height="24" rx="8" className="fill-emerald-500/10 stroke-emerald-500/40" strokeWidth="1" />
        <text x="138" y="164" textAnchor="middle" className="fill-emerald-400 text-[11px] font-mono">{'{ }'}</text>
      </g>
    </Frame>
  )
}

/** Scan line moves down the source. Caret blinks, then a check appears. */
export function CheckingIllustration({ className }: IllustrationProps) {
  return (
    <Frame className={className}>
      <rect x="24" y="52" width="180" height="112" rx="10" className="fill-slate-950 stroke-slate-800" strokeWidth="1" />
      <rect x="36" y="64" width="120" height="6" rx="3" className="fill-slate-800" />
      <rect x="36" y="78" width="96" height="6" rx="3" className="fill-slate-800" />
      <rect x="36" y="92" width="140" height="6" rx="3" className="fill-slate-800" />
      <rect x="36" y="106" width="72" height="6" rx="3" className="fill-rose-400/70" />
      <path
        d="M 112 100 L 116 112 L 120 100"
        className="stroke-rose-400 fill-none readable-caret"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <rect x="36" y="120" width="108" height="6" rx="3" className="fill-slate-800" />
      <rect x="36" y="134" width="88" height="6" rx="3" className="fill-slate-800" />

      <g className="readable-scan">
        <rect x="24" y="52" width="180" height="3" rx="1.5" className="fill-emerald-400/60" />
      </g>

      <g className="readable-fade-up readable-delay-2">
        <rect x="220" y="72" width="76" height="72" rx="12" className="fill-slate-950 stroke-slate-800" strokeWidth="1" />
        <circle cx="258" cy="100" r="18" className="fill-emerald-500/15 stroke-emerald-500/50 readable-ring" strokeWidth="1.5" />
        <path
          d="M 250 100 L 255 105 L 267 93"
          className="stroke-emerald-400 fill-none readable-check"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x="258" y="132" textAnchor="middle" className="fill-slate-500 text-[10px] font-mono">checked</text>
      </g>
    </Frame>
  )
}

/** Two readers, one shared handler block in the middle. */
export function OnboardingIllustration({ className }: IllustrationProps) {
  return (
    <Frame className={className}>
      <g className="readable-fade-up">
        <circle cx="56" cy="108" r="20" className="fill-slate-950 stroke-slate-700" strokeWidth="1" />
        <circle cx="56" cy="100" r="8" className="fill-slate-700" />
        <path d="M 40 128 Q 56 118 72 128" className="stroke-slate-700 fill-none" strokeWidth="1.5" />
        <text x="56" y="148" textAnchor="middle" className="fill-slate-500 text-[10px] font-mono">PM</text>
      </g>

      <g className="readable-fade-up readable-delay-2">
        <circle cx="264" cy="108" r="20" className="fill-slate-950 stroke-slate-700" strokeWidth="1" />
        <circle cx="264" cy="100" r="8" className="fill-slate-700" />
        <path d="M 248 128 Q 264 118 280 128" className="stroke-slate-700 fill-none" strokeWidth="1.5" />
        <text x="264" y="148" textAnchor="middle" className="fill-slate-500 text-[10px] font-mono">dev</text>
      </g>

      <rect x="108" y="64" width="104" height="88" rx="12" className="fill-slate-950 stroke-emerald-500/30 readable-ring" strokeWidth="1.5" />
      <rect x="120" y="80" width="80" height="5" rx="2.5" className="fill-slate-800" />
      <rect x="120" y="92" width="64" height="5" rx="2.5" className="fill-slate-800" />
      <rect x="120" y="104" width="72" height="5" rx="2.5" className="fill-emerald-500/60 readable-glow" />
      <rect x="120" y="116" width="56" height="5" rx="2.5" className="fill-slate-800" />

      <path d="M 76 108 H 108" className="stroke-emerald-500/40 readable-draw readable-delay-1" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 212 108 H 244" className="stroke-emerald-500/40 readable-draw readable-delay-2" strokeWidth="1.5" strokeLinecap="round" />

      <g className="readable-fade-up readable-delay-3">
        <rect x="126" y="130" width="68" height="18" rx="6" className="fill-emerald-500/10 stroke-emerald-500/30" strokeWidth="1" />
        <text x="160" y="142" textAnchor="middle" className="fill-emerald-400 text-[9px] font-mono">typed</text>
      </g>
    </Frame>
  )
}

export const READABLE_ILLUSTRATIONS = {
  syntax: SyntaxIllustration,
  checking: CheckingIllustration,
  onboarding: OnboardingIllustration,
} as const
