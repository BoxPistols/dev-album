import type { Meta, StoryObj } from "@storybook/react";
import CodePreview from "./CodePreview";

const meta: Meta<typeof CodePreview> = {
  title: "Components/CodePreview",
  component: CodePreview,
};
export default meta;
type Story = StoryObj<typeof CodePreview>;

export const Default: Story = {
  args: {
    code: `function App() {\n  return (\n    <div style={{ padding: 20, background: 'var(--bg-accent)', borderRadius: 8 }}>\n      <h2 style={{ color: 'var(--text)', margin: 0 }}>Hello</h2>\n    </div>\n  );\n}`,
    language: "tsx",
    title: "コード + プレビュー",
  },
};

export const PreviewOnly: Story = {
  args: {
    code: `function App() {\n  return <div style={{ padding: 20, textAlign: 'center', color: 'var(--text)' }}>プレビューのみ表示</div>;\n}`,
    language: "tsx",
    title: "プレビューのみ",
    previewOnly: true,
  },
};
