import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableHandle } from './Table';
import { Button } from '../Button/Button';
import { fn } from '@storybook/test';
import { ComponentProps, useRef } from 'react';
import { sleep } from '../../common/utils';

const mockData = { key: 'msi', name: 'Radium Power Office PC', category: 'Desktop PC', price: '$1999' };
const getMockData = (count: number, from = 0) => new Array(count).fill(mockData).map((row, index) => {
  const i = index + from;
  return {
    ...row,
    key: `${i}`,
    name: `Radium ${i % 2 ? 'Business Laptop' : 'Power PC'} ${i}`,
    category: i % 2 ? 'Laptop' : 'PC',
    price: `$${(i % 10) * 100 + 199}`,
    year: 2020 + i % 5
  }
});

const storyRows = [
  { key: 'macAir', name: 'Apple Macbook Air', category: 'Laptop', price: '$1999', year: 2020 },
  { key: 'unknown', name: `AE-I AlienTech Unidentifiable Futuristic Object`, price: '$299', year: 3001 },
  { key: 'lenovoFx205', name: 'Lenovo FX-205', category: 'Laptop', price: '$649', year: 2019 },
];

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
            console.log('Table:actions', key, row);
            alert(`Buying "${row.name}" for ${row.price} ...`);
          }}
        >
          Buy
        </Button>
      </div>
    ),
    data: [
      ...storyRows,
      ...getMockData(27)
    ],
    columns: {
      name: 'Name',
      category: 'Category',
      year: 'Year',
      price: 'Price',
    },
    primaryKey: 'name',
    onSelect: fn(),
  },
  render: function StoryComponent(args: ComponentProps<typeof Table>) {
    return (
      <div className="w-full h-[410px]">
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
      ...storyRows,
      ...getMockData(10)
    ],
  }
};

export const Searchable: Story = {
  args: {
    data: getMockData(10),
    defaultSortBy: 'price',
    search: true,
    searchPlaceholder: 'Search (ex: "399 laptop")'
  }
};

export const Checkable: Story = {
  args: {
    defaultSortBy: 'price',
    checkable: true,
  },
  render: function StoryComponent(args: ComponentProps<typeof Table>) {
    const ref = useRef<TableHandle>(null);
    return (
      <div className="flex flex-col space-y-4">
        <div className="w-full h-[400px] ">
          <Table {...args} ref={ref} />
        </div>
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

export const LoadingState: Story = {
  args: {
    paginated: true,
    loading: true,
    loadingText: "Alright, I'll admit it - this will never finish loading",
  }
};

export const EmptyState: Story = {
  args: {
    paginated: true,
    data: [],
    emptyText: "There's nothing to show at the moment. Perhaps having a backend to fetch data from would be cool!",
  }
};

export const ErrorState: Story = {
  args: {
    paginated: true,
    // errorText: 'This fetch error is intentional, just to simulate an error state',
    onPage: fn(async () => {
      await sleep();
      throw new Error([
        "This is the content of the 'message' property of the Error thrown in the Table:onPage() method.",
        "You might want to provide a default with the errorText prop of the <Table>."
      ].join("\n"));
    }),
  }
};

export const Paginated: Story = {
  args: {
    paginated: true,
  }
};

export const PaginatedWithFixedPageSize: Story = {
  args: {
    paginated: 20,
  }
};

export const FullFeaturedWithDataLoading: Story = {
  args: {
    checkable: true,
    data: undefined,
    errorText: 'This fetch error is intentional, just to simulate an error state with a 10% chance of occurring',
    paginated: true,
    search: true,
    onPage: fn(async ({ page, pageSize }) => {
      await sleep(500 + Math.random() * 1000);
      if (Math.random() <= 0.1) {
        throw new Error(`[uikit#Table] Simulated fetch to page ${page.next} failed with a 10% chance`);
      }
      const pageCount = 12;
      return {
        nextData: getMockData(
          page.next === 11 ? pageSize - 4 : pageSize,
          (page.next * pageSize),
        ),
        pageCount,
        dataLength: (pageCount * pageSize) - 4,
      };
    }),
  }
};
