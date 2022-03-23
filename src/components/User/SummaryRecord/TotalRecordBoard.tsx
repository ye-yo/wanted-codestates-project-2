import styled from 'styled-components';
import RecordBox from './RecordBoard';
import DoughnutChart from '../../Chart/DoughnutChart';

const title = { emphasis: '종합', text: '전적' };
const summaray = <span>85전 2승 3패</span>;
function TotalRecordBoard() {
  return (
    <RecordBox title={title} summary={summaray}>
      <Wrapper>
        <DoughnutChart />
        <DoughnutChart />
        <DoughnutChart />
      </Wrapper>
    </RecordBox>
  );
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default TotalRecordBoard;
