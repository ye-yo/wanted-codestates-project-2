export const CHANNEL_TYPES = Object.freeze([
  { id: 1, name: '통합' },
  { id: 2, name: '매우빠름' },
  { id: 3, name: '무한부스터' },
]);

export const CHANNEL_NAMES = Object.freeze(['통합', '매우빠름', '무한부스터']);

export const SIDE_TABS = Object.freeze([
  { id: 1, name: '트랙' },
  { id: 2, name: '카트' },
]);

export const GAME_TYPES = Object.freeze([
  { id: 1, name: '개인전' },
  { id: 2, name: '팀전' },
]);

export const HEADS = Object.freeze(['경기시간', '순위', '트랙', '카트', '기록', '']);

export const THEADS_TRACK = Object.freeze(['트랙', '횟수', '승률', '기록']);
export const THEADS_KART = Object.freeze(['카트', '횟수', '승률', '리타율']);
export const TOGGLE_COLORS = Object.freeze(['#f62459', '#dddddd']);

export const DEFAULT_FILTER = {
  isTeam: false,
  channel: '통합',
  showRetired: true,
};

export const DEFAULT_OPTIONS = {
  offset: 0,
  limit: 10,
};
