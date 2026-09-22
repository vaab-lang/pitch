import { Check, Copy, Terminal } from 'lucide-react'
import { useState } from 'react'

import { trackInstall } from '@/lib/riffs'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Props = {
  name: string
  command: string
  label?: string
  className?: string
}

export function CopyInstall({ name, command, label = 'Install', className }: Props) {
  const [copied, setCopied] = useState(false)

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      void trackInstall(name)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/70 shadow-xl shadow-emerald-950/10',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 bg-slate-900/50 px-4 py-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          <Terminal className="h-4 w-4 text-emerald-400" />
          {label}
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={() => void onCopy()}>
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-400" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy
            </>
          )}
        </Button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-sm text-emerald-300">
        <code>{command}</code>
      </pre>
    </div>
  )
}
