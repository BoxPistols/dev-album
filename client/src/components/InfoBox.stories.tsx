import type { Meta, StoryObj } from "@storybook/react";
import InfoBox from "./InfoBox";

const meta: Meta<typeof InfoBox> = {
  title: "Components/InfoBox",
  component: InfoBox,
};
export default meta;
type Story = StoryObj<typeof InfoBox>;

export const Info: Story = {
  args: { type: "info", title: "情報", children: "補足情報を表示します。" },
};

export const Warning: Story = {
  args: { type: "warning", title: "注意", children: "注意が必要な内容です。" },
};

export const Error: Story = {
  args: {
    type: "error",
    title: "エラー",
    children: "避けるべきパターンです。",
  },
};

export const Success: Story = {
  args: { type: "success", title: "成功", children: "推奨パターンです。" },
};
