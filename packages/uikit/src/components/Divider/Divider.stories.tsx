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
          <Typography.Text>
            The content here is divided by <Typography.Code>{'<Divider/>'}</Typography.Code> components,
          </Typography.Text>
          <Divider {...args} unicorn />
          <Typography.Text>
            which are just some lines to separate layout.
          </Typography.Text>
          <Divider {...args} small />
          <Typography.Text>
            They can be full or half width, <Typography.Code>unicorn</Typography.Code> or plain gray by default.
          </Typography.Text>
          <Divider {...args} unicorn small />
          <div className="flex h-[200px] items-center justify-between">
            <Typography.Text>They</Typography.Text>
            <Divider {...args} vertical />
            <Typography.Text>can be</Typography.Text>
            <Divider {...args} unicorn vertical />
            <Typography.Text>vertical</Typography.Text>
            <Divider {...args} small vertical />
            <Typography.Text>or</Typography.Text>
            <Divider {...args} unicorn small vertical />
            <Typography.Text>horizontal.</Typography.Text>
          </div>
        </div>
      </div>
    )
  }
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};