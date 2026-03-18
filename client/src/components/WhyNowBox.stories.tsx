import type { Meta, StoryObj } from "@storybook/react";
import WhyNowBox from "./WhyNowBox";

const meta: Meta<typeof WhyNowBox> = {
  title: "Components/WhyNowBox",
  component: WhyNowBox,
};
export default meta;
type Story = StoryObj<typeof WhyNowBox>;

export const Default: Story = {
  args: {
    tags: ["React", "フロントエンド", "2024年トレンド"],
    children:
      "コンポーネント指向の開発は現代のフロントエンド開発の基盤です。React を学ぶことで、再利用可能なUIを効率的に構築できるようになります。",
  },
};
