import { EMPTY_KART_IMG } from 'constants/env';

export const handleKartImgError = (event: any) => {
  event.target.src = EMPTY_KART_IMG;
};
