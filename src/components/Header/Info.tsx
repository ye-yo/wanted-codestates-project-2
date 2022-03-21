import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Info() {
  return (
    <Wrapper>
      <BtnDropDown>
        <img src="https://tmi.nexon.com/img/assets/logo_kart.png" alt="카트라이더 로고" />
      </BtnDropDown>
      <Link to="/">
        <img src="https://tmi.nexon.com/img/assets/tmi_logo_default_b.svg" alt="TMI 로고" />
      </Link>
    </Wrapper>
  );
}

export default Info;

const Wrapper = styled.div`
  width: 100%;
  height: 48px;
  background-color: white;
  vertical-align: middle;
  position: relative;
  display: flex;
  align-items: center;
  > * {
    padding-left: 8px;
  }
`;

const BtnDropDown = styled.div`
  margin-right: 10px;
`;
