import styled from 'styled-components';
import Table from './Table';
import { Wrapper, Box, TitleWrap, Title } from './ContentTrack';

interface ITable {
  current: boolean;
  theads: readonly string[];
  datas: any[];
}

const recordList = [
  {
    id: 1,
    icon: 'https://s3-ap-northeast-1.amazonaws.com/solution-userstats/kartimg/Category/village_1.png',
    track: '빌리지 운하',
    time: `1'27'56`,
  },
  {
    id: 2,
    icon: 'https://s3-ap-northeast-1.amazonaws.com/solution-userstats/kartimg/Category/village_1.png',
    track: '빌리지 운하',
    time: `1'27'56`,
  },
];

export default function ContentKart({ current, theads, datas }: ITable) {
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
            <span>일반</span> 파라곤 X
          </KartTitle>
          <KartDetail>
            <img src="/character.png" alt="카트" />
            <MatchRecordList>
              {recordList.map((record) => (
                <TimeRow key={record.id}>
                  <img src={record.icon} alt={`${record.track}트랙 아이콘`} />
                  <span>{record.track}</span>
                  <span>{record.time || '-'}</span>
                </TimeRow>
              ))}
            </MatchRecordList>
          </KartDetail>
        </KartWrap>
      </Box>
      <Table theads={theads} datas={datas} />
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
  > img {
    width: 38%;
    height: auto;
  }
`;
const MatchRecordList = styled.ul`
  flex: 1;
  border-left: 1px solid ${({ theme }) => theme.color.main}44;
  padding: 0.4rem 0.6rem;
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
