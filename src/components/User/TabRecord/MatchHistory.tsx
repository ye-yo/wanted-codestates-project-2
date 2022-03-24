import styled from 'styled-components';
import CardTable from 'components/Card/CardTable';
import { useAppSelector } from 'store/config';

export default function MatchHistory() {
  const { matches } = useAppSelector((state) => state.matchList);
  return (
    <Wrapper>
      <TabContent>{matches?.matches && <CardTable datas={matches.matches} />}</TabContent>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  flex: 2;
  margin-top: 50px;
`;

const TabContent = styled.div`
  width: 100%;
`;
