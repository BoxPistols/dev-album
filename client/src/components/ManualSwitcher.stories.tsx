import type { Meta, StoryObj } from "@storybook/react";
import { Router } from "wouter";
import ManualSwitcher from "./ManualSwitcher";

const meta: Meta<typeof ManualSwitcher> = {
  title: "Components/ManualSwitcher",
  component: ManualSwitcher,
  decorators: [
    (Story) => (
      <Router ssrPath="/claude-mux">
        {/* 実寸のサイドバー幅（w-64 から p-6 を引いた 208px）で確認する */}
        <div className="w-52">
          <Story />
        </div>
      </Router>
    ),
  ],
  args: { onNavigate: () => {} },
};
export default meta;
type Story = StoryObj<typeof ManualSwitcher>;

export const Default: Story = {
  args: { activeManualId: "claude-mux" },
};

/** 最長のマニュアル名。1 列にしたので省略されないことを確認する */
export const LongestName: Story = {
  args: { activeManualId: "infra" },
};

/** マニュアル外（TOP / トレーニング等）では本文側の一覧が担うので何も描画しない */
export const NoActiveManual: Story = {
  args: { activeManualId: undefined },
};
