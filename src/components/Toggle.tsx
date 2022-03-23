import { useState, memo } from 'react';
import styled, { css } from 'styled-components';

const defaultWidth = 80;
const defaultHeight = 34;
interface IToggle {
  width?: number;
  height?: number;
  color: string[] | readonly string[];
  setState: (state: boolean) => void;
}
function Toggle({ width = defaultWidth, height = defaultHeight, setState, color = ['black', 'lightgray'] }: IToggle) {
  const [checked, setChecked] = useState<boolean>(true);
  const handleClick = () => setChecked((checked) => !checked);
  setState(checked);
  return (
    <div>
      <ToggleContainer
        width={width}
        height={height}
        checked={checked}
        onClick={handleClick}
        on={color[0]}
        off={color[1]}
      >
        <ToggleSwitch height={height} />
      </ToggleContainer>
    </div>
  );
}

Toggle.defaultProps = { width: defaultWidth, height: defaultHeight };

export default memo(Toggle);

interface Props {
  width: number;
  height: number;
  on: string;
  off: string;
  checked?: boolean;
}

interface CheckedProps {
  width: number;
  height: number;
  checked?: boolean;
}

const ToggleContainer = styled.div`
  display: inline-block;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  ${({ width, height, on, off }: Props) =>
    css`
      width: ${width}px;
      height: ${height}px;
      background-color: ${off};
      border-radius: ${height * 0.5}px;
      &::before {
        content: '';
        position: absolute;
        background-color: ${on};
        width: ${width}px;
        height: ${height}px;
        border-radius: 0;
        transition-duration: 0.6s;
        left: -${width}px;
      }
    `}

  ${({ width, height, checked }: CheckedProps) =>
    checked &&
    css`
      &::before {
        left: 0;
      }
      & ${ToggleSwitch} {
        left: ${width - height * (0.3 / 2 + 0.7)}px;
      }
    `}
`;

const ToggleSwitch = styled.div`
  ${({ height }: { height: number }) => css`
    position: absolute;
    width: ${height * 0.7}px;
    height: ${height * 0.7}px;
    background-color: white;
    border-radius: 50%;
    top: 50%;
    left: ${(height * 0.3) / 2}px;
    transform: translate(0, -50%);
    transition: left 0.5s;
    z-index: 1;
  `}
`;
