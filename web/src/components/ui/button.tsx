import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-emerald-500 text-slate-950 shadow-xl shadow-emerald-500/20 hover:bg-emerald-400 hover:-translate-y-0.5',
        secondary:
          'bg-slate-100 text-slate-950 shadow-xl shadow-slate-100/10 hover:bg-white hover:-translate-y-0.5',
        outline:
          'border border-slate-700 bg-slate-900/50 text-slate-200 hover:border-slate-600 hover:bg-slate-800',
        ghost: 'text-slate-400 hover:bg-slate-800 hover:text-slate-100',
        accent:
          'bg-emerald-500 text-slate-950 shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:bg-emerald-400 hover:scale-105 active:scale-95',
      },
      size: {
        default: 'h-10 px-5 text-sm',
        sm: 'h-9 px-4 text-sm',
        lg: 'h-14 px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
