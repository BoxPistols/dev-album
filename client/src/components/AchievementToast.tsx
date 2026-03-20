import { useEffect, useState, useCallback } from "react";
import {
  Trophy,
  Flame,
  Star,
  Moon,
  Sun,
  Zap,
  Award,
  Crown,
  type LucideIcon,
} from "lucide-react";
import type { AchievementDef } from "@/hooks/useAchievements";

const iconMap: Record<string, LucideIcon> = {
  Trophy,
  Flame,
  Star,
  Moon,
  Sun,
  Zap,
  Award,
  Crown,
};

interface ToastItem {
  id: string;
  achievement: AchievementDef;
  state: "entering" | "visible" | "exiting";
}

// グローバルなトースト表示キュー
let showToastFn: ((achievement: AchievementDef) => void) | null = null;

/**
 * 実績解除トーストを表示する（コンポーネント外から呼び出し可能）
 */
export function showAchievementToast(achievement: AchievementDef) {
  showToastFn?.(achievement);
}

/**
 * 実績解除トーストを表示するコンテナ
 * App のルートに1つ配置する
 */
export default function AchievementToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((achievement: AchievementDef) => {
    const id = `${achievement.id}-${Date.now()}`;
    setToasts((prev) => [...prev, { id, achievement, state: "entering" }]);

    // 入場アニメーション後に visible に
    requestAnimationFrame(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, state: "visible" } : t)),
      );
    });

    // 4秒後に退場
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, state: "exiting" } : t)),
      );
      // 退場アニメーション後に削除
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, 4000);
  }, []);

  useEffect(() => {
    showToastFn = addToast;
    return () => {
      showToastFn = null;
    };
  }, [addToast]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => {
        const Icon = iconMap[toast.achievement.icon] || Star;
        return (
          <div
            key={toast.id}
            className={`
              pointer-events-auto
              flex items-center gap-3 px-4 py-3 rounded-xl
              bg-card border border-amber-200 dark:border-amber-800
              shadow-lg shadow-amber-500/10
              achievement-toast
              ${toast.state === "entering" ? "achievement-toast-enter" : ""}
              ${toast.state === "exiting" ? "achievement-toast-exit" : ""}
            `}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex-shrink-0">
              <Icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                実績解除
              </p>
              <p className="text-sm font-bold text-foreground">
                {toast.achievement.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {toast.achievement.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
