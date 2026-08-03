import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Playground from './pages/Playground'
import GeneratingSchema from './pages/GeneratingSchema'
import ProtectedRoute from './ProtectedRoute'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function AppShell() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/playground" element={<Playground />} />
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
