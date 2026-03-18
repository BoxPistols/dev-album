import type { Meta, StoryObj } from "@storybook/react";
import { Router } from "wouter";
import PageNavigation from "./PageNavigation";

const meta: Meta<typeof PageNavigation> = {
  title: "Components/PageNavigation",
  component: PageNavigation,
  decorators: [
    (Story) => (
      <Router ssrPath="/react/hello-react">
        <Story />
      </Router>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof PageNavigation>;

export const Default: Story = {};
