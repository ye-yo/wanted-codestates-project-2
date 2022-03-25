import { ReactElement } from 'react';
import styled from 'styled-components';

function Content({ children }: { children: Element | ReactElement | null }) {
  return <ContentWrap>{children}</ContentWrap>;
}

const ContentWrap = styled.main`
  min-width: max-content;
  height: auto;
  > div {
    height: 100%;
  }

  .background {
    width: 100%;
    min-height: max-content;
    position: absolute;
    margin-top: -${({ theme }) => theme.size.menuHeight};
  }

  .inner {
    max-width: 1000px;
    width: 1000px;
    margin: 0 auto;
    position: relative;
  }
`;

export default Content;
