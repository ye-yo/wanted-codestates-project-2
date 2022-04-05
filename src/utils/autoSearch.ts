const escapeRegExp = (regex: string) => regex.replaceAll(/[\^$.*+?()[\]{}|]/g, '\\$&');
const utf16From = (char: string) => char.charCodeAt(0);

interface IObjectKeys {
  [key: string]: number;
}
const initialConsonantsMap: IObjectKeys = Object.freeze({
  ㄱ: '가'.charCodeAt(0),
  ㄲ: '까'.charCodeAt(0),
  ㄴ: '나'.charCodeAt(0),
  ㄷ: '다'.charCodeAt(0),
  ㄸ: '따'.charCodeAt(0),
  ㄹ: '라'.charCodeAt(0),
  ㅁ: '마'.charCodeAt(0),
  ㅂ: '바'.charCodeAt(0),
  ㅃ: '빠'.charCodeAt(0),
  ㅅ: '사'.charCodeAt(0),
});

const getBeginFromMap = (char: string) => {
  return initialConsonantsMap[char] || (utf16From(char) - utf16From('ㅅ')) * 588 + initialConsonantsMap['ㅅ'];
};

/* 
 유니코드 한글 자음 파트에는 종성에만 사용할 수 있는 문자가 섞여있어서 음절 초성의 인덱스와 순서가 다른 문자들이 있음
 ** 'ㅅ'부터는 음절 초성의 인덱스와 순서가 일치.
 587(자음 첫 문자의 마지막 문자 코드 번호 차이)
 자음과 모음은 0부터 시작 종성은 없을 경우 0, 있을 경우 1부터 시작
 44032 : '가'에 해당하는 코드
 초성과 모음을 갖춘 글자의 코드 = 자음번호 * 588 + 모음번호 * 28 + 종성번호 ) + 44032
 */
const hasMedial = (chCode: number) => chCode % 28 > 0;
function koreanPattern(char: string) {
  const offset = utf16From('가');
  if (/[가-힣]/.test(char)) {
    const charCode = utf16From(char) - offset;
    if (hasMedial(charCode)) {
      return char;
    }
    const begin = Math.floor(charCode / 28) * 28 + offset;
    const end = begin + 27;
    return `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`; // 16진수 변환은 반드시 최종 값에 대해 진행할 것
  }

  if (/[ㄱ-ㅎ]/.test(char)) {
    const begin = getBeginFromMap(char);
    const end = begin + 587;
    return `[${char}\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
  }
  return escapeRegExp(char);
}

const fuzzyMatcher = (input: string) => {
  const pattern = input
    .split('')
    .map(koreanPattern)
    .map((pattern) => `(${pattern})`)
    .join('.*?');
  return new RegExp(pattern);
};

export const getDistanceBetweenLetters = (regex: RegExp, keyword: string, matchWord: string) => {
  let totalDistance = 0;
  matchWord.replace(regex, (match: string, ...groups: []): string => {
    // 초성 검색 결과에서 일치하는 문자 간의 거리 계산
    const letters = groups.slice(0, keyword.length);
    let lastIndex = 0;
    for (let i = 0, l = letters.length; i < l; i += 1) {
      const idx = match.indexOf(letters[i], lastIndex);
      if (lastIndex > 0) {
        totalDistance += idx - lastIndex;
      }
      lastIndex = idx + 1;
    }
    return match;
  });
  return totalDistance;
};

export default fuzzyMatcher;
