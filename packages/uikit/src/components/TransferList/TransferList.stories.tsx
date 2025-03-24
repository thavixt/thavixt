import type { Meta, StoryObj } from '@storybook/react';
import { TransferList } from './TransferList';
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

const items = createItems(30);
const defaultSelected = items.filter((_, i) => !(i % 3)).map(item => item.key);

const meta = {
  title: 'Input/Transfer list',
  component: TransferList,
  tags: ['autodocs'],
  args: {
    items,
    defaultSelected,
    onChange: fn(),
    className: 'h-[350px]',
  },
  decorators: [
    (Story) => (
      <div className='h-fit'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TransferList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

