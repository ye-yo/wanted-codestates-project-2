import { useState } from 'react';
import styled, { css } from 'styled-components';
import { IParsedMatch } from 'interfaces/match';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { convertRelativeDate } from 'utils/date';
import { CardWrap, ItemUI, RowUI } from 'components/Skeletons/CardUI';
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

const WhiteBoard = styled.div`
  background: white;
`;
const Row = styled(RowUI)`
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

const Item = styled(ItemUI)``;

const IconToggle = styled(IoIosArrowDropdownCircle)`
  transition: transform 0.4s;
  ${({ open }: { open: boolean }) =>
    open &&
    css`
      transform: rotate(180deg);
    `}
`;
