import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ComponentProps } from 'react';
import { NavigationBar } from './NavigationBar';
import { SkeletonListItem } from '../Skeleton/Skeleton';
import { Typography } from '../Typography/Typography';
import { userEvent, within, expect } from '@storybook/test';
import { sleep } from '../../common/utils';

const meta = {
  title: 'Navigation/Navigation bar',
  component: NavigationBar,
  tags: ['autodocs'],
  args: {
    brandName: '@thavixt/uikit',
    navItems: [
      {
        key: 'profile',
        label: 'My profile',
        onClick: fn(),
      },
      {
        key: 'friends',
        label: 'Friends',
        onClick: fn(),
      },
      {
        key: 'events',
        label: 'Events nearby',
        onClick: fn(),
      },
      {
        key: 'prefs',
        label: 'Preferences',
        onClick: fn(),
      },
      {
        key: 'help',
        label: 'Help center',
        onClick: fn(),
      },
    ],
    // image: "https://pc.net/img/terms/avatar.svg",
    image: {
      src: "https://pc.net/img/terms/avatar.svg",
      status: "online",
    },
    imageHref: '/?path=/docs/navigation-navigation-bar--default',
    imageTooltip: 'Navigate to the default story',
  },
  render: function StoryComponent(args: ComponentProps<typeof NavigationBar>) {
    return (
      <div className='p-4'>
        <NavigationBar {...args} />
        <Typography type="title">Example page title text</Typography>
        <div className="flex flex-col space-y-8 pt-4">
          {new Array(15).fill(0).map((_, i) => <SkeletonListItem key={i} />)}
        </div>
      </div>
    )
  },
  parameters: {
    viewport: { defaultViewport: 'default' },
  },
} satisfies Meta<typeof NavigationBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByTestId('NavigationBarBrandLink')).toBeVisible();
    expect(canvas.getByTestId('NavigationBarNavButton')).not.toBeVisible();
    const items = canvas.getAllByTestId('NavigationBarItem');
    expect(items.length).toEqual(5);
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile2' },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByTestId('NavigationBarBrandLink')).toBeVisible();
    expect(canvas.getByTestId('NavigationBarNavButton')).toBeVisible();
    userEvent.click(canvas.getByTestId('NavigationBarNavButton'));
    await sleep(300);
    const items = canvas.getAllByTestId('NavigationBarListItem');
    expect(items.length).toEqual(5);
    userEvent.click(canvas.getByTestId('NavigationBarNavButton'));
    await sleep(300);
  },
};

