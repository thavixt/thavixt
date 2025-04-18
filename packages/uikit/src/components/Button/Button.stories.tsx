import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button, ButtonVariant } from './Button';
import { ComponentProps } from 'react';

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
  render: function StoryComponent(args: ComponentProps<typeof Button>) {
    const buttonVariants: ButtonVariant[] = ['default', 'primary', 'secondary', 'danger', 'silent'];
    return (
      <div className='flex flex-col space-y-2 items-start'>
        {buttonVariants.map(variant => (
          <Button key={variant} {...args} variant={variant}>
            {`${variant[0].toUpperCase()}${variant.slice(1)}`}
          </Button>
        ))}
        <Button {...args} disabled>Disabled</Button>
        <Button {...args} loading>Loading</Button>
        <Button {...args} success>Success</Button>
        <Button {...args} icon={{ type: 'Volume1' }} />
      </div>
    )
  }
};