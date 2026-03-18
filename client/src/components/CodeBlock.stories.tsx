import type { Meta, StoryObj } from "@storybook/react";
import CodeBlock from "./CodeBlock";

const meta: Meta<typeof CodeBlock> = {
  title: "Components/CodeBlock",
  component: CodeBlock,
};
export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const TSX: Story = {
  args: {
    code: `function App() {\n  return <h1>Hello World</h1>;\n}`,
    language: "tsx",
    title: "TSX サンプル",
    showLineNumbers: true,
  },
};

export const CSS: Story = {
  args: {
    code: `.container {\n  display: flex;\n  gap: 16px;\n}`,
    language: "css",
    title: "CSS サンプル",
  },
};

export const Bash: Story = {
  args: {
    code: `npm install react\nnpm run dev`,
    language: "bash",
    title: "ターミナル",
  },
};
