import styled from 'styled-components';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { skeleton } from 'styles/animations';

function CardUI() {
  return (
    <Wrap className="skeleton">
      <WhiteBoard>
        <RowUI>
          <ItemUI className="date">
            <Box />
          </ItemUI>
          <ItemUI className="rank">
            <Box />
          </ItemUI>
          <ItemUI className="track">
            <Box />
          </ItemUI>
          <ItemUI className="kart">
            <Box />
          </ItemUI>
          <ItemUI className="time">
            <Box />
          </ItemUI>
          <ItemUI className="more">
            <IconToggle />
          </ItemUI>
        </RowUI>
      </WhiteBoard>
    </Wrap>
  );
}

export default function CardsUI() {
  return (
    <>
      <CardUI />
      <CardUI />
      <CardUI />
      <CardUI />
      <CardUI />
      <CardUI />
    </>
  );
}

export const CardWrap = styled.div`
  margin-bottom: 6px;
`;

const Wrap = styled(CardWrap)`
  opacity: 0.3;
  position: relative;
  overflow: hidden;
  &.skeleton {
    &:after {
      content: '';
      width: 0;
      height: 100%;
      top: 0;
      box-shadow: 0 0 75px 75px #ffffff65;
      animation: ${skeleton} 1s infinite ease-in;
      position: absolute;
    }
  }
`;

const WhiteBoard = styled.div`
  background: white;
`;

export const RowUI = styled.div`
  width: 100%;
  display: table;
  min-height: 88px;
  position: relative;
`;
export const ItemUI = styled.div`
  flex: 1;
  display: table-cell;
  vertical-align: middle;
  background-color: #ffffff88;
  padding: 1rem 0;
  text-align: center;
  font-size: 1.4rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.font};
  line-height: 1.24;
  white-space: normal;
  overflow: hidden;
  position: relative;
  &.date {
    font-size: 0.88em;
    width: 60px;
  }
  &.rank {
    font-style: italic;
    text-align: left;
    font-weight: 500;
    color: inherit;
    width: 148px;
    font-size: 2em;
    span {
      margin-left: 4px;
      font-size: 0.6em;
    }
  }
  &.track {
  }
  &.kart {
    width: 150px;
  }
  &.time {
    width: 100px;
  }
  &.more {
    width: 60px;
  }
  &.track:after,
  &.kart:after {
    content: '';
    position: absolute;
    display: inline-block;
    top: 38px;
    right: 0;
    width: 1px;
    height: 16px;
    background-color: #ebebeb;
  }
`;

const IconToggle = styled(IoIosArrowDropdownCircle)`
  opacity: 0.3;
`;

const Box = styled.div`
  margin: 0 auto;
  background-color: #dddddd;
  width: auto;
  max-width: 80%;
  height: 2rem;
`;
