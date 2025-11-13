import { useLang } from "../context/LanguageContext"

export default function LanguageToggle() {
  const { lang, toggleLang } = useLang()

  return (
    <button
      onClick={toggleLang}
      className="px-3 py-1 border rounded bg-gray-200 dark:bg-gray-700"
    >
      {lang === 'uk' ? 'UA 🇺🇦' : 'EN 🇬🇧'}
    </button>
  )
}
