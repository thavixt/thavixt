import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta = {
  title: 'Navigation/Link',
  component: Link,
  tags: ['autodocs'],
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click here to go somewhere',
    href: 'https://komlosidev.net/',
  }
};

export const CustomIcon: Story = {
  args: {
    children: 'Click here to go somewhere',
    href: 'https://komlosidev.net/',
    icon: "Check",
  }
};

export const WithoutIcon: Story = {
  args: {
    children: 'Click here to go somewhere',
    href: 'https://komlosidev.net/',
    icon: false,
  }
};
