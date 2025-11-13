import { Link } from "react-router-dom"
import LanguageToggle from "./LanguageToggle"

export default function Header() {
  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow mb-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        
        <nav className="flex gap-6 text-lg">
          <Link to="/diary" className="hover:text-blue-600">📅 Diary</Link>
          <Link to="/profile" className="hover:text-blue-600">👤 Profile</Link>
          <Link to="/chat" className="hover:text-blue-600">💬 Chat</Link>
        </nav>

        <LanguageToggle />
      </div>
    </header>
  )
}
