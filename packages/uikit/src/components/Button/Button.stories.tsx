import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button, ButtonVariant } from './Button';
import { ButtonBar } from '../ButtonBar/ButtonBar';

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

export const All: Story = {
  render: () => {
    const buttonVariants: ButtonVariant[] = ['default', 'primary', 'secondary', 'danger', 'silent'];
    return (
      <ButtonBar>
        {buttonVariants.map(variant => (
          <Button variant={variant}>{variant}</Button>
        ))}
        <Button icon={{ icon: 'Volume1' }}>Icon</Button>
      </ButtonBar>
    )
  }
};