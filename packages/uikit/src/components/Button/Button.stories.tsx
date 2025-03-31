import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button, ButtonVariant } from './Button';

const meta = {
  title: 'Basic/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Click me',
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

export const Variants: Story = {
  render: () => {
    const buttonVariants: ButtonVariant[] = ['default', 'primary', 'secondary', 'danger', 'silent'];
    return (
      <div className='flex flex-col space-y-2 items-start'>
        {buttonVariants.map(variant => <Button variant={variant}>{variant}</Button>)}
        <Button loading>Loading</Button>
        <Button success>Success</Button>
        <Button icon={{ icon: 'Volume1' }} />
      </div>
    )
  }
};