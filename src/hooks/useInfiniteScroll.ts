import { useState, useEffect, useCallback } from 'react';

const defaultOption = {
  root: null,
  threshold: 0.5,
  rootMargin: '0px',
};

interface Option {
  root: typeof defaultOption.root;
  threshold: typeof defaultOption.threshold;
  rootMargin: typeof defaultOption.rootMargin;
}
type CallbackType = (arg0: any, arg1: any) => void;

const useInfiniteScroll = (doSomething: CallbackType, dependency?: any[], option?: Option) => {
  const [ref, setRef] = useState<any>(null);
  const onIntersect = useCallback(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        doSomething(entry, observer);
      }
    },
    [...(dependency || [])],
  );

  useEffect(() => {
    let observer: IntersectionObserver;
    if (ref) {
      observer = new IntersectionObserver(onIntersect, { ...defaultOption, ...option });
      observer.observe(ref);
    }
    return () => observer && observer.disconnect();
  }, [ref, option?.root, option?.threshold, option?.rootMargin, onIntersect]);
  return [ref, setRef];
};

useInfiniteScroll.defaultProps = { dependency: [], option: defaultOption };

export default useInfiniteScroll;
