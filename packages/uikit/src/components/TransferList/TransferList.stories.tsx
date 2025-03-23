import type { Meta, StoryObj } from '@storybook/react';
import { TransferList } from './TransferList';
import { ComponentProps } from 'react';
import { fn } from '@storybook/test';

const createItems = (count: number) => (
  new Array(count).fill(0).map((_v, index) => {
    const i = index + 1;
    return {
      key: `item-${i}`,
      content: `List item #${i}`,
    }
  })
)

const items = createItems(50);
const defaultSelected = items.filter((_, i) => !(i % 3)).map(item => item.key);

const meta = {
  title: 'Input/Transfer list',
  component: TransferList,
  tags: ['autodocs'],
  args: {
    items,
    defaultSelected,
    onChange: fn(),
  },
  render: function StoryComponent(args: ComponentProps<typeof TransferList>) {
    return (
      <div className='w-[600px]'>
        <TransferList {...args}/>
      </div>
    )
  },
} satisfies Meta<typeof TransferList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

