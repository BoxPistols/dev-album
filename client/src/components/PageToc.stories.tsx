import type { Meta, StoryObj } from "@storybook/react";
import PageToc from "./PageToc";

const meta: Meta<typeof PageToc> = {
  title: "Components/PageToc",
  component: PageToc,
};
export default meta;
type Story = StoryObj<typeof PageToc>;

export const Default: Story = {
  args: {
    items: [
      { id: "design", label: "通知は「全部流す」と読まれなくなる" },
      { id: "setup", label: "アプリを入れて、チャンネルで購読する", step: 1 },
      { id: "events", label: "イベント種別を足し引きする", step: 2 },
      { id: "filters", label: "ラベル・ブランチで絞り込む", step: 3 },
      { id: "pause", label: "一括作業のあいだだけ止めて、あとで戻す", step: 4 },
      { id: "cheatsheet", label: "目的から引く早見表" },
    ],
  },
};

// 手順が無い解説ページでも使える（番号の枠は空のまま揃う）
export const WithoutSteps: Story = {
  args: {
    items: [
      { id: "a", label: "何を解決するのか" },
      { id: "b", label: "仕組み" },
      { id: "c", label: "使いどころと限界" },
    ],
  },
};
