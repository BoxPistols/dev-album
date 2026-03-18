import type { Meta, StoryObj } from "@storybook/react";
import { Router } from "wouter";
import StepIndicator from "./StepIndicator";

const meta: Meta<typeof StepIndicator> = {
  title: "Components/StepIndicator",
  component: StepIndicator,
  decorators: [
    (Story) => (
      <Router ssrPath="/react/hello-react">
        <Story />
      </Router>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof StepIndicator>;

export const Default: Story = {};
