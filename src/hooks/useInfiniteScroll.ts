import { useEffect, useCallback, useRef, RefCallback, DependencyList } from 'react';

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
type CallbackType = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;

const useInfiniteScroll = (doSomething: CallbackType, dependency?: DependencyList | undefined, option?: Option) => {
  // const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const setRef: RefCallback<HTMLDivElement> = useCallback((node) => {
    ref.current = node;
  }, []);

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
    if (ref && ref.current) {
      observer = new IntersectionObserver(onIntersect, { ...defaultOption, ...option });
      observer.observe(ref.current);
    }
    return () => observer && observer.disconnect();
  }, [ref, option?.root, option?.threshold, option?.rootMargin, onIntersect]);
  return [ref, setRef];
};

useInfiniteScroll.defaultProps = { dependency: [], option: defaultOption };

export default useInfiniteScroll;
