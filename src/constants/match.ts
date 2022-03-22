export const CHANNEL_TYPES = Object.freeze([
  { id: 1, name: '통합' },
  { id: 2, name: '매우빠름' },
  { id: 3, name: '무한부스터' },
]);

export const SIDE_TABS = Object.freeze([
  { id: 1, name: '트랙' },
  { id: 2, name: '카트' },
]);

export const GAME_TYPES = Object.freeze([
  { id: 1, name: '개인전' },
  { id: 2, name: '팀전' },
]);

export const HEADS = Object.freeze(['경기시간', '순위', '트랙', '카트', '기록', '']);

export const SAMPLE_DATAS = [
  {
    id: '1',
    date: '1일전',
    rank: '1',
    total: '2',
    kart: '몬스터 X LE',
    track: '빌리지 고가의 질주',
    time: `1'43'61`,
    win: true,
    retired: false,
  },
  {
    id: '2',
    date: '1일전',
    rank: '1',
    total: '2',
    kart: '몬스터 X LE',
    track: '빌리지 고가의 질주',
    time: `1'43'61`,
    win: true,
    retired: false,
  },
  {
    id: '3',
    date: '1일전',
    rank: '1',
    total: '2',
    kart: '몬스터 X LE',
    track: '빌리지 고가의 질주',
    time: `1'43'61`,
    win: true,
    retired: true,
  },
  {
    id: '4',
    date: '1일전',
    rank: '1',
    total: '2',
    kart: '몬스터 X LE',
    track: '빌리지 고가의 질주',
    time: `1'43'61`,
    win: false,
    retired: false,
  },
];

export const SAMPLE_PLAYERS = [
  {
    accountNo: '1057076058',
    characterName: '엄청난꼬랑내',
    character: '48357251a360710371aa5c9f0952ea10ab454feae1d53fcd147980068b33181b',
    kart: '66e6e85ff4ae329f96067f6da4827a4e679ccb0b9a8fafebb9549f08fe182355',
    license: '',
    pet: 'f69c4abf9ae9fe3818287b017b06c93a19933cbf0e6e8d657f306bd6eee46c30',
    flyingPet: 'a87cb96d91a4e0c357c4eaeb7dbc05ef515d183e79a8aa0e674c36f917400a4b',
    partsEngine: '1',
    partsHandle: '1',
    partsWheel: '1',
    partsKit: '1',
    rankinggrade2: '3',
    matchRank: '1',
    matchRetired: '0',
    matchWin: '1',
    matchTime: '82653',
  },
  {
    accountNo: '222',
    characterName: '',
    character: '2ecb10f5e23493727a80a91421d6242a18b131f743676e72317bde4bd5d27131',
    kart: 'faf963e754c62f90d61f127d4c7f17d04947cce93acd961ededf03a21427cb9b',
    license: '',
    pet: 'ac4bf7f09a27adb53bd4f5555872db19df0b58e4ed878cb413206429cba236f3',
    flyingPet: 'a87cb96d91a4e0c357c4eaeb7dbc05ef515d183e79a8aa0e674c36f917400a4b',
    partsEngine: '1',
    partsHandle: '1',
    partsWheel: '1',
    partsKit: '1',
    rankinggrade2: '0',
    matchRank: '1',
    matchRetired: '0',
    matchWin: '1',
    matchTime: '135912',
  },
];

export const TOGGLE_COLORS = Object.freeze(['#f62459', '#dddddd']);
