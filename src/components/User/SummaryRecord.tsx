import styled from 'styled-components';
import TotalRecordBox from './SummaryRecord/TotalRecordBoard';
import QuickRecordBox from './SummaryRecord/QuickRecordBoard';
import RankingGraph from './SummaryRecord/RankingGraph';

export default function SummaryRecord() {
  return (
    <Wrapper>
      <TotalRecordBox />
      <RankingGraph />
      <QuickRecordBox />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  font-size: 1.2rem;
  display: flex;
  gap: 20px;
`;
