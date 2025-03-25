import type { Meta, StoryObj } from '@storybook/react';
import { CopyToClipboard } from './CopyToClipboard';

const meta = {
  title: 'Basic/Copy to clipboard',
  component: CopyToClipboard,
  tags: ['autodocs'],
  args: {
    children: "7bef68c3-c0d6-4d5b-bd57-5f76d7876251",
    transform: (value: string) => `{ key: ${value} }`
  }
} satisfies Meta<typeof CopyToClipboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
