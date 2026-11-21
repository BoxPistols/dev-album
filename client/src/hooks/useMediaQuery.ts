import { useEffect, useState } from 'react';

/**
 * メディアクエリに一致しているかを返す。画面幅でレイアウトそのもの（要素の順序・高さ）を
 * 変えるときに使う。見た目だけの切り替えはTailwindのブレークポイントで足りる。
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia(query).matches
      : false,
  );

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const list = window.matchMedia(query);
    const onChange = () => setMatches(list.matches);
    onChange();
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
