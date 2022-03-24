import { keyframes } from 'styled-components';

export const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;
export const toggleFold = keyframes`
   from { opacity:0; transform:translate3d(0, -30px, 0); }
    to { opacity:1; transform:translate3d(0, 0, 0); }
`;

export const fillColor = (offset: number) => keyframes`
   100%{
     stroke-dashoffset: ${offset};
   }
`;
