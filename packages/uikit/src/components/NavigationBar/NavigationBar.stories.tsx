// @ts-expect-error i guess i could just do proper file imports but meh
import logo from './story-logo.png?url';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ComponentProps } from 'react';
import { NavigationBar } from './NavigationBar';
import { SkeletonListItem } from '../Skeleton/Skeleton';

const meta = {
  title: 'Navigation/Navigation bar',
  component: NavigationBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Check the `Default` story for a better demonstration.',
      },
    },
  },
  args: {
    // className: 'max-w-md',
    brandName: '@thavixt/uikit',
    navItems: [
      {
        key: 'auth',
        label: 'Register or log in',
        onClick: fn(),
      },
      {
        key: 'docs',
        label: 'Read the documentation',
        onClick: fn(),
      },
      {
        key: 'pricing',
        label: 'More about pricing and licensing',
        onClick: fn(),
      },
    ],
    logo: logo,
    logoURL: '/',
  },
  render: function StoryComponent(args: ComponentProps<typeof NavigationBar>) {
    return (
      <div>
        <NavigationBar {...args} />
        <div className="flex flex-col space-y-2">
          {new Array(100).fill(0).map((_, i) => (
            <SkeletonListItem key={i} />
          ))}
        </div>
      </div>
    )
  },
} satisfies Meta<typeof NavigationBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

