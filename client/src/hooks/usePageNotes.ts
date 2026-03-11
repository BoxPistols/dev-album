import { useState, useCallback } from 'react';

const PREFIX = 'page-note:';

export function usePageNotes(path: string) {
  const [note, setNoteState] = useState<string>(() => {
    try {
      return localStorage.getItem(PREFIX + path) || '';
    } catch {
      return '';
    }
  });

  const setNote = useCallback((value: string) => {
    setNoteState(value);
    if (value) {
      localStorage.setItem(PREFIX + path, value);
    } else {
      localStorage.removeItem(PREFIX + path);
    }
  }, [path]);

  return { note, setNote };
}

/** 全ページのメモを取得 */
export function getAllNotes(): Record<string, string> {
  const notes: Record<string, string> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(PREFIX)) {
      const path = key.slice(PREFIX.length);
      notes[path] = localStorage.getItem(key) || '';
    }
  }
  return notes;
}
