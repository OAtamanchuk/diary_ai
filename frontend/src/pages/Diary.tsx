import { useState, useEffect } from 'react'
import EntryForm from '../components/EntryForm'
import Calendar from '../components/Calendar'
import { api } from '../services/api'

export default function Diary() {
  const [entries, setEntries] = useState<any[]>([])
  const [advice, setAdvice] = useState<string | null>(null)

  const fetchEntries = async () => {
    const res = await api.get('/entries/')
    setEntries(res.data)
  }

  const handleNewEntry = async (text: string, lang: string) => {
    const res = await api.post('/entries/', { text, lang })
    setAdvice(res.data.advice) // 💬 показать совет
    fetchEntries()
  }

  useEffect(() => { fetchEntries() }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📖 Мій щоденник</h1>

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
