import type { Meta, StoryObj } from '@storybook/react';
import { CopyToClipboard } from './CopyToClipboard';

const meta = {
  title: 'Basic/CopyToClipboard',
  component: CopyToClipboard,
  tags: ['autodocs'],
} satisfies Meta<typeof CopyToClipboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Hello world!"
  }
};
