import { Features } from '@/components/Features'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Install } from '@/components/Install'
import { Performance } from '@/components/Performance'
import { Playground } from '@/components/Playground'
import { ReadableBackends } from '@/components/ReadableBackends'
import { VibeCoding } from '@/components/VibeCoding'

export function HomePage() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-50">
      <Header />
      <main>
        <Hero />
        <VibeCoding />
        <ReadableBackends />
        <Features />
        <Performance />
        <Playground />
        <Install />
      </main>
      <Footer />
    </div>
  )
}
