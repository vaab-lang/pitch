import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

import { TooltipProvider } from '@/components/ui/tooltip'
import { DecisionsPage } from '@/pages/DecisionsPage'
import { HomePage } from '@/pages/HomePage'
import { SpecPage } from '@/pages/SpecPage'
import { TasksPage } from '@/pages/TasksPage'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/spec" element={<SpecPage />} />
          <Route path="/decisions" element={<DecisionsPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  )
}
