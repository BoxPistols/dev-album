import type { Meta, StoryObj } from "@storybook/react";
import Faq from "./Faq";

const meta: Meta<typeof Faq> = {
  title: "Components/Faq",
  component: Faq,
};
export default meta;
type Story = StoryObj<typeof Faq>;

export const Default: Story = {
  args: {
    items: [
      {
        question: "React と Vue はどちらを学ぶべきですか？",
        answer:
          "どちらも優れたフレームワークですが、求人数や エコシステムの規模を考えると React がおすすめです。",
      },
      {
        question: "TypeScript は必須ですか？",
        answer:
          "チーム開発や大規模プロジェクトでは事実上必須です。型安全性によりバグを早期発見できます。",
      },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [
      {
        question: "Node.js のバージョンはいくつが推奨ですか？",
        answer: "LTS（長期サポート）版の最新を使用してください。",
      },
    ],
  },
};
