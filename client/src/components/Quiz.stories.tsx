import type { Meta, StoryObj } from "@storybook/react-vite";
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
      { label: "<div>" },
      { label: "function App() {}", correct: true },
      { label: "document.getElementById" },
      { label: "console.log" },
    ],
    explanation:
      "function で定義された PascalCase の関数がコンポーネントです。",
  },
};
