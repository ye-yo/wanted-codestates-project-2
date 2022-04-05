import 'styled-components';
import { color, MediaQueryProps } from '../styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends MediaQueryProps {
    color: { [key in color]: string };
    size: { [key in color]: string };
  }
}
