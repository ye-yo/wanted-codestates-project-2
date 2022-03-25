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
import styled from 'styled-components';
import { useAppSelector } from 'store/config';
import { getRankingGraphRecord } from 'utils/parser';
import { useEffect, useMemo, useState } from 'react';
import RecordBox from './RecordBoard';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const labels = [1, 6, 3, 1, 2, 3, 4, 8, 4];
const total = labels.length;
const options = {
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

function RankingGraph() {
  const { matches } = useAppSelector((state) => state.matchList);
  const { total, latest, datas } = useMemo(() => getRankingGraphRecord(matches?.matches || null), [matches]);
  const [chartData, setChartData] = useState<any>(null);
  const [summary, setSummary] = useState<any>();
  useEffect(() => {
    const newChartData = {
      labels,
      datasets: [
        {
          data: datas,
          borderColor: 'rgb(0 119 255)',
          tension: 0.3,
          drawActiveElementsOnTop: true,
        },
      ],
    };
    setChartData(newChartData);
    setSummary(
      <span>
        지난 {total.count}경기 <Color>{total.rankAverage || '?'}위</Color> 최근 {latest.count}경기{' '}
        <Color>{latest.rankAverage || '?'}위</Color>
      </span>,
    );
  }, [datas]);

  return (
    <RecordBox title={title} summary={summary}>
      {chartData && <Line options={options} data={chartData} />}
    </RecordBox>
  );
}

const Color = styled.span`
  color: ${({ theme }) => theme.color.main};
`;

export default RankingGraph;
