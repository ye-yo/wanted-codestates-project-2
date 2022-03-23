import styled from 'styled-components';
import { ICardList } from 'interfaces/match';
import Card from './Card';

export default function CardList({ datas }: { datas: ICardList }) {
  return (
    <Table>
      {datas.map((data) => (
        <Card key={data.id} data={data} />
      ))}
    </Table>
  );
}

const Table = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
