import { NEXON_TMI } from 'constants/env';
import styled from 'styled-components';
import Character from './Profile/Character';
import ButtonWrap from './Profile/ButtonWrap';
import SubProfile from './Profile/SubProfile';

export default function Profile() {
  return (
    <Wrapper>
      <Block>
        <Character img="/character.png" />
      </Block>
      <Block right>
        <Name>배찌</Name>
        <License alt="라이센스" src={`${NEXON_TMI}/img/icon_l3.png`} />
        <SubProfile level="140" views="25" />
        {/* <Ranking>종합랭킹 1,174위</Ranking> */}
        <ButtonWrap />
        <Info>최근 업데이트 : 352시간 전</Info>
      </Block>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  font-size: 1.2rem;
  display: flex;
  padding: 2rem 0;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
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
// const Ranking = styled.div``;
const Info = styled.p`
  font-size: 0.88em;
`;
