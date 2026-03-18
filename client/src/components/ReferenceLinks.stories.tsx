import type { Meta, StoryObj } from "@storybook/react";
import ReferenceLinks from "./ReferenceLinks";

const meta: Meta<typeof ReferenceLinks> = {
  title: "Components/ReferenceLinks",
  component: ReferenceLinks,
};
export default meta;
type Story = StoryObj<typeof ReferenceLinks>;

export const Default: Story = {
  args: {
    links: [
      {
        title: "React 公式ドキュメント",
        url: "https://react.dev",
        description: "React の基本概念からAPIリファレンスまで",
      },
      {
        title: "TypeScript Handbook",
        url: "https://www.typescriptlang.org/docs/",
        description: "型システムの詳細な解説",
      },
      {
        title: "MDN Web Docs",
        url: "https://developer.mozilla.org/",
      },
    ],
  },
};
