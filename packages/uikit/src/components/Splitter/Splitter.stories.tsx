import type { Meta, StoryObj } from '@storybook/react';
import { Splitter } from './Splitter';
import { ComponentProps } from 'react';

const meta = {
  title: 'Layout/Splitter',
  component: Splitter,
  parameters: {
    docs: {
      description: {
        component: 'Requires two child elements which are split by a horizontal draggable line by default.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    children: [
      <div key={1} className='p-2 size-full bg-red-200'>Panel 1</div>,
      <div key={2} className='p-2 size-full bg-blue-200'>Panel 2</div>,
    ],
    vertical: false,
  },
  render: function StoryComponent(args: ComponentProps<typeof Splitter>) {
    return (
      <div className='size-[400px]'>
        <Splitter {...args} />
      </div>
    )
  },
} satisfies Meta<typeof Splitter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};

export const Vertical: Story = {
  args: {
    vertical: true,
  }
};

export const Nested: Story = {
  args: {
    className: 'border-none bg-red-500',
    collapse: 10,
    split: 35,
  },
  render: function StoryComponent({className, split, collapse, vertical}: ComponentProps<typeof Splitter>) {
    return (
      <div className='size-[400px]'>
        <Splitter className={className} split={split} vertical={vertical} collapse={collapse}>
          <div key={1} className='p-2 size-full bg-yellow-200'>Panel 1</div>
          <Splitter className={className} key={2} vertical split={split} collapse={collapse}>
            <div className='p-2 size-full bg-red-200'>Panel 2</div>
            <Splitter className={className} vertical={false} split={split} collapse={collapse}>
              <Splitter className={className} vertical split={split} collapse={collapse}>
                <div className='p-2 size-full bg-green-200'>Panel 3</div>
                <div className='p-2 size-full bg-blue-200'>Panel 4</div>
              </Splitter>
              <div className='p-2 size-full bg-purple-200'>Panel 5</div>
            </Splitter>
          </Splitter>
        </Splitter>
      </div>
    )
  },
};
