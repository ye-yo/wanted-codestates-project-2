import { EMPTY_KART_IMG } from 'constants/env';
import { SyntheticEvent } from 'react';

export const handleKartImgError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
  event.currentTarget.src = EMPTY_KART_IMG;
};
