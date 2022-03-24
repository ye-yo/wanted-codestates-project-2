import styled, { css } from 'styled-components';
import { ReactNode, useMemo } from 'react';
import ProgressBar from 'components/Chart/ProgressBar';
import { useAppSelector } from 'store/config';
import { getSummaryRecord } from 'utils/parser';
import { ISummaryRecord } from 'interfaces/match';
import RecordBoard from './RecordBoard';

const title = { emphasis: '한눈에 보기' };

function QuickRecordBoard() {
  const { matches, loading } = useAppSelector((state) => state.matchList);
  const { win, loose, mostMode, rankAverage, datas } = useMemo<ISummaryRecord>(
    () => getSummaryRecord(matches?.matches || null),
    [matches],
  );

  const customScore = (
    <CustomScore>
      {matches?.matches.length || 0}전 <span className="blue">{win || 0}승</span> <span className="red">{loose}패</span>
    </CustomScore>
  );

  return (
    <RecordBoard title={title}>
      <Wrapper loading={loading}>
        <Box title="전적" score="20" full customScore={customScore}>
          <ProgressBar datas={datas} />
        </Box>
        <Box title="평균등수" score={rankAverage} unit="위" />
        {/* <Box title="경기수" score="185" unit="경기" /> */}
        <Box title="최다주행 모드" score={mostMode} />
      </Wrapper>
    </RecordBoard>
  );
}

const Wrapper = styled.div`
  padding: 0;
  font-size: 1rem;
  display: flex;
  flex-flow: row wrap;
  height: 100%;
  gap: 10px;
  opacity: ${({ loading }: { loading: boolean }) => loading && '.4'};
`;

interface IBox {
  title: string;
  score: string | number;
  unit?: string;
  full?: boolean;
  customScore?: ReactNode;
  children?: ReactNode;
}

const defaultProps = {
  unit: '',
  full: false,
  customScore: null,
  children: null,
};

const CustomScore = styled.p`
  ${({ theme }) => css`
    color: ${theme.color.font};
    .blue {
      color: ${theme.color.main};
    }
    .red {
      color: ${theme.color.red};
    }
  `}
`;

function Box({ title, score, unit, full, customScore, children }: IBox) {
  return (
    <BoxWrap full={full}>
      <Title>{title}</Title>
      {children}
      <Score>
        {customScore || (
          <>
            {score || ''}
            {unit && <Unit>{unit}</Unit>}
          </>
        )}
      </Score>
    </BoxWrap>
  );
}

Box.defaultProps = defaultProps;

const BoxWrap = styled.div`
  flex: 1;
  min-width: 120px;
  font-size: 1em;
  font-weight: 500;
  background-color: white;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 800px) {
    font-size: 0.8rem;
  }

  ${({ full }: { full?: boolean }) =>
    full &&
    css`
      min-width: 100%;
    `}
`;

const Title = styled.div`
  font-size: 1.4em;
  font-weight: 500;
`;

const Score = styled.div`
  font-size: 1.8em;
  font-weight: bold;
  color: ${({ theme }) => theme.color.main};
  text-align: right;
`;
const Unit = styled.span`
  font-size: 0.6em;
  font-weight: 500;
  color: #5e6268;
  margin-left: 4px;
  vertical-align: middle;
`;
export default QuickRecordBoard;
