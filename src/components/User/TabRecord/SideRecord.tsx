import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { SIDE_TABS, THEADS_TRACK, THEADS_KART } from 'constants/match';
import Tab from 'components/Tab';
import ContentTrack from './ContentTrack';
import ContentKart from './ContentKart';

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
        <ContentTrack current={currentTab !== '트랙'} theads={THEADS_TRACK} />
        <ContentKart current={currentTab === '트랙'} theads={THEADS_KART} />
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
