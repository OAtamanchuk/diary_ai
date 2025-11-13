import Stats from '../components/Stats'
import LanguageToggle from '../components/LanguageToggle'
import { useLang } from '../context/LanguageContext'

export default function Profile() {
  const { lang } = useLang()

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {lang === 'uk' ? "Профіль" : "Profile"}
        </h1>
        <LanguageToggle />
      </div>
      <Stats />
    </div>
  )
}
