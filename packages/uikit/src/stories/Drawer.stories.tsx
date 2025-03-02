import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from '../components/Drawer';
import { Button } from '../components/Button';
import { Divider } from '../components/Divider';
import { ComponentProps } from 'react';

const meta = {
  title: 'Navigation/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Check the separate `Default` story page instead for a better demo',
      },
    },
  },
  args: {
    side: 'left',
    children: (isOpen, toggle, side) => (
      <Button onClick={toggle}>{isOpen ? 'Close' : 'Open'} {side} drawer</Button>
    ),
    content: (isOpen, toggle, side) => (
      <div>
        <b>App name here</b>
        <Divider />
        <ul>
          <li>stuff</li>
          <li>stuff2</li>
        </ul>
        <Divider />
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
