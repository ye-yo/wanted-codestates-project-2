import { useMemo, useCallback, useState, useEffect } from 'react';
import LineChart from 'components/Chart/LineChart';
import styled, { css } from 'styled-components';
import { useAppSelector } from 'store/config';
import { getTrackList } from 'utils/parser';
import { GiRoad } from 'react-icons/gi';
import { ITrackRecord } from 'interfaces/match';

import Table from './Table';

interface ITable {
  current: boolean;
  theads: readonly string[];
}

const dataSample = [0.5, 0.6, 1.1, 1.2, 1.6, 2.0, 2.8, 2.6, 2.4];
const labels = ['1`48', '1`54', '2`00', '2`06', '`2`12`', '2`18', '2`24', '2`30', '2`42'];
const options = {};

export default function ContentTrack({ current, theads }: ITable) {
  const { matches } = useAppSelector((state) => state.matchList);
  const trackList = useMemo(() => getTrackList(matches?.matches), [matches]);
  const [currentTrack, setCurrentTrack] = useState<ITrackRecord | null>(trackList[0]);
  useEffect(() => {
    setCurrentTrack(trackList[0] || null);
  }, [trackList]);

  const handleSelect = useCallback(
    (id: string) => {
      const track = trackList.filter((item) => item.id === id);
      setCurrentTrack(track[0] || null);
    },
    [setCurrentTrack, trackList],
  );

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
            <span>{currentTrack?.name}</span> 기록 분포
          </ChartTitle>
          {dataSample && <LineChart datas={dataSample} labels={labels} options={options} />}
        </ChartWrap>
      </Box>
      <Table theads={theads} datas={trackList} handleSelect={handleSelect} />
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
  font-weight: 500;
`;
export const Title = styled.p`
  span {
    color: ${({ theme }) => theme.color.main};
  }
`;
const Side = styled.p`
  display: inline-block;
  margin-left: auto;
  font-size: 0.88em;
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
export const IconTrack = styled(GiRoad)`
  background: linear-gradient(white 1%, #d22ab8 85%, rgba(255, 255, 256, 0.5) 100%);
  color: black;
  width: 16px;
  height: 16px;
  border: 2px solid #991886;
  border-radius: 4px;
`;
