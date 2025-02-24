import type { Meta, StoryObj } from '@storybook/react';
import { Scrollbar } from './Scrollbar';
import { fn } from '@storybook/test';

function StoryChildren() {
  return (
    <div className='h-[300px]'>
      {new Array(20).fill('Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, possimus officiis aut laudantium accusantium sint nam. Corporis nulla tempora id unde maiores dolorum, quae tempore? Nemo officiis aliquid dicta tempora.').join(' ')}
    </div>
  )
}

const meta = {
  title: 'Wrapper/Scrollbar',
  component: Scrollbar,
  tags: ['autodocs'],
  args: {
    children: StoryChildren(),
    onScroll: fn(),
    onScrollToEnd: fn(),
  }
} satisfies Meta<typeof Scrollbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Custom: Story = {
  args: {
    styles: {
      height: 16,
      width: 16,
      borderRadius: 0,
      thumbColor: '#4f4',
      thumbColorDark: '#4f4',
      trackColor: '#ccd',
      trackColorDark: '#ccd',
    }
  }
};