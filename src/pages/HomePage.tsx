import styled, { css } from 'styled-components';
import { NEXON_TMI } from 'constants/env';
import Title from 'components/Home/Title';
import Search from 'components/Home/SearchBar';
import { move } from 'styles/animations';

function Home() {
  return (
    <Wrapper>
      <Background className="background">
        <Filter />
        <CenterWrap>
          <Main className="inner">
            <Title />
            <Search />
          </Main>
          <ImageWrap>
            <Character alt="배찌" direction="left" src={`${NEXON_TMI}/img/assets/covid_left.png`} />
            <Character alt="다오" direction="right" src={`${NEXON_TMI}/img/assets/covid_right.png`} />
            <Track alt="트랙" direction="left" src={`${NEXON_TMI}/img/main_left_bg.png`} />
            <Track alt="트랙" direction="right" src={`${NEXON_TMI}/img/main_right_bg.png`} />
          </ImageWrap>
        </CenterWrap>
      </Background>
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.section`
  width: 100%;
  height: auto;
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
  height: calc(100% - 48px);
  background: url(${NEXON_TMI}/img/main_bg1.png) 50% / cover repeat;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CenterWrap = styled.div`
  height: 655px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Main = styled.div`
  text-align: center;
  width: 100% !important;
  min-width: 480px;
  font-size: 1.6rem;
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 10;
`;

const ImageWrap = styled.div`
  position: relative;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  height: 360px;
`;

const Character = styled.img`
  display: block;
  position: absolute;
  width: 380px;
  top: 200px;
  transform: translateY(-50%);
  ${({ direction }: { direction: string }) =>
    css`
      ${direction === 'left' ? 'left' : 'right'} : 0;
      ${direction === 'left' ? 'margin-left' : 'margin-right'}: -800px;
      animation: ${move(direction)} 0.5s forwards ease-in-out;
    `}
  ${({ theme }) => theme.tablet`
    display:none;
  `}
`;

const Track = styled.img`
  position: absolute;
  width: 447px;
  height: 296px;
  top: 200px;
  transform: translateY(-50%);
  margin-left: -800px;
  z-index: 0;
  ${({ direction }: { direction: string }) =>
    css`
      ${direction === 'left' ? 'left' : 'right'} : 0;
      ${direction === 'left' ? 'margin-left' : 'margin-right'}: -800px;
      animation: ${move(direction)} 0.3s forwards ease-in-out;
    `}
  ${({ theme }) => theme.tablet`
    display:none;
  `}
`;
