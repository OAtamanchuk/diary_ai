import React from "react"
import { useLang } from "../context/LanguageContext"

export default function LanguageToggle() {
  const { lang, toggleLang } = useLang()
  const checked = lang === "en"

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      toggleLang()
    }
  }

  return (
    <div className="flex items-center box-border space-x-2 pt-2">
      <span className={`text-sm w-6 mb-[16px] text-center transition-opacity duration-200 ${!checked ? "font-semibold opacity-100" : "opacity-30"}`}>UA</span>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={toggleLang}
        onKeyDown={handleKeyDown}
        className={`relative inline-flex items-center w-14 h-8 mb-[16px] rounded-full duration-200 outline-none ring-2 ring-[#1C0843] hover:shadow-xl transition-all ${
          checked ? "bg-[#6765FE]" : "bg-gray-300 dark:bg-gray-600"
        }`}
      >
        <span
          className={`absolute left-1 top-1 w-6 h-6 bg-[#1C0843] rounded-full shadow transform transition-transform duration-200 ${
            checked ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>

      <span className={`text-sm w-6 mb-[16px] text-center transition-opacity duration-200 ${checked ? "font-semibold opacity-100" : "opacity-30"}`}>EN</span>
    </div>
  )
}
