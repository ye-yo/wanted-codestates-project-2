import { ReactElement } from 'react';
import styled from 'styled-components';

function Content({ children }: { children: Element | ReactElement | null }) {
  return <ContentWrap>{children}</ContentWrap>;
}

const ContentWrap = styled.main`
  min-height: ${({ theme }) => `calc(100% - 1px - ${theme.size.infoHeight})`};
  height: max-content;
  > div {
    height: 100%;
  }

  .background {
    width: 100%;
    height: calc(100vh - 1px - ${({ theme }) => theme.size.infoHeight});
    position: relative;
    margin-top: -55px;
  }

  .inner {
    max-width: 1000px;
    margin: 0 auto;
    padding-top: ${({ theme }) => theme.size.menuHeight};
  }
`;

export default Content;
