import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Skeleton, SkeletonCircle, SkeletonListItem, SkeletonRectangle, SkeletonRow, SkeletonSquare } from './Skeleton';
import { ComponentProps, useState } from 'react';
import { Button } from '../Button/Button';

const meta = {
  title: 'Layout/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Skeleton is a placeholder to display while the actual content is being fetched.',
      },
    },
  },
  args: {
    children: undefined,
    delay: 300,
    onLoad: fn(async () => {
      // throw new Error('asd');
      return <div>Fetched result example</div>
    }),
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

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

export const Example: Story = {
  render: function StoryComponent({ onLoad, ...args }: ComponentProps<typeof Skeleton>) {
    const [loaded, setLoaded] = useState(false);
    const [key, setKey] = useState(0);
    return (
      <div className='flex flex-col justify-between h-[2000px]'>
        <div>
          <div>{loaded ? 'Already loaded' : 'Scroll to the bottom'}</div>
          <Button onClick={() => {
            setLoaded(false);
            setKey(prev => prev + 1);
          }}>Reset</Button>
        </div>
        <div key={key}>
          <Skeleton
            {...args}
            placeholder={(
              <div className='flex space-x-2'>
                <div className="flex flex-col space-y-2 w-full justify-between">
                  <SkeletonListItem />
                  <div className="flex flex-col space-y-2 w-full justify-center mt-2">
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow className='h-3 mt-2' />
                    <SkeletonRow />
                  </div>
                </div>
                <div className="size-fit flex flex-col self-end">
                  <SkeletonSquare />
                </div>
              </div>
            )}
            onLoad={() => {
              setLoaded(true);
              return onLoad()
            }}
          />
        </div>
      </div>
    )
  },
};