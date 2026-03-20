import type { Meta, StoryObj } from "@storybook/react";
import { useEffect } from "react";
import AchievementToastContainer, {
  showAchievementToast,
} from "./AchievementToast";
import type { AchievementDef } from "@/hooks/useAchievements";

const sampleAchievement: AchievementDef = {
  id: "first-step",
  name: "First Step",
  description: "最初のステップを完了した",
  icon: "Star",
};

/** トーストを自動表示するラッパー */
function ToastDemo({ achievement }: { achievement: AchievementDef }) {
  useEffect(() => {
    // マウント後にトーストを表示
    const timer = setTimeout(() => showAchievementToast(achievement), 300);
    return () => clearTimeout(timer);
  }, [achievement]);

  return (
    <div>
      <AchievementToastContainer />
      <p className="text-sm text-muted-foreground">
        トーストが右下に表示されます（4秒後に自動消去）
      </p>
    </div>
  );
}

const meta: Meta<typeof ToastDemo> = {
  title: "Components/AchievementToast",
  component: ToastDemo,
};
export default meta;
type Story = StoryObj<typeof ToastDemo>;

export const Default: Story = {
  args: {
    achievement: sampleAchievement,
  },
};

export const StreakAchievement: Story = {
  args: {
    achievement: {
      id: "streak-7",
      name: "Streak x7",
      description: "7日連続で学習した",
      icon: "Crown",
    },
  },
};
