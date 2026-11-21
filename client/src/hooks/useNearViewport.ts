import { useEffect, useState, type RefObject } from 'react';

/**
 * 要素が画面に近づいたらtrueを返す。一度trueになったら戻さない（中身を作り直さないため）。
 * 重い中身（p5のスケッチのiframeなど）を、画面に近づいてから作るのに使う。
 * IntersectionObserverが無い環境では、最初からtrueを返す。
 */
export function useNearViewport(ref: RefObject<Element | null>, rootMargin = '600px'): boolean {
  const [near, setNear] = useState(
    () => typeof window === 'undefined' || typeof IntersectionObserver === 'undefined',
  );

  useEffect(() => {
    if (near) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [near, ref, rootMargin]);

  return near;
}
