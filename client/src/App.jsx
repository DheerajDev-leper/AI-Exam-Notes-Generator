import { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "motion/react"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import Pricing from "./pages/Pricing"
import Notes from "./pages/Notes"
import History from "./pages/History"
import { getCurrentUser } from "./services/api"

function Splash() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
        className="h-11 w-11 rounded-full border-4 border-brand-soft border-t-brand"
      />
    </div>
  )
}

function App() {
  const dispatch = useDispatch()
  const [checking, setChecking] = useState(true)
  const { userData } = useSelector((state) => state.user)

  // Wait for the session check so a refresh on /history doesn't bounce you to /auth
  useEffect(() => {
    getCurrentUser(dispatch).finally(() => setChecking(false))
  }, [dispatch])

  if (checking) return <Splash />

  const guard = (el) => (userData ? el : <Navigate to="/auth" replace />)

  return (
    <Routes>
      <Route path="/" element={guard(<Home />)} />
      <Route path="/auth" element={userData ? <Navigate to="/" replace /> : <Auth />} />
      <Route path="/history" element={guard(<History />)} />
      <Route path="/notes" element={guard(<Notes />)} />
      <Route path="/pricing" element={guard(<Pricing />)} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App