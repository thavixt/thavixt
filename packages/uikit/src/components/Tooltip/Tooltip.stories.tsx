import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Basic/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: {
    children: 'Hover here',
    tooltip: 'This is a very awesome tip here, wow',
    position: 'bottom',
    visible: false,
  },
  decorators: [
    (Story) => (
      <div className='min-h-[120px]'>
        <Story />
      </div>
    ),
  ],
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
      <div className='m-2 mb-20 flex flex-col gap-16 items-center'>
        <Tooltip {...args} position='left'>
          {args.children} for a left tooltip
        </Tooltip>
        <Tooltip {...args} position='top'>
          {args.children} for a top tooltip
        </Tooltip>
        <Tooltip {...args} position='right'>
          {args.children} for a right tooltip
        </Tooltip>
        <Tooltip {...args} position='bottom'>
          {args.children} for a bottom tooltip
        </Tooltip>
      </div>
    )
  }
};

