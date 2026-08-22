import type { Meta, StoryObj } from "@storybook/react-vite";
import SliderChallenge from "./SliderChallenge";

const meta: Meta<typeof SliderChallenge> = {
  title: "Components/SliderChallenge",
  component: SliderChallenge,
};
export default meta;
type Story = StoryObj<typeof SliderChallenge>;

export const Typography: Story = {
  name: "line-height / letter-spacing",
  args: {
    title: "テキストの読みやすさを触って比べる",
    description:
      "スライダーを動かして、行間と字間が読みやすさに与える影響を体感してください。",
    sliders: [
      {
        id: "lineHeight",
        label: "line-height",
        min: 1,
        max: 2.5,
        step: 0.1,
        defaultValue: 1.5,
      },
      {
        id: "letterSpacing",
        label: "letter-spacing",
        min: -0.05,
        max: 0.3,
        step: 0.01,
        defaultValue: 0,
        unit: "em",
      },
    ],
    render: (v) => (
      <p
        style={{
          lineHeight: v.lineHeight,
          letterSpacing: `${v.letterSpacing}em`,
        }}
      >
        本文は行間 1.5〜1.7、見出しは 1.2〜1.3
        が読みやすい目安です。字間は本文では 0em
        付近が自然で、見出しだけ少し広げると締まって見えます。
      </p>
    ),
    explanation:
      "WCAG 1.4.12 では line-height 1.5 以上、letter-spacing 0.12em 以上を指定可能にすることが求められています。",
  },
};

export const SingleSlider: Story = {
  name: "スライダー 1 本（最小構成）",
  args: {
    title: "フォントサイズ",
    description: "本文サイズを調整して読みやすさを確認します。",
    sliders: [
      {
        id: "size",
        label: "font-size",
        min: 10,
        max: 24,
        step: 1,
        defaultValue: 14,
        unit: "px",
      },
    ],
    render: (v) => (
      <p style={{ fontSize: `${v.size}px` }}>
        本文サイズは 14〜16px が一般的な目安です。
      </p>
    ),
  },
};
