import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { AuthProvider, useAuth } from './hooks/useAuth'

import Login from './pages/Login'
import Register from './pages/Register'
import Diary from './pages/Diary'
import Profile from './pages/Profile'
import DayView from './pages/DayView'
import Header from './components/Header'
import Chat from './pages/Chat'

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>

          <Header />   {/* ← добавили */}

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/diary" element={<ProtectedRoute><Diary /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
            <Route path="/day/:date" element={<ProtectedRoute><DayView /></ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/diary" />} />
          </Routes>

        </Router>
      </LanguageProvider>
    </AuthProvider>
  )
}
