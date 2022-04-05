import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface ILineChart {
  datas: Object[];
  labels: Object[];
  options: object;
}

const setChart = ({ datas, labels, options }: ILineChart) => {
  const chartOptions = {
    pointBorderColor: 'rgb(0,119,255)',
    borderWidth: 1,
    plugins: {
      legend: { display: false },
      datalabels: { display: false },
    },
    scales: {},
    ...options,
  };
  const chartData = {
    labels,
    datasets: [
      {
        data: datas,
        fill: true,
        borderColor: 'rgb(0,119,255)',
        backgroundColor: 'rgb(0,119,255, .1)',
        tension: 0.3,
        drawActiveElementsOnTop: true,
      },
    ],
  };
  return { options: chartOptions, data: chartData };
};

interface IChartData {
  options: object;
  data: any;
}
function LineChart(chartDatas: ILineChart) {
  const [chartData, setChartData] = useState<IChartData>();
  useEffect(() => {
    const data = setChart(chartDatas);
    setChartData(data);
  }, [chartDatas, setChartData]);

  return chartData ? <Line options={chartData.options} data={chartData.data} /> : null;
}

export default LineChart;
