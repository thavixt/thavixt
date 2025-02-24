import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { fn } from '@storybook/test';
 
const meta = {
  title: 'Basic/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    variant: 'primary',
    children: 'Click me!',
    onClick: fn(),
  }
} satisfies Meta<typeof Button>;
 
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    // variant: 'primary',
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