import type { Meta, StoryObj } from "@storybook/react";
import Quiz from "./Quiz";

const meta: Meta<typeof Quiz> = {
  title: "Components/Quiz",
  component: Quiz,
};
export default meta;
type Story = StoryObj<typeof Quiz>;

export const Default: Story = {
  args: {
    question: "React のコンポーネントはどれですか？",
    options: [
      "<div>",
      "function App() {}",
      "document.getElementById",
      "console.log",
    ],
    correctIndex: 1,
    explanation:
      "function で定義された PascalCase の関数がコンポーネントです。",
  },
};
