import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from '../components/Drawer';
import { Button } from '../components/Button';
import { Divider } from '../components/Divider';
import { ComponentProps } from 'react';
import { Scrollbar } from '../components/Scrollbar';
import { Typography } from '../components/Typography';

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
    side: 'right',
    children: (isOpen, toggle, side) => (
      <Button onClick={toggle}>{isOpen ? 'Close' : 'Open'} {side} drawer</Button>
    ),
    content: (isOpen, toggle, side) => (
      <div>
        <Typography.Subtitle>
          List of things {['top', 'bottom'].includes(side) ? 'in a horizontal drawer' : 'here'}
        </Typography.Subtitle>
        <Scrollbar className='max-h-52'>
          <ul>
            <li>stuff</li>
            <li>thing</li>
            <li>element</li>
            {...new Array(100).fill(null).map((_, i) => (
              <li>item#{i + 1}</li>
            ))}
          </ul>
        </Scrollbar>
        <Divider/>
        <Button onClick={toggle}>{isOpen ? 'Close' : 'Open'} {side} drawer</Button>
      </div>
    )
  },
  render: function StoryComponent(args: ComponentProps<typeof Drawer>) {
    return (
      <div className='h-[300px]'>
        <Drawer {...args} />
      </div>
    )
  },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
