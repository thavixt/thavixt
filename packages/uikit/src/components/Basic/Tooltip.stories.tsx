import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { ComponentProps } from 'react';

const meta = {
  title: 'Basic/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: {
    children: 'Hover here',
    tooltip: 'Tooltip',
    position: 'bottom',
    visible: false,
  },
  render: function StoryComponent(args: ComponentProps<typeof Tooltip>) {
    return (
      <div className='my-8 mx-16 grid grid-cols-2 gap-8'>
        <Tooltip {...args} />
      </div>
    )
  }
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AlwaysVisible: Story = {
  args: {
    visible: true,
    position: 'bottom',
  },
};

export const AllOrientations: Story = {
  render: function StoryComponent(args: ComponentProps<typeof Tooltip>) {
    return (
      <div className='m-16 grid grid-cols-2 gap-8 max-w-[300px]'>
        <Tooltip {...args} position='top'>
          {args.children}
        </Tooltip>
        <Tooltip {...args} position='right'>
          {args.children}
        </Tooltip>
        <Tooltip {...args} position='left'>
          {args.children}
        </Tooltip>
        <Tooltip {...args} position='bottom'>
          {args.children}
        </Tooltip>
      </div>
    )
  }
};

