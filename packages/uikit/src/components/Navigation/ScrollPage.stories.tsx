import type { Meta, StoryObj } from '@storybook/react';
import { ScrollPage } from './ScrollPage';
import { ComponentProps } from 'react';

const meta = {
  title: 'Navigation/ScrollPage',
  component: ScrollPage,
  tags: ['autodocs'],
  render: function StoryComponent(args: ComponentProps<typeof ScrollPage>) {
    return (
      <div className='h-96'>
        <div className='h-[10000px]'>
          just imagine that this is a huge overflowing element ...
          <ScrollPage {...args}/>
        </div>
      </div>
    )
  }
} satisfies Meta<typeof ScrollPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ScrollToTop: Story = {
  args: {
    to: 'top',
  }
};

export const ScrollToBottom: Story = {
  args: {
    to: 'bottom',
  }
};

