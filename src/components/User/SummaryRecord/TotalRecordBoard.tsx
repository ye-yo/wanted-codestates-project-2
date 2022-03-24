import styled from 'styled-components';
import { useAppSelector } from 'store/config';
import { getRacePercentage } from 'utils/parser';
import { useMemo } from 'react';
import { NEXON_TMI } from 'constants/env';
import DoughnutChart from '../../Chart/DoughnutChart';
import RecordBox from './RecordBoard';

const title = { emphasis: '종합', text: '전적' };
const options = [
  { color: '#07f', title: '승률' },
  { color: '#9bd728', title: '완주율' },
  { color: '#f62459', title: '리타이어율' },
];

function TotalRecordBoard() {
  const { matches, loading } = useAppSelector((state) => state.matchList);
  const { win, complete, retired } = useMemo(() => getRacePercentage(matches?.matches || null), [matches]);
  return (
    <RecordBox title={title}>
      <Wrapper>
        {matches && !loading && (
          <ChartWrapper>
            <DoughnutChart percentage={win} options={options[0]} />
            <DoughnutChart percentage={complete} options={options[1]} />
            <DoughnutChart percentage={retired} options={options[2]} />
          </ChartWrapper>
        )}
        <Description>
          <img src={`${NEXON_TMI}/img/assets/tmi_logo_default_b.svg`} alt="TMI 로고" />
        </Description>
      </Wrapper>
    </RecordBox>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
const Description = styled.div`
  width: 100%;
  font-size: 1.2em;
  color: #0000004d;
  > img {
    height: 20px;
    float: right;
  }
`;
const ChartWrapper = styled.div`
  width: calc(100% + 10px);
  margin-bottom: 1rem;
  margin-left: -5px;
  display: flex;
  justify-content: space-between;
  > div > div {
    width: calc(100% - 16px);
    flex: none;
  }
  > div:nth-child(n + 2) {
    border-left: 1px solid white;
    > div {
    }
  }
`;
export default TotalRecordBoard;
