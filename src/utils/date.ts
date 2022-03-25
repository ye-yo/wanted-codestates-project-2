export const getDateToKor = (date: string) => {
  const arr = date.split('-');
  return `${arr[0]}년 ${arr[1]}월 ${arr[2]}일`;
};

export const convertRelativeDate = (now: Date, date: string) => {
  const today = new Date();
  const targetTime = new Date(date);

  const minutes = Math.floor((today.getTime() - targetTime.getTime()) / 1000 / 60);
  if (minutes < 1) return '몇 초 전';
  if (minutes < 60) {
    return `${minutes}분 전`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}시간 전`;
  }

  const days = Math.floor(hours / 24);
  if (days < 365) {
    return `${days}일 전`;
  }
  // const months = Math.floor(days / 30);
  // if (months < 12) {
  //   return `${months}개월 전`;
  // }

  return `${Math.floor(days / 365)}년 전`;
};
