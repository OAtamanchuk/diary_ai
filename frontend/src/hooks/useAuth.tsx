// src/hooks/useAuth.ts
import React, { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'

type User = { email: string }

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// ===== ПРОВАЙДЕР =====
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Восстанавливаем пользователя при загрузке страницы
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    const email = localStorage.getItem('user_email')
    if (token && email) {
      setUser({ email })
    }
  }, [])

  // ЛОГИН
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

  // РЕГИСТРАЦИЯ
  const register = async (email: string, username: string, password: string) => {
    await api.post('/auth/register', { email, username, password })
  }

  // ЛОГАУТ
  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_email')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// ===== ХУК =====
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>')
  }
  return ctx
}
