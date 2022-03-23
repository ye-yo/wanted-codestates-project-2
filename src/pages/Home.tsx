import styled from 'styled-components';
import { NEXON_TMI } from 'constants/env';
import Title from 'components/Home/Title';
import Search from 'components/Home/Search';

function Home() {
  return (
    <Wrapper>
      <Background className="background">
        <Filter />
        <Main className="inner">
          <Title />
          <Search />
        </Main>
      </Background>
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.section`
  width: 100%;
  height: calc(90vh - ${({ theme }) => theme.size.infoHeight});
  font-size: 1.2rem;
  color: white;
`;
const Filter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #005fcc;
  opacity: 0.3;
`;
const Background = styled.div`
  background: url(${NEXON_TMI}/img/main_bg1.png) 50% / cover repeat;
`;

const Main = styled.div`
  position: relative;
  text-align: center;
`;
