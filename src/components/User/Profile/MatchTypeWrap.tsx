import styled, { css } from 'styled-components';
import { useState } from 'react';
import Toggle from 'components/Toggle';
import { TOGGLE_COLORS } from 'constants/match';

export default function MatchTypeWrap() {
  const [type, setType] = useState<boolean>(false);
  const [showRetired, setShowRetired] = useState<boolean>(true);
  const handleClickType = () => {
    setType((type) => !type);
    console.log(showRetired);
  };
  return (
    <OptionWrap>
      <ButtonGameType current={!type} onClick={handleClickType}>
        개인전
      </ButtonGameType>
      <ButtonGameType current={type} onClick={handleClickType}>
        팀전
      </ButtonGameType>
      <ToggleWrap>
        리타이어 노출
        <Toggle width={60} height={26} color={TOGGLE_COLORS} setState={setShowRetired} />
      </ToggleWrap>
    </OptionWrap>
  );
}

const OptionWrap = styled.div`
  display: flex;
  position: absolute;
  right: 1.6rem;
  bottom: 1rem;
`;
const ButtonGameType = styled.button`
  padding: 1.4rem 1rem;
  border-radius: 2rem;
  font-size: 1.2rem;
  margin-right: 4px;
  opacity: 0.5;
  background-color: white;
  border: 1px solid #ffffff99;
  color: gray;
  ${({ current, theme }: { current: boolean; theme: any }) =>
    current &&
    css`
      background-color: white;
      font-weight: bold;
      color: ${theme.color.main};
      border-color: white;
      opacity: 1;
    `}
`;

const ToggleWrap = styled.div`
  display: flex;
  align-items: center;
  color: white;
  margin-left: 10px;
  > div {
    margin-left: 6px;
  }
`;
