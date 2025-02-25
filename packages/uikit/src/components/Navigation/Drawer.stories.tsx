import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import { Button } from '../Basic/Button';
import { HorizontalRule } from '../Basic/HorizontalRule';

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
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
