import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors',
  {
    variants: {
      variant: {
        default: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300',
        secondary: 'border-slate-700 bg-slate-800 text-slate-400',
        accent: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
        outline: 'border-slate-700 bg-slate-900 text-slate-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
