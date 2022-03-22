import styled from 'styled-components';
import { SAMPLE_DATAS } from 'constants/match';
import CardTable from 'components/Card/CardTable';

export default function MatchHistory() {
  return (
    <Wrapper>
      <TabContent>
        <CardTable datas={SAMPLE_DATAS} />
      </TabContent>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  flex: 2;
  padding-bottom: 6rem;
`;

const TabContent = styled.div`
  width: 100%;
`;
