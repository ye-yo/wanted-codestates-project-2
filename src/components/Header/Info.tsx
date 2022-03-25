import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { NEXON_TMI } from 'constants/env';

function Info() {
  return (
    <Wrapper className="info">
      <BtnDropDown>
        <img src={`${NEXON_TMI}/img/assets/logo_kart.png`} alt="카트라이더 로고" />
      </BtnDropDown>
      <Link to="/">
        <img src={`${NEXON_TMI}/img/assets/tmi_logo_default_b.svg`} alt="TMI 로고" />
      </Link>
      <LinkRight href="https://kart.nexon.com/Main/Index.aspx" target="_blank" rel="noreferrer">
        카트라이더 홈페이지 바로가기
      </LinkRight>
    </Wrapper>
  );
}

export default Info;

const Wrapper = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.size.infoHeight};
  background-color: white;
  vertical-align: middle;
  display: flex;
  align-items: center;
  position: relative;
  > * {
    padding-left: 8px;
  }
`;

const BtnDropDown = styled.div`
  margin-right: 10px;
`;

const LinkRight = styled.a`
  position: absolute;
  right: 0;
  font-size: 12px;
  color: #6c7a89;
  text-decoration: none;
`;
