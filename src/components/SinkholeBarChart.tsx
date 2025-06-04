import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SinkholeBarChart = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    fetch('/sinkhole_stats.json')
      .then((res) => res.json())
      .then((data) => {
        const labels = data.map((item: any) => item.연월);
        const counts = data.map((item: any) => item.건수);

        setChartData({
          labels,
          datasets: [
            {
              label: '사고 건수',
              data: counts,
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
          ],
        });
      });
  }, []);

  if (!chartData) return <p>그래프 로딩 중...</p>;

  return <Bar data={chartData} options={{ responsive: true }} />;
};

export default SinkholeBarChart;