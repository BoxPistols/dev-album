import type { Meta, StoryObj } from "@storybook/react";
import LiveEditor from "./LiveEditor";

const meta: Meta<typeof LiveEditor> = {
  title: "Components/LiveEditor",
  component: LiveEditor,
};
export default meta;
type Story = StoryObj<typeof LiveEditor>;

export const Default: Story = {
  args: {
    title: "カウンターアプリ",
    description: "useState を使ったシンプルなカウンターを作ってみましょう。",
    goalDescription: "ボタンをクリックすると数値が増減する",
    previewHeight: 250,
    steps: [
      "useState で count を管理する",
      "ボタンのクリックで setCount を呼ぶ",
      "count の値を画面に表示する",
    ],
    files: [
      {
        name: "App.tsx",
        language: "tsx",
        code: `function App() {
  const [count, setCount] = React.useState(0);
  return (
    <div style={{ textAlign: 'center', padding: 24 }}>
      <h1>カウント: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  );
}`,
      },
      {
        name: "style.css",
        language: "css",
        code: `button {
  margin: 0 8px;
  padding: 8px 20px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  cursor: pointer;
}
button:hover {
  background: #eee;
}`,
      },
    ],
  },
};
