import styled from 'styled-components';
import { NEXON_TMI } from 'constants/env';
import User from 'components/User/index';
import ApiInfo from 'components/User/ApiInfo';

function UserPage() {
  return (
    <Wrapper>
      <Background className="background" />
      <Inner className="inner">
        <ApiInfo />
        <User.Profile />
        <User.SummaryRecord />
        <User.TabRecord />
      </Inner>
    </Wrapper>
  );
}

export default UserPage;
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: url(${NEXON_TMI}/img/main_bg1.png) 50% / cover repeat;
  filter: brightness(0.9);
`;

const Inner = styled.div`
  height: auto;
  font-size: 1.2rem;
  > section {
    margin-bottom: 2rem;
  }
`;