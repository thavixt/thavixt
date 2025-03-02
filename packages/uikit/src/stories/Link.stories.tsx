import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '../components/Link';

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

export const WithIcon: Story = {
  args: {
    children: 'Click here to go somewhere',
    href: 'https://komlosidev.net/',
    icon: "🌍",
  }
};
