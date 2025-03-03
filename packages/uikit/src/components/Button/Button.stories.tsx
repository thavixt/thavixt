import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './Button';

const meta = {
  title: 'Basic/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Click',
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};
export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
};

export const Icon: Story = {
  args: {
    icon: 'Check',
  },
};

export const Silent: Story = {
  args: {
    variant: 'silent',
  },
};