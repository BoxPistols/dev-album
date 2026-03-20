import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "streak-data";

interface StreakData {
  /** 最後にアクティビティを記録した日 (YYYY-MM-DD) */
  lastActiveDate: string;
  /** 現在の連続日数 */
  currentStreak: number;
  /** アクティビティを記録した日の一覧 (YYYY-MM-DD[]) */
  activeDates: string[];
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function getSnapshot(): StreakData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { lastActiveDate: "", currentStreak: 0, activeDates: [] };
    return JSON.parse(raw);
  } catch {
    return { lastActiveDate: "", currentStreak: 0, activeDates: [] };
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

let cachedJson: string;
let cachedValue: StreakData;
try {
  cachedJson = localStorage.getItem(STORAGE_KEY) || "";
  cachedValue = getSnapshot();
} catch {
  cachedJson = "";
  cachedValue = { lastActiveDate: "", currentStreak: 0, activeDates: [] };
}

function getStableSnapshot(): StreakData {
  const raw = localStorage.getItem(STORAGE_KEY) || "";
  if (raw !== cachedJson) {
    cachedJson = raw;
    cachedValue = raw
      ? JSON.parse(raw)
      : { lastActiveDate: "", currentStreak: 0, activeDates: [] };
  }
  return cachedValue;
}

function save(data: StreakData) {
  const json = JSON.stringify(data);
  localStorage.setItem(STORAGE_KEY, json);
  cachedJson = json;
  cachedValue = data;
  emitChange();
}

export function useStreak() {
  const data = useSyncExternalStore(subscribe, getStableSnapshot);

  const isActiveToday = data.lastActiveDate === today();

  // ストリークが途切れていないか確認（昨日か今日がlastActiveDateなら有効）
  const currentStreak = (() => {
    if (
      data.lastActiveDate === today() ||
      data.lastActiveDate === yesterday()
    ) {
      return data.currentStreak;
    }
    return 0;
  })();

  const recordActivity = useCallback(() => {
    const current = getSnapshot();
    const t = today();
    const y = yesterday();

    if (current.lastActiveDate === t) {
      // 今日は既に記録済み
      return;
    }

    let newStreak: number;
    if (current.lastActiveDate === y) {
      // 昨日もアクティブだった: ストリーク継続
      newStreak = current.currentStreak + 1;
    } else {
      // ストリークリセット: 今日から1日目
      newStreak = 1;
    }

    const activeDates = current.activeDates.includes(t)
      ? current.activeDates
      : [...current.activeDates, t];

    save({
      lastActiveDate: t,
      currentStreak: newStreak,
      activeDates,
    });
  }, []);

  return {
    currentStreak,
    isActiveToday,
    recordActivity,
    activeDates: data.activeDates,
  };
}
