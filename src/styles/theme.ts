import { CSSProp } from 'styled-components';

type MediaQueryProps = {
  mobile: number;
  tablet: number;
  desktop: number;
};

const sizes: MediaQueryProps = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
};

const media = (Object.keys(sizes) as Array<keyof typeof sizes>).reduce((acc, label) => {
  acc[label] = (style: string) => `@media (max-width: ${sizes[label] / 16}em) { ${style} }`;
  return acc;
}, {} as { [key in keyof typeof sizes]: (style: string) => CSSProp });

const color = {
  font: '#1f334a',
  main: '#07f',
  red: '#f62459',
  green: '#9bd728',
  gray: '#6c7a89',
};

const theme = {
  color,
  ...media,
};

export default theme;
