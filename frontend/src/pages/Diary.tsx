import { useState, useEffect } from 'react'
import EntryForm from '../components/EntryForm'
import Calendar from '../components/Calendar'
import { api } from '../services/api'
import { useLang } from '../context/LanguageContext'
import AdviceModal from '../components/AdviceModal'

export default function Diary() {
  const [entries, setEntries] = useState<any[]>([])
  const [advice, setAdvice] = useState<string | null>(null)
  const { lang } = useLang()

  const fetchEntries = async () => {
    const res = await api.get('/entries/')
    setEntries(res.data)
  }

  const handleNewEntry = async (text: string, langParam: string) => {
    try {
      const res = await api.post('/entries/', { text, lang: langParam })

      const adviceText: string =
        res.data?.advice ||
        (lang === 'uk'
          ? 'Запис успішно додано.'
          : 'Entry has been added successfully.')

      setAdvice(adviceText)

      await fetchEntries()
    } catch {
      alert(lang === 'uk'
        ? 'Помилка при збереженні запису.'
        : 'Error saving entry.')
    }
  }

  useEffect(() => { fetchEntries() }, [])

  const title = lang === 'uk' ? 'Мій щоденник' : 'My diary'

  return (
    <div className="min-h-screen bg-[#d1c7ff] dark:bg-gray-800 max-w-4xl mx-auto p-6 relative">
      <h1 className="text-4xl text-center font-bold mb-8">{title}</h1>

      <EntryForm onSubmit={handleNewEntry}/>

      {advice && (
        <AdviceModal
          advice={advice}
          onClose={() => setAdvice(null)}
        />
      )}

      <div className="my-12">
        <Calendar entries={entries} />
      </div>
    </div>
  )
}
