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
} from 'chart.js';
import RecordBox from './RecordBoard';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const labels = [1, 6, 3, 1, 2, 3, 4, 8, 4];
const total = labels.length;
export const options = {
  responsive: true,
  maintainAspectRatio: false,
  pointBorderColor: 'rgb(0 119 255)',
  pointBackgroundColor: 'rgb(0 119 255)',
  borderWidth: 1,
  plugins: {
    legend: { display: false },
    datalabels: { display: false },
    tooltip: {
      callbacks: {
        title(context: any[]) {
          const { dataIndex } = context[0];
          return `이전 ${total - Number(dataIndex)}경기`;
        },
        label(tooltipItem: { label: string }) {
          return `순위: ${tooltipItem.label}`;
        },
      },
    },
  },
  scales: {
    y: {
      reverse: true,
      ticks: {},
    }, // 데이터 오름차순 정렬
    x: {
      grid: { display: false },
      ticks: { display: false }, // datalabel 제거
    },
  },
};
const title = { emphasis: '순위변동', text: '추이' };
export const data = {
  labels,
  datasets: [
    {
      data: [1, 6, 3, 1, 2, 3, 4, 8, 4],
      borderColor: 'rgb(0 119 255)',
      tension: 0.3,
      drawActiveElementsOnTop: true,
    },
  ],
};

function RankingGraph() {
  const summaray = <span>85전 2승 3패</span>;

  return (
    <RecordBox title={title} summary={summaray}>
      <Line options={options} data={data} />
    </RecordBox>
  );
}

export default RankingGraph;
