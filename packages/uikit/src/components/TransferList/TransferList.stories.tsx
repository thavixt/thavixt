import type { Meta, StoryObj } from '@storybook/react';
import { TransferList } from './TransferList';

const createItems = (count: number) => (
  new Array(count).fill(0).map((_v, i) => {
    return {
      key: `item-${i}`,
      content: `List item #${i}`,
    }
  })
)

const items = createItems(50);
const defaultSelected = items.filter(() => Math.random() < 0.4).map(item => item.key);

const meta = {
  title: 'Input/TransferList',
  component: TransferList,
  tags: ['autodocs'],
  args: {
    items,
    defaultSelected,
  },
} satisfies Meta<typeof TransferList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

