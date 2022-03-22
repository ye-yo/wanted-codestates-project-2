import styled from 'styled-components';

interface ICharacter {
  img: string;
}
export default function Character({ img }: ICharacter) {
  return (
    <Box>
      <Img src={img} alt="캐릭터" />
    </Box>
  );
}

const Box = styled.div`
  height: 140px;
`;
const Img = styled.img`
  height: 100%;
  width: auto;
`;
