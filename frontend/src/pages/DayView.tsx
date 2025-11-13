import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../services/api'

export default function DayView() {
  const { date } = useParams()
  const navigate = useNavigate()
  const [entries, setEntries] = useState<any[]>([])

  const fetchEntries = async () => {
    const res = await api.get('/entries/')
    const filtered = res.data.filter((e: any) => e.date === date)
    setEntries(filtered)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Видалити запис?')) {
      await api.delete(`/entries/${id}`)
      fetchEntries()
    }
  }

  useEffect(() => { fetchEntries() }, [date])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button onClick={() => navigate('/diary')} className="text-blue-600 mb-4">← Назад</button>
      <h1 className="text-2xl font-bold mb-6">Записи за {date}</h1>

      {entries.length === 0 ? (
        <p className="text-gray-500">Записів за цей день немає.</p>
      ) : (
        <div className="space-y-4">
          {entries.map((e: any) => (
            <div key={e.id} className="p-4 border rounded bg-white dark:bg-gray-800 text-left shadow">
              <p className="text-lg">{e.text}</p>
              <p className="text-sm text-gray-500 mt-2">
                {e.emoji} {e.advice}
              </p>
              <button
                onClick={() => handleDelete(e.id)}
                className="mt-2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Видалити
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
