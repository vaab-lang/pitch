import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

import { ErrorBoundary } from '@/components/ErrorBoundary'
import { TooltipProvider } from '@/components/ui/tooltip'
import { getAppMode } from '@/lib/app-mode'
import { DecisionsPage } from '@/pages/DecisionsPage'
import { ChangelogPage } from '@/pages/ChangelogPage'
import { HomePage } from '@/pages/HomePage'
import { RiffDetailPage } from '@/pages/RiffDetailPage'
import { RiffPage } from '@/pages/RiffPage'
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

function SiteRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/spec" element={<SpecPage />} />
      <Route path="/decisions" element={<DecisionsPage />} />
      <Route path="/changelog" element={<ChangelogPage />} />
    </Routes>
  )
}

function TodoRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TasksPage />} />
      <Route path="*" element={<TasksPage />} />
    </Routes>
  )
}

function RiffRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RiffPage />} />
      <Route path="/packages/:name" element={<RiffDetailPage />} />
    </Routes>
  )
}

export default function App() {
  const mode = getAppMode()

  return (
    <TooltipProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ErrorBoundary>
          {mode === 'todo' && <TodoRoutes />}
          {mode === 'riff' && <RiffRoutes />}
          {mode === 'site' && <SiteRoutes />}
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  )
}
