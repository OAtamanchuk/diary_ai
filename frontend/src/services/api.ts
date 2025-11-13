// src/services/api.ts
import axios from 'axios'

const baseURL = 'http://localhost:8000'

export const api = axios.create({ baseURL })

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// опционально — автолог аут и редирект при 401
api.interceptors.response.use(
  r => r,
  err => {
    if (err?.response?.status === 401) {
      localStorage.removeItem('access_token')
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(err)
  }
)
