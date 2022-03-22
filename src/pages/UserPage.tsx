import styled from 'styled-components';
import { NEXON_TMI } from 'constants/env';
import User from 'components/User/index';
import ApiInfo from 'components/User/ApiInfo';

function UserPage() {
  return (
    <Background className="background">
      <Inner className="inner">
        <ApiInfo />
        <User.Profile />
        <User.SummaryRecord />
      </Inner>
    </Background>
  );
}

export default UserPage;

const Background = styled.div`
  background: url(${NEXON_TMI}/img/main_bg1.png) 50% / cover repeat;
`;

const Inner = styled.div`
  height: auto;
  font-size: 1.2rem;
  > section {
    margin-bottom: 2rem;
  }
`;
