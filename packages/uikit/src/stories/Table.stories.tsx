import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '../components/Table';
import { Button } from '../components/Button';
import { fn } from '@storybook/test';

const mockData = { key: 'msi', name: 'Radium ROG XTHE v2', category: 'Desktop PC', price: '$1999' };
const getMockData = (count: number) => new Array(count).fill(mockData).map((row, i) => ({
  ...row,
  key: `${row.key}-${i}`,
  name: `${row.name} ${crypto.randomUUID()}`,
  price: `$${Math.round(Math.random() * 10_000)}`,
  year: Math.round(Math.random() * 10) + 2015
}));

const meta = {
  title: 'Data display/Table',
  component: Table,
  tags: ['autodocs'],
  args: {
    actions: (key, row) => (
      <div className='flex space-x-2 items-center'>
        <Button
          variant='primary'
          className='text-xs'
          onClick={() => {
            alert(`Buying the ${row.name} for ${row.price} ...`);
            console.log('Buying', key, row)
          }}
        >
          Buy
        </Button>
      </div>
    ),
    className: '',
    data: [
      { key: 'macAir', name: 'Apple Macbook Air', category: 'Laptop', price: '$999', year: 2020 },
      { key: 'unknown', name: `Unidentifiable tech thing ${crypto.randomUUID()}`, price: '$299' },
      { key: 'lenovoFx205', name: 'Lenovo FX 205', category: 'Laptop', price: '$649', year: 2019 },
      ...getMockData(10)
    ],
    dataKeys: {
      name: 'Name',
      category: 'Category',
      year: 'Year',
      price: 'Price',
    },
    full: false,
    pageSize: undefined,
    placeholder: '-',
    primaryKey: 'name',
    search: false,
    onSelect: fn(),
  }
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Searchable: Story = {
  args: {
    search: true,
  }
};

export const Paginated: Story = {
  args: {
    pageSize: 10,
  }
};

export const Checkable: Story = {
  args: {
    checkable: true,
  }
};

export const FullFeatured: Story = {
  args: {
    search: true,
    pageSize: 10,
    checkable: true,
  }
};

// @todo
// export const FullFeaturedInContainer: Story = {
//   args: {
//     search: true,
//     pageSize: 10,
//     checkable: true,
//   },
//   render: function StoryComponent(args: ComponentProps<typeof Table>) {
//     return (
//       <div className="size-1/2 border-2 border-red-500">
//         <Table {...args} />
//       </div>
//     )
//   }
// };