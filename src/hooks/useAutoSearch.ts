import { useEffect, useState } from 'react';
import fuzzyMatcher, { getDistanceBetweenLetters } from 'utils/autoSearch';

const useAutoSearch = (keyword: string, list: any[]) => {
  const [matchList, setMatchList] = useState<any[]>([]);
  useEffect(() => {
    const regex = fuzzyMatcher(keyword);
    const newList = list.length > 0 ? filteringList(regex, keyword) : [];
    setMatchList(newList);
    return () => {};
  }, [keyword, setMatchList]);

  const filteringList = (regex: RegExp, keyword: string) => {
    return list
      .filter((word) => regex.test(word))
      .map((word) => {
        const totalDistance = getDistanceBetweenLetters(regex, keyword, word);
        return { word, totalDistance };
      }) // 문자 간 거리가 짧은 순으로 정렬
      .sort((a, b) => a.totalDistance - b.totalDistance);
  };
  return {
    matchList,
  };
};

export default useAutoSearch;
