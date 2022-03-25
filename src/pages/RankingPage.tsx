import styled from 'styled-components';
import { NEXON_TMI } from 'constants/env';

function Ranking() {
  return (
    <Wrapper>
      <Background className="background">
        <p>🎖 랭킹 페이지는 업데이트 예정입니다.</p>
      </Background>
    </Wrapper>
  );
}

export default Ranking;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const Background = styled.div`
  position: absolute;
  height: ${({ theme }) => `calc(100vh - ${theme.size.infoHeight})`};
  top: 0;
  left: 0;
  background: url(${NEXON_TMI}/img/main_bg1.png) 50% / cover repeat;
  filter: brightness(0.9);
  > p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.8rem;
    background: #ffffff88;
    padding: 6rem 2rem;
    border-radius: 1.4rem;
  }
`;
