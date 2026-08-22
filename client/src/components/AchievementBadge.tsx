import {
  Trophy,
  Flame,
  Star,
  Moon,
  Sun,
  Zap,
  Award,
  Crown,
  Lock,
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

interface AchievementBadgeProps {
  achievement: AchievementDef;
  unlocked: boolean;
  unlockDate?: Date | null;
  /** 初回解除時のパルスアニメーション */
  pulse?: boolean;
}

export default function AchievementBadge({
  achievement,
  unlocked,
  unlockDate,
  pulse = false,
}: AchievementBadgeProps) {
  // 未解除は錠アイコンに差し替える。減光で状態を示すと文字が読めなくなるうえ、
  // 明度差だけの手がかりになるため（形でも区別できるようにする）
  const Icon = unlocked ? iconMap[achievement.icon] || Star : Lock;

  return (
    <div
      className={`
        relative flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all
        ${
          unlocked
            ? "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-foreground"
            : "bg-muted/30 border-border text-muted-foreground"
        }
        ${pulse ? "achievement-pulse" : ""}
      `}
    >
      <div
        className={`
          flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0
          ${
            unlocked
              ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400"
              : "bg-muted text-muted-foreground"
          }
        `}
      >
        <Icon size={16} aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold truncate">
          {achievement.name}
          {!unlocked && <span className="sr-only">（未解除）</span>}
        </p>
        <p className="text-[12px] text-muted-foreground truncate">
          {achievement.description}
        </p>
        {unlocked && unlockDate && (
          <p className="text-[12px] text-muted-foreground mt-0.5">
            {unlockDate.toLocaleDateString("ja-JP")} 解除
          </p>
        )}
      </div>
    </div>
  );
}
