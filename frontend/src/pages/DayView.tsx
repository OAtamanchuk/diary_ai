import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { useLang } from '../context/LanguageContext'

// 📌 Импортируем кастомные SVG эмодзи
import anger from '../assets/emojis/anger.svg'
import fear from '../assets/emojis/fear.svg'
import joy from '../assets/emojis/joy.svg'
import love from '../assets/emojis/love.svg'
import sadness from '../assets/emojis/sadness.svg'
import surprise from '../assets/emojis/surprise.svg'

// 📌 Маппинг ID -> SVG
const emojiMap: Record<string, string> = {
  anger,
  fear,
  joy,
  love,
  sadness,
  surprise,
}

// 📌 Старые Unicode -> ID
const unicodeToId: Record<string, string> = {
  "😢": "sadness",
  "😀": "joy",
  "❤️": "love",
  "😡": "anger",
  "😨": "fear",
  "😮": "surprise",
}

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

  // 📌 Функция, которая определяет ID эмоции и возвращает путь к SVG
  const getEmojiIcon = (emoji: string | null, emotionLabel: string | null) => {
    if (!emoji && !emotionLabel) return null

    // если это уже ID (joy, sadness…)
    if (emoji && emojiMap[emoji]) return emojiMap[emoji]

    // если это Unicode старый
    if (emoji && unicodeToId[emoji]) return emojiMap[unicodeToId[emoji]]

    // если в БД есть emotion_label
    if (emotionLabel && emojiMap[emotionLabel]) return emojiMap[emotionLabel]

    return null
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
          {entries.map((e: any) => {
            const icon = getEmojiIcon(e.emoji, e.emotion_label)

            return (
              <div
                key={e.id}
                className="p-4 border rounded bg-white dark:bg-gray-800 text-left shadow"
              >
                <p className="text-lg">{e.text}</p>

                {/* 💜 SVG emoji + advice */}
                <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                  {icon && (
                    <img
                      src={icon}
                      alt="emoji"
                      className="w-6 h-6 rounded-lg inline-block"
                    />
                  )}
                  <span>{e.advice}</span>
                </p>

                <button
                  onClick={() => handleDelete(e.id)}
                  className="mt-2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  {texts.delete}
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
