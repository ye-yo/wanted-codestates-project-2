import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { MENU_LIST } from 'constants/header';

function Menu() {
  return (
    <Wrapper>
      {MENU_LIST.map(({ id, name, link }) => (
        <MenuItem key={id}>
          <NavLink className="item" to={link}>
            {name}
          </NavLink>
        </MenuItem>
      ))}
    </Wrapper>
  );
}

export default Menu;

const Wrapper = styled.nav`
  position: relative;
  height: 56px;
  z-index: 10;
`;

export const HoverItem = styled.li`
  display: inline-block;
  width: 120px;
  line-height: 56px;
  font-size: 1.2rem;
  .item {
    cursor: pointer;
    display: block;
    color: white;
    width: 80px;
    text-align: center;
    position: relative;
    opacity: 0.5;
    transition: all 0.15s ease-in-out;
    &:after {
      position: absolute;
      bottom: 0;
      margin: 0 auto;
      width: 0;
      left: 0;
      bottom: 0;
      content: '';
      border-bottom: 4px solid #fff;
    }
    &.active {
      opacity: 1;
      &:after {
        width: 100%;
        border-bottom: 4px solid #fff;
      }
    }
  }
`;

const MenuItem = styled(HoverItem)`
  height: 100%;
  .item {
    height: 100%;
  }
  &:hover .item {
    opacity: 1;
    &:after {
      width: 100%;
      transition: all 0.15s ease-in-out;
    }
  }
`;