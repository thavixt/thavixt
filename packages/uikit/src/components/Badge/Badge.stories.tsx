import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Badge } from './Badge';

const meta = {
  title: 'Basic/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    children: 'Component',
    onClick: fn(),
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
