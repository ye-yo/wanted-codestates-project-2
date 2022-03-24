import { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { fillColor } from 'styles/animations';

interface ChartOptions {
  color: string;
  title?: string;
}
interface IDoughnutChart {
  percentage: number;
  options: ChartOptions;
}

const STROKE_WIDTH = 12;
const getStrokeDashOffset = (full: number, percent: number) => {
  return full * (1 - percent / 360);
};

function DoughnutChart({ percentage, options }: IDoughnutChart) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [doughnutOptions, setDoughnutOptions] = useState({ size: 100, full: 500, offset: 500 });

  useEffect(() => {
    if (parentRef?.current) {
      const size = parentRef?.current.clientWidth;
      const diameter = size - STROKE_WIDTH;
      const full = diameter * Math.PI;
      const offset = getStrokeDashOffset(full, percentage);
      setDoughnutOptions({ size, full, offset });
    }
  }, []);

  return (
    <Wrapper>
      {options?.title && <Title>{options?.title}</Title>}
      <Doughnut
        ref={parentRef}
        color={options?.color || '#0164ff'}
        full={doughnutOptions.full}
        offset={doughnutOptions.offset}
        strokeWidth={STROKE_WIDTH}
        size={doughnutOptions.size}
      >
        <Hole className="hole">
          <Text>{percentage}%</Text>
        </Hole>
        <Outer />
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%">
          <circle />
        </svg>
      </Doughnut>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 1;
  font-size: 1.2rem;
`;

interface IDoughnut {
  full: number;
  offset: number;
  strokeWidth: number;
  size: number;
  color: string;
}
const Doughnut = styled.div`
  position: relative;
  flex: 1;
  border-radius: 50%;
  background-color: #eeeeee;
  ${({ size, strokeWidth, color }: IDoughnut) => css`
    width: ${size}px;
    height: ${size}px;
    color: ${color};
    .hole {
      width: ${size - strokeWidth * 2}px;
      height: ${size - strokeWidth * 2}px;
    }
  `}
  svg {
    position: absolute;
    top: 0;
    left: 0;
  }
  circle {
    transform-origin: center;
    fill: none;
    transform: rotate(-90deg); // 시작지점을 위로
    stroke-linecap: round;
    ${({ size, color, full, offset, strokeWidth }: IDoughnut) => css`
      cx: ${size / 2};
      cy: ${size / 2};
      r: ${size / 2 - STROKE_WIDTH / 2};
      stroke: ${color};
      stroke-width: ${strokeWidth}px;
      stroke-dasharray: ${full}; //점선 //원둘레
      stroke-dashoffset: ${full}; //어디서부터 시작할지
      animation: ${fillColor(offset)} 2s linear forwards;
    `}
  }
`;

const Hole = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: white;
  z-index: 1;
`;

const Outer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.15), -6px -6px 10px -1px rgba(255, 255, 255, 0.4);
`;

const Title = styled.p`
  font-size: 1em;
  text-align: center;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  width: 100%;
  height: 100%;
  font-size: 1.6em;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;
export default DoughnutChart;
