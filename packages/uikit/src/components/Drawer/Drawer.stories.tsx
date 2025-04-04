import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import { Typography } from '../Typography/Typography';
import { Scrollbar } from '../Scrollbar/Scrollbar';
import { Button } from '../Button/Button';
import { Divider } from '../Divider/Divider';
import { ButtonBar } from '../ButtonBar/ButtonBar';
import { Link } from '../Link/Link';
import { ComponentProps, useState } from 'react';
import { SkeletonListItem, SkeletonRow } from '../Skeleton/Skeleton';
import classNames from 'classnames';
import { fn } from '@storybook/test';

const listItemCount = 6;

const meta = {
  title: 'Layout/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Check the `Default` story page for a better demo - styling storybook itself is painful :\'(',
      },
    },
  },
  args: {
    side: 'right',
    closeOnBackdrop: true,
    defaultOpen: false,
    target: (_, toggle) => (
      <Button
        data-testid="ToggleDrawer"
        icon={{ icon: 'List', height: 4 }}
        onClick={toggle}
        className={classNames("fixed top-4 right-8 shadow-md z-10")}
      />
    ),
    onOpen: fn(),
    onClose: fn(),
    children: (toggle, side) => (
      <>
        <Typography.Subtitle>Sidebar</Typography.Subtitle>
        <div className="flex flex-col space-y-4">
          <SkeletonListItem />
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
        <Divider />
        <Scrollbar>
          <ul className='flex flex-col items-start space-y-1'>
            {...new Array(listItemCount).fill(null).map((_, i) => (
              <Link key={i} href={`#link${i + 1}`} self>List item #{i + 1}</Link>
            ))}
          </ul>
        </Scrollbar>
        <Divider />
        <ButtonBar full>
          <Button data-testid="ToggleDrawerInside" variant='silent' onClick={toggle}>Close {side} drawer</Button>
          <Button variant='secondary'>Log in</Button>
        </ButtonBar>
      </>
    ),
  },
  render: function StoryComponent(args: ComponentProps<typeof Drawer>) {
    const [isOpen, setIsOpen] = useState(args.defaultOpen ?? false);
    const onOpen = () => {
      args.onOpen?.();
      setIsOpen(true);
    };
    const onClose = () => {
      args.onClose?.();
      setIsOpen(false);
    };

    return (
      <div className="flex flex-col space-y-4 px-4 py-2">
        <Drawer {...args} onOpen={onOpen} onClose={onClose}/>
        <div className="flex flex-col space-y-4">
          <Typography.H1>The drawer is {isOpen ? 'opened' : 'closed'}</Typography.H1>
          <Typography.Title>List of things</Typography.Title>
          {new Array(listItemCount).fill(null).map((_, i) => (
            <>
              <Typography.Subtitle id={`link${i + 1}`}>List item #{i + 1}</Typography.Subtitle>
              <div className="flex flex-col space-y-4">
                <SkeletonListItem />
                <SkeletonListItem />
                <SkeletonListItem />
              </div>
            </>
          ))}
        </div>
      </div>
    )
  },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
