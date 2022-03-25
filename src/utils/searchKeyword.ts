const get = (key: string): any => {
  const data = localStorage.getItem(key);
  if (data) return JSON.parse(data);
  return [];
};
const keywordList = {
  get,
  add: (key: string, value: any): void => {
    const data = get(key);
    const datas = [...data];
    const isDuplicate = datas.some((word) => word === value);
    if (!isDuplicate) {
      datas.push(value);
      localStorage.setItem(key, JSON.stringify(datas));
    }
  },
};

export default keywordList;
