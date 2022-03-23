import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { SIDE_TABS, THEADS_TRACK, THEADS_KART } from 'constants/match';
import Tab from 'components/Tab';
import ContentTrack from './ContentTrack';
import ContentKart from './ContentKart';

const datasTrack = [
  {
    track: {
      img: 'https://s3-ap-northeast-1.amazonaws.com/solution-userstats/kartimg/Category/village_1.png',
      name: '빌리지 운하',
    },
    count: 35,
    win: '31%',
    time: `1'04'50`,
    top: '60%',
  },
  {
    track: {
      img: 'https://s3-ap-northeast-1.amazonaws.com/solution-userstats/kartimg/Category/village_1.png',
      name: '빌리지 운하',
    },
    count: 35,
    win: '31%',
    time: `1'04'50`,
    top: '60%',
  },
];
const datasKart = [
  {
    track: {
      img: 'https://s3-ap-northeast-1.amazonaws.com/solution-userstats/metadata/kart/d47aa62de79d88ecee263e07456555d99ff8957f1760d0f248667913acbc2b67.png?v=1647955623',
      name: '파라곤 X',
    },
    count: 35,
    win: '31%',
    retired: '21%',
  },
  {
    track: {
      img: 'https://s3-ap-northeast-1.amazonaws.com/solution-userstats/metadata/kart/d47aa62de79d88ecee263e07456555d99ff8957f1760d0f248667913acbc2b67.png?v=1647955623',
      name: '파라곤 X',
    },
    count: 35,
    win: '31%',
    retired: '21%',
  },
];

export default function SideRecord() {
  const [currentTab, setCurrentTab] = useState<string>(SIDE_TABS[0].name);
  const handleChangeTab = useCallback(
    (name: string) => {
      setCurrentTab(name);
    },
    [setCurrentTab],
  );

  return (
    <Wrapper>
      <Tab tabs={SIDE_TABS} currentTab={currentTab} setCurrentTab={handleChangeTab} />
      <TabContent>
        <ContentTrack current={currentTab !== '트랙'} theads={THEADS_TRACK} datas={datasTrack} />
        <ContentKart current={currentTab === '트랙'} theads={THEADS_KART} datas={datasKart} />
      </TabContent>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  flex: 1;
  font-size: 1.2rem;
  gap: 20px;

  > ul {
    line-height: 40px;
    margin-bottom: 10px;
    .item {
      border-radius: 2rem;
      background-color: ${({ theme }) => theme.color.main};
      &.active {
        color: black;
        background-color: #ffffffcc;
      }
      &:hover {
      }
      &:after {
        content: none;
      }
    }
  }
`;
const TabContent = styled.section`
  background-color: #ffffffcc;
`;
