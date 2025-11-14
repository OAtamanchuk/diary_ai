import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { useLang } from '../context/LanguageContext'

export default function DayView() {
  const { date } = useParams()
  const navigate = useNavigate()
  const [entries, setEntries] = useState<any[]>([])
  const { lang } = useLang()

  const fetchEntries = async () => {
    const res = await api.get('/entries/')
    const filtered = res.data.filter((e: any) => e.date === date)
    setEntries(filtered)
  }

  const handleDelete = async (id: number) => {
    const confirmText =
      lang === 'uk' ? 'Видалити запис?' : 'Delete this entry?'
    if (confirm(confirmText)) {
      await api.delete(`/entries/${id}/`)
      fetchEntries()
    }
  }

  useEffect(() => {
    fetchEntries()
  }, [date])

  const texts = {
    back: lang === 'uk' ? '← Назад' : '← Back',
    titlePrefix: lang === 'uk' ? 'Записи за ' : 'Entries for ',
    empty: lang === 'uk' ? 'Записів за цей день немає.' : 'No entries for this day.',
    delete: lang === 'uk' ? 'Видалити' : 'Delete',
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button onClick={() => navigate('/diary')} className="text-blue-600 mb-4">
        {texts.back}
      </button>
      <h1 className="text-2xl font-bold mb-6">
        {texts.titlePrefix}
        {date}
      </h1>

      {entries.length === 0 ? (
        <p className="text-gray-500">{texts.empty}</p>
      ) : (
        <div className="space-y-4">
          {entries.map((e: any) => (
            <div
              key={e.id}
              className="p-4 border rounded bg-white dark:bg-gray-800 text-left shadow"
            >
              <p className="text-lg">{e.text}</p>
              <p className="text-sm text-gray-500 mt-2">
                {e.emoji} {e.advice}
              </p>
              <button
                onClick={() => handleDelete(e.id)}
                className="mt-2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                {texts.delete}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
