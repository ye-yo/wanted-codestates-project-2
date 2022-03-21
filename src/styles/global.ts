import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: 1em;
  }
  html, body {
    width: 100%;
    height: 100%;
    font-size: 12px;
    color: #1f334a;
  }
  
  button, a, svg{
    cursor: pointer;
  }

  button{
    border: none;
  }
`;
export default GlobalStyle;
