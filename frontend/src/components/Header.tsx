import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import LanguageToggle from './LanguageToggle'
import { useAuth } from '../hooks/useAuth'
import Logo from '../assets/emojis/Logo.svg'

export default function Header() {
  const { lang } = useLang()
  const { user, logout } = useAuth()

  const texts = {
    diary: lang === 'uk' ? 'Щоденник' : 'Diary',
    profile: lang === 'uk' ? 'Профіль' : 'Profile',
    chat: lang === 'uk' ? 'Чат' : 'Chat',
    logout: lang === 'uk' ? 'Вихід' : 'Log out',
  }

  // === 2️⃣ Обычный хедер
  return (
    <header className="w-full h-24 bg-[#AC91FF] dark:bg-gray-900 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center pt-[15px]">
        {/* Left side: Logo + Navigation */}
        <div className='flex justify-start items-center gap-[120px]'>
          <div className='flex justify-start items-center gap-3'>
            <img src={Logo} alt="Flowly logo" className='w-12 h-12'/>
            <Link to="/" className="text-3xl font-abeeze text-[#1C0843]">
              Flowly
            </Link>
          </div>

          {/* Navigation - only show if user is logged in */}
          {user && (
            <nav className="flex gap-[52px] text-[24px] text-white leading-none">
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
          )}
        </div>
        
        {/* Right side: Logout and Language Toggle */}
        {!user ? (
          <LanguageToggle />
        ) : (
          <div className="flex items-center gap-[14px]">
            <button
              onClick={logout}
              className="text-[24px] leading-none text-[#B20000] hover:underline"
            >
              {texts.logout}
            </button>

            <LanguageToggle />
          </div>
        )}
      </div>
    </header>
  )
}
