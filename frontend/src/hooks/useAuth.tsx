import React, { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'

type User = { email: string }

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    const email = localStorage.getItem('user_email')
    if (token && email) {
      setUser({ email })
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const body = new URLSearchParams()
    body.set('username', email)
    body.set('password', password)

    const res = await api.post('/auth/login', body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })

    localStorage.setItem('access_token', res.data.access_token)
    localStorage.setItem('user_email', email)
    setUser({ email })
  }

  const register = async (email: string, username: string, password: string) => {
    await api.post('/auth/register', { email, username, password })
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_email')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>')
  }
  return ctx
}
