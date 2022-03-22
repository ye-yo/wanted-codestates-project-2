import { useState } from 'react';
import styled, { css } from 'styled-components';
import { ICard } from 'interfaces/match';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import HiddenContent from './HiddenContent';

interface ICardProps {
  data: ICard;
}

export default function Card({ data }: ICardProps) {
  const [open, setOpen] = useState<boolean>(false);
  const handleClickCard = () => {
    setOpen((open) => !open);
  };
  return (
    <CardWrap>
      <WhiteBoard>
        <Row win={!!data.win} retired={!!data.retired}>
          <Item className="date">{data.date}</Item>
          <Item className="rank">
            #{data.rank}
            <span>/{data.total}</span>
          </Item>
          <Item className="track">
            <span>{data.track}</span>
          </Item>
          <Item className="kart">{data.kart}</Item>
          <Item className="time">{data.time}</Item>
          <Item className="more" onClick={handleClickCard}>
            <IconToggle open={open} />
          </Item>
        </Row>
      </WhiteBoard>
      <HiddenContent open={open} />
    </CardWrap>
  );
}
interface IRow {
  win: boolean;
  theme: any;
  retired: boolean;
}

const CardWrap = styled.div`
  margin-bottom: 6px;
`;

const WhiteBoard = styled.div`
  background: white;
`;
const Row = styled.div`
  width: 100%;
  display: table;
  min-height: 80px;
  border-left: 4.8px solid gray;
  position: relative;
  ${({ win, retired, theme }: IRow) =>
    css`
      color: ${retired ? theme.color.red : win && theme.color.main};
      background-color: ${retired ? theme.color.red : win && theme.color.main}33;
      border-color: ${retired ? theme.color.red : win && theme.color.main};
    `}
`;
const Item = styled.p`
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
  &.date {
    font-size: 0.88em;
    width: 60px;
  }
  &.rank {
    font-style: italic;
    font-weight: 500;
    color: inherit;
    width: 140px;
    font-size: 2.2em;
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
`;

const IconToggle = styled(IoIosArrowDropdownCircle)`
  transition: transform 0.4s;
  ${({ open }: { open: boolean }) =>
    open &&
    css`
      transform: rotate(180deg);
    `}
`;
