import styled from 'styled-components';
import { IParsedMatch } from 'interfaces/match';
import Card from './Card';

export default function CardList({ datas }: { datas: IParsedMatch[] }) {
  return (
    <Table>
      {datas.map((data: IParsedMatch) => (
        <Card key={data.matchId} data={data} />
      ))}
    </Table>
  );
}

const Table = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
