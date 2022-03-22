import { useState, useCallback } from 'react';
import styled from 'styled-components';
import Tab from 'components/Tab';
import { SIDE_TABS } from 'constants/match';

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
    </Wrapper>
  );
}

const Wrapper = styled.section`
  flex: 1;
  font-size: 1.2rem;
  gap: 20px;
  background-color: #ffffff88;
`;
