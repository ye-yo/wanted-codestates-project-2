import { SAMPLE_PLAYERS } from 'constants/match';
import styled from 'styled-components';
import { toggleFold } from 'styles/animations';
// import { IPlayer } from 'interfaces/match';
const arr = ['1', '2', '3', '4', '5', '6', '7', '8'];

export default function HiddenContent({ open }: { open: boolean }) {
  const datas = SAMPLE_PLAYERS;
  return (
    <Wrapper open={open}>
      <Item>
        <Cell>#</Cell>
        <Cell>카트</Cell>
        <Cell>유저</Cell>
        <Cell>기록</Cell>
      </Item>
      {arr.map((key, index) => (
        <Item key={key}>
          <Cell>{datas[index] ? `${datas[index].matchRank}위` : '-'}</Cell>
          {datas[index] && (
            <>
              <Cell>
                <img alt={datas[index].characterName} src={`/metadata/kart/${datas[index].kart}.png`} />
              </Cell>
              <Cell>
                <a href={`/user?nick=${datas[index].characterName}`}>{datas[index].characterName}</a>
              </Cell>
              <Cell>{datas[index].matchTime}</Cell>
            </>
          )}
        </Item>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin-left: 4px;
  width: calc(100% - 4px);
  background: #ffffff;
  display: ${({ open }: { open: boolean }) => (open ? 'flex' : 'none')};
  transition: ${toggleFold} 2s;
`;

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
  .current {
    background-color: ${({ theme }) => theme.color.main}11;
  }
`;

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60px;
  :first-child {
    background-color: #eeeeee66;
  }
  img {
    height: auto;
    width: 60%;
    object-fit: contain;
  }
`;
