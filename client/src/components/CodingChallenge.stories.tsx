import type { Meta, StoryObj } from "@storybook/react";
import CodingChallenge from "./CodingChallenge";

const meta: Meta<typeof CodingChallenge> = {
  title: "Components/CodingChallenge",
  component: CodingChallenge,
};
export default meta;
type Story = StoryObj<typeof CodingChallenge>;

export const WithPreview: Story = {
  name: "穴埋め + プレビュー",
  args: {
    title: "Flexbox 中央寄せ",
    description: "display と alignItems の値を埋めてください。",
    preview: true,
    initialCode: `function App() {\n  return (\n    <div style={{\n      display: '___',\n      alignItems: '___',\n      justifyContent: 'center',\n      minHeight: 120,\n      background: 'var(--bg-accent)',\n      borderRadius: 8,\n    }}>\n      <span style={{ color: 'var(--text)', fontWeight: 600 }}>Center</span>\n    </div>\n  );\n}`,
    answer: `function App() {\n  return (\n    <div style={{\n      display: 'flex',\n      alignItems: 'center',\n      justifyContent: 'center',\n      minHeight: 120,\n      background: 'var(--bg-accent)',\n      borderRadius: 8,\n    }}>\n      <span style={{ color: 'var(--text)', fontWeight: 600 }}>Center</span>\n    </div>\n  );\n}`,
    hints: ["display: flex", "alignItems: center"],
    keywords: ["flex", "center"],
  },
};

export const CodeOnly: Story = {
  name: "コードのみ（プレビューなし）",
  args: {
    title: "Git コマンド",
    description: "ブランチを作成するコマンドを埋めてください。",
    preview: false,
    initialCode: `git ___ -b feature/login`,
    answer: `git checkout -b feature/login`,
    hints: ["checkout コマンドを使います"],
    keywords: ["checkout"],
  },
};

export const ConfigPreview: Story = {
  name: "JSON 設定",
  args: {
    title: "package.json",
    description: "name フィールドを埋めてください。",
    preview: true,
    previewType: "config" as const,
    initialCode: `{\n  "name": "___",\n  "version": "1.0.0"\n}`,
    answer: `{\n  "name": "my-app",\n  "version": "1.0.0"\n}`,
    hints: ["プロジェクト名を入力"],
    keywords: ["my-app"],
  },
};
