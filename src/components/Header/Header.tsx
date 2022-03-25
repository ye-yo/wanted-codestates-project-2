import styled from 'styled-components';
import Info from './Info';
import Menu from './Menu';

function Header() {
  return (
    <HeaderWrap>
      <InfoWrap>
        <Info />
      </InfoWrap>
      <Menu />
    </HeaderWrap>
  );
}

const HeaderWrap = styled.header`
  position: relative;
  > nav,
  .info {
    max-width: 1000px;
    margin: 0 auto;
  }
  z-index: 100;
`;

const InfoWrap = styled.div`
  background-color: white;
`;

export default Header;
