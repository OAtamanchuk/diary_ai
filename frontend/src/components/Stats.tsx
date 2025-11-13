import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { api } from '../services/api';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Stats() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await api.get('/profile/stats');
      const stats = res.data;
      setData({
        labels: Object.keys(stats.emotions),
        datasets: [{
          data: Object.values(stats.emotions),
          backgroundColor: ['#F87171', '#34D399', '#F472B6', '#FBBF24', '#60A5FA', '#A78BFA']
        }]
      });
    };
    fetchStats();
  }, []);

  if (!data) return <div>Завантаження...</div>;

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Статистика настрою</h3>
      <Pie data={data} />
    </div>
  );
}