import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button, ButtonVariant } from './Button';

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
    icon: {
      type: 'Check',
    },
  },
};

export const Silent: Story = {
  args: {
    variant: 'silent',
  },
};

export const All: Story = {
  render: () => {
    const variants: ButtonVariant[] = ['default', 'primary', 'secondary', 'danger', 'silent'];
    return (
      <div className="flex flex-col space-y-2">
        {variants.map(variant => (
          <Button variant={variant}>{variant}</Button>
        ))}
        <Button icon={{ icon: 'Volume1' }}>Icon</Button>
      </div>
    )
  }
};