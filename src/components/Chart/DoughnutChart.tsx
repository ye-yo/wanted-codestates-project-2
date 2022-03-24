import { WrapperUI, DoughnutUI, TitleUI, HoleUI } from 'components/Skeletons/DoughnutChartUI';
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
const getStrokeDashOffset = (full: number, percent: number, radiusSize: number) => {
  const offset = full * (1 - percent / 100);
  const weight = radiusSize / 5;
  if (offset === full) return offset;
  const offset2 = offset + weight;
  return offset2 > full ? full - 0.1 : offset2;
};

function DoughnutChart({ percentage, options }: IDoughnutChart) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [doughnutOptions, setDoughnutOptions] = useState({ size: 100, full: 500, offset: 500, circleRadius: 250 });

  useEffect(() => {
    if (parentRef?.current) {
      const size = parentRef?.current.clientWidth;
      const diameter = size - STROKE_WIDTH;
      const full = diameter * Math.PI;
      const circleRadius = size / 2 - STROKE_WIDTH / 2;
      const offset = getStrokeDashOffset(full, percentage, circleRadius);
      setDoughnutOptions({ size, full, offset, circleRadius });
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
        circleRadius={doughnutOptions.circleRadius}
      >
        <Hole className="hole">
          <Text>{percentage || 0}%</Text>
        </Hole>
        <Outer />
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%">
          <circle />
        </svg>
      </Doughnut>
    </Wrapper>
  );
}

const Wrapper = styled(WrapperUI)``;

const Title = styled(TitleUI)``;

interface IDoughnut {
  full: number;
  offset: number;
  strokeWidth: number;
  size: number;
  color: string;
  circleRadius: number;
}
const Doughnut = styled(DoughnutUI)`
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
    cursor: initial;
    position: absolute;
    top: 0;
    left: 0;
  }
  circle {
    transform-origin: center;
    fill: none;
    stroke-linecap: round;
    ${({ size, color, full, offset, strokeWidth, circleRadius }: IDoughnut) => css`
      transform: ${`rotate(-${90 - Math.floor(circleRadius / 4)}deg)`}; // 시작지점을 위로
      cx: ${size / 2};
      cy: ${size / 2};
      r: ${circleRadius};
      stroke: ${color};
      stroke-width: ${strokeWidth}px;
      stroke-dasharray: ${full}; //점선 //원둘레
      stroke-dashoffset: ${full}; //어디서부터 시작할지
      animation: ${fillColor(offset)} 2s linear forwards;
    `}
  }
`;

const Hole = styled(HoleUI)``;

const Outer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.15), -6px -6px 10px -1px rgba(255, 255, 255, 0.4);
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
