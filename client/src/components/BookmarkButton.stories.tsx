import type { Meta, StoryObj } from "@storybook/react";
import { Router } from "wouter";
import BookmarkButton from "./BookmarkButton";

const meta: Meta<typeof BookmarkButton> = {
  title: "Components/BookmarkButton",
  component: BookmarkButton,
  decorators: [
    (Story) => (
      <Router ssrPath="/react/hello-react">
        <Story />
      </Router>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof BookmarkButton>;

export const Default: Story = {};
