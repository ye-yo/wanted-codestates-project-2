import { EMPTY_CHARACTER } from 'constants/env';
import styled from 'styled-components';

interface ICharacter {
  img: string | null;
}
export default function Character({ img }: ICharacter) {
  return <Box>{img ? <Img src={img} alt="캐릭터" /> : <EmptyImg src={`${EMPTY_CHARACTER}`} />}</Box>;
}

const Box = styled.div`
  height: 140px;
`;
const Img = styled.img`
  height: 100%;
  width: auto;
`;

const EmptyImg = styled(Img)`
  filter: blur(10px);
`;
