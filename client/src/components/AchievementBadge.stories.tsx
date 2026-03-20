import type { Meta, StoryObj } from "@storybook/react";
import AchievementBadge from "./AchievementBadge";

const meta: Meta<typeof AchievementBadge> = {
  title: "Components/AchievementBadge",
  component: AchievementBadge,
};
export default meta;
type Story = StoryObj<typeof AchievementBadge>;

export const Locked: Story = {
  args: {
    achievement: {
      id: "first-step",
      name: "First Step",
      description: "最初のステップを完了した",
      icon: "Star",
    },
    unlocked: false,
  },
};

export const Unlocked: Story = {
  args: {
    achievement: {
      id: "streak-7",
      name: "Streak x7",
      description: "7日連続で学習した",
      icon: "Crown",
    },
    unlocked: true,
    unlockDate: new Date("2026-03-15"),
  },
};

export const Pulse: Story = {
  args: {
    achievement: {
      id: "challenge-master",
      name: "Challenge Master",
      description: "チャレンジを10回正解した",
      icon: "Trophy",
    },
    unlocked: true,
    unlockDate: new Date(),
    pulse: true,
  },
};
