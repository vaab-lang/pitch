import { Sparkles } from 'lucide-react'

import { Reveal } from '@/components/Reveal'
import { VaabCode } from '@/components/VaabCode'
import { Badge } from '@/components/ui/badge'

const TS_EXAMPLE = `const activeUsers = users
  .filter((u: User) => u.active)
  .map((u: User) => ({
    name: u.name,
    balance: u.balance ?? 0,
  }));

if (!activeUsers.length) {
  throw new Error("no active accounts");
}`

const VAAB_EXAMPLE = `# Deposit into every active account.
for each user in users {
    if user.active {
        match user.account.deposit(25) {
            when success account then
                print("{account.owner} now has {account.balance}")
            when failure err then
                print("could not deposit for {user.name}")
        }
    }
}`

export function VibeCoding() {
  return (
    <section id="vibe-coding" className="relative border-t border-slate-800 bg-slate-950 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_0%,rgba(52,211,153,0.05),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-xl lg:text-left">
            <Badge variant="accent" className="mb-6">
              <Sparkles className="h-3 w-3" fill="currentColor" />
              Side by side
            </Badge>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-50 sm:text-4xl">
              Same backend logic. Fewer symbols.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
              Loops read like sentences. Pattern matching replaces nested
              conditionals. The checker still knows every type.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-10">
          <Reveal delay={80}>
            <div>
              <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                Typical backend code
              </p>
              <VaabCode code={TS_EXAMPLE} filename="accounts.ts" language="typescript" minHeight="260px" />
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div>
              <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-widest text-emerald-500/90">
                The same idea in Vaab
              </p>
              <VaabCode code={VAAB_EXAMPLE} filename="accounts.vaab" minHeight="260px" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
