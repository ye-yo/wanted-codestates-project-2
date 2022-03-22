import { ReactElement } from 'react';
import styled from 'styled-components';

function Content({ children }: { children: Element | ReactElement | null }) {
  return <ContentWrap>{children}</ContentWrap>;
}

const ContentWrap = styled.main`
  min-height: ${({ theme }) => `calc(100% - 1px - ${theme.size.infoHeight})`};
  min-width: max-content;
  height: max-content;
  > div {
    height: 100%;
  }

  .background {
    width: 100%;
    height: calc(${({ theme }) => theme.size.menuHeight} + 100%);
    position: absolute;
    margin-top: -${({ theme }) => theme.size.menuHeight};
  }

  .inner {
    max-width: 1000px;
    width: 1000px;
    margin: 0 auto;
    padding-top: ${({ theme }) => theme.size.menuHeight};
    position: relative;
  }
`;

export default Content;
