import styled from 'styled-components';
import { BsFillInfoCircleFill } from 'react-icons/bs';

function ApiInfo() {
  return (
    <Wrapper>
      <BsFillInfoCircleFill />
      카트라이더 매치데이터는 최근 1년치 데이터만 확인할 수 있습니다.
    </Wrapper>
  );
}

export default ApiInfo;

const Wrapper = styled.div`
  height: 50px;
  line-height: 50px;
  font-size: 12px;
  color: white;
  > * {
    font-size: 12px;
  }
  svg {
    margin-right: 4px;
    width: 10px;
    height: 10px;
  }
`;
