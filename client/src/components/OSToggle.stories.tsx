import type { Meta, StoryObj } from "@storybook/react";
import OSToggle from "./OSToggle";
import { OSProvider } from "@/contexts/OSContext";

const meta: Meta<typeof OSToggle> = {
  title: "Components/OSToggle",
  component: OSToggle,
  decorators: [
    (Story) => (
      <OSProvider>
        <Story />
      </OSProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof OSToggle>;

export const Default: Story = {};
