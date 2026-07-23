import { useState, useRef, useLayoutEffect, useCallback } from "react";

/**
 * 要素のテキストが truncate（ellipsis）で省略されているかを判定する。
 * scrollWidth > clientWidth で溢れを検知し、ResizeObserver でリサイズにも追従する。
 * deps にテキストなど再測定のきっかけを渡す。
 */
export function useIsTruncated<T extends HTMLElement>(deps: unknown[] = []) {
  const ref = useRef<T>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    // 1px の許容でサブピクセル誤差による誤検知を防ぐ
    setIsTruncated(el.scrollWidth > el.clientWidth + 1);
  }, []);

  useLayoutEffect(() => {
    measure();
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [measure, ...deps]);

  return { ref, isTruncated };
}
