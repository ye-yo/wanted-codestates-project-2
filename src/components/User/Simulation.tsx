import styled from 'styled-components';
import { gradient } from 'styles/animations';

function Simulation() {
  return <Wrapper>1대1 매칭 시뮬레이터가 곧 서비스됩니다.</Wrapper>;
}

export default Simulation;

const Wrapper = styled.div`
  height: 45px;
  line-height: 45px;
  background: linear-gradient(-45deg, #ee7752, #f62459, #07f, #23d5ab);
  animation: ${gradient} 15s ease infinite;
  color: #fff;
  font-weight: 500;
  background-size: 400% 400%;
  padding-left: 2rem;
  margin: 2rem 0;
  box-shadow: 0px 0px 1px 0px #ffffff88;
`;
