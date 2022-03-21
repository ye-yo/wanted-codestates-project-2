import styled from 'styled-components';
import { NEXON_TMI } from 'constants/env';
import Title from 'components/Home/Title';
import Search from 'components/Home/Search';

function Home() {
  return (
    <Wrapper>
      <Background>
        <Filter />
        <Main>
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
  height: calc(90% - ${({ theme }) => theme.size.infoHeight});
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
  width: 100%;
  height: 100%;
  position: relative;
  margin-top: -55px;
  text-align: center;
  background: url(${NEXON_TMI}/img/main_bg1.png) 50% / cover repeat;
  overflow: hidden;
`;

const Main = styled.div`
  position: relative;
`;
