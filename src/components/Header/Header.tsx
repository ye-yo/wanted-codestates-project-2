import React from 'react';
import styled from 'styled-components';
import Info from './Info';
import Menu from './Menu';

function Header() {
  return (
    <Wrapper>
      <Info />
      <Menu />
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.header`
  width: 100%;
  background-color: black;
  z-index: 110;
`;
