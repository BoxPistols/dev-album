import type { Meta, StoryObj } from "@storybook/react";
import StepHeading from "./StepHeading";

const meta: Meta<typeof StepHeading> = {
  title: "Components/StepHeading",
  component: StepHeading,
};
export default meta;
type Story = StoryObj<typeof StepHeading>;

export const Default: Story = {
  args: {
    step: 4,
    title: "一括作業のあいだだけ止めて、あとで戻す",
    id: "pause",
  },
};

export const Sequence: Story = {
  render: () => (
    <div className="space-y-8">
      <StepHeading step={1} title="アプリを入れて、チャンネルで購読する" />
      <StepHeading step={2} title="イベント種別を足し引きする" />
      <StepHeading step={3} title="ラベル・ブランチで絞り込む" />
    </div>
  ),
};
