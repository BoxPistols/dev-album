import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'bookmarked-pages';

function getSnapshot(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

// 全インスタンスに変更を通知するリスナー管理
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function emitChange() {
  listeners.forEach((cb) => cb());
}

// useSyncExternalStore は参照等価性で再レンダリングを判定するため、
// snapshot をキャッシュして同じ配列を返す
let cachedJson = localStorage.getItem(STORAGE_KEY) || '[]';
let cachedValue: string[] = getSnapshot();

function getStableSnapshot(): string[] {
  const raw = localStorage.getItem(STORAGE_KEY) || '[]';
  if (raw !== cachedJson) {
    cachedJson = raw;
    cachedValue = JSON.parse(raw);
  }
  return cachedValue;
}

export function useBookmarks() {
  const bookmarks = useSyncExternalStore(subscribe, getStableSnapshot);

  const toggle = useCallback((path: string) => {
    const current = getSnapshot();
    const next = current.includes(path)
      ? current.filter((p) => p !== path)
      : [...current, path];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    cachedJson = JSON.stringify(next);
    cachedValue = next;
    emitChange();
  }, []);

  const isBookmarked = useCallback(
    (path: string) => bookmarks.includes(path),
    [bookmarks],
  );

  return { bookmarks, toggle, isBookmarked };
}
