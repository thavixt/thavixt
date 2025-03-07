import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableHandle } from './Table';
import { Button } from '../Button/Button';
import { fn } from '@storybook/test';
import { ComponentProps, useRef } from 'react';
import { sleep } from '../../common/utils';

const mockData = { key: 'msi', name: 'Radium Power Office PC', category: 'Desktop PC', price: '$1999' };
const uuid = crypto.randomUUID().slice(0, 3).toUpperCase();
const getMockData = (count: number, from = 0) => new Array(count).fill(mockData).map((row, index) => {
  const i = index + from;
  return {
    ...row,
    key: `${i}`,
    name: `Radium ${i % 2 ? (i % 4 ? 'Business Laptop' : 'Joy Tablet') : 'Power PC'} (${uuid}${index + from})`,
    category: i % 2 ? (i % 4 ? 'Laptop' : 'Tablet') : 'PC',
    price: `$${(i % 10) * 100 + 99}`,
    year: 2020 + i % 5
  }
});

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
            console.log('Buying', key, row);
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
      ...getMockData(82)
    ],
    columns: {
      name: 'Name',
      category: 'Category',
      year: 'Year',
      price: 'Price',
    },
    full: false,
    onSelect: fn(),
    page: false,
    placeholder: '-',
    primaryKey: 'name',
    search: false,
  },
  render: function StoryComponent(args: ComponentProps<typeof Table>) {
    return (
      <div className="w-full h-[400px]">
        <Table {...args} />
      </div>
    )
  }
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      { key: 'macAir', name: 'Apple Macbook Air', category: 'Laptop', price: '$999', year: 2020 },
      { key: 'unknown', name: `Unidentifiable tech thing ${crypto.randomUUID()}`, price: '$299' },
      { key: 'lenovoFx205', name: 'Lenovo FX 205', category: 'Laptop', price: '$649', year: 2019 },
      ...getMockData(10)
    ],
  }
};

export const Searchable: Story = {
  args: {
    data: getMockData(1000),
    defaultSortBy: 'price',
    search: true,
    searchPlaceholder: 'Search (ex: "399 laptop")'
  }
};

export const Checkable: Story = {
  args: {
    checkable: true,
  },
  render: function StoryComponent(args: ComponentProps<typeof Table>) {
    const ref = useRef<TableHandle>(null);
    return (
      <div className="w-full h-[400px] flex flex-col space-y-4">
        <Table {...args} ref={ref} />
        <div className="flex space-x-2">
          <Button onClick={() => console.log(ref.current?.getSelectedKeys())}>
            Print selected keys to console
          </Button>
          <Button onClick={() => console.log(ref.current?.getSelectedRows())}>
            Print selected rows to console
          </Button>
        </div>
      </div>
    )
  }
};

export const Loading: Story = {
  args: {
    loading: true,
    loadingText: "Alright, I'll admit it - this will never finish loading"
  }
};

export const Empty: Story = {
  args: {
    data: [],
    emptyText: "There's nothing to show at the moment"
  }
};

export const Paginated: Story = {
  args: {
    page: true,
  }
};

export const PaginatedWithFixedPageSize: Story = {
  args: {
    page: 20,
  }
};

export const PaginatedWithDataLoading: Story = {
  args: {
    data: undefined,
    search: true,
    page: true,
    checkable: true,
    onPage: fn(async (rowsToLoad, _prevData, nextPage) => {
      await sleep(500 + Math.random() * 1000);
      // if (nextPage > 0) {
      //   throw new Error('oops');
      // }
      const pageCount = 12;
      return {
        nextData: getMockData(
          nextPage === 11 ? rowsToLoad - 4 : rowsToLoad,
          (nextPage * rowsToLoad),
        ),
        pageCount,
        dataLength: (pageCount * rowsToLoad) - 4,
      };
    }),
  }
};
