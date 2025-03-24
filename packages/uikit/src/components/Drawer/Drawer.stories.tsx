import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import { Typography } from '../Typography/Typography';
import { Scrollbar } from '../Scrollbar/Scrollbar';
import { Button } from '../Button/Button';
import { Divider } from '../Divider/Divider';
import { ButtonBar } from '../ButtonBar/ButtonBar';
import { Link } from '../Link/Link';

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
  decorators: [
    (Story) => (
      <div className='h-[500px]'>
        <Story />
      </div>
    ),
  ],
  args: {
    side: 'right',
    closeOnBackdrop: true,
    defaultOpen: false,
    children: (isOpen, toggle, side) => (
      <Button data-testid="toggleDrawer" onClick={toggle}>{isOpen ? 'Close' : 'Open'} {side} drawer</Button>
    ),
    content: (toggle, side) => (
      <>
        <Typography.Subtitle>
          List from the {side}
        </Typography.Subtitle>
        <Divider />
        <Scrollbar>
          <ul className='flex flex-col'>
            {...new Array(30).fill(null).map((_, i) => (
              <Link key={i} href='javascript:void(0);' self>Component{i + 1}</Link>
            ))}
          </ul>
        </Scrollbar>
        <Divider />
        <ButtonBar full>
          <Button data-testid="toggleDrawerInside" variant='silent' onClick={toggle}>Close</Button>
          <Button data-testid="toggleDrawerInside" variant='secondary'>Log in</Button>
        </ButtonBar>
      </>
    ),
  },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
