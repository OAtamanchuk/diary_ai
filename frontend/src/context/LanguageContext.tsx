import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

type Lang = 'uk' | 'en'
type LangContextType = { lang: Lang; toggleLang: () => void }

const LangContext = createContext<LangContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('uk')

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang
    if (saved) setLang(saved)
  }, [])

  const toggleLang = () => {
    const next = lang === 'uk' ? 'en' : 'uk'
    setLang(next)
    localStorage.setItem('lang', next)
  }

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
