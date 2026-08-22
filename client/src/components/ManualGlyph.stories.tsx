import type { Meta, StoryObj } from "@storybook/react-vite";
import { manuals } from "@/lib/navigation";
import ManualGlyph from "./ManualGlyph";

const meta: Meta<typeof ManualGlyph> = {
  title: "Components/ManualGlyph",
  component: ManualGlyph,
};
export default meta;
type Story = StoryObj<typeof ManualGlyph>;

/** 10 マニュアルを並べて、地色だけで見分けがつくか・頭文字が読めるかを見る */
export const AllManuals: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {manuals.map((m) => (
        <div key={m.id} className="flex items-center gap-2">
          <ManualGlyph manual={m} />
          <span className="text-sm text-foreground">{m.shortTitle}</span>
        </div>
      ))}
    </div>
  ),
};

export const Medium: Story = {
  render: () => (
    <div className="flex gap-3">
      {manuals.map((m) => (
        <ManualGlyph key={m.id} manual={m} size="md" />
      ))}
    </div>
  ),
};
