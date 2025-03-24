import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Badge } from './Badge';
import { ComponentProps } from 'react';

const meta = {
  title: 'Basic/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    children: 'Category',
    onClick: fn(),
  },
  render: function StoryComponent(args: ComponentProps<typeof Badge>) {
    return (
      <>
        <Badge {...args} onClick={undefined} />
        <Badge {...args} children={`${args.children} (clickable)`} />
        <Badge {...args} onClick={undefined} children={`${args.children} (inactive)`} inactive />
      </>
    )
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
