import type { Meta, StoryObj } from "@storybook/react";
import { Router } from "wouter";
import SectionBadge from "./SectionBadge";

const meta: Meta<typeof SectionBadge> = {
  title: "Components/SectionBadge",
  component: SectionBadge,
  decorators: [
    (Story) => (
      <Router ssrPath="/react/hello-react">
        <Story />
      </Router>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof SectionBadge>;

export const Default: Story = {};
