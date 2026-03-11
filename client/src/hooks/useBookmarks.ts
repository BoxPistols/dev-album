import { useState, useCallback } from 'react';

const STORAGE_KEY = 'bookmarked-pages';

function load(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>(load);

  const toggle = useCallback((path: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isBookmarked = useCallback((path: string) => bookmarks.includes(path), [bookmarks]);

  return { bookmarks, toggle, isBookmarked };
}
