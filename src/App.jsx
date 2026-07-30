import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import GeneratingSchema from './pages/GeneratingSchema'
import ProtectedRoute from './ProtectedRoute'

function AppShell() {
  const location = useLocation()
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    const message = location.state?.toastMessage

    if (!message) {
      return undefined
    }

    setToastMessage(message)

    const timer = window.setTimeout(() => {
      setToastMessage('')
    }, 3000)

    return () => window.clearTimeout(timer)
  }, [location.state])

  return (
    <>
      {toastMessage && (
        <div
          className="fixed left-1/2 top-6 z-50 w-[min(92vw,420px)] -translate-x-1/2 rounded-2xl border border-primary/10 bg-surface/95 px-4 py-3 text-sm font-medium text-primary shadow-xl shadow-primary/10 backdrop-blur"
          role="status"
          aria-live="polite"
        >
          {toastMessage}
        </div>
      )}

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />


         <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/generating-schema" element={<GeneratingSchema />} />
        </Route>
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
