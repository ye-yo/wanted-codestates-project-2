import { useCallback } from 'react';
import styled from 'styled-components';
import Tab from 'components/Tab';
import { CHANNEL_TYPES } from 'constants/match';
import { useAppSelector, useAppDispatch } from 'store/config';
import { setChannel } from 'store/slices/matchListSlice';
import MatchHistory from './TabRecord/MatchHistory';
import SideRecord from './TabRecord/SideRecord';

export default function TabRecord() {
  const { filter } = useAppSelector((state) => state.matchList);
  const dispatch = useAppDispatch();

  const handleChangeTab = useCallback(
    (name: string) => {
      dispatch(setChannel(name));
    },
    [setChannel],
  );

  return (
    <Wrapper>
      <Border>
        <Tab tabs={CHANNEL_TYPES} currentTab={filter.channel} setCurrentTab={handleChangeTab} />
      </Border>
      <TabContent>
        <SideRecord />
        <MatchHistory />
      </TabContent>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  font-size: 1.2rem;
  gap: 20px;
`;

const Border = styled.div`
  position: relative;
  :after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    width: 100%;
    bottom: 1.8px;
    border-bottom: 1px solid #ffffff88;
  }
`;
const TabContent = styled.div`
  padding: 1rem 0 6rem;
  display: flex;
  gap: 20px;
`;
