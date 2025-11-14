import Stats from '../components/Stats'
import { useLang } from '../context/LanguageContext'

export default function Profile() {
  const { lang } = useLang()

  const texts = {
    title: lang === 'uk' ? 'Профіль' : 'Profile',
    summary:
      lang === 'uk'
        ? 'Цього місяця ви найчастіше відчували:'
        : 'This month you most often felt:',
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{texts.title}</h1>

      <p className="text-lg text-gray-600 dark:text-gray-300">
        {texts.summary}
      </p>

      <Stats small />
    </div>
  )
}
