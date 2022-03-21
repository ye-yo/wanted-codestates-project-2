import styled from 'styled-components';
import Info from './Info';
import Menu from './Menu';

function Header() {
  return (
    <HeaderWrap>
      <Info />
      <Menu />
    </HeaderWrap>
  );
}

const HeaderWrap = styled.header`
  > * {
    max-width: 1000px;
    margin: 0 auto;
  }
`;

export default Header;
