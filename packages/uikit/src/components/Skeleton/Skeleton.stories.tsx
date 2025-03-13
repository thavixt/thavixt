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
        component: 'Skeleton is a placeholder to display instead of the actual content.',
      },
    },
  },
  args: {
    children: undefined,
    delay: 300,
    onLoad: fn(),
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ListItem: Story = {
  render: function StoryComponent() {
    return (
      <div>
        <SkeletonListItem />
      </div>
    )
  },
};

export const Circle: Story = {
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
  args: {
    children: <div>Actual final child element</div>,
  },
  render: function StoryComponent({onLoad, ...args}: ComponentProps<typeof Skeleton>) {
    const [loaded, setLoaded] = useState(false);
    const [key, setKey] = useState(0);
    return (
      <div className='flex flex-col justify-between h-[1200px]'>
        <div>
          <div>{loaded ? 'Already loaded' : 'Scroll to the bottom to reveal'}</div>
          <Button onClick={() => {
            setLoaded(false);
            setKey(prev => prev + 1);
          }}>Reset</Button>
        </div>
        <div>
          <Skeleton
            key={key}
            {...args}
            onLoad={() => {
              setLoaded(true);
              onLoad?.();
            }}
          />
        </div>
      </div>
    )
  },
};