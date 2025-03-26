import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import { Typography } from '../Typography/Typography';
import { Scrollbar } from '../Scrollbar/Scrollbar';
import { Button } from '../Button/Button';
import { Divider } from '../Divider/Divider';
import { ButtonBar } from '../ButtonBar/ButtonBar';
import { Link } from '../Link/Link';
import { ComponentProps } from 'react';
import { SkeletonListItem, SkeletonRow } from '../Skeleton/Skeleton';
import classNames from 'classnames';

const listItemCount = 30;

const meta = {
  title: 'Layout/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Check the `Default` story page for a better demonstration.',
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
    children: (isOpen, toggle) => (
      <Button
        data-testid="ToggleDrawer"
        icon={{ icon: 'List', height: 4, className: isOpen ? '' : "rotate-180" }}
        onClick={toggle}
        className={classNames("fixed top-4 right-4 shadow-md z-10")}
      />
    ),
    content: (toggle, side) => (
      <>
        <Typography.Subtitle>
          List from the {side}
        </Typography.Subtitle>
        <Typography.Subtitle>Information</Typography.Subtitle>
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
              <Link key={i} href={`#link${i}`} self>List item #{i + 1}</Link>
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
    return (
      <div className="flex flex-col space-y-4">
        <Drawer {...args} />
        <div className="flex flex-col space-y-4">
          <Typography.H1>Page title</Typography.H1>
          <Typography.Title>List of things</Typography.Title>
          {new Array(listItemCount).fill(null).map((_, i) => (
            <>
              <Typography.Subtitle id={`link${i}`}>List item #{i}</Typography.Subtitle>
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
