import { useCallback, useSyncExternalStore } from "react";
import { pages, sections, getSectionPages } from "@/lib/navigation";
import type { ManualId } from "@/lib/navigation";

// ── 実績定義 ──

export type AchievementId =
  | "first-step"
  | "git-starter"
  | "react-explorer"
  | "streak-3"
  | "streak-7"
  | "night-owl"
  | "early-bird"
  | "challenge-master"
  | "full-section";

export interface AchievementDef {
  id: AchievementId;
  name: string;
  description: string;
  icon: string; // Lucide icon 名
}

export const achievementDefs: AchievementDef[] = [
  {
    id: "first-step",
    name: "First Step",
    description: "最初のステップを完了した",
    icon: "Star",
  },
  {
    id: "git-starter",
    name: "Git Starter",
    description: "Git ステップを5つ完了した",
    icon: "Zap",
  },
  {
    id: "react-explorer",
    name: "React Explorer",
    description: "React ステップを10個完了した",
    icon: "Award",
  },
  {
    id: "streak-3",
    name: "Streak x3",
    description: "3日連続で学習した",
    icon: "Flame",
  },
  {
    id: "streak-7",
    name: "Streak x7",
    description: "7日連続で学習した",
    icon: "Crown",
  },
  {
    id: "night-owl",
    name: "Night Owl",
    description: "22時以降にステップを完了した",
    icon: "Moon",
  },
  {
    id: "early-bird",
    name: "Early Bird",
    description: "7時前にステップを完了した",
    icon: "Sun",
  },
  {
    id: "challenge-master",
    name: "Challenge Master",
    description: "チャレンジを10回正解した",
    icon: "Trophy",
  },
  {
    id: "full-section",
    name: "Full Section",
    description: "セクションを1つ完全制覇した",
    icon: "Award",
  },
];

// ── localStorage 管理 ──

const STORAGE_KEY = "achievements";
const CHALLENGE_COUNT_KEY = "challenge-pass-count";

export interface UnlockedAchievement {
  id: AchievementId;
  unlockedAt: string; // ISO string
}

function getSnapshot(): UnlockedAchievement[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
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

let cachedJson: string;
let cachedValue: UnlockedAchievement[];
try {
  cachedJson = localStorage.getItem(STORAGE_KEY) || "[]";
  cachedValue = getSnapshot();
} catch {
  cachedJson = "[]";
  cachedValue = [];
}

function getStableSnapshot(): UnlockedAchievement[] {
  const raw = localStorage.getItem(STORAGE_KEY) || "[]";
  if (raw !== cachedJson) {
    cachedJson = raw;
    cachedValue = JSON.parse(raw);
  }
  return cachedValue;
}

function saveAchievements(data: UnlockedAchievement[]) {
  const json = JSON.stringify(data);
  localStorage.setItem(STORAGE_KEY, json);
  cachedJson = json;
  cachedValue = data;
  emitChange();
}

// ── チャレンジ正解カウント ──

export function getChallengePassCount(): number {
  try {
    return parseInt(localStorage.getItem(CHALLENGE_COUNT_KEY) || "0", 10);
  } catch {
    return 0;
  }
}

export function incrementChallengePassCount(): number {
  const count = getChallengePassCount() + 1;
  localStorage.setItem(CHALLENGE_COUNT_KEY, String(count));
  return count;
}

// ── ヘルパー ──

function getCompletedPaths(): string[] {
  try {
    return JSON.parse(localStorage.getItem("completed-pages") || "[]");
  } catch {
    return [];
  }
}

function getStreakData(): { currentStreak: number; lastActiveDate: string } {
  try {
    const raw = localStorage.getItem("streak-data");
    if (!raw) return { currentStreak: 0, lastActiveDate: "" };
    return JSON.parse(raw);
  } catch {
    return { currentStreak: 0, lastActiveDate: "" };
  }
}

function countByManual(completedPaths: string[], manualId: ManualId): number {
  const manualPaths = new Set(
    pages.filter((p) => p.manualId === manualId).map((p) => p.path),
  );
  return completedPaths.filter((p) => manualPaths.has(p)).length;
}

function hasFullSection(completedPaths: string[]): boolean {
  const completedSet = new Set(completedPaths);
  return sections.some((section) => {
    const sectionPagePaths = getSectionPages(section.id).map((p) => p.path);
    return (
      sectionPagePaths.length > 0 &&
      sectionPagePaths.every((p) => completedSet.has(p))
    );
  });
}

// ── 実績判定 ──

export type NewlyUnlocked = AchievementDef[];

/**
 * 現在の状態をチェックして、新たに解除された実績を返す
 */
export function checkAchievements(): NewlyUnlocked {
  const unlocked = getSnapshot();
  const unlockedIds = new Set(unlocked.map((a) => a.id));
  const completedPaths = getCompletedPaths();
  const streakData = getStreakData();
  const challengeCount = getChallengePassCount();
  const hour = new Date().getHours();

  const newlyUnlocked: AchievementDef[] = [];

  const conditions: Record<AchievementId, () => boolean> = {
    "first-step": () => completedPaths.length >= 1,
    "git-starter": () => countByManual(completedPaths, "git") >= 5,
    "react-explorer": () => countByManual(completedPaths, "react") >= 10,
    "streak-3": () => streakData.currentStreak >= 3,
    "streak-7": () => streakData.currentStreak >= 7,
    "night-owl": () => hour >= 22,
    "early-bird": () => hour < 7,
    "challenge-master": () => challengeCount >= 10,
    "full-section": () => hasFullSection(completedPaths),
  };

  for (const def of achievementDefs) {
    if (unlockedIds.has(def.id)) continue;
    const check = conditions[def.id];
    if (check && check()) {
      newlyUnlocked.push(def);
    }
  }

  if (newlyUnlocked.length > 0) {
    const now = new Date().toISOString();
    const updated = [
      ...unlocked,
      ...newlyUnlocked.map((a) => ({ id: a.id, unlockedAt: now })),
    ];
    saveAchievements(updated);
  }

  return newlyUnlocked;
}

// ── Hook ──

export function useAchievements() {
  const unlockedAchievements = useSyncExternalStore(
    subscribe,
    getStableSnapshot,
  );

  const isUnlocked = useCallback(
    (id: AchievementId) => unlockedAchievements.some((a) => a.id === id),
    [unlockedAchievements],
  );

  const getUnlockDate = useCallback(
    (id: AchievementId) => {
      const a = unlockedAchievements.find((x) => x.id === id);
      return a ? new Date(a.unlockedAt) : null;
    },
    [unlockedAchievements],
  );

  return {
    achievements: achievementDefs,
    unlockedAchievements,
    isUnlocked,
    getUnlockDate,
    checkAchievements,
  };
}
