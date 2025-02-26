import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { fn } from '@storybook/test';
 
const meta = {
  title: 'Basic/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;
 
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Click me!',
    onClick: fn(),
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Click me!',
    onClick: fn(),
  },
};
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Click me!',
    onClick: fn(),
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Click me!',
    onClick: fn(),
  },
};

export const Round: Story = {
  args: {
    round: true,
    children: 'Click me!',
    onClick: fn(),
  },
};