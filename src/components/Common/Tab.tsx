import { memo } from 'react';
import styled from 'styled-components';
import { HoverItem } from 'components/Header/Menu';
import { ITab, ITabItem } from 'interfaces/tab';

function Tab({ tabs, currentTab, setCurrentTab }: ITab) {
  return (
    <TabList as="ul">
      {tabs.map((tab) => (
        <TabItem key={tab.id} tab={tab} setCurrentTab={setCurrentTab} currentTab={currentTab} />
      ))}
    </TabList>
  );
}
export default memo(Tab);

const TabItem = memo(function TabItem({ tab, setCurrentTab, currentTab }: ITabItem) {
  const handleClick = () => {
    setCurrentTab(tab.name);
  };

  return (
    <TabItemWrap key={tab.id} className={`item${currentTab === tab.name ? ' active' : ''}`} onClick={handleClick}>
      {tab.name}
    </TabItemWrap>
  );
});

const TabList = styled(HoverItem)`
  width: 100%;
  display: flex;
`;

const TabItemWrap = styled.li`
  font-size: 1.2rem;
  width: 80px;
  text-align: center;

  &:hover {
    opacity: 1;
    &:after {
      width: 100%;
      transition: all 0.15s ease-in-out;
    }
  }
`;
