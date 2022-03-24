import styled from 'styled-components';

function DoughnutChartUI() {
  return (
    <Wrapper>
      <Title />
      <Doughnut>
        <Hole />
      </Doughnut>
    </Wrapper>
  );
}
export default function DoughnutChartsUI() {
  return (
    <>
      <DoughnutChartUI />
      <DoughnutChartUI />
      <DoughnutChartUI />
    </>
  );
}

export const WrapperUI = styled.div`
  flex: 1;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled(WrapperUI)`
  opacity: 0.2;
`;

export const TitleUI = styled.p`
  font-size: 1em;
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled(TitleUI)`
  height: 1.8rem;
  width: 50%;
  background-color: gray;
`;

export const DoughnutUI = styled.div`
  position: relative;
  flex: 1;
  border-radius: 50%;
  background-color: #eeeeee;
`;

const Doughnut = styled(DoughnutUI)`
  background-color: gray;
  width: 86px;
  height: 86px;
`;

export const HoleUI = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: white;
  z-index: 1;
`;

const Hole = styled(HoleUI)`
  width: calc(100% - 20px);
  height: calc(100% - 20px);
`;
