import { ReactElement } from 'react';
import styled from 'styled-components';

function Content({ children }: { children: Element | ReactElement | null }) {
  return <ContentWrap>{children}</ContentWrap>;
}

const ContentWrap = styled.main`
  height: ${({ theme }) => `calc(100% - ${theme.size.headerHeight})`};
  > div {
    height: 100%;
  }

  .background {
    width: 100%;
    height: 100%;
    position: relative;
    margin-top: -55px;
    overflow: hidden;
  }

  .inner {
    max-width: 1000px;
    margin: 0 auto;
    padding-top: ${({ theme }) => theme.size.menuHeight};
  }
`;

export default Content;
