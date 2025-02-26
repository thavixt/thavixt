import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import { Button } from '../Basic/Button';
import { HorizontalRule } from '../Basic/HorizontalRule';
import { ComponentProps } from 'react';

const meta = {
  title: 'Navigation/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  args: {
    side: 'left',
    children: (isOpen, toggle, side) => (
      <Button onClick={toggle}>{isOpen ? 'Close' : 'Open'} {side} drawer</Button>
    ),
    content: (isOpen, toggle, side) => (
      <div>
        <b>App name here</b>
        <HorizontalRule />
        <ul>
          <li>stuff</li>
          <li>stuff2</li>
        </ul>
        <HorizontalRule />
        <Button onClick={toggle}>{isOpen ? 'Close' : 'Open'} {side} drawer</Button>
      </div>
    )
  },
  render: function StoryComponent(args: ComponentProps<typeof Drawer>) {
    return (
      <div className='h-[400px]'>
        <Drawer {...args}/>
      </div>
    )
  },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
