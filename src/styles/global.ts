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
  
  #root{
    min-width: 500px;
    height: 100%;
    background-color: #fafafa;
  }
  
  button, a, svg{
    cursor: pointer;
  }

  a{
    text-decoration: none;
    color: inherit;
  }

  button{
    border: none;
    line-height: 0;
  }

  li{
    list-style: none;
  }
`;
export default GlobalStyle;
