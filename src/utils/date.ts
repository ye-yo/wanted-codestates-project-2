export const getDateToKor = (date: string) => {
  const arr = date.split('-');
  return `${arr[0]}년 ${arr[1]}월 ${arr[2]}일`;
};

export const convertRelativeDate = (now: Date, date: string) => {
  const today = new Date();
  const targetTime = new Date(date);

  const tiemLag = Math.floor((today.getTime() - targetTime.getTime()) / 1000 / 60);
  if (tiemLag < 1) return '몇 초 전';
  if (tiemLag < 60) {
    return `${tiemLag}분 전`;
  }

  const tiemLagHour = Math.floor(tiemLag / 60);
  if (tiemLagHour < 24) {
    return `${tiemLagHour}시간 전`;
  }

  const tiemLagDay = Math.floor(tiemLag / 60 / 24);
  if (tiemLagDay < 365) {
    return `${tiemLagDay}일 전`;
  }

  const timeLagMonth = Math.floor(tiemLag / 60 / 24 / 12);
  if (timeLagMonth < 12) {
    return `${tiemLagDay}개월 전`;
  }

  return `${Math.floor(tiemLagDay / 365)}년 전`;
};
