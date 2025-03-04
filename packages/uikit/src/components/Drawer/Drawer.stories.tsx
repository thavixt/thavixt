import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import { ComponentProps } from 'react';
import { Typography } from '../Typography/Typography';
import { Scrollbar } from '../Scrollbar/Scrollbar';
import { Button } from '../Button/Button';
import { Divider } from '../Divider/Divider';

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
      <Button data-testid="toggleDrawer" onClick={toggle}>{isOpen ? 'Close' : 'Open'} {side} drawer</Button>
    ),
    content: (isOpen, toggle, side) => (
      <div data-testid="drawer">
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
        <Button data-testid="toggleDrawerInside" onClick={toggle}>{isOpen ? 'Close' : 'Open'} {side} drawer</Button>
      </div>
    )
  },
  render: function StoryComponent(args: ComponentProps<typeof Drawer>) {
    return (
      <div className='h-[400px]'>
        <Drawer {...args} />
      </div>
    )
  },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
