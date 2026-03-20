import type { Meta, StoryObj } from "@storybook/react";
import { Flame, CalendarDays } from "lucide-react";

/**
 * useStreak の表示をデモするラッパーコンポーネント。
 * Storybook 上では localStorage に依存しないよう props で値を受け取る。
 */
function StreakDisplay({
  currentStreak,
  isActiveToday,
  activeDates,
}: {
  currentStreak: number;
  isActiveToday: boolean;
  activeDates: string[];
}) {
  return (
    <div className="space-y-4 max-w-xs">
      {/* ストリーク表示 */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
        <Flame
          size={18}
          className={
            currentStreak > 0
              ? "text-orange-500 streak-glow"
              : "text-muted-foreground"
          }
        />
        <span
          className={`text-sm font-bold ${currentStreak > 0 ? "text-orange-600 dark:text-orange-400" : "text-muted-foreground"}`}
        >
          {currentStreak > 0 ? `${currentStreak}日連続` : "ストリークなし"}
        </span>
        {isActiveToday && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-semibold">
            今日アクティブ
          </span>
        )}
      </div>

      {/* アクティブ日一覧 */}
      {activeDates.length > 0 && (
        <div className="px-4 py-3 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-center gap-1.5 mb-2">
            <CalendarDays size={14} className="text-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground">
              アクティブ日
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {activeDates.map((date) => (
              <span
                key={date}
                className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-medium"
              >
                {date}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const meta: Meta<typeof StreakDisplay> = {
  title: "Components/StreakDisplay",
  component: StreakDisplay,
};
export default meta;
type Story = StoryObj<typeof StreakDisplay>;

export const NoStreak: Story = {
  args: {
    currentStreak: 0,
    isActiveToday: false,
    activeDates: [],
  },
};

export const ActiveToday: Story = {
  args: {
    currentStreak: 1,
    isActiveToday: true,
    activeDates: ["2026-03-20"],
  },
};

export const ThreeDayStreak: Story = {
  args: {
    currentStreak: 3,
    isActiveToday: true,
    activeDates: ["2026-03-18", "2026-03-19", "2026-03-20"],
  },
};

export const SevenDayStreak: Story = {
  args: {
    currentStreak: 7,
    isActiveToday: true,
    activeDates: [
      "2026-03-14",
      "2026-03-15",
      "2026-03-16",
      "2026-03-17",
      "2026-03-18",
      "2026-03-19",
      "2026-03-20",
    ],
  },
};
