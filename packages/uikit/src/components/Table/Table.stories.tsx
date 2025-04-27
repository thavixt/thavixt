import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableHandle } from './Table';
import { Button } from '../Button/Button';
import { ComponentProps, useRef } from 'react';
import { Inplace } from '../Inplace/Inplace';
import { NumberInput } from '../NumberInput/NumberInput';
import { TextInput } from '../TextInput/TextInput';
import { RadioInput } from '../RadioInput/RadioInput';
import { fn, userEvent, within, expect, waitForElementToBeRemoved } from '@storybook/test';
import { sleep } from '../../common/utils';

const mockData = { key: 'msi', name: 'Radium Power Office PC', category: 'Desktop PC', price: '$1999' };
const getMockData = (count = 30, from = 0) => new Array(count).fill(mockData).map((row, index) => {
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
      name: { name: 'Name', width: "35%" },
      category: { name: 'Category', width: "20%" },
      year: { name: 'Year', width: "20%" },
      price: { name: 'Price', width: "20%" },
      actions: { name: 'Row Actions', width: "15%" },
    },
    primaryKey: 'name',
    onSelect: fn(),
  },
  render: function StoryComponent(args: ComponentProps<typeof Table>) {
    return (
      <div className="h-[500px] w-full max-w-[900px]">
        <Table {...args} />
      </div>
    )
  }
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

// @TODO: optimize rendering
// somewhere the 10k lines slow stuff down
export const Editable10KRows: Story = {
  args: {
    data: getMockData(10000),
    virtualized: true,
    search: true,
    renderCell: (key, row) => {
      if (key === 'name') {
        return <Inplace
          title='Click to edit name'
          replacement={
            <TextInput
              name='name'
              defaultValue={row[key] as string}
              onChange={value => console.log(`You changed the name from '${row[key]}' to '${value}'`)}
            />
          }
        >
          {row[key]}
        </Inplace>;
      }
      if (key === 'category') {
        return <Inplace
          title='Click to edit category'
          replacement={
            <RadioInput
              name='category'
              inline
              defaultValue={row[key] as string}
              onChange={radio => console.log(`You changed the category from '${row[key]}' to '${radio}'`)}
              values={['PC', 'Laptop']}
            />
          }
        >
          {row[key]}
        </Inplace>;
      }
      if (key === 'year') {
        return <Inplace
          title='Click to edit year'
          replacement={
            <NumberInput
              name='year'
              defaultValue={parseInt(row[key] as string)}
              onChange={value => console.log(`You changed the year from '${row[key]}' to '${value}'`)}
            />
          }
        >
          {row[key]}
        </Inplace>;
      }
      if (key === 'price') {
        return <Inplace
          title='Click to edit price (uhmm...)'
          replacement={
            <NumberInput
              name='price'
              defaultValue={parseInt(row[key]?.toString().slice(1) as string)}
              onChange={value => console.log(`You changed the price from '${row[key]}' to $'${value}'`)}
            />
          }
        >
          {row[key]}
        </Inplace>;
      }
      return row[key];
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await sleep(500);
    expect(canvas.getByText('Radium Business Laptop 1')).toBeVisible();
    expect(canvas.queryByText('Radium Power PC 9998')).not.toBeInTheDocument();
    const scrollContainer = document.querySelector('[data-testid=Scrollbar]') as HTMLDivElement;
    scrollContainer.scrollTo({top: scrollContainer.scrollHeight, behavior: 'smooth'});
    await sleep(1000);
    expect(canvas.getByText('Radium Power PC 9998')).toBeVisible();
    scrollContainer.scrollTo({top: 0, behavior: 'smooth'});
    await sleep(500);
  },
};

export const Searchable: Story = {
  args: {
    data: getMockData(100),
    defaultSortBy: 'price',
    search: true,
    searchPlaceholder: 'Search (ex: "399 laptop")'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rowToSearch = 'Radium Power PC 12'
    await userEvent.type(canvas.getByTestId('TableSearchInput'), rowToSearch);
    await sleep(500);
    expect(canvas.getByText(rowToSearch)).toBeVisible();
    await userEvent.clear(canvas.getByTestId('TableSearchInput'));
    await sleep(250);
  },
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(document.querySelector('input[name="1"]') as HTMLInputElement);
    await userEvent.click(document.querySelector('input[name="10"]') as HTMLInputElement);
    await sleep(250);
    await userEvent.click(canvas.getByTestId('TableCheckAll'));
    await sleep(250);
    await userEvent.click(canvas.getByTestId('TableCheckAll'));
    await sleep(250);
  },
};

export const LoadingState: Story = {
  args: {
    paginated: true,
    loading: true,
    loadingText: "Alright, I'll admit it - this will never finish loading",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await sleep(500);
    await expect(canvas.getByTestId('TableLoaderRow')).toBeVisible();
  },
};

export const EmptyState: Story = {
  args: {
    paginated: true,
    data: [],
    emptyText: "There's nothing to show at the moment. Perhaps having a backend to fetch data from would be cool!",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await sleep(500);
    await expect(canvas.getByTestId('TableEmptyRow')).toBeVisible();
  },
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loader = canvas.queryByTestId('TableLoaderRow') as HTMLElement;
    await waitForElementToBeRemoved(loader, {interval: 1000});
    await sleep(250);
    await expect(canvas.getByTestId('TableErrorRow')).toBeVisible();
  },
};

export const Paginated: Story = {
  args: {
    paginated: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await sleep(250);
    await expect(canvas.getByTestId('TableCurrentPage').innerText).toEqual('0 - 9 of 30');
    await userEvent.click(canvas.getByTestId('TableNextPage'));
    await expect(canvas.getByTestId('TableCurrentPage').innerText).toEqual('9 - 18 of 30');
    await userEvent.click(canvas.getByTestId('TableNextPage'));
    await expect(canvas.getByTestId('TableCurrentPage').innerText).toEqual('18 - 27 of 30');
    await userEvent.click(canvas.getByTestId('TableNextPage'));
    await expect(canvas.getByTestId('TableCurrentPage').innerText).toEqual('27 - 30 of 30');
    await sleep(250);
    await userEvent.click(canvas.getByTestId('TablePreviousPage'));
    await expect(canvas.getByTestId('TableCurrentPage').innerText).toEqual('18 - 27 of 30');
    await userEvent.click(canvas.getByTestId('TablePreviousPage'));
    await expect(canvas.getByTestId('TableCurrentPage').innerText).toEqual('9 - 18 of 30');
    await userEvent.click(canvas.getByTestId('TablePreviousPage'));
    await expect(canvas.getByTestId('TableCurrentPage').innerText).toEqual('0 - 9 of 30');
    await sleep(250);
  },
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
