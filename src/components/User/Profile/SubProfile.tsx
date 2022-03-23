import styled from 'styled-components';

interface ISubProfile {
  level: number;
  views: string;
}
export default function SubProfile({ level, views }: ISubProfile) {
  return (
    <Wrapper>
      <Text>Lv.{level}</Text>
      <Text>조회수 {views}</Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  font-size: 1em;
`;

const Text = styled.span`
  &:nth-child(n + 2):before {
    display: inline-block;
    content: '';
    width: 1.4px;
    height: 10px;
    background-color: white;
    margin: 0 10px;
  }
`;
