import styled from 'styled-components';
import { getKartList, getTrackWithKart, getIdToName } from 'utils/parser';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppSelector } from 'store/config';
import { EMPTY_KART_IMG, NEXON_STORAGE_URL } from 'constants/env';
import { IKartRecord, IParsedMatch } from 'interfaces/match';
import { handleKartImgError } from 'utils/common';
import { Wrapper, Box, TitleWrap, Title, IconTrack } from './ContentTrack';
import Table from './Table';

interface ITable {
  current: boolean;
  theads: readonly string[];
}

interface ICurrentKart extends IKartRecord {
  tracks: IParsedMatch[] | [];
}

const getKartData = (kartList: IKartRecord[], id: string, matches: IParsedMatch[] | undefined) => {
  if (!matches) return null;
  const kartData = kartList.filter((item) => item.id === id);
  const kart = {
    ...kartData[0],
    tracks: getTrackWithKart(id, matches).slice(0, 4),
  };
  return kart;
};

export default function ContentKart({ current, theads }: ITable) {
  const { matches } = useAppSelector((state) => state.matchList);
  const kartList = useMemo(() => getKartList(matches?.matches), [matches]);
  const [currentKart, setCurrentKart] = useState<ICurrentKart | null>(null);

  useEffect(() => {
    if (kartList.length > 0) {
      setCurrentKart(getKartData(kartList, kartList[0].id, matches?.matches));
    } else setCurrentKart(null);
  }, [kartList]);

  const handleSelect = useCallback(
    (id: string) => {
      setCurrentKart(getKartData(kartList, id, matches?.matches));
    },
    [setCurrentKart, kartList],
  );

  return (
    <Wrapper current={current ? 1 : 0}>
      <Box>
        <TitleWrap>
          <Title>
            <span>카트</span>전적
          </Title>
        </TitleWrap>
        <KartWrap>
          <KartTitle>
            {currentKart && (
              <>
                <span>일반</span> {currentKart?.name.name}
              </>
            )}
          </KartTitle>
          <KartDetail>
            <img
              src={`${currentKart?.id ? `${NEXON_STORAGE_URL}/kart/${currentKart?.id}.png` : EMPTY_KART_IMG}`}
              onError={handleKartImgError}
              alt="카트"
            />
            <MatchRecordList>
              {currentKart &&
                currentKart?.tracks.map((data: IParsedMatch) => (
                  <TimeRow key={data.matchId}>
                    <IconTrack />
                    <span>{getIdToName('track', data.trackId)}</span>
                    <span>{data.record || '-'}</span>
                  </TimeRow>
                ))}
            </MatchRecordList>
          </KartDetail>
        </KartWrap>
      </Box>
      <Table theads={theads} datas={kartList} handleSelect={handleSelect} />
    </Wrapper>
  );
}

const KartWrap = styled.div`
  min-height: 100px;
  padding-top: 1rem;
`;
const KartTitle = styled.p`
  margin-bottom: 0.8rem;
  span {
    vertical-align: middle;
    border-radius: 2rem;
    padding: 2px 10px;
    font-size: 0.8em;
    border: 1px solid black;
    margin-right: 4px;
  }
`;
const KartDetail = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
  min-height: 100px;
  > img {
    width: 38%;
    height: auto;
    object-fit: contain;
  }
`;
const MatchRecordList = styled.ul`
  flex: 1;
  border-left: 1px solid ${({ theme }) => theme.color.main}44;
  padding: 0.4rem 0.6rem;
  margin-left: 10px;
`;

const TimeRow = styled.li`
  display: flex;
  align-items: center;
  font-size: 0.88em;
  white-space: nowrap;
  text-overflow: ellipsis;
  height: 24px;
  padding: 2px 0;
  > * {
    margin-right: 4px;
    &:last-child {
      margin-right: 0;
      margin-left: auto;
    }
  }
  img {
    height: 100%;
  }
`;
