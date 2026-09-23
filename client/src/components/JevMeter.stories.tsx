import type { Meta, StoryObj } from "@storybook/react-vite";
import JevMeter from "./JevMeter";

const meta: Meta<typeof JevMeter> = {
  title: "Components/JevMeter",
  component: JevMeter,
};
export default meta;
type Story = StoryObj<typeof JevMeter>;

export const Compare: Story = {
  name: "2つのやり方を比べる",
  args: {
    title: "20個の判断を、1問ずつ送るか、まとめて送るか",
    description:
      "ボタンを押すと、処理した判断の数が増えます。リクエストの回数と料金がどう伸びるかを見てください。",
    unitLabel: "判断",
    strategies: [
      {
        id: "one",
        label: "1問ずつ送る",
        unitsPerRequest: 1,
        latencyMs: 669,
        inputTokens: 404,
      },
      {
        id: "batch",
        label: "20問を1リクエスト",
        unitsPerRequest: 20,
        latencyMs: 289,
        inputTokens: 1407,
      },
    ],
    measuredNote: "2026-09-20、jev-1.13.0で実測",
  },
};

export const Single: Story = {
  name: "累計だけを見る",
  args: {
    title: "案を採点し続けるといくらかかるか",
    description: "ボタンを押した分だけ採点した場合の累計です。",
    unitLabel: "案",
    steps: [12, 100, 1000],
    strategies: [
      {
        id: "batch",
        label: "12案を1リクエスト",
        unitsPerRequest: 12,
        latencyMs: 660,
        inputTokens: 4649,
      },
    ],
    measuredNote: "2026-09-20、jev-1.13.0で実測",
  },
};

export const WithoutTokens: Story = {
  name: "トークンを測っていない場合",
  args: {
    title: "2秒ごとに判断すると、何回呼ぶことになるか",
    description: "入力トークンを測っていないため、料金は出しません。",
    unitLabel: "判断",
    steps: [30, 300],
    strategies: [
      {
        id: "loop",
        label: "2秒ごとに1回",
        unitsPerRequest: 1,
        latencyMs: 400,
      },
    ],
    measuredNote: "2026-09-20、jev-1.13.0で実測（7回の平均）",
  },
};
