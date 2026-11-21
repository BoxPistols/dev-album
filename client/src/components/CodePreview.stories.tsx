import type { Meta, StoryObj } from "@storybook/react-vite";
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

// p5.jsのスケッチ。languageがjsでもプレビューし、操作バー（一時停止・最初から・PNG保存）が付く
export const P5Sketch: Story = {
  args: {
    code: `function setup() {\n  createCanvas(400, 300);\n  noStroke();\n}\n\nfunction draw() {\n  background(20, 24, 48);\n  fill(255, 120, 180);\n  circle(200 + sin(frameCount * 0.05) * 80, 150, 60);\n}`,
    language: "js",
    title: "p5.jsのスケッチ",
  },
};
