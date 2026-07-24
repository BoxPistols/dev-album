import { useState, useRef, useLayoutEffect, useCallback } from "react";

/**
 * 要素のテキストが truncate（ellipsis）で省略されているかを判定する。
 * scrollWidth > clientWidth で溢れを検知し、ResizeObserver でリサイズにも追従する。
 * key に「再測定のきっかけ」（テキスト内容など）を渡すと、その変化で測り直す。
 * 依存配列の長さを固定にするため、可変長 deps ではなく単一 key を受け取る。
 */
export function useIsTruncated<T extends HTMLElement>(key?: unknown) {
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
  }, [measure, key]);

  return { ref, isTruncated };
}
