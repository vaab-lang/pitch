import { Features } from '@/components/Features'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Install } from '@/components/Install'
import { Playground } from '@/components/Playground'
import { TooltipProvider } from '@/components/ui/tooltip'

export default function App() {
  return (
    <TooltipProvider>
      <div className="relative min-h-screen">
        <Header />
        <main>
          <Hero />
          <Features />
          <Playground />
          <Install />
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  )
}
