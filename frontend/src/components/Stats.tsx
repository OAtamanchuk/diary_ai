import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { useLang } from '../context/LanguageContext'

ChartJS.register(ArcElement, Tooltip, Legend)

type Props = {
  small?: boolean
}

export default function Stats({ small = false }: Props) {
  const [data, setData] = useState<any>(null)
  const { lang } = useLang()

  useEffect(() => {
    const fetchStats = async () => {
      const res = await api.get('/profile/stats')
      const stats = res.data
      setData({
        labels: Object.keys(stats.emotions),
        datasets: [
          {
            data: Object.values(stats.emotions),
            backgroundColor: [
              '#F87171',
              '#34D399',
              '#F472B6',
              '#FBBF24',
              '#60A5FA',
              '#A78BFA',
            ],
          },
        ],
      })
    }
    fetchStats()
  }, [])

  if (!data)
    return (
      <div>{lang === 'uk' ? 'Завантаження...' : 'Loading...'}</div>
    )

  return (
    <div className={`p-4 bg-white dark:bg-gray-800 rounded-lg ${small ? 'max-w-sm mx-auto' : ''}`}>
      <h3 className="text-lg font-bold mb-4">
        {lang === 'uk' ? 'Статистика настрою' : 'Mood statistics'}
      </h3>
      <Pie data={data} />
    </div>
  )
}
