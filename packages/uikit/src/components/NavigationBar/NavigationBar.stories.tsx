import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ComponentProps } from 'react';
import { NavigationBar } from './NavigationBar';
import { SkeletonListItem } from '../Skeleton/Skeleton';

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
    imageHref: '/?path=/docs/navigation-navigation-bar--docs',
  },
  render: function StoryComponent(args: ComponentProps<typeof NavigationBar>) {
    return (
      <div className='p-4'>
        <NavigationBar {...args} />
        <div className="flex flex-col space-y-2">
          {new Array(20).fill(0).map((_, i) => <SkeletonListItem key={i} />)}
        </div>
      </div>
    )
  },
} satisfies Meta<typeof NavigationBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

