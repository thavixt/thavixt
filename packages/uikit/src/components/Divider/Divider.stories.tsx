import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import { Divider } from './Divider';
import { Typography } from '../Typography/Typography';

const meta = {
  title: 'Layout/Divider',
  component: Divider,
  tags: ['autodocs'],
  render: function StoryComponent(args: ComponentProps<typeof Divider>) {
    return (
      <div>
        <div className='flex flex-col text-center'>
          <Divider {...args} />
          <Typography type="text">
            The content here is divided by <Typography type="code">{'<Divider/>'}</Typography> components,
          </Typography>
          <Divider {...args} unicorn />
          <Typography type="text">
            which are just some lines to separate layout.
          </Typography>
          <Divider {...args} small />
          <Typography type="text">
            They can be full or half width, <Typography type="code">unicorn</Typography> or plain gray by default.
          </Typography>
          <Divider {...args} unicorn small />
          <div className="flex h-[200px] items-center justify-between">
            <Typography type="text">They</Typography>
            <Divider {...args} vertical />
            <Typography type="text">can be</Typography>
            <Divider {...args} unicorn vertical />
            <Typography type="text">vertical</Typography>
            <Divider {...args} small vertical />
            <Typography type="text">or</Typography>
            <Divider {...args} unicorn small vertical />
            <Typography type="text">horizontal.</Typography>
          </div>
        </div>
      </div>
    )
  }
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};