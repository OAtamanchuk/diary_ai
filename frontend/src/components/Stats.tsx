import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { useLang } from '../context/LanguageContext'

ChartJS.register(ArcElement, Tooltip, Legend)

// ⭐ Словарь переводов эмоций
const emotionTranslations: Record<string, { uk: string; en: string }> = {
  anger:     { uk: "Злість", en: "Anger" },
  sadness:   { uk: "Смуток", en: "Sadness" },
  joy:       { uk: "Радість", en: "Joy" },
  fear:      { uk: "Страх", en: "Fear" },
  love:      { uk: "Кохання", en: "Love" },
  surprise:  { uk: "Подив", en: "Surprise" },
}

type Props = { small?: boolean }

export default function Stats({ small = false }: Props) {
  const { lang } = useLang()
  const [period, setPeriod] = useState<"month" | "year">("month")
  const [data, setData] = useState<any>(null)

  const fetchStats = async () => {
    const res = await api.get(`/profile/stats?period=${period}`)
    const stats = res.data

    setData({
      labels: Object.keys(stats.emotions).map(key =>
        emotionTranslations[key]?.[lang] || key
      ),
      datasets: [{
        data: Object.values(stats.emotions),
        backgroundColor: [
          '#F87171', '#34D399', '#F472B6',
          '#FBBF24', '#60A5FA', '#A78BFA'
        ]
      }]
    })
  }

  useEffect(() => { fetchStats() }, [period, lang])

  const title = lang === "uk" ? "Статистика настрою" : "Mood statistics"

  const size = small ? 440 : 600

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg space-y-4">
      <select
        className="border p-2 rounded bg-gray-100 dark:bg-gray-700"
        value={period}
        onChange={(e) => setPeriod(e.target.value as "month" | "year")}
      >
        <option value="month">
          {lang === "uk" ? "Останній місяць" : "Last month"}
        </option>
        <option value="year">
          {lang === "uk" ? "Останній рік" : "Last year"}
        </option>
      </select>

      <h3 className="text-lg font-bold">{title}</h3>

      {data ? (
        <div style={{ width: size, height: size, margin: "0 auto" }}>
          <Pie
            data={data}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "bottom" }
              }
            }}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
