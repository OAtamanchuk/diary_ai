import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import EntryForm from '../components/EntryForm'
import Calendar from '../components/Calendar'
import { api } from '../services/api'
import { useLang } from '../context/LanguageContext'

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

      toast.success(adviceText)

      await fetchEntries()
    } catch (e) {
      const errText =
        lang === 'uk'
          ? 'Помилка при збереженні запису.'
          : 'Error saving the entry.'
      toast.error(errText)
    }
  }

  useEffect(() => {
    fetchEntries()
  }, [])

  const title = lang === 'uk' ? '📖 Мій щоденник' : '📖 My diary'

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      <EntryForm onSubmit={handleNewEntry} />

      {advice && (
        <div className="mt-4 p-4 border-l-4 border-blue-500 bg-blue-50 text-blue-800 rounded shadow">
          💬 {advice}
        </div>
      )}

      <div className="my-6">
        <Calendar entries={entries} />
      </div>
    </div>
  )
}
