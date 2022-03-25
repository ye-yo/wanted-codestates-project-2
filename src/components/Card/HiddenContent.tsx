/* eslint-disable jsx-a11y/click-events-have-key-events */
import styled, { css } from 'styled-components';
import { toggleFold } from 'styles/animations';
import { IPlayer, IMatchDetailDTO, IGameInfo } from 'interfaces/player';
import { memo, useEffect, useState } from 'react';
import { getPlayers, parsedPlayers } from 'utils/players';
import { NEXON_STORAGE_URL } from 'constants/env';
import { useAppDispatch, useAppSelector } from 'store/config';
import { handleKartImgError } from 'utils/common';
import { getUser } from 'services/userService';
import { getMatchList } from 'services/matchListService';

const arr = Object.freeze(['1', '2', '3', '4', '5', '6', '7', '8']);

function HiddenContent({ open, matchId }: { open: boolean; matchId: string }) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [players, setPlayers] = useState<IPlayer[] | null>(null);
  const [gameInfo, setGameInfo] = useState<IGameInfo>();
  useEffect(() => {
    const getDatas = async () => {
      const details: IMatchDetailDTO = await getPlayers(matchId);
      if (details && user?.accessId) {
        const { datas, gameInfo } = parsedPlayers(details, user?.accessId);
        setPlayers(datas);
        setGameInfo(gameInfo);
      }
    };
    if (open && !players) {
      getDatas();
    }
  }, [open]);

  const handleClick = async (name: string) => {
    const response = await dispatch(getUser(name));
    if (response.payload) {
      dispatch(getMatchList({ accessId: response.payload.accessId }));
    }
  };
  return (
    <Wrapper open={open}>
      <Item>
        <Cell>#</Cell>
        <Cell>카트</Cell>
        <Cell>유저</Cell>
        <Cell>기록</Cell>
      </Item>
      {players &&
        arr.map((key, index) => {
          const isWin = players[index]?.matchWin === '' ? '0' : players[index]?.matchWin;
          const retired = players[index]?.matchRetired === '1';
          const userWin = gameInfo?.win === '' ? '0' : gameInfo?.win;
          return (
            <BodyItem
              key={key}
              win={isWin === '1'}
              retired={retired}
              current={gameInfo?.isTeam ? userWin === isWin : user?.accessId === players[index]?.accountNo}
            >
              <Cell>
                {players[index] ? (
                  <>{players[index].matchRetired !== '1' ? `${players[index].matchRank}위` : '리타이어'} </>
                ) : (
                  '-'
                )}
              </Cell>
              {players[index] && (
                <>
                  <Cell>
                    <img
                      alt={players[index].characterName}
                      src={`${NEXON_STORAGE_URL}/kart/${players[index].kart}.png`}
                      onError={handleKartImgError}
                    />
                  </Cell>
                  <Cell>
                    <p onClick={() => handleClick(players[index].characterName)}>{players[index].characterName}</p>
                  </Cell>
                  <Cell> - </Cell>
                </>
              )}
            </BodyItem>
          );
        })}
    </Wrapper>
  );
}
export default memo(HiddenContent);

const Wrapper = styled.section`
  background: #ffffff;
  display: ${({ open }: { open: boolean }) => (open ? 'flex' : 'none')};
  transition: ${toggleFold} 2s;
`;

interface IItemProps {
  win: boolean;
  retired: boolean;
  theme: any;
  current: boolean;
}

const Item = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
  &:first-child {
    width: 80px;
    max-width: 80px;
    flex: auto;
  }
`;

const BodyItem = styled(Item)`
  ${({ win, retired, theme, current }: IItemProps) => {
    let color = retired ? theme.color.red : false;
    color = color || (win ? theme.color.main : 'inherit');
    return css`
      background-color: ${current && `${theme.color.main}11`};
      > div:first-child {
        color: ${color};
      }
      > div:nth-child(n + 2) {
        color: ${retired && current ? theme.color.red : 'inherit'};
      }
      font-weight: ${current && 500};
    `;
  }}
`;

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60px;
  font-size: 0.88em;
  color: inherit;
  :first-child {
    min-height: 44px;
    background-color: #eeeeee66;
  }
  img {
    height: auto;
    width: 60%;
    object-fit: contain;
  }
  p {
    cursor: pointer;
  }
`;
