import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, SkeletonCircle, SkeletonListItem, SkeletonRectangle, SkeletonRow, SkeletonSquare } from './Skeleton';
import { ComponentProps, useState } from 'react';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';
import { userEvent, within, expect, fn } from '@storybook/test';
import { sleep } from '../../common/utils';

const meta = {
  title: 'Layout/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  args: {
    children: undefined,
    delay: 300,
    onLoad: fn(async () => {
      return <Typography data-testid="StoryReplacedContent" type="body">Fetched content goes here</Typography>
    }),
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Variants = {
  render: function StoryComponent() {
    return (
      <div className='grid grid-cols-[1fr_3fr] gap-4'>
        <Typography>SkeletonListItem</Typography>
        <SkeletonListItem />
        <Typography>SkeletonCircle</Typography>
        <SkeletonCircle />
        <Typography>SkeletonRectangle</Typography>
        <SkeletonRectangle />
        <Typography>SkeletonRow</Typography>
        <SkeletonRow />
        <Typography>SkeletonSquare</Typography>
        <SkeletonSquare />
      </div>
    )
  },
};

export const LoaderExample: Story = {
  render: function StoryComponent({ onLoad, ...args }: ComponentProps<typeof Skeleton>) {
    const [loaded, setLoaded] = useState(false);
    const [key, setKey] = useState(0);
    return (
      <div data-testid="StoryWrapper" className='flex flex-col justify-between h-[150dvh] p-4'>
        <div>
          <Typography type="body">{loaded ? 'Already loaded' : 'Scroll to the bottom'}</Typography>
          <Button
            data-testid="StoryResetButton"
            onClick={() => {
              setLoaded(false);
              setKey(prev => prev + 1);
            }}
          >
            Reset
          </Button>
        </div>
        <div key={key}>
          <Skeleton
            {...args}
            placeholder={(
              <div className='flex space-x-2 mb-4'>
                <div className="flex flex-col space-y-2 w-full justify-between">
                  <SkeletonListItem />
                  <div className="flex flex-col space-y-2 w-full justify-center mt-2">
                    <SkeletonRow className='w-2/3' />
                    <SkeletonRow className='w-1/3' />
                    <SkeletonRow className='w-2/3 h-3 mt-2' />
                    <SkeletonRow className='w-1/3' />
                  </div>
                </div>
                <div className="size-fit flex flex-col self-end">
                  <SkeletonSquare />
                </div>
              </div>
            )}
            onLoad={() => {
              setLoaded(true);
              return onLoad();
            }}
          />
        </div>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByTestId('Skeleton')).toBeVisible();
    expect(canvas.queryByTestId('StoryReplacedContent')).not.toBeInTheDocument();
    (canvas.getByTestId('Skeleton') as HTMLElement).scrollIntoView({behavior: 'smooth'});
    await sleep(1000);
    expect(canvas.queryByTestId('Skeleton')).not.toBeInTheDocument();
    expect(canvas.getByTestId('StoryReplacedContent')).toBeVisible();
    await sleep(250);
    userEvent.click(canvas.getByTestId('StoryResetButton'));
    await sleep(250);
    expect(canvas.getByTestId('Skeleton')).toBeVisible();
    expect(canvas.queryByTestId('StoryReplacedContent')).not.toBeInTheDocument();
  },
};