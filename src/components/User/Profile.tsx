import { useEffect, useState } from 'react';
import { NEXON_TMI, NEXON_STORAGE_URL } from 'constants/env';
import styled from 'styled-components';
import { useAppSelector } from 'store/config';
import { convertRelativeDate } from 'utils/date';
import Character from './Profile/Character';
import ButtonWrap from './Profile/ButtonWrap';
import SubProfile from './Profile/SubProfile';
import MatchTypeWrap from './Profile/MatchTypeWrap';

const getLastDateString = (date: string) => {
  return convertRelativeDate(new Date(), date);
};

export default function Profile() {
  const { user, lastUpdate } = useAppSelector((state) => state.user);
  const { matches } = useAppSelector((state) => state.matchList);
  const [lastUpdateText, setLastUpdateText] = useState<string>();
  useEffect(() => {
    if (lastUpdate) {
      setLastUpdateText(getLastDateString(lastUpdate));
    }
  }, [lastUpdate, setLastUpdateText]);

  return (
    <Wrapper>
      {user && (
        <>
          <Block>
            <Character img={`${NEXON_STORAGE_URL}/character/${matches?.currentUserData.character}.png`} />
          </Block>
          <Block right>
            <Name>{user.name}</Name>
            <License alt="라이센스" src={`${NEXON_TMI}/img/icon_l3.png`} />
            <SubProfile level={user.level} views="25" />
            {/* <Ranking>종합랭킹 1,174위</Ranking> */}
            <ButtonWrap />
            <Info>최근 업데이트 : {lastUpdateText}</Info>
          </Block>
        </>
      )}
      <MatchTypeWrap />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  font-size: 1.2rem;
  display: flex;
  padding: 2rem 0;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  position: relative;
`;
const Name = styled.h1`
  display: inline-block;
  font-size: 2.4em;
  font-weight: bold;
  margin: 0 10px 1rem 0;
`;
const License = styled.img`
  width: 20px;
  height: 20px;
`;
const Block = styled.div`
  ${({ right }: { right?: boolean }) =>
    right &&
    `
      margin-left: 1rem;
      > div{
        margin-bottom: 1rem;
      }
  `}
`;
const Info = styled.p`
  font-size: 0.88em;
  word-spacing: 1px;
`;
