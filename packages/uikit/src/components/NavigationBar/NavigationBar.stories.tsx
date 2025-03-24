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
  decorators: [
    (Story) => (
      <div className='h-[500px]'>
        <Story />
      </div>
    ),
  ],
  args: {
    brandName: '@thavixt/uikit',
    navItems: [
      {
        key: 'install',
        label: 'Installation',
        onClick: fn(),
      },
      {
        key: 'docs',
        label: 'Documentation',
        onClick: fn(),
      },
      {
        key: 'examples',
        label: 'Example usage',
        onClick: fn(),
      },
      {
        key: 'pricing',
        label: 'Pricing and licensing',
        onClick: fn(),
      },
    ],
    logo: logo,
    logoURL: '/?path=/docs/navigation-navigation-bar--docs',
  },
  render: function StoryComponent(args: ComponentProps<typeof NavigationBar>) {
    return (
      <div>
        <NavigationBar {...args} />
        <div className="flex flex-col space-y-2">
          {new Array(30).fill(0).map((_, i) => (
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

