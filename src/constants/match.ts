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

export const SOLO_MATCH_TYPES =
  '7ca6fd44026a2c8f5d939b60aa56b4b1714b9cc2355ec5e317154d4cf0675da0,01fd412de5437005a62300b6a135a546053d22ec2b48cd018605338c3f1bffff,6f2d79ba8579760af6239ada4fd09c158430625d537676dd0fe07e9934e1d55b,221dec22f320badabd66dc43c3b67c1f88f38e90f4ac2906ed86fd605d78d10a,c84b965f5125749735f4c70404f0792248b782b54b2e9356135b7ba35e51e5a6,d1a35bd884308b370085b22809f1cb7fa8ab3373c20aaa12c40a14491e9e4f21,7b9f0fd5377c38514dbb78ebe63ac6c3b81009d5a31dd569d1cff8f005aa881a,56c651b08836f7c513545e61837ee1ff917d10a8bdbd95a09e5ee5ca2024f157,b0da8c192a6e908b871f65527b074a59652e0ad8525936b5cf1755d9d86d50fd,224ab54ee8a63940f4df542524ee4059b94efbd3e8ce94f03707ed39294a0e2e,b73122a1e6559949df183992491d440f00272ebecf9c415ceec8197abb936432,e60946660f964b7aadf47691a6c663cc57b2cf8021761c9183aa1fabea1f8537';
export const TEAM_MATCH_TYPES =
  '8e432e8122a23f4d06a3d43b1cec2fb9d939bb1a5c30b571574ee5f74fda9d66,ee2426e23fa56f7a695084e1fc07fe6bb03a0b3b0c71c4e1f1b7e7e78e6c6878,9edf78dd2f844ff6b25e747be9bd29d31b5ad4e06389cfc64b8bc9815bb02610,196fbff597e92e7454fc1acd1f36936dd94c97e5a57abf513469526399900e78,826ecdb309f3a2b80a790902d1b133499866d6b933c7deb0916979d1232f968c,b4dfec547dfd89d2b8f33ad833e1d433a8c85a48d3c4c52ae4855a56eb8d7991,effd66758144a29868663aa50e85d3d95c5bc0147d7fdb9802691c2087f3416e,e7be8820e2836e5779dfb5339956768c04ea6cc5788babb1e993b764b86ccec8,32f9446c97af9d2d928a16161413b5a500c58304df1bce3ddd94a140335b3348,247b7b12c1d0bf5fbd17ca4cf2c21d7442459f38937486cad097e3a1fc689d20,14e772d195642279cf6c8307125044274db371c1b08fc3dd6553e50d76d2b3aa';

export const DEFAULT_OPTIONS = {
  offset: 0,
  limit: 200,
  match_types: SOLO_MATCH_TYPES,
};

export const MAX_OFFSET = 100;

export const INITIAL_USER_DATA = {
  character: '',
  characterName: '',
  license: '',
};
export const DEFAULT_PARSED_DATA = { matches: [], originMatches: [], currentUserData: INITIAL_USER_DATA };
