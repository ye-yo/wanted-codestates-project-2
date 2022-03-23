import LineChart from 'components/Chart/LineChart';
import styled, { css } from 'styled-components';
import Table from './Table';

interface ITable {
  current: boolean;
  theads: readonly string[];
  datas: any[];
}
const dataSample = [1, 6, 3, 1, 2, 3, 4, 8, 4];
const labels = ['hi', 'hi', 'hi', 'hi', 'hi', 'hi', 'hi', 'hi', 'hi'];
const options = {};
export default function ContentTrack({ current, theads, datas }: ITable) {
  return (
    <Wrapper current={current ? 1 : 0}>
      <Box>
        <TitleWrap>
          <Title>
            <span>트랙</span>전적
          </Title>
          <Side>
            평균 상위 <span>31.64</span>%
          </Side>
        </TitleWrap>
        <ChartWrap>
          <ChartTitle>
            <span>빌리지 운하</span> 기록 분포
          </ChartTitle>
          {dataSample && <LineChart datas={dataSample} labels={labels} options={options} />}
        </ChartWrap>
      </Box>
      <Table theads={theads} datas={datas} />
    </Wrapper>
  );
}

export const Wrapper = styled.section`
  flex: 1;
  font-size: 1.2rem;
  gap: 20px;
  ${({ current }: { current: number }) =>
    current &&
    css`
      display: none;
    `}
`;
export const Box = styled.section`
  padding: 1.6rem;
`;

export const TitleWrap = styled.div`
  display: flex;
  font-size: 1em;
  border-bottom: 1px solid ${({ theme }) => theme.color.main}88;
  padding-bottom: 1rem;
`;
export const Title = styled.p`
  span {
    color: ${({ theme }) => theme.color.main};
  }
`;
const Side = styled.p`
  display: inline-block;
  margin-left: auto;
  font-size: 0.8em;
  span {
    color: ${({ theme }) => theme.color.main};
  }
`;
const ChartWrap = styled.div`
  padding-top: 1rem;
`;
const ChartTitle = styled.p`
  color: ${({ theme }) => theme.color.gray};
  margin-bottom: 0.8rem;
  span {
    color: black;
  }
`;
