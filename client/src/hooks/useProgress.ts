import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'completed-pages';

function getSnapshot(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function emitChange() {
  listeners.forEach((cb) => cb());
}

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

export function useProgress() {
  const completedPaths = useSyncExternalStore(subscribe, getStableSnapshot);

  const toggleCompleted = useCallback((path: string) => {
    const current = getSnapshot();
    const isCompleted = current.includes(path);
    const next = isCompleted
      ? current.filter((p) => p !== path)
      : [...current, path];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    cachedJson = JSON.stringify(next);
    cachedValue = next;
    emitChange();
  }, []);

  const isCompleted = useCallback(
    (path: string) => completedPaths.includes(path),
    [completedPaths],
  );

  /** 指定したパス一覧のうち、何件完了しているか（進捗率計算用） */
  const getProgressStats = useCallback((paths: string[]) => {
    const count = paths.filter(p => completedPaths.includes(p)).length;
    const total = paths.length;
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
    return { count, total, percentage };
  }, [completedPaths]);

  return { completedPaths, toggleCompleted, isCompleted, getProgressStats };
}
