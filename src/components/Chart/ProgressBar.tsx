import styled, { css } from 'styled-components';
import { IDatas, IChartOption } from 'interfaces/chart';

interface IProgressBar {
  datas: IDatas;
  options?: IChartOption;
}
const defaultProps = {
  options: {
    height: '10px',
  },
};

function ProgressBar({ datas, options }: IProgressBar) {
  return (
    <Wrapper height={options?.height || '10px'}>
      {datas.data &&
        datas.data.map((data, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Fill key={index} weight={data} color={datas.color[index]} />
        ))}
    </Wrapper>
  );
}

ProgressBar.defaultProps = defaultProps;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  border-radius: 2rem;
  position: relative;
  height: ${({ height }: { height: string }) => height};
  margin: 4px 0;
`;

interface IFill {
  weight: number;
  color: string;
}
const Fill = styled.p`
  height: 100%;
  ${({ weight, color }: IFill) => css`
    flex: ${weight};
    background-color: ${color};
  `}
`;
export default ProgressBar;
