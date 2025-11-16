import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import LanguageToggle from './LanguageToggle'
import { useAuth } from '../hooks/useAuth'

export default function Header() {
  const { lang } = useLang()
  const { user, logout } = useAuth()
  const { pathname } = useLocation()

  // ❗ Маршруты, где должен быть только переключатель языка
  const authPages = ["/login", "/register"]

  const texts = {
    diary: lang === 'uk' ? 'Щоденник' : 'Diary',
    profile: lang === 'uk' ? 'Профіль' : 'Profile',
    chat: lang === 'uk' ? 'Чат' : 'Chat',
    logout: lang === 'uk' ? 'Вихід' : 'Logout',
  }

  // === 1️⃣ Если это login/register — показываем только переключатель языка
  if (authPages.includes(pathname)) {
    return (
      <header className="w-full bg-white dark:bg-gray-900 shadow mb-6">
        <div className="max-w-6xl mx-auto flex justify-end p-4">
          <LanguageToggle />
        </div>
      </header>
    )
  }

  // === 2️⃣ Обычный хедер
  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow mb-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        <nav className="flex gap-6 text-lg">
          <Link to="/diary" className="hover:text-blue-600">
            {texts.diary}
          </Link>
          <Link to="/profile" className="hover:text-blue-600">
            {texts.profile}
          </Link>
          <Link to="/chat" className="hover:text-blue-600">
            {texts.chat}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {user && (
            <button
              onClick={logout}
              className="text-sm text-red-600 hover:underline"
            >
              {texts.logout}
            </button>
          )}
          <LanguageToggle />
        </div>
      </div>
    </header>
  )
}
