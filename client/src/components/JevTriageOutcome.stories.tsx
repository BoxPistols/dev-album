import type { Meta, StoryObj } from "@storybook/react-vite";
import JevTriageOutcome from "./JevTriageOutcome";

const meta: Meta<typeof JevTriageOutcome> = {
  title: "Components/JevTriageOutcome",
  component: JevTriageOutcome,
  args: {
    record: {
      input:
        "今月の請求が2回引き落とされています。至急確認して返金してください。",
      department: "billing",
      confidence: 1,
      urgent: 0.79,
      model: "jev-1.13.0",
      measuredOn: "2026-09-20",
    },
    recordHref: "#recorded-measurements",
    recordLinkLabel: "4. しきい値を自分のデータで決める",
  },
};
export default meta;
type Story = StoryObj<typeof JevTriageOutcome>;

export const Running: Story = {
  name: "実行中",
  args: { state: { status: "running" } },
};

export const Success: Story = {
  name: "実呼び出しの結果（値は表示確認用の例）",
  args: {
    state: {
      status: "success",
      result: {
        department: "billing",
        confidence: 0.92,
        urgent: 0.5,
        route: "review",
        model: "jev-example",
        elapsedMs: 512,
        inputTokens: 404,
      },
    },
  },
};

export const WithoutTokens: Story = {
  name: "入力トークンの報告が無い場合",
  args: {
    state: {
      status: "success",
      result: {
        department: "other",
        confidence: 1,
        urgent: 0.05,
        route: "auto",
        model: "jev-example",
        elapsedMs: 320,
        inputTokens: null,
      },
    },
  },
};

export const Invalid: Story = {
  name: "入力の問題",
  args: {
    state: { status: "invalid", message: "messageを入力してください" },
  },
};

export const NotConfigured: Story = {
  name: "キーが無い（記録へ落とす）",
  args: { state: { status: "unavailable", reason: "not_configured" } },
};

export const JudgementFailed: Story = {
  name: "判定を取得できない（記録へ落とす）",
  args: { state: { status: "unavailable", reason: "judgement_failed" } },
};
