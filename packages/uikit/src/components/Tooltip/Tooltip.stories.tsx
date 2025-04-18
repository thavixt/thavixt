import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import { Tooltip } from './Tooltip';
import { Icon } from '../Icon/Icon';
import classNames from 'classnames';

const meta = {
  title: 'Basic/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Show any content on hover.',
      },
    },
  },
  args: {
    children: 'Hover me',
    Tooltip: 'just about anything goes here i guess ¯\\_(ツ)_/¯',
    position: 'bottom',
    visible: false,
  },
  decorators: [
    (Story) => (
      <div className='m-16'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AlwaysVisible: Story = {
  args: {
    visible: true,
    Tooltip: (side) => (
      <>
        <Icon
          type="Arrow"
          height={2}
          className={classNames('mr-1 transform', {
            'rotate-180': side === 'right',
            'rotate-270': side === 'bottom',
            'rotate-0': side === 'left',
            'rotate-90': side === 'top',
          })}
        />
        from there
      </>
    ),
  },
  render: function StoryComponent(args: ComponentProps<typeof Tooltip>) {
    return (
      <div className='flex flex-col gap-32 items-center'>
        <Tooltip {...args} position='right' />
        <Tooltip {...args} position='bottom' />
        <Tooltip {...args} position='left' />
        <Tooltip {...args} position='top' />
      </div>
    )
  }
};
