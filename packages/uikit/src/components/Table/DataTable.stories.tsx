import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';
import { ComponentProps } from 'react';

const mockData = { key: 'msi', name: 'Radium Power Office PC', category: 'Desktop PC', price: '$1999' };
const getMockData = (count: number, from = 0) => new Array(count).fill(mockData).map((row, index) => {
  const i = index + from;
  return {
    ...row,
    key: `${i}`,
    name: `IBM ${i % 2 ? 'Base Laptop' : 'Office PC'} ${i}`,
    price: `$${(i % 10) * 100 + 199}`,
    year: i % 4 ? 2020 + i % 5 : undefined,
  }
});

const meta = {
  title: 'Data display/Data table',
  component: DataTable,
  tags: ['autodocs'],
  args: {
    data: getMockData(10),
    columns: {
      name: 'Name',
      year: 'Year',
      price: 'Price',
    },
    primaryKey: 'name',
  },
  render: function StoryComponent(args: ComponentProps<typeof DataTable>) {
    return (
      <div className="size-[500px]">
        <DataTable {...args} />
      </div>
    )
  }
} satisfies Meta<typeof DataTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};