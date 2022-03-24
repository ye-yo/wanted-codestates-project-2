import { useState } from 'react';
import styled, { css } from 'styled-components';
import { IParsedMatch } from 'interfaces/match';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { convertRelativeDate } from 'utils/date';
import HiddenContent from './HiddenContent';

interface ICardProps {
  data: IParsedMatch;
}

const today = new Date();
function Card({ data }: ICardProps) {
  const [open, setOpen] = useState<boolean>(false);
  const handleClickCard = () => {
    setOpen((open) => !open);
  };

  return (
    <CardWrap>
      <WhiteBoard>
        <Row win={!!data.win} retired={!!data.retired}>
          <Item className="date">{convertRelativeDate(today, data.date)}</Item>
          <Item className="rank">
            #{data.retired ? '리타이어' : data.rank}
            {!data.retired && <span> /{data.playerCount}</span>}
          </Item>
          <Item className="track">
            <span>{data.trackName}</span>
          </Item>
          <Item className="kart">{data.kartName}</Item>
          <Item className="time">{data.record}</Item>
          <Item className="more" onClick={handleClickCard} style={{ cursor: 'pointer' }}>
            <IconToggle open={open} />
          </Item>
        </Row>
      </WhiteBoard>
      <HiddenContent open={open} matchId={data.matchId} />
    </CardWrap>
  );
}

export default Card;

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
  min-height: 88px;
  position: relative;
  &:before {
    position: absolute;
    top: -1px;
    left: -4px;
    content: '';
    display: block;
    width: 4px;
    height: calc(100% + 2px);
    border-style: solid;
    border-width: 1px 1px 1px 4px;
  }
  position: relative;
  ${({ win, retired, theme }: IRow) => {
    let color = '#a1a1a1';
    if (retired) {
      color = theme.color.red;
    } else if (win) {
      color = theme.color.main;
    }
    return css`
      color: ${color};
      background-color: ${color === '#a1a1a1' ? '#ffffff' : color}33;
      &:before {
        border-color: transparent transparent transparent ${color};
      }
    `;
  }}
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
  &.track:after,&.kart:after{
    content: "";
    position: absolute;
    display: inline-block;
    top: 38px;
    right: 0;
    width: 1px;
    height: 16px;
    background-color: #ebebeb;
}
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
