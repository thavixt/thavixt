import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Skeleton, SkeletonCircle, SkeletonListItem, SkeletonRectangle, SkeletonRow, SkeletonSquare } from './Skeleton';
import { ComponentProps, useState } from 'react';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';

const meta = {
  title: 'Layout/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '`<Skeleton>` is a placeholder to display while the actual content is being fetched. When the content appears in the viewport (detected with an `IntersectionObserver`), the `onLoad` argument is called, and its return value replaces the original child elements after `delay` ms.',
      },
    },
  },
  args: {
    children: undefined,
    delay: 300,
    onLoad: fn(async () => {
      return <Typography.Body>Fetched content goes here</Typography.Body>
    }),
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function StoryComponent({ onLoad, ...args }: ComponentProps<typeof Skeleton>) {
    const [loaded, setLoaded] = useState(false);
    const [key, setKey] = useState(0);
    return (
      <div className='flex flex-col justify-between h-[120dvh] p-4'>
        <div>
          <Typography.Body>{loaded ? 'Already loaded' : 'Scroll to the bottom'}</Typography.Body>
          <Button
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
};

export const ListItem = {
  render: function StoryComponent() {
    return (
      <div>
        <SkeletonListItem />
      </div>
    )
  },
};

export const Circle = {
  render: function StoryComponent() {
    return (
      <div>
        <SkeletonCircle />
      </div>
    )
  },
};


export const Rectangle: Story = {
  render: function StoryComponent() {
    return (
      <div>
        <SkeletonRectangle />
      </div>
    )
  },
};

export const Row: Story = {
  render: function StoryComponent() {
    return (
      <div>
        <SkeletonRow />
      </div>
    )
  },
};

export const Square: Story = {
  render: function StoryComponent() {
    return (
      <div>
        <SkeletonSquare />
      </div>
    )
  },
};
