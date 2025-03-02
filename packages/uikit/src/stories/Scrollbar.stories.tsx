import type { Meta, StoryObj } from '@storybook/react';
import { Scrollbar } from '../components/Scrollbar';
import { fn } from '@storybook/test';

function StoryChildren() {
  return (
    <div className='h-[300px] dark:text-slate-100'>
      {new Array(20).fill('Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, possimus officiis aut laudantium accusantium sint nam. Corporis nulla tempora id unde maiores dolorum, quae tempore? Nemo officiis aliquid dicta tempora.').join(' ')}
    </div>
  )
}

const meta = {
  title: 'Utility/Scrollbar',
  component: Scrollbar,
  tags: ['autodocs'],
} satisfies Meta<typeof Scrollbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: StoryChildren(),
    onScroll: fn(),
    onScrollToEnd: fn(),
  }
};

export const Custom: Story = {
  args: {
    children: StoryChildren(),
    styles: {
      height: 16,
      width: 16,
      borderRadius: 0,
      thumbColor: '#4f4',
      thumbColorDark: 'red',
      trackColor: '#ccd',
      trackColorDark: 'blue',
    }
  }
};