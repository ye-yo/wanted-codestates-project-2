import { memo } from 'react';
import styled from 'styled-components';
import { CgSpinner } from 'react-icons/cg';
import { rotate } from 'styles/animations';

function Spinner() {
  return (
    <SpinnerWrap>
      <Icon />
    </SpinnerWrap>
  );
}

export default memo(Spinner);

const SpinnerWrap = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 2rem;
  position: fixed;
  color: white;
  top: 50%;
  left: 50%;
  z-index: 101;
  transform: translate(-50%, -50%);
  padding: 4rem;
`;
const Icon = styled(CgSpinner)`
  width: 100%;
  height: 100%;
  animation: ${rotate} 2s linear infinite;
`;
