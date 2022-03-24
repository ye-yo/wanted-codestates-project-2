import { ReactNode } from 'react';
import styled from 'styled-components';

interface ITitle {
  emphasis?: string;
  text?: string;
}
interface IRecordBoard {
  children: ReactNode;
  title: ITitle;
  summary?: ReactNode;
}
const defaultProps = {
  summary: '',
};
function RecordBoard({ title, summary, children }: IRecordBoard) {
  return (
    <Wrapper>
      <Title className="pd-1">
        <b>{title.emphasis}</b>
        {title.text && ` ${title.text}`}
        {summary}
      </Title>
      <Content>{children}</Content>
    </Wrapper>
  );
}

RecordBoard.defaultProps = defaultProps;

const Wrapper = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 auto;
  max-width: 500px;
  max-height: 400px;
  min-height: 240px;
  background-color: rgba(255, 255, 255, 0.8);
  > div {
    margin: 0;
    padding: 1rem 10px;
    &.pd-1 {
      margin: 0 1rem;
      padding: 1.2rem 0.4rem 1rem;
    }
  }
`;

const Content = styled.div`
  flex: 1;
  overflow: hidden;
`;

const Title = styled.div`
  font-size: 1.2em;
  display: flex;
  align-items: center;
  font-weight: 500;
  border-bottom: 1px solid ${({ theme }) => theme.color.borderLightMain};
  white-space: break-spaces;
  > * {
    vertical-align: middle;
  }
  b {
    font-weight: 500;
    color: ${({ theme }) => theme.color.main};
  }
  > span {
    font-size: 0.88em;
    font-weight: 500;
    margin-left: auto;
  }
`;
export default RecordBoard;
