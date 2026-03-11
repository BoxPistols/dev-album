import { useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';

/**
 * テキストからURL用のslugを生成する
 * 日本語対応: スペースを-に変換、特殊文字を除去
 */
export function toSlug(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[<>'"&(){}[\]#@!?:;,./\\|=+*~`$%^]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function assignHeadingIds() {
  const headings = document.querySelectorAll('main h2, main h3');
  headings.forEach((el) => {
    if (!el.id) {
      const text = el.textContent?.trim();
      if (text) {
        el.id = toSlug(text);
      }
    }
  });
}

function scrollToHash() {
  const hash = window.location.hash.slice(1);
  if (!hash) return;
  // ID付与後にスクロールするため少し遅延
  setTimeout(() => {
    const target = document.getElementById(decodeURIComponent(hash));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.classList.add('search-highlight');
      setTimeout(() => target.classList.remove('search-highlight'), 2000);
    }
  }, 100);
}

/**
 * ページ内の全 h2/h3 に自動で id を付与し、
 * URL ハッシュがあれば該当箇所にスクロールする
 */
export function useAutoHeadingIds() {
  const [location] = useLocation();

  const handleHashChange = useCallback(() => {
    assignHeadingIds();
    scrollToHash();
  }, []);

  // ページ遷移時
  useEffect(() => {
    assignHeadingIds();
    scrollToHash();
  }, [location]);

  // 同一ページ内のハッシュ変更時
  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [handleHashChange]);
}
