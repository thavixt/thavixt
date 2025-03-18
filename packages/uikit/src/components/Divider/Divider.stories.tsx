import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import { Divider } from './Divider';

const meta = {
  title: 'Layout/Divider',
  component: Divider,
  tags: ['autodocs'],
  render: function StoryComponent(args: ComponentProps<typeof Divider>) {
    return (
      <div className="text-slate-900 dark:text-slate-200">
        <div className='flex flex-col text-center'>
          <span>This text is divided by</span>
          <Divider {...args} />
          <span>Divider components</span>
          <Divider {...args} unicorn />
          <span>which are just some lines which could be</span>
          <Divider {...args} small />
          <span>full-width or smaller, colorful or plain gray by default</span>
          <Divider {...args} unicorn small />
          <span>but you can provide it any color via the <code>className</code> prop</span>
          <Divider {...args} className='bg-green-400' />
          <div className="flex h-[200px] items-center justify-between">
            <span>a</span>
            <Divider {...args} vertical />
            <span>b</span>
            <Divider {...args} unicorn vertical />
            <span>they can even be vertical</span>
            <Divider {...args} small vertical />
            <span>c</span>
            <Divider {...args} unicorn small vertical />
            <span>d</span>
          </div>
          <Divider {...args} className='bg-red-600' />
        </div>
      </div>
    )
  }
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};