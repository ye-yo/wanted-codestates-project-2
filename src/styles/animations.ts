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

export const expand = (width: string, minWidth: string) => keyframes`
  100%{
    width: ${width};
    min-width: ${minWidth}
  }
`;

export const fadeUp = () => keyframes`
  0%{
    opacity: 0;
    transform: translateY(2rem);
  }
  100%{
     opacity:1;
     transform: translateY(0);
  }
`;

export const skeleton = () => keyframes`
 0% {
    left: 0;
    opacity: 0;
  }
  20% {
    opacity: 0.25;
  }
  50% {
    opacity: 1;
  }
  80% {
    opacity: 0.5;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
`;

export const move = (direction: string) => keyframes`
  100%{
    ${direction === 'left' ? 'margin-left' : 'margin-right'}: -180px;
  }
`;

export const gradient = () => keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`;
